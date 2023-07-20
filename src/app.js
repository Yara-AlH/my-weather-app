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

if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
  console.log(currentMinute);
}
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

document.querySelector(
  "#current-date"
).innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

//

function showWeatherForecast(response) {
  console.log(response);
  let temp = Math.round(response.data.temperature.current);
  let icon = response.data.condition.icon;

  document.querySelector(".tempNumber").innerHTML = Math.round(temp);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector(".condition").innerHTML =
    response.data.condition.description;

  document
    .querySelector("#weatherIcon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
    );
}

function getWeather(event) {
  let cityInput = document.querySelector(".search-form");
  let cityValue = cityInput.value;
  cityInput.value = null;

  let apiKey = "0c6283dt87dcb24afbce90bd2bac3o16";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(showWeatherForecast);
}

let submitBtn = document.querySelector(".searchBtn");
submitBtn.addEventListener("click", getWeather);
