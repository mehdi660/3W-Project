let searchBtn = document.querySelector("#searchBtn");
let countryCard = document.querySelector("#countryCard");
let cardContainer = document.querySelector("#cardContainer")
let searchBar = document.querySelector("#country-search");
let searchBarValue = "";

searchBar.addEventListener('keyup', () => {
    clearHTML();
    getCountriesByName();
});

// searchBtn.addEventListener('click', () => {
//     getCountriesByName();
// });

async function getCountriesByName() {
    searchBarValue = searchBar.value;
    const response = await fetch(`https://restcountries.com/v3.1/name/${searchBarValue}`);
    if (response.ok) {
        let countriesData = await response.json();
        console.log(countriesData);
        for (let i = 0; i < 10; i++) {
            if (countriesData[i]?.name?.common) {
                cardContainer.innerHTML += `<div>
                                            <p>Nom: ${countriesData[i].name.common}</p>
                                        </div>`
            }
        }
    }
}

function clearHTML() {
    // évite l'addition des résultats de toutes les recherches
    cardContainer.innerHTML = '';
}