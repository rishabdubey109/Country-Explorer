# 🌍 Country Explorer

Country Explorer is a simple web application that allows users to search for a country and view useful information about it.

The application gets real-time country data using the REST Countries API.

## 📌 About the Project

I created this project to practice working with APIs and JavaScript.

A user can enter the name of a country in the search box. The application sends a request to the REST Countries API and displays the country's information on the page.

## ✨ Features

- Search country by name
- Country flag
- Official country name
- Capital city
- Population
- Region
- Subregion
- Currency
- Languages
- Google Maps link
- Error message for invalid country
- Loading animation
- Responsive design

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- REST Countries API
- Font Awesome

## 🌐 API Used

This project uses the REST Countries API:

https://restcountries.com/

Example endpoint:

```text
https://restcountries.com/v3.1/name/India?fullText=true
```

## 📂 Project Structure

```text
country-info-finder/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 How to Run the Project

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a web browser.
4. Enter a country name in the search box.
5. Click the Search button.

An internet connection is required because country information is fetched from an external API.

## 💡 How It Works

1. User enters a country name.
2. JavaScript reads the input.
3. `fetch()` sends a request to the REST Countries API.
4. The API returns country information in JSON format.
5. JavaScript extracts the required information.
6. The information is displayed dynamically on the webpage.

## 📱 Responsive Design

The website is designed to work on both desktop and mobile screen sizes.

## 📸 Screenshot

Add a screenshot of the project here after running it.

```text
screenshots/home.png
```

## 🔮 Future Improvements

Some features that can be added in the future:

- Dark mode
- Search suggestions
- Border country information
- Weather information
- Country comparison
- Search history

## 👨‍💻 Author

Rishab Dubey

## 📄 License

This project is created for educational purposes.
