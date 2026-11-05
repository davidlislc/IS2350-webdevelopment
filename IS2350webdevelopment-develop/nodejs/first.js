const express = require('express');
const app = express();
const PORT = 8080;

// Enable JSON parsing middleware (for POST/PUT body data)
//app.use(express.json());

// 1. Serve HTML content
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1><p>Welcome to my Express server.</p>');
});
/* 
// 2. Serve JSON dynamic data (Express automatically handles res.end and JSON formatting)
app.get('/api/status', (req, res) => {
  res.json({
    status: 'Running',
    serverTime: new Date().toLocaleString(),
    uptimeSeconds: process.uptime()
  });
});

// 3. Handle routes with parameters
app.get('/user/:name', (req, res) => {
  const userName = req.params.name;
  res.send(`User profile page for: <strong>${userName}</strong>`);
});

// 4. Return an empty success response (using res.end)
app.delete('/api/items/:id', (req, res) => {
  // Delete logic here...
  res.status(204).end(); // Ends the connection with 204 No Content
});
 */
// Start the server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});