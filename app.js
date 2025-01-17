//Date
function getDate(responseData) {
  let currentDate = new Date((responseData.dt + responseData.timezone) * 1000);

  let currentHours = currentDate.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }

  let currentMinutes = currentDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let currentWeekDay = days[currentDate.getDay()];
  let currentDay = currentDate.getDate();

  let currentMonth = months[currentDate.getMonth()];

  let currentYear = currentDate.getFullYear();

  return `${currentWeekDay}, ${currentDay} ${currentMonth} ${currentYear}, ${currentHours}:${currentMinutes}`;
}

//Search Engine with API integrated

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", changeCity);

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let currentApiUrl = `${apiEndpoint}weather?lat=${latitude}&lon=${longitude}&${celsiusApi}&appid=${apiKey}`;
  axios.get(currentApiUrl).then(apiCurrentInfo);

  let forecastApiUrl = `${apiEndpoint}forecast?lat=${latitude}&lon=${longitude}&${celsiusApi}&appid=${apiKey}`;
  axios.get(forecastApiUrl).then(apiForecastInfo);
}

navigator.geolocation.getCurrentPosition(currentPosition);

function changeCity(event) {
  event.preventDefault();
  let searchInputForm = document.querySelector("#searchForm-input");
  let city = document.querySelector(".city");
  city.innerHTML = `${searchInputForm.value}`;

  let currentApiUrl = `${apiEndpoint}weather?q=${searchInputForm.value}&${celsiusApi}&appid=${apiKey}`;
  axios.get(currentApiUrl).then(apiCurrentInfo);

  let forecastApiUrl = `${apiEndpoint}forecast?q=${searchInputForm.value}&${celsiusApi}&appid=${apiKey}`;
  axios.get(forecastApiUrl).then(apiForecastInfo);
}

function apiCurrentInfo(response) {
  document.getElementById("currentIcon").className = icons(response.data);

  let city = document.querySelector(".city");
  city.innerHTML = `${response.data.name}`;

  let date = document.querySelector(".date");
  date.innerHTML = getDate(response.data);

  temperature.innerHTML = `${Math.round(
    response.data.main.temp
  )}${currentDegreeSymbol}`;

  let weatherDescription = document.querySelector(".weatherDescription");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let maxTemp = document.querySelector(".maxTemp");
  maxTemp.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}${currentDegreeSymbol}`;

  let minTemp = document.querySelector(".minTemp");
  minTemp.innerHTML = `${Math.round(
    response.data.main.temp_min
  )}${currentDegreeSymbol}`;

  let humidity = document.querySelector(".humidityValue");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let wind = document.querySelector(".windValue");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}m/s`;

  let sunset = document.querySelector(".sunsetValue");
  sunset.innerHTML = timestampUnixConversion(
    response.data.sys.sunset + response.data.timezone
  );

  let precipitation = document.querySelector(".precipitationValue");
  precipitation.innerHTML = updatedPrecipitation(response.data);
}

function apiForecastInfo(response) {
  //days
  displayForecastDays(response);

  //icons
  document.getElementById("forecastIcon1").className = icons(
    response.data.list[8]
  );
  document.getElementById("forecastIcon2").className = icons(
    response.data.list[16]
  );
  document.getElementById("forecastIcon3").className = icons(
    response.data.list[24]
  );
  document.getElementById("forecastIcon4").className = icons(
    response.data.list[32]
  );
  document.getElementById("forecastIcon5").className = icons(
    response.data.list[39]
  );

  //temp
  displayForecastTemperatures(response);
}

function displayForecastDays(response) {
  let forecastDay1 = new Date(
    (response.data.list[8].dt + response.data.city.timezone) * 1000
  );
  day1 = document.querySelector(".forecastDay1");
  day1.innerHTML = `${days[forecastDay1.getDay()]}`;

  let forecastDay2 = new Date(
    (response.data.list[16].dt + response.data.city.timezone) * 1000
  );
  day2 = document.querySelector(".forecastDay2");
  day2.innerHTML = `${days[forecastDay2.getDay()]}`;

  let forecastDay3 = new Date(
    (response.data.list[24].dt + response.data.city.timezone) * 1000
  );
  day3 = document.querySelector(".forecastDay3");
  day3.innerHTML = `${days[forecastDay3.getDay()]}`;

  let forecastDay4 = new Date(
    (response.data.list[32].dt + response.data.city.timezone) * 1000
  );
  day4 = document.querySelector(".forecastDay4");
  day4.innerHTML = `${days[forecastDay4.getDay()]}`;

  let forecastDay5 = new Date(
    (response.data.list[39].dt + response.data.city.timezone) * 1000
  );
  day5 = document.querySelector(".forecastDay5");
  day5.innerHTML = `${days[forecastDay5.getDay()]}`;
}

