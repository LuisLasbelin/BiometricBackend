const express = require('express');
const session = require('express-session')
const Logica = require('../logica/logica.js')
const cors = require("cors")
var mysql = require('mysql');

// Representa la aplicacion
const app = express();

app.use(express.json());
app.use(cors())

// Crea una sesion al iniciar el servidor
app.use(session({
    // Clave de sesion
	secret: '8868',
	resave: true,
	saveUninitialized: true
}));

const pool = mysql.createPool({
    host : "127.0.0.1",
    user : "root",
    password : "",
    database : "biometric_database"
});

// --------------------------------------------------------------
//#region GET
// --------------------------------------------------------------
/*
* app.get
* @param URL
* @param callback function
*/
app.get('/', (request, response) => {
    response.send('This is a message from the server');
});

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
app.post('/api/medida/:valor/:latitud/:longitud/:sensor', async (req, res) => {
    // SQL query para insertar una medida nueva
    const queryString = "INSERT INTO `medidas` (`ID`, `Valor`, `Latitud`, `Longitud`, `Fecha`, `Sensor`) VALUES (NULL, '"+req.params.valor+"', '"+req.params.latitud+"', '"+req.params.longitud+"', '"+new Date()+"', '"+req.params.sensor+"');"
    // Push al servidor para añadir a la base de datos
    const medida = await Logica.postDatos(pool, queryString);
    // Se asegura de que no haya errores
    if(!medida) response.status(404).send(`No se ha creado`);
    // Lo enviamos al cliente para comprobar en Postman
    res.send(medida);
});

/*
* Crear un nuevo usuario
* @param URL
* @param callback function
*/
app.post('/api/usuario/:nombre/:correo/:password', async (req, res) => {
    // SQL query para insertar una medida nueva
    const queryString = "INSERT INTO `usuarios` (`ID`, `Correo`, `Contraseña`, `Nombre`) VALUES (NULL, '"+req.params.correo+"', '"+req.params.password+"', '"+req.params.nombre+"');"
    // Push al servidor para añadir a la base de datos
    const medida = await Logica.postDatos(pool, queryString);
    // Se asegura de que no haya errores
    if(!medida) response.status(404).send(`No se ha creado`);
    // Lo enviamos al cliente para comprobar en Postman
    res.send(medida);
});

/*
* Crear un nuevo sensor y asignarlo a un usuario
* @param URL
* @param callback function
*/
app.post('/api/sensor/:latitud/:longitud/:usuario', async (req, res) => {
    // SQL query para insertar una medida nueva
    const queryString = "INSERT INTO `sensores` (`ID`, `Latitud`, `Longitud`, `Usuario`) VALUES (NULL, '"+req.params.latitud+"', '"+req.params.longitud+"', '"+req.params.usuario+"');"
    // Push al servidor para añadir a la base de datos
    const medida = await Logica.postDatos(pool, queryString);
    // Se asegura de que no haya errores
    if(!medida) response.status(404).send(`No se ha creado`);
    // Lo enviamos al cliente para comprobar en Postman
    res.send(medida);
});

/*
* Recibe correo y contraseña y hace login
* @param URL
* @param callback function
*/
app.post('/api/auth/:correo/:pass', async (request, response, next) => {

	let correo = request.params.correo;
	let pass = request.params.pass;
    // Recibe las medidas
    const rows = await Logica.postLogin(pool, correo, pass);
    // Se asegura de que no haya errores
    if(!rows) response.status(404).send(`No se puede hacer login`);
    // Si hay más de una fila se ha iniciado sesion correctamente
    if(rows > 1) {
        request.session.usuario = correo;
    }
    // Devuelve la lista de medidas
    response.send(rows);
});

//#endregion

/*
* port se recoge del environement del proceso, o usa 3000 si no existe por defecto
*/
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))