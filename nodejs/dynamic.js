const express = require('express');
const app = express();

const students = [
  "George",
  "Kc",
  "Seth",
  "Andrew",
  "Mitchel",
  "Leviticus",
  "Makail",
  "Logan",
  "Jayden",
  "Naina",
  "Allen",
  "Samuel",
  "Chloe",
  "Brayden",
  "Draco"
];

app.get('/', (req, res) => {
  // Generate an array of <li> strings and join them into a single block of HTML
  const studentListHtml = students
    .map(name => `<li><strong>${name}</strong> is great and does amazing things!</li>`)
    .join('');

  const fullHtml = `
    <h1>Hello World!</h1>
    <p>Welcome to my Express server.</p>
    <h2>Our Amazing Students</h2>
    <ul>
      ${studentListHtml}
    </ul>
  `;

  res.send(fullHtml);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});