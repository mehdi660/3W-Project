let countryCard = document.querySelector("#countryCard");
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
  // show all countries by default
  getCountriesByName();

  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");

  prevPageBtn.addEventListener("click", prevPage);
  nextPageBtn.addEventListener("click", nextPage);
});

if (window.location.pathname.includes("/homepage.html")) {
  searchBar.addEventListener("keydown", (e) => {
    // call api when enter key is pressed
    if (e.key === "Enter" || e.keyCode === 13) {
      searchActivation(searchBar.value);
      e.preventDefault();
    }
  });

  searchBtn.addEventListener("click", (e) => {
    // call api when click on the search button
    searchActivation(searchBar.value);
    e.preventDefault();
  });

  cleanBtn.addEventListener("click", () => {
    // show all countries like default
    url = `https://restcountries.com/v3.1/all`;
    let blank = "";
    searchActivation(blank);
  });
}

async function getCountriesByName() {
  if (window.location.pathname.includes("/homepage.html")) {
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
    addClickOnCard();
  }
}

var countryName;
function addClickOnCard() {
  return new Promise((resolve) => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", async () => {
        countryName = await card.getAttribute("data-country");
        window.location.href = `information.html?country=${countryName}`;
        resolve(countryName);
        console.log(countryName);
      });
    });
  });
}

function clearHTML() {
  // Avoids adding up the results of all searches
  cardContainer.innerHTML = "";
}

function searchActivation(value) {
  searchBarValue = value;
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
      cardContainer.innerHTML += `<div class="card" data-country="${
        countries[i].name.common
      }">
                                <div class="card-img">
                                <img src="${countries[i].flags.png}" alt="">
                                </div>
                                <div class="card-info">
                                <h1>${countries[i].name.common}</h1>
                                <p>Capitale : ${countries[i].capital}</p>
                                <p>Population : ${countries[
                                  i
                                ].population.toLocaleString()}</p>
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
