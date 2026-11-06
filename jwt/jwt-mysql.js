const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();


// Enable CORS for your frontend origin
app.use(cors({
  origin: 'http://localhost:3000', // Match your frontend URL exactly
  credentials: true,               // Allow cookies/authorization headers if needed
}));
app.use(bodyParser.json());

const JWT_SECRET = '1600ewashingtonblvdZollner';

// Connect to the MySQL database created by docker-compose.yml
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root_password",
  database: "my_database"
});

// Connect once when the server starts
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


// Login route - check the users table, then generate token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Look up the user in the users table (? placeholders prevent SQL injection)
  const sql = 'SELECT id, username, role FROM users WHERE username = ? AND password = ?';

  con.query(sql, [username, password], function (err, results) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Database error' });
    }

    // No matching row means the credentials are wrong
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    // Create payload for JWT
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    // Sign token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  });
});

// Middleware for JWT verification
const authenticateJWT = (req, res, next) => {
  // Get auth header - The Authorization header is commonly used to send authentication tokens
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Protected route
app.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: 'Profile accessed', user: req.user });
});

// Role-based route
app.get('/admin', authenticateJWT, (req, res) => {
  // Check if user has admin role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: admin role required' });
  }

  res.json({ message: 'Admin panel accessed' });
});

// Start server
app.listen(8080, () => {
  console.log('Server running on port 8080');
});