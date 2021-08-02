// URL API
const API = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

// Obtener los resultados de la API
const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      pokeData(json.results), paginacion(json.next, json.previous);
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
};

// const pokedata
const pokeData = (data) => {
  let html = "";
  document.getElementById("datosPokemons").innerHTML = "";
  data.forEach((pk) => {
    const URL = pk.url;
    return fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        llenarDatos(json, html);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  });
};

// Dibujar cards de Pokemons
const llenarDatos = (data, html) => {
  html += '<div class="col mt-5">';
  html += '<div class="card" style="width: 15rem;">';
  html += `<img src="${data.sprites.other.dream_world.front_default}" class="card-img-top" alt="${data.name}"></img>`;
  html += '<div class="card-body">';
  html += `<h5 class="card-title">${data.name}</h5>`;
  html += `<h5 class="card-title">${data.weight}</h5>`;
  html += `<h5 class="card-title">${data.height}</h5>`;
  html += "</div>";
  html += "</div>";
  html += "</div>";
  document.getElementById("datosPokemons").innerHTML += html;
};

// Paginacion
const paginacion = (next, previous) => {
  let prevDisabled = "";
  let nextDisabled = "";

  let html = `<li class="page-item ${
    previous == null ? (prevDisabled = "disabled") : (prevDisabled = "")
  }"><a class="page-link" onclick="getData('${previous}')">Previous</a></li> <li class="page-item ${
    next == null ? (nextDisabled = "disabled") : (nextDisabled = "")
  }"><a class="page-link" onclick="getData('${next}')">Next</a></li>`;

  document.getElementById("paginacion").innerHTML = html;
};

// Se ejecuta la API
getData(API);