function displayForecastTemperatures(response) {
  let day1 = [];
  let day2 = [];
  let day3 = [];
  let day4 = [];
  let day5 = [];

  let todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  for (let index = 0; index < response.data.list.length; index++) {
    let item = response.data.list[index];

    let itemDate = new Date(item.dt_txt);
    itemDate.setHours(0, 0, 0, 0);

    let differenceInTime = itemDate.getTime() - todayDate.getTime();
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays === 1) {
      day1.push(item.main.temp);
    }
    if (differenceInDays === 2) {
      day2.push(item.main.temp);
    }
    if (differenceInDays === 3) {
      day3.push(item.main.temp);
    }
    if (differenceInDays === 4) {
      day4.push(item.main.temp);
    }
    if (differenceInDays === 5) {
      day5.push(item.main.temp);
    }
  }

  let day1Min = Math.round(Math.min(...day1));
  let day1Max = Math.round(Math.max(...day1));
  let forecastMinTemp1 = document.querySelector(".forecastMinTemp1");
  forecastMinTemp1.innerHTML = `${day1Min}${currentDegreeSymbol}`;
  let forecastMaxTemp1 = document.querySelector(".forecastMaxTemp1");
  forecastMaxTemp1.innerHTML = `${day1Max}${currentDegreeSymbol}`;

  let day2Min = Math.round(Math.min(...day2));
  let day2Max = Math.round(Math.max(...day2));
  let forecastMinTemp2 = document.querySelector(".forecastMinTemp2");
  forecastMinTemp2.innerHTML = `${day2Min}${currentDegreeSymbol}`;
  let forecastMaxTemp2 = document.querySelector(".forecastMaxTemp2");
  forecastMaxTemp2.innerHTML = `${day2Max}${currentDegreeSymbol}`;

  let day3Min = Math.round(Math.min(...day3));
  let day3Max = Math.round(Math.max(...day3));
  let forecastMinTemp3 = document.querySelector(".forecastMinTemp3");
  forecastMinTemp3.innerHTML = `${day3Min}${currentDegreeSymbol}`;
  let forecastMaxTemp3 = document.querySelector(".forecastMaxTemp3");
  forecastMaxTemp3.innerHTML = `${day3Max}${currentDegreeSymbol}`;

  let day4Min = Math.round(Math.min(...day4));
  let day4Max = Math.round(Math.max(...day4));
  let forecastMinTemp4 = document.querySelector(".forecastMinTemp4");
  forecastMinTemp4.innerHTML = `${day4Min}${currentDegreeSymbol}`;
  let forecastMaxTemp4 = document.querySelector(".forecastMaxTemp4");
  forecastMaxTemp4.innerHTML = `${day4Max}${currentDegreeSymbol}`;

  let day5Min = Math.round(Math.min(...day5));
  let day5Max = Math.round(Math.max(...day5));
  let forecastMinTemp5 = document.querySelector(".forecastMinTemp5");
  forecastMinTemp5.innerHTML = `${day5Min}${currentDegreeSymbol}`;
  let forecastMaxTemp5 = document.querySelector(".forecastMaxTemp5");
  forecastMaxTemp5.innerHTML = `${day5Max}${currentDegreeSymbol}`;
}

// Unix Conversion for Timestamp
function timestampUnixConversion(unixTime) {
  let timestamp = new Date(unixTime * 1000);
  let hours = timestamp.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = timestamp.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//Precipitation Data
function updatedPrecipitation(responseData) {
  if (responseData.hasOwnProperty("rain")) {
    return `${Math.round(responseData.rain["1h"])}mm`;
  } else {
    return `0mm`;
  }
}

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
    "fa-solid fa-cloud-bolt fa-shake",
    "fa-solid fa-cloud-rain fa-bounce",
    "fa-solid fa-cloud-showers-heavy fa-bounce",
    "fa-solid fa-snowflake fa-spin",
    "fa-solid fa-sun fa-spin",
    "fa-solid fa-cloud fa-bounce",
    "fa-solid fa-smog fa-fade",
    "fa-solid fa-smog fa-fade",
    "fa-solid fa-industry fa-fade",
    "fa-solid fa-smog fa-fade",
    "fa-solid fa-volcano fa-bounce",
    "fa-solid fa-wind fa-flip",
    "fa-solid-tornado fa-flip",
  ];

  let night = responseData.weather[0].icon;

  if (responseData.weather[0].main === "Clear" && night.endsWith("n")) {
    icons[4] = "fa-solid fa-moon fa-beat";
  }

  let currentCondition = responseData.weather[0].main;
  let iconIndex = conditions.indexOf(currentCondition);
  let iconClass = icons[iconIndex];
  return iconClass;
}

//Unit Conversion Button
function displayFahrenheitTemp(event) {
  event.preventDefault();

  let city = document.querySelector(".city").innerHTML;

  if (currentDegreeUnit === "celsius") {
    let apiUrl = `${apiEndpoint}weather?q=${city}&${fahrenheitApi}&appid=${apiKey}`;
    axios.get(apiUrl).then(apiCurrentInfo);

    let forecastApiUrl = `${apiEndpoint}forecast?q=${city}&${fahrenheitApi}&appid=${apiKey}`;
    axios.get(forecastApiUrl).then(apiForecastInfo);

    let button = document.querySelector(".degreeButton");
    button.innerHTML = `°C`;

    currentDegreeUnit = "fahrenheit";
    currentDegreeSymbol = "°F";
  } else if (currentDegreeUnit === "fahrenheit") {
    let apiUrl = `${apiEndpoint}weather?q=${city}&${celsiusApi}&appid=${apiKey}`;
    axios.get(apiUrl).then(apiCurrentInfo);

    let forecastApiUrl = `${apiEndpoint}forecast?q=${city}&${celsiusApi}&appid=${apiKey}`;
    axios.get(forecastApiUrl).then(apiForecastInfo);

    let button = document.querySelector(".degreeButton");
    button.innerHTML = `°F`;
    currentDegreeUnit = "celsius";
    currentDegreeSymbol = "°C";
  }
}

fahrenheitButton = document.querySelector(".degreeButton");
fahrenheitButton.addEventListener("click", displayFahrenheitTemp);

//Global Variables: Days, Months, Temperature variables, API variables

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

let temperature = document.querySelector(".temperature");
let maxTemp = document.querySelector(".maxTemp");
let minTemp = document.querySelector(".minTemp");

let currentDegreeUnit = "celsius";
let currentDegreeSymbol = "°C";
let celsiusApi = "units=metric";
let fahrenheitApi = "units=imperial";
let apiKey = "12f7d1b3e4be63143ca354d998368e30";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/";
