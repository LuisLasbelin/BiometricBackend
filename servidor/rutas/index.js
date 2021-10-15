// -----------------------------------------------------------------
// Autor: Luis Belloch
// Descripcion: Almacena las URL para hacer fetch de la API
// Creado: 06/10/2021
// Estado: DONE
// -----------------------------------------------------------------

import { Router } from 'express';
import MedidasControlador from '../controladores/medidasControlador.js';
import SensoresControlador from '../controladores/SensoresControlador.js';
import UsuariosControlador from '../controladores/UsuariosControlador.js';
import "babel-polyfill"; //regeneratorRuntime error fix
const routes = Router();
// -----------------------------------------------------------------
//#region GET
// -----------------------------------------------------------------
/**
 * Recibe todas las medidas de la base de datos
 *
 * @param {text} URL
 * @param {text} callback function
 * @return {text} JSON con las medidas
 */
routes.get('/medidas', async (request, response) => {
    // Recibe las medidas
    const medidas = await MedidasControlador.getTodasLasMedidas();
    // Se asegura de que no haya errores
    if(!medidas) response.status(404).send(`No hay medidas`);
    // Devuelve la lista de medidas
    response.send(medidas);
});

/**
 * Recibe las medidas de un sensor concreto
 *
 * @param {text} URL con la id del sensor
 * @param {text} callback function
 * @return {text} JSON con las medidas del sensor
 */
routes.get('/medidas/sensor/:sensor', async (request, response) => {
    // Recibe las medidas
    const medidas = await MedidasControlador.getMedidasDeSensor(request.params.sensor);
    // Se asegura de que no haya errores
    if(!medidas) response.status(404).send(`No hay medidas para el sensor ` + request.params.sensor);
    // Devuelve la lista de medidas
    response.send(medidas);
});

/**
 * Recibe las medidas de un usuario concreto
 *
 * @param {text} URL con la id del usuario
 * @param {text} callback function
 * @return {text} JSON con las medidas del usuario
 */
routes.get('/medidas/usuario/:usuario', async (request, response) => {
    // Recibe las medidas
    const medidas = await MedidasControlador.getMedidasDeUsuario(request.params.usuario);
    // Se asegura de que no haya errores
    if(!medidas) response.status(404).send(`No hay medidas para el usuario ` + request.params.usuario);
    // Devuelve la lista de medidas
    response.send(medidas);
});

/**
 * Recibe todos los sensores de la base de datos
 *
 * @param {text} URL
 * @param {text} callback function
 * @return {text} JSON con los sensores
 */
routes.get('/sensores', async (request, response) => {
    // Recibe los sensores
    const sensores = await SensoresControlador.getTodosLosSensores();
    // Se asegura de que no haya errores
    if(!sensores) response.status(404).send(`No hay sensores`);
    // Devuelve la lista de sensores
    response.send(sensores);
});

/**
 * Recibe los sensores de un usuario concreto
 *
 * @param {text} URL con la id del usuario
 * @param {text} callback function
 * @return {text} JSON con los sensores del usuario
 */
routes.get('/sensores/usuario/:usuario', async (request, response) => {
    // Recibe las medidas
    const medidas = await SensoresControlador.getSensoresDeUsuario(request.params.usuario);
    // Se asegura de que no haya errores
    if(!medidas) response.status(404).send(`No hay sensores para el usuario ` + request.params.usuario);
    // Devuelve la lista de medidas
    response.send(medidas);
});

/**
 * Recibe todos los usuarios de la base de datos
 *
 * @param {text} URL
 * @param {text} callback function
 * @return {text} JSON con los usuarios
 */
routes.get('/usuarios', async (request, response) => {
    // Recibe los sensores
    const sensores = await UsuariosControlador.getTodosLosUsuarios();
    // Se asegura de que no haya errores
    if(!sensores) response.status(404).send(`No hay usuarios`);
    // Devuelve la lista de sensores
    response.send(sensores);
});

/**
 * Recibe un usuario segun la ID
 *
 * @param {text} URL
 * @param {text} callback function
 * @return {text} JSON con el usuario
 */
 routes.get('/usuario/:id', async (request, response) => {
    // Recibe los sensores
    const sensores = await UsuariosControlador.getUsuario(request.params.id);
    // Se asegura de que no haya errores
    if(!sensores) response.status(404).send(`No hay usuario con la ID ` + request.params.id);
    // Devuelve la lista de sensores
    response.send(sensores);
});


// -----------------------------------------------------------------
//#endregion
// -----------------------------------------------------------------
// -----------------------------------------------------------------
//#region POST
// -----------------------------------------------------------------
/**
 * Envia una medida a la base de datos para añadirla
 *
 * @param {text} URL
 * @param {text} callback function
 * @return {text} JSON con la medida enviada
 */
routes.post('/medida/:valor/:latitud/:longitud/:sensor', async (request, response) => {
        // Recibe los sensores
        const medida = await MedidasControlador.postMedida(request.params.valor, request.params.latitud, request.params.longitud, request.params.sensor);
        // Se asegura de que no haya errores
        if(!medida) response.status(404).send(`No se ha creado la medida`);
        // Devuelve la lista de sensores
        response.send(medida);
});

/**
 * Envia un usuario a la base de datos para añadirlo
 *
 * @param {text} URL
 * @param {text} callback function
 * @return {text} JSON con el usuario enviado
 */
 routes.post('/usuario/:nombre/:correo/:password', async (request, response) => {
    // Recibe los sensores
    const usuario = await UsuariosControlador.postUsuario(request);
    // Se asegura de que no haya errores
    if(!usuario) response.status(404).send(`No se ha creado el usuario`);
    // Devuelve la lista de sensores
    response.send(usuario);
});

/**
 * Envia un sensor a la base de datos para añadirlo
 *
 * @param {text} URL
 * @param {text} callback function
 * @return {text} JSON con el sensor enviado
 */
 routes.post('/sensor/:id/:latitud/:longitud/:usuario', async (request, response) => {
    // Recibe los sensores
    const sensor = await SensoresControlador.postSensor(request);
    // Se asegura de que no haya errores
    if(!sensor) response.status(404).send(`No se ha creado el sensor`);
    // Devuelve la lista de sensores
    response.send(sensor);
});

// -----------------------------------------------------------------
//#endregion
// -----------------------------------------------------------------

export default routes;