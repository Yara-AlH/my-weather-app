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

document.querySelector(
  "#current-date"
).innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

//

function showWeatherForecast(response) {
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let condition = response;

  document.querySelector(".temperature").innerHTML = Math.round(temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".condition").innerHTML =
    response.data.weather[0].description;
}

function getWeather(event) {
  let cityInput = document.querySelector(".searchInput");
  let cityValue = cityInput.value;
  cityInput.value = null;

  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(showWeatherForecast);
}

document.querySelector(".searchBtn").addEventListener("click", getWeather);
