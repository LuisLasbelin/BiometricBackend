var mysql = require('mysql');

var pool = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "",
    database : "biometric_database"
});

pool.getConnection(function(error, result){
    if(error) {
        throw error;
    }
    else {
        console.log(result);
    }
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