var mysql = require('mysql');
<<<<<<< Updated upstream
var pool = mysql.createPool({
=======
var conn = mysql.createConnection({
>>>>>>> Stashed changes
    host : "localhost",
    user : "root",
    password : "",
    database : "biometric_database"
});

<<<<<<< Updated upstream
pool.getConnection(function(error, result){
    if(error) {
        throw error;
    }
    else {
        console.log(result);
    }
});

=======
>>>>>>> Stashed changes
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