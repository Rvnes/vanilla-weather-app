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
  axios.get(apiUrl).then(getApiInfo);
}

navigator.geolocation.getCurrentPosition(currentPosition);

function changeCity(event) {
  event.preventDefault();
  let searchInputForm = document.querySelector("#searchForm-input");
  let city = document.querySelector(".city");
  city.innerHTML = `${searchInputForm.value}`;

  let celsiusDegrees = "units=metric";
  let fahrenheitDegrees = "units-imperial";
  let apiKey = "12f7d1b3e4be63143ca354d998368e30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInputForm.value}&${celsiusDegrees}&appid=${apiKey}`;
  axios.get(apiUrl).then(getApiInfo);
}

function getApiInfo(response) {
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;

  let city = document.querySelector(".city");
  city.innerHTML = `${response.data.name}`;

  let maxTemp = document.querySelector(".maxTemp");
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;

  let minTemp = document.querySelector(".minTemp");
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;

  let humidity = document.querySelector(".humidityValue");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let wind = document.querySelector(".windValue");
  wind.innerHTML = `${Math.round(response.wind.speed)}m/s`;

  let sunset = document.querySelector(".sunsetValue");
  sunset.innerHTML = `${response.sys.sunset}`;

  let precipitation = document.querySelector(".precipitationValue");
  precipitation.innerHTML = `${response.data.precipitation.value}mm`;
}

// degree Button
