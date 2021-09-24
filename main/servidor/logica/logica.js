var mysql = require('mysql');

class Logica {

    // --------------------------------------------------------------
    //#region GET
    // --------------------------------------------------------------
    /*
    * Recoge de la base de datos las medidas de un sensor
    *
    */
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

    /*
    * Recoge de la base de datos las medidas de un usuario
    * según su nombre
    */
    static getMedidasDeUsuario(pool, usuario) {
        
        return new Promise(result => {

            var queryString = 'SELECT medidas.ID, medidas.Valor, medidas.Latitud, medidas.Longitud, medidas.Fecha, medidas.Sensor FROM medidas, sensores, usuarios WHERE medidas.Sensor = sensores.ID AND sensores.Usuario = usuarios.ID AND usuarios.Nombre = "' + usuario + '"';

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

    /*
    * Recoge de la base de datos las medidas de un usuario
    * según su nombre
    */
    static getSensoresDeUsuario(pool, usuario) {
        
        return new Promise(result => {

            var queryString = 'SELECT sensores.ID, sensores.Latitud, sensores.Longitud, sensores.Usuario FROM sensores, usuarios WHERE sensores.Usuario = usuarios.ID AND usuarios.Nombre = "' + usuario + '"';

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

    //#endregion

    // --------------------------------------------------------------
    //#region POST
    // --------------------------------------------------------------

    /*
    * Hace POST con la medida que se envia
    *
    */
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
    //#endregion
}

module.exports = Logica;