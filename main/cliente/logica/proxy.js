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