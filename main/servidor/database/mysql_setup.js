var mysql = require('mysql');

var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "biometric_database"
});

var queryString = "SELECT * from Medidas";
conn.query(queryString, function(error, result){
    if(error) {
        throw error;
    }
    else {
        console.log(result);
    }
});

conn.end();