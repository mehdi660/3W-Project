let countryCard = document.querySelector("#countryCard");
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
        const response = await fetch(url);

        if (response.ok) {
            let countriesData = await response.json();
            // console.log(countriesData);

            const maxDisplayCount = 30;
            let displayCount = 0;
            
            for (let i = 0; i < countriesData.length; i++) {
                if (countriesData[i]?.name?.common && displayCount < maxDisplayCount) {
                    cardContainer.innerHTML += `<div class="card" data-country="${
                        countriesData[i].name.common
                    }">
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
                  // incremente le compteur d'affichage
                  displayCount++;
                }
            }
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
                console.log(countryName)

            });
        });
    });
}

function clearHTML() {
    // avoids adding up the results of all searches
    cardContainer.innerHTML = "";
}

function searchActivation(value) {
    searchBarValue = value;
    if (searchBarValue.length !== 0) {
        url = `https://restcountries.com/v3.1/name/${searchBarValue}`;
    }
    clearHTML();
    getCountriesByName();
}
