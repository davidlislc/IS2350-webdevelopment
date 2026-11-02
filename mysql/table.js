let mysql = require('mysql2');
let con = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "root_password",
    database: "mydb"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    let sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});
