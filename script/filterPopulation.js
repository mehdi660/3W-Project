// Sélectionnez les éléments HTML nécessaires

const selectPopulationMin = document.getElementById("population-min");
const selectPopulationMax = document.getElementById("population-max");

// effacer le contenu HTML de la card
function clearHTML() {
  cardContainer.innerHTML = "";
}

async function getCountriesByPopulation(minPopulation, maxPopulation) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    if (response.ok) {
      const allCountries = await response.json();
      // filtrage  des pays en fonction de la population
      const filteredCountries = allCountries.filter(
        (country) =>
          country.population >= minPopulation &&
          country.population <= maxPopulation
      );
      // affichage des pays filtrés
      displayCountries(filteredCountries);
    } else {
      console.error("Failed to fetch population data");
    }
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

function displayCountries(countries) {
  clearHTML();
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
// écouteurs d'event pour les changements dans les champs de population min et max
selectPopulationMin.addEventListener("input", () => {
  filterCountriesByPopulation();
});

selectPopulationMax.addEventListener("input", () => {
  filterCountriesByPopulation();
});
// fonction pour filtrer les pays en fonction des valeurs de population min et max
function filterCountriesByPopulation() {
  const minPopulation = parseInt(selectPopulationMin.value, 10) || 0;
  const maxPopulation = parseInt(selectPopulationMax.value, 10) || Infinity;

  getCountriesByPopulation(minPopulation, maxPopulation);
}
