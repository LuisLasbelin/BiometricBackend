var mysql = require('mysql');

class Logica {

    static getMedidasDeSensor(pool, sensor) {
        
        return new Promise(result => {

            var queryString = "SELECT * from medidas where medidas.Sensor = " + sensor;

            pool.getConnection((err, connection) => {
                if(err) throw err;
                console.log('connected as id ' + connection.threadId);
                connection.query(queryString, (err, rows) => {
                    connection.release(); // return the connection to pool
                    if(err) throw err;
                    result(rows);
                });
            });
          });
    }

    static postMedida(pool, queryString) {
        return new Promise(result => {

            pool.query(queryString,(err, response) => {
                if(err) {
                    console.error(err);
                    return;
                }
                // Medida creada
                result(response);
            });
        });
    }
}

module.exports = Logica;