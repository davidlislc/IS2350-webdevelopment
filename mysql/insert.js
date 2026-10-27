let mysql = require('mysql2');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root_password",
    database: "mydb"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
            console.log(result.affectedRows +" records inserted");
            console.log("1 record inserted, ID: " + result.insertId);

  });
});
