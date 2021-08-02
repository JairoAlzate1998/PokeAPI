// URL API
const API = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

// Obtener los resultados de la API
const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      llenarDatos(json.results), paginacion(json.next, json.previous);
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
};

// Dibujar cards de personajes
const llenarDatos = (data) => {
  let html = "";
  data.forEach((pj) => {
    html += '<div class="col mt-5">';
    html += '<div class="card" style="width: 15rem;">';
    html += '<div class="card-body">';
    html += `<h5 class="card-title">${pj.name}</h5>`;
    html += "</div>";
    html += "</div>";
    html += "</div>";
  });
  document.getElementById("datosPersonajes").innerHTML = html;
};

// Paginacion
const paginacion = (next, previous) => {
    let prevDisabled = "";
    let nextDisabled = "";

    let html = `<li class="page-item ${previous == null ? prevDisabled = "disabled" : prevDisabled = "" }"><a class="page-link" onclick="getData('${previous}')">Previous</a></li> <li class="page-item ${next == null ? nextDisabled = "disabled" : nextDisabled = "" }"><a class="page-link" onclick="getData('${next}')">Next</a></li>`;

    document.getElementById("paginacion").innerHTML = html;
};

// Se ejecuta la API
getData(API);
