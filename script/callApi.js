let searchBtn = document.querySelector("#searchBtn");
let countryCard = document.querySelector("#countryCard");
let searchBar = document.querySelector("#searchBar");
let searchBarValue = "";

searchBar.addEventListener('keyup', () => {
    
});

searchBtn.addEventListener('click', () => {
    getCountriesByName();
})

async function getCountriesByName() {
    searchBarValue = searchBar.value;
    let response = await fetch(`https://restcountries.com/v3.1/name/${searchBarValue}`);
    if (response.ok) {
        let countriesObject = await response.json();
        console.log(countriesObject[0].name.common);
    }
}