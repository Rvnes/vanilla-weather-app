//date
let currentDate = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentWeekday = days[currentDate.getDay()];
let currentDay = currentDate.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dez",
];
let currentMonth = months[currentDate.getMonth()];
let currentYear = currentDate.getFullYear();
let currentHour = currentDate.getHours();
let currentMinutes = currentDate.getMinutes();

if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let date = document.querySelector(".date");
date.innerHTML = `${currentWeekday}, ${currentDay} ${currentMonth} ${currentYear}, ${currentHour}:${currentMinutes}`;

//Search Engine with API integrated

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", changeCity);

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let celsiusDegrees = "units=metric";
  let apiKey = "12f7d1b3e4be63143ca354d998368e30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&${celsiusDegrees}&appid=${apiKey}`;
  axios.get(apiUrl).then(currentCity);
  axios.get(apiUrl).then(changeTemperature);
}

navigator.geolocation.getCurrentPosition(currentPosition);

function changeCity(event) {
  event.preventDefault();
  let searchInputForm = document.querySelector("#searchForm-input");
  let city = document.querySelector(".city");
  city.innerHTML = `${searchInputForm.value}`;

  let celsiusDegrees = "units=metric";
  let apiKey = "12f7d1b3e4be63143ca354d998368e30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInputForm.value}&${celsiusDegrees}&appid=${apiKey}`;
  axios.get(apiUrl).then(changeTemperature);
}

function changeTemperature(response) {
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;
}

function currentCity(response) {
  let city = document.querySelector(".city");
  city.innerHTML = `${response.data.name}`;
}
