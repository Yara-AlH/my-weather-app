let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();

if (currentHour > 7 && currentHour < 19) {
  document.body.className = "morning";
} else {
  document.body.className = "evening";
}

if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

document.querySelector(
  "#current-date"
).innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

//

let celsiusTemperature = null;

let submitBtn = document.querySelector(".searchBtn");
submitBtn.addEventListener("click", getWeather);

function getWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-form");
  let cityValue = cityInput.value;
  cityInput.value = null;

  let apiKey = "0c6283dt87dcb24afbce90bd2bac3o16";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);

  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityValue}&key=${apiKey}`;
  axios.get(forecastApiUrl).then(showWeatherForecast);
}

function showWeather(response) {
  console.log(response.data);

  let temp = response.data.temperature.current;
  let icon = response.data.condition.icon;

  celsiusTemperature = response.data.temperature.current;

  document.querySelector(".tempNumber").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector(".condition").innerHTML =
    response.data.condition.description;

  document
    .querySelector(".weatherIcon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
    );

  getForecast();
}

function getForecast(response) {
  let apiKey = "0c6283dt87dcb24afbce90bd2bac3o16";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(showWeatherForecast);
}

function formatday(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();

  return days[day];
}

function showWeatherForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector(".weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastday, index) {
    if (index > 0) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
          <div class="weather-forecast-date">${formatday(
            forecastday.time
          )}</div>
         <img
         src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
           forecastday.condition.icon
         }.png"
         alt=""
         width="42"
         />
         <div class="weather-forecast-temperature">
           <span class="weather-forecast-temperature-max"> ${Math.round(
             forecastday.temperature.maximum
           )}°</span>
           <span class="weather-forecast-temperature-min"> ${Math.round(
             forecastday.temperature.minimum
           )}°</span>
         </div>
         </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "0c6283dt87dcb24afbce90bd2bac3o16";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCoords);

  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
  axios.get(forecastApiUrl).then(showWeatherForecast);
}

function showCoords(response) {
  let temp = response.data.temperature.current;
  let icon = response.data.condition.icon;

  celsiusTemperature = response.data.temperature.current;

  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector(".condition").innerHTML =
    response.data.condition.description;
  document.querySelector(".tempNumber").innerHTML =
    Math.round(celsiusTemperature);

  document
    .querySelector(".weatherIcon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
    );
}

navigator.geolocation.getCurrentPosition(handlePosition);
