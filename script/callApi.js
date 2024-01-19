let searchBtn = document.querySelector("#searchBtn");
let cleanBtn = document.querySelector("#cleanBtn");
let cardContainer = document.querySelector("#cardContainer");
let searchBar = document.querySelector("#country-search");
let searchBarValue = "";
let url = `https://restcountries.com/v3.1/all`;

document.addEventListener("DOMContentLoaded", () => {
  // show all countries by default
  getCountriesByName();
});

searchBar.addEventListener("keydown", (e) => {
  // call api when enter key is pressed
  if (e.key === "Enter" || e.keyCode === 13) {
    searchActivation();
    e.preventDefault();
  }
});

searchBtn.addEventListener("click", () => {
  // call api when click on the search button
  searchActivation();
});

cleanBtn.addEventListener("click", () => {
  // show all countries like default
  url = `https://restcountries.com/v3.1/all`;
  searchActivation();
});

async function getCountriesByName() {
  const response = await fetch(url);
  if (response.ok) {
    let countriesData = await response.json();
    console.log(countriesData);

    // nombre max d'affichage sur la page
    const maxDisplayCount = 30;
    let displayCount = 0;

    for (let i = 0; i < countriesData.length; i++) {
      if (countriesData[i]?.name?.common && displayCount < maxDisplayCount) {
        cardContainer.innerHTML += `<div class="card">
                    <div class="card-img">
                        <img src="${countriesData[i].flags.png}" alt="">
                    </div>
                    <div class="card-info">
                        <h1>${countriesData[i].name.common}</h1>
                        <p>Capitale : ${countriesData[i].capital}</p>
                        <p>Population : ${countriesData[
                          i
                        ].population.toLocaleString()}</p>
                    </div>
                </div>`;

        // incremente le compteur daffichages
        displayCount++;
      }
    }
  }
}

function clearHTML() {
  // avoids adding up the results of all searches
  cardContainer.innerHTML = "";
}

function searchActivation() {
  searchBarValue = searchBar.value;
  if (searchBarValue.length !== 0) {
    url = `https://restcountries.com/v3.1/name/${searchBarValue}`;
  }
  clearHTML();
  getCountriesByName();
}
