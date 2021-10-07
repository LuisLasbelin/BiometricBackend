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
      // Recoge todas las medidas de la base de datos
      // en formato JSON
      static getTodasLasMedidas() {
            // Recibe las medidas
            return new Promise(result => {

                  var queryString = "SELECT * from medidas";

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
      /*
      // Recoge las medidas de un sensor especifico
      static getUnaMedida(req, res) {
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
      */
      // -----------------------------------------------------------------
      //#endregion
      // -----------------------------------------------------------------

}
export default MedidasControlador;