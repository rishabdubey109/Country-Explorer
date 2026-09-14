# Currency Converter

A simple currency converter web application made using HTML, CSS and JavaScript.

The application uses an online exchange rate API to get the latest available
exchange rates and convert an amount from one currency to another.

## Features

- Convert between different currencies
- Uses exchange rates from an API
- Swap currencies with one click
- Shows the current conversion rate
- Responsive design
- Works on desktop and mobile screens
- Basic error handling

## Technologies Used

- HTML
- CSS
- JavaScript
- Exchange Rate API

## How It Works

The user enters an amount and selects the currencies they want to convert.

JavaScript sends a request to the exchange rate API using the `fetch()` method.
The API returns the exchange rate in JSON format. The required rate is then
used to calculate the converted amount.

## Project Structure

currency-converter/
│
├── index.html
├── style.css
├── script.js
└── README.md
