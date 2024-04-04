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

function isGoingToRain(forecastday) {
  if (forecastday[0].day.totalprecip_mm > 0) {
    rainElement.textContent = 'Be ready for rain';
  } else {
    rainElement.textContent = 'No rain!';
  }
}

function displayForecast(forecastday) {
  console.log(forecastday);
  dayElements.forEach((day, index) => {
    if (index === 0) {
      let day = forecastday[index].date;
      day = day.split('-');
      day = `${day[2]}/${day[1]}`;
      dayElements[index].textContent = day;

      weatherDay1.textContent = forecastday[index].day.condition.text;
      temperatureDay1.textContent = `${forecastday[index].day.maxtemp_c}°C`;
      weatherIconDay1.src = `http:${forecastday[index].day.condition.icon}`;
      weatherIconDay1.alt = forecastday[index].day.condition.text;
    } else if (index === 1) {
      let day = forecastday[index].date;
      day = day.split('-');
      day = `${day[2]}/${day[1]}`;
      dayElements[index].textContent = day;

      weatherDay2.textContent = forecastday[index].day.condition.text;
      temperatureDay2.textContent = `${forecastday[index].day.maxtemp_c}°C`;
      weatherIconDay2.src = `http:${forecastday[index].day.condition.icon}`;
      weatherIconDay2.alt = forecastday[index].day.condition.text;
    } else if (index === 2) {
      let day = forecastday[index].date;
      day = day.split('-');
      day = `${day[2]}/${day[1]}`;
      dayElements[index].textContent = day;

      weatherDay3.textContent = forecastday[index].day.condition.text;
      temperatureDay3.textContent = `${forecastday[index].day.maxtemp_c}°C`;
      weatherIconDay3.src = `http:${forecastday[index].day.condition.icon}`;
      weatherIconDay3.alt = forecastday[index].day.condition.text;
    }
  });
}

function displayWeather(data) {
  const { name } = data.location;
  const { icon, text: description } = data.current.condition;
  const { temp_c, temp_f } = data.current;
  const { forecastday } = data.forecast;

  displayForecast(data.forecast.forecastday);
  isGoingToRain(forecastday);
  locationElement.textContent = name;
  weatherElement.textContent = description;
  weatherIcon.src = `http:${icon}`;
  weatherIcon.alt = description;
  temperatureElement.textContent = `${temp_c}°C`;
}

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

searchCity();
