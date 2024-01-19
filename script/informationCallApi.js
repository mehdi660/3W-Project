const urlParams = new URLSearchParams(window.location.search)
const country = urlParams.get('country')
// console.log(country)
getSingleCountryByName(country);
let informationCard = document.querySelector("#singleCountryCard");

async function getSingleCountryByName(country) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (response.ok) {
      let countryData = await response.json();
    //   console.log(countryData)
      const currencyCode = Object.keys(countryData[0].currencies)[0];
      const currencyName = countryData[0].currencies[currencyCode].name;
      const currencySymbol = countryData[0].currencies[currencyCode].symbol;
      const languagesCode = Object.keys(countryData[0].languages)[0];
      const languageName = countryData[0].languages[languagesCode]
    //   console.log(currencyCode);
      informationCard.innerHTML = `<div class="card" data-country="${countryData[0].name.common}">
                                        <div class="card-img">
                                          <img src="${countryData[0].flags.png}" alt="">
                                          <h1>${countryData[0].name.common}</h1>
                                        </div>
                                        <div class="card-info">
                                          <p>Region: ${countryData[0].region}</p>
                                          <p>Sub region: ${countryData[0].subregion}</p>
                                          <p>Capital: ${countryData[0].capital}</p>
                                          <p>Language: ${languageName}</p>
                                          <p>Demonym: ${countryData[0].demonyms.eng.m}</p>
                                          <p>Currency: ${currencyName} (${currencySymbol})</p>
                                          <p>Population : ${countryData[0].population.toLocaleString()}</p>
                                          <p>ISO2: ${countryData[0].cca2}</p>
                                        </div>
                                    </div>`
    };
  };

  