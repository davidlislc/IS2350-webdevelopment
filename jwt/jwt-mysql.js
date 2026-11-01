const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
app.use(bodyParser.json());

const JWT_SECRET = '1600ewashingtonblvdZollner';
// Sample user database
//connection to db
let con = mysql.createConnection({
  host: "localhost",
  user: "db_user",
  password: "user_password",
  database: "my_database"
});
//established connection-
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

// Login route - generate token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  //query to find user in the database
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

    con.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

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