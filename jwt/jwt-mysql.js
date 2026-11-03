const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Enable CORS for your frontend origin
app.use(cors({
    origin: 'http://localhost:3000', // Match your frontend URL exactly
    credentials: true                // Allow cookies/authorization headers if needed
}));

const JWT_SECRET = 'your_secret_key'; // Replace or use process.env if needed

// Create database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'db_user',
    password: 'user_password',
    database: 'my_database'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

// Login route - query MySQL database
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    
    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.length > 0) {
            const user = results[0];
            
            const payload = {
                id: user.id,
                username: user.username,
                role: user.role
            };
            
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            
            return res.json({ message: 'Login successful', token });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Middleware for JWT verification
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

app.listen(3000, () => {
    console.log('Server running on port 3000');
});