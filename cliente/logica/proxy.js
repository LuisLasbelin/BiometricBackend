const url = new URL("http://localhost:3000/")

// --------------------------------------------------------------
//#region Mapa
// --------------------------------------------------------------
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0]
      },
      properties: {
        title: 'Mapbox',
        description: 'Prueba'
      }
    },
  ]
};

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-96, 37.8],
  zoom: 3
});

class mapControl {
    static addMarkers(geojson) {
        // add markers to map
        for (const { geometry, properties } of geojson.features) {
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.className = 'marker';
    
            // make a marker for each feature and add to the map with popup
            new mapboxgl.Marker(el)
            .setLngLat(geometry.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`<h3>${properties.title}</h3><p>${properties.description}</p>`)
            )
            .addTo(map);
          }
          
    }
};
// --------------------------------------------------------------
//#endregion
// --------------------------------------------------------------
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
            // Tomamos los datos y convertimos a un objeto Medida
            json.forEach(medida => {
              geojson.features.push({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [parseInt(medida.Latitud), parseInt(medida.Longitud)]
                },
                properties: {
                  title: 'Valor',
                  description: medida.Valor,
                }
              })
            });
            
        mapControl.addMarkers(geojson);
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