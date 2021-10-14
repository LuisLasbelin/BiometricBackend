// -----------------------------------------------------------------
// Autor: Luis Belloch
// Descripcion: Funciones para los objetos Medida de la base de datos
// Creado: 06/10/2021
// Estado: DONE
// -----------------------------------------------------------------

import medidas from '../dummy/medidas.js';
import pool from '../dbconfig.js';

class MedidasControlador {
      // -----------------------------------------------------------------
      //#region Test
      // -----------------------------------------------------------------
      // Get todas las medidas
      static getTodasLasMedidasTest(req, res) {
            return res.status(200).json({
                  medidas,
                  message: "Todas las medidas",
            });
      }
      // Get todas las medidas
      static getUnaMedidaTest(req, res) {
            const buscaMedida = medidas.find(medida => medida.id === parseInt(req.params.id, 10));
            if (buscaMedida) {
                  return res.status(200).json({
                        medida: buscaMedida,
                        message: "Una sola medida",
                  });
            }
            return res.status(404).json({
                  message: "Medida no encontrada",
            });
      }
      // -----------------------------------------------------------------
      //#endregion
      // -----------------------------------------------------------------

      // -----------------------------------------------------------------
      //#region GET
      // -----------------------------------------------------------------
      /**
       * Devuelve un JSON con todas las medidas
       *
       * @return {text} JSON con las medidas
       */
      static getTodasLasMedidas() {
            // Recibe las medidas
            return new Promise(result => {

                  var queryString = "SELECT * from medidas";

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
       * Devuelve un JSON con las medidas de un sensor id
       *
       * @param {number} id del sensor
       * @return {text} JSON con las medidas del sensor
       */
      static getMedidasDeSensor(id) {
            
            return new Promise(result => {

                  var queryString = "SELECT * from medidas where medidas.Sensor = " + id;

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
       * Devuelve un JSON con las medidas de un usuario id
       *
       * @param {number} id del usuario
       * @return {text} JSON con las medidas del usuario
       */
      static getMedidasDeUsuario(id) {
            
            return new Promise(result => {
    
                  var queryString = 'SELECT medidas.ID, medidas.Valor, medidas.Latitud, medidas.Longitud, medidas.Fecha, medidas.Sensor FROM medidas, sensores, usuarios WHERE medidas.Sensor = sensores.ID AND sensores.Usuario = usuarios.ID AND usuarios.ID = "' + id + '"';
    
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
      //#region POST
      // -----------------------------------------------------------------
      /**
       * Crea una nueva medida en la base de datos con los datos recibidos
       *
       * @param {number} valor
       * @param {number} latitud
       * @param {number} longitud
       * @param {number} id del sensor
       * @return {text} JSON con la medida
       */
       static postMedida(valor, latitud, longitud, id) {
            
            return new Promise(result => {
                  
                  // ID es NULL porque la base da datos lo asigna como valor autoincremental
                  const queryString = "INSERT INTO `medidas` (`ID`, `Valor`, `Latitud`, `Longitud`, `Fecha`, `Sensor`) VALUES (NULL, '"+valor+"', '"+latitud+"', '"+longitud+"', '2021-10-11 13:16:29.000000', '"+id+"');"
    
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
export default MedidasControlador;