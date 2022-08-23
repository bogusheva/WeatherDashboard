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
  if (!cityName || cityName.trim() === "") {
    return alert("Enter the city correctly");
  } else {
    currentCity.innerHTML = cityName;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }
}

function showWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector(".current-city");
  cityElement.innerHTML = response.data.name;
  cityElement.style.fontSize = "24px";
  if (cityElement.innerHTML.length > 10 && cityElement.innerHTML.length < 16) {
    cityElement.style.fontSize = "16px";
  } else if (cityElement.innerHTML.length >= 16) {
    cityElement.style.fontSize = "12px";
  }
  let descriptionElement = document.querySelector(".weather-description-text");
  descriptionElement.innerHTML = response.data.weather[0].description;
  if (descriptionElement.innerHTML.length >= 10) {
    descriptionElement.style.fontSize = "25px";
    descriptionElement.style.marginTop = "10px";
  }
  let windElement = document.querySelector("#wind-value");
  windElement.innerHTML = response.data.wind.speed.toFixed(1);
  let humidityElement = document.querySelector("#humidity-value");
  humidityElement.innerHTML = response.data.main.humidity;
  let pressureElement = document.querySelector("#pressure-value");
  pressureElement.innerHTML = Math.round(response.data.main.pressure / 1.333);
  let currentCitate = document.querySelector(".citate");
  let currentWeatherIcon = document.querySelector("#big-icon");
  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  switch (response.data.weather[0].description) {
    case "rainy":
      currentCitate.innerHTML =
        "The nicest thing about the rain as that it always stops... Eventually...";
      break;
    case "few clouds":
      currentCitate.innerHTML = "The sun always shines above the clouds...";
      break;
    case "scattered clouds":
      currentCitate.innerHTML =
        "The sky and the sun are always there. It is the clouds that come and go...";
      break;
    case "overcast clouds":
      currentCitate.innerHTML =
        "Clouds come floating into my life, no longer to carry rain or usher storm, but to add color to my sunset sky...";
      break;
    case "clear sky":
      currentCitate.innerHTML =
        "The sky is filled with stars, invisible by day...";
      break;
    default:
      currentCitate.innerHTML = "I love being in a city with great weather...";
      break;
  }
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

function cleanValue() {
  let inputForm = document.querySelector("#search-city");
  inputForm.value = "";
}

let apiKey = "f97f8eaebc5efe3fd907c0565c3a9148";
let currentDate = new Date();
let currentDateView = document.querySelector(".current-date");
currentDateView.innerHTML = formatDate(currentDate);
let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", searchCity);
let inputForm = document.querySelector("#search-city");
inputForm.addEventListener("focus", cleanValue);
let fahrenheitDegree = document.querySelector("#fahrenheit-symbol");
let celsiusDegree = document.querySelector("#celsius-symbol");
fahrenheitDegree.addEventListener("click", changeToFahrenheit);
celsiusDegree.addEventListener("click", changeToCelsius);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
