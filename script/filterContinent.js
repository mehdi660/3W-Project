const radioBtn = document.querySelectorAll('input[type="radio"]');
console.log(radioBtn);

function clearHTML() {
  cardContainer.innerHTML = "";
}

// Example in getRegion() function in filterContinent.js
async function getRegion() {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    if (response.ok) {
      await response.json();
    } else {
      console.error("Failed to fetch region data");
    }
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

radioBtn.forEach((radioBtn) => {
  radioBtn.addEventListener("click", () => {
    const radioSelected = radioBtn.value;
    const apiUrl = radioSelected
      ? `https://restcountries.com/v3.1/region/${radioSelected}`
      : "https://restcountries.com/v3.1/all";

    clearHTML();

    getCountriesByRegion(apiUrl);
  });
});

async function getCountriesByRegion(url) {
  const response = await fetch(url);
  if (response.ok) {
    let regionData = await response.json();
    console.log(regionData);
    for (let i = 0; i < regionData.length; i++) {
      if (regionData[i]?.name?.common) {
        cardContainer.innerHTML += `<div class="card">
          <div class="card-img">
            <img src="${regionData[i].flags.png}" alt="">
          </div>
          <div class="card-info">
            <h1>${regionData[i].name.common}</h1>
            <p>Capitale : ${regionData[i].capital}</p>
            <p>Population : ${regionData[i].population.toLocaleString()}</p>
          </div>
        </div>`;
      }
    }
  }
}

getRegion();
