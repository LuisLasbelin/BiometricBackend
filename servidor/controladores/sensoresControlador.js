// -----------------------------------------------------------------
// Autor: Luis Belloch
// Descripcion: Funciones para los objetos Sensor de la API
// Creado: 07/10/2021
// Estado: WIP
// -----------------------------------------------------------------

import pool from '../dbconfig.js';

class SensoresControlador {
    // -----------------------------------------------------------------
    //#region GET
    // -----------------------------------------------------------------
    /**
     * Devuelve un JSON con todos los sensores
     *
     * @return {text} JSON con los sensores
     */
    static getTodosLosSensores() {
        // Recibe las medidas
        return new Promise(result => {

              var queryString = "SELECT * from sensores";

              pool.getConnection((err, connection) => {
                  if(err) throw err;
                  console.log('connected as id ' + connection.threadId);
                  connection.query(queryString, (err, rows) => {
                    connection.release(); // devuelve la conexion al pool
                    // Si hay un error devuelve el error
                    if(err) throw err;
                    result(rows);
                  });
              });
          });
    }

    /**
       * Devuelve un JSON con los sensores de un usuario id
       *
       * @param {number} id del usuario
       * @return {text} JSON con los sensores del usuario
       */
    static getSensoresDeUsuario(id) {
        
        return new Promise(result => {

            var queryString = 'SELECT sensores.ID, sensores.Latitud, sensores.Longitud, sensores.Usuario FROM sensores, usuarios WHERE sensores.Usuario = usuarios.ID AND usuarios.ID = "' + id + '"';

            pool.getConnection((err, connection) => {
                if(err) throw err;
                console.log('connected as id ' + connection.threadId);
                connection.query(queryString, (err, rows) => 
                {
                    connection.release(); // return the connection to pool
                    if(err) throw err;
                    result(rows);
                });
            });
        });
    }
    // -----------------------------------------------------------------
    //#endregion
    // -----------------------------------------------------------------
}

export default SensoresControlador;