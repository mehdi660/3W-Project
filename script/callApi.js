let searchBtn = document.querySelector("#searchBtn");
let cleanBtn = document.querySelector("#cleanBtn");
let cardContainer = document.querySelector("#cardContainer");
let searchBar = document.querySelector("#country-search");
let searchBarValue = "";
let url = `https://restcountries.com/v3.1/all`;
let totalCountries = 0; // Variable pour stocker le nombre total de pays

// Pagination
let currentPage = 1;
const countriesPerPage = 10; // Nombre de pays à afficher par page

document.addEventListener("DOMContentLoaded", () => {
  getCountriesByName();
});

searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    searchActivation();
    e.preventDefault();
  }
});

searchBtn.addEventListener("click", () => {
  currentPage = 1; // Revenir à la première page lors de la recherche
  searchActivation();
  e.preventDefault();
});

cleanBtn.addEventListener("click", () => {
  url = `https://restcountries.com/v3.1/all`;
  searchActivation();
  e.preventDefault();
});

async function getCountriesByName() {
  const startIdx = (currentPage - 1) * countriesPerPage;
  const endIdx = startIdx + countriesPerPage;

  const response = await fetch(url);
  if (response.ok) {
    let countriesData = await response.json();
    totalCountries = countriesData.length; // Mise à jour du nombre total de pays
    const displayedCountries = countriesData.slice(startIdx, endIdx);

    clearHTML();
    displayCountries(displayedCountries);
    updatePagination();
  }
}

function clearHTML() {
  cardContainer.innerHTML = "";
}

function searchActivation() {
  searchBarValue = searchBar.value;
  if (searchBarValue.length !== 0) {
    url = `https://restcountries.com/v3.1/name/${searchBarValue}`;
  } else {
    url = `https://restcountries.com/v3.1/all`;
  }
  currentPage = 1; // Revenir à la première page après une recherche ou une réinitialisation
  getCountriesByName();
}

function displayCountries(countries) {
  for (let i = 0; i < countries.length; i++) {
    if (countries[i]?.name?.common) {
      cardContainer.innerHTML += `<div class="card">
        <div class="card-img">
          <img src="${countries[i].flags.png}" alt="">
        </div>
        <div class="card-info">
          <h1>${countries[i].name.common}</h1>
          <p>Capitale : ${countries[i].capital}</p>
          <p>Population : ${countries[i].population.toLocaleString()}</p>
        </div>
      </div>`;
    }
  }
}

function updatePagination() {
  const totalPages = Math.ceil(totalCountries / countriesPerPage);
  document.getElementById(
    "currentPage"
  ).textContent = `Page ${currentPage} sur ${totalPages}`;

  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    getCountriesByName();
  }
}

function nextPage() {
  const totalPages = Math.ceil(totalCountries / countriesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    getCountriesByName();
  }
}
