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
  //let icon = document.querySelector(".icon");
  //icon.innerHTML = icons(response.data);
  document.getElementById("currentIcon").className = icons(response.data);

  let city = document.querySelector(".city");
  city.innerHTML = `${response.data.name}`;

  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;

  let maxTemp = document.querySelector(".maxTemp");
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;

  let minTemp = document.querySelector(".minTemp");
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;

  let humidity = document.querySelector(".humidityValue");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let wind = document.querySelector(".windValue");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}m/s`;

  let sunset = document.querySelector(".sunsetValue");
  sunset.innerHTML = convertUnix(response.data.sys.sunset);

  let precipitation = document.querySelector(".precipitationValue");
  precipitation.innerHTML = updatedPrecipitation(response.data);
}

// Unix Conversion
function convertUnix(unixTime) {
  let sunsetDate = new Date(unixTime * 1000);
  let sunsetHours = sunsetDate.getHours();
  let sunsetMinutes = sunsetDate.getMinutes();
  if (sunsetMinutes < 10) {
    sunsetMinutes = `0${sunsetMinutes}`;
  }
  if (sunsetHours < 10) {
    sunsetHours = `0${sunsetHours}`;
  }

  let sunset = `${sunsetHours}:${sunsetMinutes}`;
  return sunset;
}

//
function updatedPrecipitation(responseData) {
  if (responseData.hasOwnProperty("rain")) {
    return `${Math.round(responseData.rain["1h"])}mm`;
  } else {
    return `0mm`;
  }
}

// degree Button

//Icons

function icons(responseData) {
  let conditions = [
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Clear",
    "Clouds",
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Ash",
    "Squall",
    "Tornado",
  ];

  let icons = [
    "fa-solid fa-cloud-bolt",
    "fa-solid fa-rain",
    "fa-solid fa-cloud-showers-heavy",
    "fa-solid fa-snowflake",
    "fa-solid fa-sun",
    "fa-solid fa-cloud",
    "fa-solid fa-smog",
    "fa-solid fa-smog",
    "fa-solid fa-industry",
    "fa-solid fa-smog",
    "fa-solid fa-volcano",
    "fa-solid fa-wind",
    "fa-solid-tornado",
  ];

  let currentCondition = responseData.weather[0].main;
  console.log(responseData.weather[0].main);
  let iconIndex = conditions.indexOf(currentCondition);
  let iconClass = icons[iconIndex];
  return iconClass;
}

// UTC
function calculateLocationTime(responseData) {
  let time = new Date();
  let utcHours = getUTCHours();
}

//Light & Dark mode according to Day&Night Time
