const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-button');

const locationElement = document.querySelector('.city-name');
const weatherElement = document.querySelector('.weather');
const temperatureElement = document.querySelector('.temperature');
const weatherIcon = document.querySelector('.weather-icon');
const rainElement = document.querySelector('.rain');

const weatherDay1 = document.querySelector('.weather-day1');
const weatherDay2 = document.querySelector('.weather-day2');
const weatherDay3 = document.querySelector('.weather-day3');

const temperatureDay1 = document.querySelector('.temperature-day1');
const temperatureDay2 = document.querySelector('.temperature-day2');
const temperatureDay3 = document.querySelector('.temperature-day3');

const weatherIconDay1 = document.querySelector('.weather-icon-day1');
const weatherIconDay2 = document.querySelector('.weather-icon-day2');
const weatherIconDay3 = document.querySelector('.weather-icon-day3');

const dayElements = document.querySelectorAll('.day');
const API_KEY = '7526f720c6a5461c8ef101027242103';

async function searchCity(city = 'Delhi') {
  try {
    const response = await fetch(
      `
          https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&lang=en
          `,
    );
    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    console.error(error);
  }
}

searchBar.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    searchCity(e.target.value);
  }
});

searchBtn.addEventListener('click', () => {
  if (searchBar.value) {
    searchCity(searchBar.value);
  }

  searchBar.classList.toggle('active');
  if (searchBar.classList.contains('active')) {
    searchBar.focus();
  } else {
    searchBar.blur();
  }
});
