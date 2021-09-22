var mysql = require('mysql');

class Logica {

    static getMedidasDeSensor(sensor) {
        
        return new Promise(result => {
            var conn = mysql.createConnection({
                host : "localhost",
                user : "root",
                password : "",
                database : "biometric_database"
            });
        
            var queryString = "SELECT * from medidas where medidas.Sensor = " + sensor;
            conn.query(queryString, function(error, medidas){
                if(error) {
                    throw error;
                }
                else {
                    result(medidas);
                }
            });
          });

        conn.end();
    }
}

module.exports = Logica;