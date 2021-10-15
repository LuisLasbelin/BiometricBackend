// -----------------------------------------------------------------
// Autor: Luis Belloch
// Descripcion: Logica del negocio del cliente para contactar a la API
// Creado: 14/10/2021
// -----------------------------------------------------------------


import mapControl from "./mapControl";
const url = new URL("http://localhost:3000/")

// --------------------------------------------------------------
//#region GET
// --------------------------------------------------------------
/**
 * Recibe las medidas de la base de datos
 *
 * @return {text} JSON con todas las medidas
 */
async function getMedidas() {

  fetch(url + `medidas`, {method: 'GET'})
  .then(response => {
      if (response.ok) {
        response.json()
        .then(json => {
          mapControl.addMarkers(json);
        });
        
      } else {
        document.getElementById("cuerpo").innerHTML = "Error 404";
      }
    });
}

/**
 * Recibe las medidas de la base de datos
 *
 * @return {text} JSON con todas las medidas
 */
async function getMedidasDeSensor() {
    const sensor = document.getElementById("sensorNumero").value;

    fetch(url + `medidas/sensor/` +  sensor, {method: 'GET'})
    .then(response => {
        if (response.ok) {
          response.json()
          .then(json => {
              document.getElementById("cuerpo").innerHTML = JSON.stringify(json);
          });
        } else {
          document.getElementById("cuerpo").innerHTML = "Error 404";
        }
      });
}

/**
 * Recibe las medidas de la base de datos
 *
 * @return {text} JSON con todas las medidas
 */
async function getMedidasDeUsuario() {
  const usuario = document.getElementById("usuario").value;

  fetch(url + `medidas/usuario/` +  usuario, {method: 'GET'})
  .then(response => {
      if (response.ok) {
        response.json()
        .then(json => {
            document.getElementById("cuerpo").innerHTML = JSON.stringify(json);
        });
      } else {
        document.getElementById("cuerpo").innerHTML = "Error 404";
      }
    });
}

/**
 * Recibe las medidas de la base de datos
 *
 * @return {text} JSON con todas las medidas
 */
async function getSensoresDeUsuario() {
  const usuario = document.getElementById("usuario").value;

  fetch(url + `sensores/usuario/` +  usuario, {method: 'GET'})
  .then(response => {
      if (response.ok) {
        response.json()
        .then(json => {
            document.getElementById("cuerpo").innerHTML = JSON.stringify(json);
        });
      } else {
        document.getElementById("cuerpo").innerHTML = "Error 404";
      }
    });
}

//#endregion

// --------------------------------------------------------------
//#region POST
// --------------------------------------------------------------

/**
 * Recibe las medidas de la base de datos
 *
 * @return {text} JSON con todas las medidas
 */
async function postMedida() {
  const sensor = document.getElementById("sensorNumero").value;
  const latitud = document.getElementById("latitud").value;
  const longitud = document.getElementById("longitud").value;
  const valor = document.getElementById("valor").value;

  fetch(url + `medida/` + valor + "/" + latitud + "/" + longitud + "/" + sensor, {method: 'POST'})
  .then(response => {
      if (response.ok) {
        response.json()
        .then(json => {
            document.getElementById("cuerpo").innerHTML = JSON.stringify(json);
        });
      } else {
        document.getElementById("cuerpo").innerHTML = "Error 404";
      }
    });
}

/**
 * Recibe las medidas de la base de datos
 *
 * @return {text} JSON con todas las medidas
 */
async function postUsuario() {
  const usuario = document.getElementById("usuario").value;
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  fetch(url + `usuario/` + usuario + "/" + correo + "/" + password, {method: 'POST'})
  .then(response => {
      if (response.ok) {
        response.json()
        .then(json => {
            document.getElementById("cuerpo").innerHTML = JSON.stringify(json);
        });
      } else {
        document.getElementById("cuerpo").innerHTML = "Error 404";
      }
    });
}

/**
 * Recibe las medidas de la base de datos
 *
 * @return {text} JSON con todas las medidas
 */
async function postSensor() {
  const usuario = document.getElementById("usuario").value;
  const latitud = document.getElementById("latitud").value;
  const longitud = document.getElementById("longitud").value;

  fetch(url + `sensor/` + latitud + "/" + longitud + "/" + usuario, {method: 'POST'})
  .then(response => {
      if (response.ok) {
        response.json()
        .then(json => {
            document.getElementById("cuerpo").innerHTML = JSON.stringify(json);
        });
      } else {
        document.getElementById("cuerpo").innerHTML = "Error 404";
      }
    });
}

//#endregion