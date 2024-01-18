let searchBtn = document.querySelector("#searchBtn");
let countryCard = document.querySelector("#countryCard");
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
    e.preventDefault();
});

async function getCountriesByName() {
  const response = await fetch(url);
  if (response.ok) {
    let countriesData = await response.json();
    console.log(countriesData);
    for (let i = 0; i < countriesData.length; i++) {
      if (countriesData[i]?.name?.common) {
        cardContainer.innerHTML += `<div class="card">
                                                <div class="card-img">
                                                <img src="${countriesData[i].flags.png}" alt="">
                                                </div>
                                                <div class="card-info">
                                                <h1>${countriesData[i].name.common}</h1>
                                                <p>Capitale : ${countriesData[i].capital}</p>
                                                <p>Population : ${countriesData[i].population.toLocaleString()}</p>
                                                </div>
                                            </div>`;
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