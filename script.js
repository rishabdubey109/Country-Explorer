const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");

const countryCard = document.getElementById("countryCard");
const loader = document.getElementById("loader");

const errorBox = document.getElementById("errorBox");
const errorMessage = document.getElementById("errorMessage");

const quickButtons = document.querySelectorAll(".quick-search");

const DATA_URL =
    "https://raw.githubusercontent.com/mledoze/countries/master/countries.json";

let countries = [];

async function loadCountries() {

    try {

        const response = await fetch(DATA_URL);

        if (!response.ok) {
            throw new Error("Unable to load country data");
        }

        countries = await response.json();

        console.log("Countries loaded:", countries.length);

    } catch (error) {

        console.error("Data loading error:", error);

        showError(
            "Unable to load country database. Please check your internet connection."
        );

    }

}

loadCountries();

searchBtn.addEventListener("click", function () {
    searchCountry();
});

countryInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchCountry();
    }

});

quickButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        countryInput.value = button.dataset.country;

        searchCountry();

    });

});


function searchCountry() {

    const searchValue =
        countryInput.value.trim().toLowerCase();


    if (searchValue === "") {

        showError("Please enter a country name.");

        return;
    }


    if (countries.length === 0) {

        showError(
            "Country data is still loading. Please try again in a moment."
        );

        return;
    }


    startLoading();

    const country = countries.find(function (item) {

        const commonName =
            item.name &&
            item.name.common
                ? item.name.common.toLowerCase()
                : "";

        const officialName =
            item.name &&
            item.name.official
                ? item.name.official.toLowerCase()
                : "";


        return (
            commonName === searchValue ||
            officialName === searchValue
        );

    });

    setTimeout(function () {

        stopLoading();


        if (!country) {

            showError(
                "Country not found. Please check the spelling and try again."
            );

            return;

        }


        displayCountry(country);

    }, 300);

}

function displayCountry(country) {

    errorBox.style.display = "none";

    document.getElementById("countryName").textContent =
        country.name.common;


    document.getElementById("officialName").textContent =
        country.name.official;

    document.getElementById("countryCode").textContent =
        country.cca3 || "";

    const flag =
        document.getElementById("flag");

    if (country.cca2) {

        flag.src =
            "https://flagcdn.com/w320/" +
            country.cca2.toLowerCase() +
            ".png";

    }

    flag.alt =
        "Flag of " + country.name.common;

    const capital =
        country.capital && country.capital.length > 0
            ? country.capital.join(", ")
            : "Not available";


    document.getElementById("capital").textContent =
        capital;

    const region =
        country.region || "Not available";


    document.getElementById("locationText").textContent =
        capital + ", " + region;

    if (country.population !== undefined) {

        document.getElementById("population").textContent =
            Number(country.population).toLocaleString();

    } else {

        document.getElementById("population").textContent =
            "Not available";

    }

    document.getElementById("currency").textContent =
        getCurrencies(country.currencies);

    document.getElementById("languages").textContent =
        getLanguages(country.languages);

    if (country.area) {

        document.getElementById("area").textContent =
            Number(country.area).toLocaleString() + " km²";

    } else {

        document.getElementById("area").textContent =
            "Not available";

    }

    document.getElementById("timezone").textContent =
        country.timezones &&
        country.timezones.length > 0
            ? country.timezones.join(", ")
            : "Not available";

    document.getElementById("continent").textContent =
        country.region || "Not available";

    document.getElementById("subregion").textContent =
        country.subregion || "Not available";

    document.getElementById("callingCode").textContent =
        getCallingCode(country.callingCode);

    document.getElementById("domain").textContent =
        country.tld && country.tld.length > 0
            ? country.tld.join(", ")
            : "Not available";

    const mapLink =
        document.getElementById("mapLink");


    const latitude =
        country.latlng &&
        country.latlng.length > 0
            ? country.latlng[0]
            : null;


    const longitude =
        country.latlng &&
        country.latlng.length > 1
            ? country.latlng[1]
            : null;


    if (latitude !== null && longitude !== null) {

        mapLink.href =
            "https://www.google.com/maps?q=" +
            latitude +
            "," +
            longitude;

        mapLink.style.display = "inline-block";

    } else {

        mapLink.style.display = "none";

    }


    countryCard.style.display = "block";

}

function getCurrencies(currencies) {

    if (!currencies) {
        return "Not available";
    }

    if (Array.isArray(currencies)) {

        if (currencies.length === 0) {
            return "Not available";
        }


        return currencies
            .map(function (currency) {

                let text =
                    currency.name || currency.code;


                if (currency.symbol) {

                    text +=
                        " (" +
                        currency.symbol +
                        ")";

                }


                return text;

            })
            .join(", ");

    }


    return "Not available";

}

function getLanguages(languages) {

    if (!languages) {
        return "Not available";
    }


    if (Array.isArray(languages)) {

        return languages
            .map(function (language) {

                return (
                    language.name ||
                    language.native ||
                    ""
                );

            })
            .filter(Boolean)
            .join(", ");

    }


    return "Not available";

}

function getCallingCode(codes) {

    if (!codes || codes.length === 0) {
        return "Not available";
    }


    return codes
        .map(function (code) {

            if (code.startsWith("+")) {
                return code;
            }

            return "+" + code;

        })
        .join(", ");

}

function startLoading() {

    errorBox.style.display = "none";
    countryCard.style.display = "none";

    loader.style.display = "block";

    searchBtn.disabled = true;

    searchBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i>';

}

function stopLoading() {

    loader.style.display = "none";

    searchBtn.disabled = false;

    searchBtn.innerHTML =
        '<span>Search</span>' +
        '<i class="fa-solid fa-arrow-right"></i>';

}

function showError(message) {

    loader.style.display = "none";
    countryCard.style.display = "none";

    errorMessage.textContent = message;

    errorBox.style.display = "flex";

}
