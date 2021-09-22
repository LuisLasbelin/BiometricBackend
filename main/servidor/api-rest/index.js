const { response } = require('express');
const express = require('express');
const Medida = require('../../utils/medida.js')
const Logica = require('../logica/logica.js')
const cors = require("cors")
// Representa la aplicacion
const app = express();

app.use(express.json());
app.use(cors())

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
app.get('/api/medidas/:id', async (request, response) => {
    // TODO: Recibe las medidas
    const medidas = await Logica.getMedidasDeSensor(request.params.id);
    // Se asegura de que no haya errores
    if(!medidas) response.status(404).send(`No hay medidas`);
    // Devuelve la lista de medidas
    response.send(medidas);
});

/*
* Crear una nueva medida para un sensor
* @param URL
* @param callback function
*/
app.post('/api/medida/:latitud/:longitud/:sensor', (req, res) => {
    const medida = new Medida(2, req.params.latitud, req.params.longitud, req.params.sensor);

    // TODO: Push al servidor para añadir a la base de datos
    // Lo enviamos al cliente para comprobar en Postman
    res.send(medida);
});

/*
* port se recoge del environement del proceso, o usa 3000 si no existe por defecto
*/
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))