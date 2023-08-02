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
console.log(currentHour);
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
  console.log(apiURL);
  axios.get(apiURL).then(showWeatherForecast);
}

function showWeatherForecast(response) {
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
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "0c6283dt87dcb24afbce90bd2bac3o16";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCoordsForecast);
}

function showCoordsForecast(response) {
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

let fahrenheitLink = document.querySelector("#fahrenheit-convert");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  let tempInFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector(".tempNumber").innerHTML =
    Math.round(tempInFahrenheit);
}

let celsiusLink = document.querySelector("#celsius-convert");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  document.querySelector(".tempNumber").innerHTML =
    Math.round(celsiusTemperature);
}
