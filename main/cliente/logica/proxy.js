const url = new URL("http://localhost:3000")

async function getMedidasDeSensor() {
    const sensor = document.getElementById("sensorNumero").value;

    fetch(url + `api/medidas/` +  sensor, {method: 'GET'})
    .then(response => {
        if (response.ok) {
          response.json()
          .then(json => {
              // Tomamos los datos y convertimos a un objeto Medida
              document.getElementById("cuerpo").innerHTML = JSON.stringify(json);
          });
        }
      });
}

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
      }
    });
}