const filterBtn = document.getElementById("open-filter");
const filtersSection = document.querySelector(".filters");
const languageSelect = document.getElementById("select");

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

  languages.forEach((language) => {
    const option = document.createElement("option");
    option.value = language;
    option.textContent = language;
    selectElement.appendChild(option);
  });
}

getLanguage();
