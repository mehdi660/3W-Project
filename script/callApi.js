let searchBtn = document.querySelector("#searchBtn");
let countryCard = document.querySelector("#countryCard");
let cardContainer = document.querySelector("#cardContainer");
let searchBar = document.querySelector("#country-search");
let searchBarValue = "";

searchBar.addEventListener("keyup", () => {
  clearHTML();
  getCountriesByName();
});

// searchBtn.addEventListener('click', () => {
//     getCountriesByName();
// });

async function getCountriesByName() {
  searchBarValue = searchBar.value;
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${searchBarValue}`
  );
  if (response.ok) {
    let countriesData = await response.json();
    console.log(countriesData);
    for (let i = 0; i < 12; i++) {
      if (countriesData[i]?.name?.common) {
        cardContainer.innerHTML += `<div class="card">
                                                <div class="card-img">
                                                <img src="${
                                                  countriesData[i].flags.png
                                                }" alt="">
                                                </div>
                                                <div class="card-info">
                                                <h1>${
                                                  countriesData[i].name.common
                                                }</h1>
                                                <p>Capitale : ${
                                                  countriesData[i].capital
                                                }</p>
                                                <p>Population : ${countriesData[
                                                  i
                                                ].population.toLocaleString()}</p>
                                                </div>
                                            </div>`;
      }
    }
  }
}

function clearHTML() {
  // évite l'addition des résultats de toutes les recherches
  cardContainer.innerHTML = "";
}
