// -----------------------------------------------------------------
// Autor: Luis Belloch
// Descripcion: Almacena las URL para hacer fetch de la API
// Creado: 06/10/2021
// Estado: WIP
// -----------------------------------------------------------------

import { Router } from 'express';
import MedidasControlador from '../controladores/medidasControlador.js';
import SensoresControlador from '../controladores/SensoresControlador.js';
import UsuariosControlador from '../controladores/UsuariosControlador.js';
const routes = Router();
// -----------------------------------------------------------------
//#region Test
// -----------------------------------------------------------------
/**
 * Recibe todas las medidas de la base de datos falsa
 *
 * @param {text} URL
 * @param {text} callback function
 * @return {text} JSON con las medidas
 */
routes.get('/test', MedidasControlador.getTodasLasMedidasTest);
/**
 * Recibe una medida de la base de datos falsa
 *
 * @param {text} URL
 * @param {text} callback function
 * @return {text} JSON con la medida
 */
routes.get('/test/:id', MedidasControlador.getUnaMedidaTest);
// -----------------------------------------------------------------
//#endregion
// -----------------------------------------------------------------
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
    if(!medidas) response.status(404).send(`No hay medidas`);
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
    if(!medidas) response.status(404).send(`No hay medidas`);
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
    if(!medidas) response.status(404).send(`No hay medidas`);
    // Devuelve la lista de medidas
    response.send(medidas);
});

/**
 * Recibe todos los sensores de la base de datos
 *
 * @param {text} URL
 * @param {text} callback function
 * @return {text} JSON con los usuario
 */
routes.get('/usuarios', async (request, response) => {
    // Recibe los sensores
    const sensores = await UsuariosControlador.getTodosLosUsuarios();
    // Se asegura de que no haya errores
    if(!sensores) response.status(404).send(`No hay sensores`);
    // Devuelve la lista de sensores
    response.send(sensores);
});


// -----------------------------------------------------------------
//#endregion
// -----------------------------------------------------------------

export default routes;