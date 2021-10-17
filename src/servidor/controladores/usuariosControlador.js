// -----------------------------------------------------------------
// Autor: Luis Belloch
// Descripcion: Funciones para los objetos Usuario de la API
// Creado: 07/10/2021
// -----------------------------------------------------------------

import pool from '../dbconfig.js';

class UsuariosControlador {
    // -----------------------------------------------------------------
    //#region obtener
    // -----------------------------------------------------------------
    /**
     * Devuelve un JSON con todos los usuarios
     *
     * @return {text} JSON con los usuarios
     */
     static obtenerTodosLosUsuarios() {
        // Recibe las medidas
        return new Promise(result => {

            var queryString = "SELECT usuarios.ID, usuarios.Correo, usuarios.Nombre from usuarios";

            pool.getConnection((err, connection) => {
                if(err) throw err;
                console.log('connected as id ' + connection.threadId);
                connection.query(queryString, (err, rows) => 
                {
                    connection.release(); // devuelve la conexion al pool
                    // Si hay un error devuelve el error
                    if(err) throw err;
                    result(rows);
                });
            }); 
        });
    }
    /**
     * Devuelve un JSON con un usuario
     *
     * @params {number} id del usuario
     * @return {text} JSON con el usuario
     */
     static obtenerUsuario(id) {
        // Recibe las medidas
        return new Promise(result => {

            var queryString = 'SELECT * from usuarios WHERE usuarios.ID = "' + id + '"';

            pool.getConnection((err, connection) => {
                if(err) throw err;
                console.log('connected as id ' + connection.threadId);
                connection.query(queryString, (err, rows) => 
                {
                    connection.release(); // devuelve la conexion al pool
                    // Si hay un error devuelve el error
                    if(err) throw err;
                    result(rows);
                });
            }); 
        });
    }
    // -----------------------------------------------------------------
    //#endregion
    // -----------------------------------------------------------------
    // -----------------------------------------------------------------
    //#region guardar
    // -----------------------------------------------------------------
    /**
     * Crea un nuevo usuario en la base de datos con los datos recibidos
     *
     * @param {text} objeto de datos
     * @return {text} JSON con la medida
     */
     static guardarUsuario(datos) {
            
        return new Promise(result => {

              // ID es NULL porque la base da datos lo asigna como valor autoincremental
              const queryString = "INSERT INTO `usuarios` (`ID`, `Correo`, `Contraseña`, `Nombre`) VALUES (NULL, '"+datos.params.correo+"', '"+datos.params.password+"', '"+datos.params.nombre+"');"

              pool.getConnection((err, connection) => {
                    if(err) throw err;
                    console.log('connected as id ' + connection.threadId);
                    connection.query(queryString, (err, rows) => 
                    {
                          connection.release(); // devuelve la conexion al pool
                          // Si hay un error devuelve el error
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

export default UsuariosControlador;