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

// Connection pool to the MySQL database provided by docker-compose.yml
// (a pool reconnects automatically and handles concurrent requests)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root_password",
  database: process.env.DB_NAME || "my_database",
  waitForConnections: true,
  connectionLimit: 10
}).promise();

// Verify the database connection at startup
pool.getConnection()
  .then(conn => {
    console.log("Connected to MySQL!");
    conn.release();
  })
  .catch(err => console.error("MySQL connection failed:", err.message));


// Login route - authenticate against the users table, then generate token
app.post('/login', async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Parameterized query (? placeholders) prevents SQL injection
    const [rows] = await pool.query(
      'SELECT id, fullname, username, role FROM users WHERE username = ? AND password = ? LIMIT 1',
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];

    // Create payload for JWT
    const payload = {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      role: user.role
    };

    // Sign token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
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