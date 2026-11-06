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
// Sample user database
const users = [
  { id: 1, username: 'user1', password: 'password1', role: 'user' }
];

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root_password",
  database: "my_database"
});


// Login route - generate token
app.post('/login', (req, res) => {
  const { username, password } = req.body;
const sql = 'SELECT id, username, role FROM users WHERE username = ? AND password = ?';
  con.query(sql, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user', error: err });
    }

    const user = results[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

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
  // The above query handles the login process using the database.
  // The following code is redundant and can be removed.
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

// ==================== ACCESS REQUEST ENDPOINTS ====================

// 1. Create a new access request
app.post('/api/access-request', authenticateJWT, (req, res) => {
  const { useremail, request_type, request_detail } = req.body;
  const userid = req.user.id;

  if (!useremail || !request_type) {
    return res.status(400).json({ message: 'Missing required fields: useremail, request_type' });
  }

  const query = `INSERT INTO access_request (userid, useremail, request_type, request_detail, status) 
                 VALUES (?, ?, ?, ?, 'PENDING')`;

  con.query(query, [userid, useremail, request_type, request_detail || null], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating access request', error: err });
    }

    res.status(201).json({
      message: 'Access request created successfully',
      access_request_id: result.insertId
    });
  });
});

// 2. Get all access requests (filtered by user if not admin)
app.get('/api/access-requests', authenticateJWT, (req, res) => {
  let query = 'SELECT * FROM access_request';
  let params = [];

  // If not admin, only show user's own requests
  if (req.user.role !== 'admin') {
    query += ' WHERE userid = ?';
    params.push(req.user.id);
  }

  query += ' ORDER BY request_time DESC';

  con.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching access requests', error: err });
    }

    res.json({ access_requests: results });
  });
});

// 3. Get a specific access request
app.get('/api/access-request/:id', authenticateJWT, (req, res) => {
  const requestId = req.params.id;

  con.query('SELECT * FROM access_request WHERE id = ?', [requestId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching access request', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Access request not found' });
    }

    const accessRequest = results[0];

    // Check authorization: user can view own request or admin can view any
    if (req.user.id !== accessRequest.userid && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json({ access_request: accessRequest });
  });
});

// 4. Approve an access request (Admin only)
app.post('/api/access-request/:id/approve', authenticateJWT, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: admin role required' });
  }

  const accessRequestId = req.params.id;
  const approverEmail = req.body.approver_email || '';

  con.query('SELECT * FROM access_request WHERE id = ?', [accessRequestId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching access request', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Access request not found' });
    }

    // Update access_request status
    con.query('UPDATE access_request SET status = ? WHERE id = ?', 
              ['APPROVED', accessRequestId], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating access request', error: err });
      }

      // Create entry in request_process
      const processQuery = `INSERT INTO request_process (access_request_id, isApproved, approver_id, approver_email, decidsion_time) 
                            VALUES (?, ?, ?, ?, NOW())`;

      con.query(processQuery, 
                [accessRequestId, true, req.user.id, approverEmail], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating request process record', error: err });
        }

        res.json({
          message: 'Access request approved successfully',
          request_process_id: result.insertId
        });
      });
    });
  });
});

// 5. Deny an access request (Admin only)
app.post('/api/access-request/:id/deny', authenticateJWT, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: admin role required' });
  }

  const accessRequestId = req.params.id;
  const { note, approver_email } = req.body;

  con.query('SELECT * FROM access_request WHERE id = ?', [accessRequestId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching access request', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Access request not found' });
    }

    // Update access_request status and note
    const updateQuery = 'UPDATE access_request SET status = ?, note = ? WHERE id = ?';
    con.query(updateQuery, ['DENIED', note || '', accessRequestId], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating access request', error: err });
      }

      // Create entry in request_process
      const processQuery = `INSERT INTO request_process (access_request_id, isApproved, approver_id, approver_email, decidsion_time) 
                            VALUES (?, ?, ?, ?, NOW())`;

      con.query(processQuery, 
                [accessRequestId, false, req.user.id, approver_email || ''], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating request process record', error: err });
        }

        res.json({
          message: 'Access request denied successfully',
          request_process_id: result.insertId
        });
      });
    });
  });
});

// 6. Get request process information
app.get('/api/request-process/:access_request_id', authenticateJWT, (req, res) => {
  const accessRequestId = req.params.access_request_id;

  con.query('SELECT * FROM request_process WHERE access_request_id = ?', [accessRequestId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching request process', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Request process not found' });
    }

    res.json({ request_process: results[0] });
  });
});

// 7. Get all pending requests (Admin only)
app.get('/api/access-requests/pending', authenticateJWT, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: admin role required' });
  }

  const query = `SELECT ar.*, u.fullname, u.username 
                 FROM access_request ar
                 LEFT JOIN users u ON ar.userid = u.id
                 WHERE ar.status = 'PENDING'
                 ORDER BY ar.request_time ASC`;

  con.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching pending requests', error: err });
    }

    res.json({ pending_requests: results });
  });
});

// 8. Get request history (Admin only)
app.get('/api/access-requests/history/:user_id', authenticateJWT, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: admin role required' });
  }

  const userId = req.params.user_id;

  const query = `SELECT ar.*, rp.isApproved, rp.approver_email, rp.decidsion_time
                 FROM access_request ar
                 LEFT JOIN request_process rp ON ar.id = rp.access_request_id
                 WHERE ar.userid = ?
                 ORDER BY ar.request_time DESC`;

  con.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching request history', error: err });
    }

    res.json({ request_history: results });
  });
});

// Start server
app.listen(8080, () => {
  console.log('Server running on port 8080');
});