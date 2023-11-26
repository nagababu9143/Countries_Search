let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let resultCountriesEl = document.getElementById("resultCountries");
let searchInputVal = "";
let countriesList = [];
let url = "https://apis.ccbp.in/countries-data";

function createAndAppendCountry(country) {
    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-12", "col-md-6", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultCountriesEl.appendChild(countryEl);
    //flag
    let countryFlagEl = document.createElement("img");
    countryFlagEl.src = country.flag;
    countryFlagEl.classList.add("country-flag", "mt-auto", 'mb-auto');
    countryEl.appendChild(countryFlagEl);

    let countryinfoEl = document.createElement("div");
    countryEl.classList.add("ml-4", "d-flex", "flex-column");
    countryEl.appendChild(countryinfoEl);
    //name
    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = country.name;
    countryFlagEl.classList.add("country-name");
    countryinfoEl.appendChild(countryNameEl);
    //papulation
    let countryPapulationEl = document.createElement("p");
    countryPapulationEl.textContent = country.population;
    countryPapulationEl.classList.add("country-population");
    countryinfoEl.appendChild(countryPapulationEl);
}

function displaySearchResults() {
    resultCountriesEl.textContent = ""
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.includes(searchInputVal)) {
            createAndAppendCountry(country);
        }
    }
}

function getCountries() {
    let options = {
        method: "GET"

    };
    spinnerEl.classList.remove("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();

        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            countriesList = (jsonData);
            displaySearchResults();
        });
}

function onChangeSearchInput(event) {
    searchInputEl = event.target.value;
    displaySearchResults();
}

getCountries();
searchInputEl.addEventListener("keyup", onChangeSearchInput);