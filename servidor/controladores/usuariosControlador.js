// -----------------------------------------------------------------
// Autor: Luis Belloch
// Descripcion: Funciones para los objetos Usuario de la API
// Creado: 07/10/2021
// Estado: WIP
// -----------------------------------------------------------------

import pool from '../dbconfig.js';

class UsuariosControlador {
    // -----------------------------------------------------------------
    //#region GET
    // -----------------------------------------------------------------
    /**
     * Devuelve un JSON con todos los usuarios
     *
     * @return {text} JSON con los sensores
     */
     static getTodosLosUsuarios() {
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
}

export default UsuariosControlador;