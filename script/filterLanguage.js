const filterBtn = document.getElementById("open-filter");
const filtersSection = document.querySelector(".filters");
const languageSelect = document.getElementById("select");

function clearHTML() {
  cardContainer.innerHTML = "";
}

filterBtn.addEventListener("click", () => {
  filtersSection.classList.toggle("hidden");

  if (filtersSection.classList.contains("hidden")) {
    filterBtn.textContent = "Open Filters";
  } else {
    filterBtn.textContent = "Close Filters";
  }
});

async function getLanguage() {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  if (response.ok) {
    let languageData = await response.json();
    const languages = extractLanguages(languageData);
    populateLanguageSelect(languages);
  }
}

function extractLanguages(data) {
  const languages = new Set();

  data.forEach((country) => {
    const countryLanguages = country.languages;
    if (countryLanguages) {
      Object.keys(countryLanguages).forEach((langCode) => {
        languages.add(countryLanguages[langCode]);
      });
    }
  });

  return Array.from(languages);
}

function populateLanguageSelect(languages) {
  const selectElement = document.getElementById("select");

  selectElement.innerHTML =
    '<option value="">Please choose a language</option>';

  languages.sort();

  languages.forEach((language) => {
    const option = document.createElement("option");
    option.value = language;
    option.textContent = language;
    selectElement.appendChild(option);
  });
}

languageSelect.addEventListener("change", () => {
  const selectedLanguage = languageSelect.value;
  const apiUrl = selectedLanguage
    ? `https://restcountries.com/v3.1/lang/${selectedLanguage}`
    : "https://restcountries.com/v3.1/all";

  clearHTML();

  getCountriesByLanguage(apiUrl);
});

async function getCountriesByLanguage(url) {
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

getLanguage();
