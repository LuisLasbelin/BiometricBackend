// -----------------------------------------------------------------
// Autor: Luis Belloch
// Descripcion: Logica del negocio del cliente para contactar a la API
// Creado: 14/10/2021
// -----------------------------------------------------------------

import mapControl from "./mapControl";
// "http://localhost:3000/" Por defecto
const url = new URL("http://localhost:8000/")

// --------------------------------------------------------------
//#region get
// --------------------------------------------------------------
/**
 * Recibe las medidas de la base de datos
 *
 * @return {text} JSON con todas las medidas
 */
async function obtenerTodasLasMedidas() {

  fetch(url + `medidas`, {method: 'get'})
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
async function obtenerMedidasDeSensor() {
    const sensor = document.getElementById("sensorNumero").value;

    fetch(url + `medidas/sensor/` +  sensor, {method: 'get'})
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
async function obtenerMedidasDeUsuario() {
  const usuario = document.getElementById("usuario").value;

  fetch(url + `medidas/usuario/` +  usuario, {method: 'get'})
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
async function obtenerSensoresDeUsuario() {
  const usuario = document.getElementById("usuario").value;

  fetch(url + `sensores/usuario/` +  usuario, {method: 'get'})
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
//#region guardar
// --------------------------------------------------------------

/**
 * Recibe las medidas de la base de datos
 *
 * @return {text} JSON con todas las medidas
 */
async function guardarMedida() {
  const sensor = document.getElementById("sensorNumero").value;
  const latitud = document.getElementById("latitud").value;
  const longitud = document.getElementById("longitud").value;
  const valor = document.getElementById("valor").value;

  fetch(url + `medida/` + valor + "/" + latitud + "/" + longitud + "/" + sensor, {method: 'post'})
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
async function guardarUsuario() {
  const usuario = document.getElementById("usuario").value;
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  fetch(url + `usuario/` + usuario + "/" + correo + "/" + password, {method: 'post'})
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
async function guardarSensor() {
  const usuario = document.getElementById("usuario").value;
  const latitud = document.getElementById("latitud").value;
  const longitud = document.getElementById("longitud").value;

  fetch(url + `sensor/` + latitud + "/" + longitud + "/" + usuario, {method: 'post'})
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