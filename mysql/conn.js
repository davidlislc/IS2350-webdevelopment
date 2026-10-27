let mysql = require('mysql2');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root_password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
