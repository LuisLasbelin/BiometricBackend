import { request } from 'chai';
import { Router } from 'express';
import MedidasControlador from '../controladores/medidasControlador.js';
const routes = Router();
// -----------------------------------------------------------------
//#region Test
// -----------------------------------------------------------------
routes.get('/test', MedidasControlador.getTodasLasMedidasTest);
routes.get('/test/:id', MedidasControlador.getUnaMedidaTest);
// -----------------------------------------------------------------
//#endregion
// -----------------------------------------------------------------
routes.get('/medidas', async (request, response) => {
    // Recibe las medidas
    const medidas = await MedidasControlador.getTodasLasMedidas();
    // Se asegura de que no haya errores
    if(!medidas) response.status(404).send(`No hay medidas`);
    // Devuelve la lista de medidas
    response.send(medidas);
});

export default routes;