let mysql = require('mysql2');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root_password",
    database: "mydb"
});
con.connect(function(err) {
  if (err) throw err;
  let sql = "INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
});
