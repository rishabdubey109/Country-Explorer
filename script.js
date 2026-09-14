const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");

const result = document.getElementById("result");
const rateText = document.getElementById("rate");
const errorText = document.getElementById("error");


convertBtn.addEventListener("click", convertCurrency);


swapBtn.addEventListener("click", function () {

    let temp = fromCurrency.value;

    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    if (amountInput.value) {
        convertCurrency();
    }
});


async function convertCurrency() {

    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    errorText.textContent = "";
    rateText.textContent = "";

    if (!amount || amount <= 0) {
        result.textContent = "Please enter a valid amount";
        return;
    }

    if (from === to) {
        result.textContent = amount.toFixed(2) + " " + to;
        rateText.textContent = "1 " + from + " = 1 " + to;
        return;
    }

    result.textContent = "Converting...";

    try {

        const response = await fetch(
            `https://open.er-api.com/v6/latest/${from}`
        );

        if (!response.ok) {
            throw new Error("Unable to get exchange rate");
        }

        const data = await response.json();

        const exchangeRate = data.rates[to];

        if (!exchangeRate) {
            throw new Error("Currency not supported");
        }

        const convertedAmount = amount * exchangeRate;

        result.textContent =
            convertedAmount.toFixed(2) + " " + to;

        rateText.textContent =
            "1 " + from + " = " + exchangeRate.toFixed(4) + " " + to;

    } catch (error) {

        result.textContent = "Conversion failed";
        errorText.textContent =
            "Unable to fetch exchange rates. Please try again.";

        console.log(error);
    }
}