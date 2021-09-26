const url = new URL("http://localhost:3000")

// --------------------------------------------------------------
//#region GET
// --------------------------------------------------------------

async function getMedidasDeSensor() {
    const sensor = document.getElementById("sensorNumero").value;

    fetch(url + `api/medidas/sensor/` +  sensor, {method: 'GET'})
    .then(response => {
        if (response.ok) {
          response.json()
          .then(json => {
              // Tomamos los datos y convertimos a un objeto Medida
              document.getElementById("cuerpo").innerHTML = JSON.stringify(json);
          });
        } else {
          document.getElementById("cuerpo").innerHTML = "Error 404";
        }
      });
}

async function getMedidasDeUsuario() {
  const usuario = document.getElementById("usuario").value;

  fetch(url + `api/medidas/usuario/` +  usuario, {method: 'GET'})
  .then(response => {
      if (response.ok) {
        response.json()
        .then(json => {
            // Tomamos los datos y convertimos a un objeto Medida
            document.getElementById("cuerpo").innerHTML = JSON.stringify(json);
        });
      } else {
        document.getElementById("cuerpo").innerHTML = "Error 404";
      }
    });
}

async function getSensoresDeUsuario() {
  const usuario = document.getElementById("usuario").value;

  fetch(url + `api/sensores/usuario/` +  usuario, {method: 'GET'})
  .then(response => {
      if (response.ok) {
        response.json()
        .then(json => {
            // Tomamos los datos y convertimos a un objeto Medida
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

async function postMedida() {
  const sensor = document.getElementById("sensorNumero").value;
  const latitud = document.getElementById("latitud").value;
  const longitud = document.getElementById("longitud").value;
  const valor = document.getElementById("valor").value;

  fetch(url + `api/medida/` + valor + "/" + latitud + "/" + longitud + "/" + sensor, {method: 'POST'})
  .then(response => {
      if (response.ok) {
        response.json()
        .then(json => {
            // Tomamos los datos y convertimos a un objeto Medida
            document.getElementById("cuerpo").innerHTML = JSON.stringify(json);
        });
      } else {
        document.getElementById("cuerpo").innerHTML = "Error 404";
      }
    });
}

async function postUsuario() {
  const usuario = document.getElementById("usuario").value;
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  fetch(url + `api/usuario/` + usuario + "/" + correo + "/" + password, {method: 'POST'})
  .then(response => {
      if (response.ok) {
        response.json()
        .then(json => {
            // Tomamos los datos y convertimos a un objeto Medida
            document.getElementById("cuerpo").innerHTML = JSON.stringify(json);
        });
      } else {
        document.getElementById("cuerpo").innerHTML = "Error 404";
      }
    });
}

async function postSensor() {
  const usuario = document.getElementById("usuario").value;
  const latitud = document.getElementById("latitud").value;
  const longitud = document.getElementById("longitud").value;

  fetch(url + `api/sensor/` + latitud + "/" + longitud + "/" + usuario, {method: 'POST'})
  .then(response => {
      if (response.ok) {
        response.json()
        .then(json => {
            // Tomamos los datos y convertimos a un objeto Medida
            document.getElementById("cuerpo").innerHTML = JSON.stringify(json);
        });
      } else {
        document.getElementById("cuerpo").innerHTML = "Error 404";
      }
    });
}


/*
* Login()
*/
async function Login() {
  const correo = document.getElementById("correo").value;
  const pass = document.getElementById("password").value;
  
  fetch(url + `api/auth/` + correo +"/"+ pass, {method: 'POST'})
  .then(response => {
      if (response.ok) {
        response.json()
        .then(json => {
            // Tomamos los datos y convertimos a un objeto Medida
            document.getElementById("cuerpo").innerHTML = JSON.stringify(json);
        });
      } else {
        document.getElementById("cuerpo").innerHTML = "Error 404";
      }
    });
}

//#endregion