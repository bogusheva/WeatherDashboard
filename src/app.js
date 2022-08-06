function formatDate(arg) {
  let now = arg;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = "0".concat(hours);
  }
  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }
  return "".concat(days[day], ", ").concat(hours, ":").concat(minutes);
}
function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("#current-temperature");
  temperatureValue.innerHTML = 79;
}
function changeToCelsius(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("#current-temperature");
  temperatureValue.innerHTML = 26;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let currentCity = document.querySelector(".current-city");
  let cityName = searchInput.value;
  currentCity.innerHTML = cityName;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector(".current-city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector(".weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind-value");
  windElement.innerHTML = response.data.wind.speed.toFixed(1);
  let humidityElement = document.querySelector("#humidity-value");
  humidityElement.innerHTML = response.data.main.humidity;
}

function findPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(findPosition);
}
let apiKey = "f97f8eaebc5efe3fd907c0565c3a9148";
let currentDate = new Date();
let currentDateView = document.querySelector(".current-date");
currentDateView.innerHTML = formatDate(currentDate);
let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", searchCity);
let fahrenheitDegree = document.querySelector("#fahrenheit-symbol");
let celsiusDegree = document.querySelector("#celsius-symbol");
fahrenheitDegree.addEventListener("click", changeToFahrenheit);
celsiusDegree.addEventListener("click", changeToCelsius);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
