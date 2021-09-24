const express = require('express');
const Logica = require('../logica/logica.js')
const cors = require("cors")
var mysql = require('mysql');

// Representa la aplicacion
const app = express();

app.use(express.json());
app.use(cors())

const pool = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "",
    database : "biometric_database"
});

/*
* app.get
* @param URL
* @param callback function
*/
app.get('/', (request, response) => {
    response.send('This is a message from the server');
});

// --------------------------------------------------------------
//#region GET
// --------------------------------------------------------------
/*
* Recibir medidas por la ID de un sensor
* @param URL
* @param callback function
*/
app.get('/api/medidas/sensor/:sensor', async (request, response) => {
    // Recibe las medidas
    const medidas = await Logica.getMedidasDeSensor(pool, request.params.sensor);
    // Se asegura de que no haya errores
    if(!medidas) response.status(404).send(`No hay medidas`);
    // Devuelve la lista de medidas
    response.send(medidas);
});

/*
* Recibir medidas de un usuario
* @param URL
* @param callback function
*/
app.get('/api/medidas/usuario/:nombre', async (request, response) => {
    // Recibe las medidas
    const medidas = await Logica.getMedidasDeUsuario(pool, request.params.nombre);
    // Se asegura de que no haya errores
    if(!medidas) response.status(404).send(`No hay medidas`);
    // Devuelve la lista de medidas
    response.send(medidas);
});

/*
* Recibir medidas de un usuario
* @param URL
* @param callback function
*/
app.get('/api/sensores/usuario/:nombre', async (request, response) => {
    // Recibe las medidas
    const medidas = await Logica.getSensoresDeUsuario(pool, request.params.nombre);
    // Se asegura de que no haya errores
    if(!medidas) response.status(404).send(`No hay medidas`);
    // Devuelve la lista de medidas
    response.send(medidas);
});

//#endregion

// --------------------------------------------------------------
//#region POST
// --------------------------------------------------------------

/*
* Crear una nueva medida para un sensor
* @param URL
* @param callback function
*/
app.post('/api/medida/sensor/:valor/:latitud/:longitud/:sensor', async (req, res) => {
    // SQL query para insertar una medida nueva
    const queryString = "INSERT INTO `medidas` (`ID`, `Valor`, `Latitud`, `Longitud`, `Fecha`, `Sensor`) VALUES (NULL, '"+req.params.valor+"', '"+req.params.latitud+"', '"+req.params.longitud+"', '"+new Date()+"', '"+req.params.sensor+"');"
    // Push al servidor para añadir a la base de datos
    const medida = await Logica.postMedida(pool, queryString);
    // Se asegura de que no haya errores
    if(!medida) response.status(404).send(`No se ha creado`);
    // Lo enviamos al cliente para comprobar en Postman
    res.send(medida);
});

//#endregion

/*
* port se recoge del environement del proceso, o usa 3000 si no existe por defecto
*/
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))