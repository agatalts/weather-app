function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
  
 
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  

for (let index = 0; index < 5; index++) {
  forecast = response.data.list[index];
  timezone = response.data.city.timezone;
  forecastElement.innerHTML += `
          <div class="row next-day-container">
          <div class="col-8 hours-and-temp">
            <ul class=next-day-temp>
              <li>${formatHours((forecast.dt + timezone) * 1000)}</li>
              <li><strong>${Math.round(forecast.main.temp_max)}°C</strong> / ${Math.round(forecast.main.temp_min)}°C</li>
            </ul>
          </div>
          <div class="col-4 for-weather-icon-small"><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" height=50px /></div>
        </div>`;
}
}



function search(cityName) {
  let apiKey = "791caf474f5e47b0c7a34593ae174a7e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(showConditions);

   apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(showForecast);
}


function showConditions(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("h4").innerHTML = response.data.weather[0].main;
  document.querySelector("li.day-and-time").innerHTML = formatDate((response.data.dt + response.data.timezone) * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
  showCelcius.classList.add("active");
  showFahrenheit.classList.remove("active");
}

 



function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temp");

  showCelcius.classList.remove("active");
  showFahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  showCelcius.classList.add("active");
  showFahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city").value;
  search(cityName);
}


let celsiusTemperature = null;


let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCity);

let showFahrenheit = document.querySelector("#showFahrenheit");
showFahrenheit.addEventListener("click", displayFahrenheitTemperature);

let showCelcius = document.querySelector("#showCelcius");
showCelcius.addEventListener("click", displayCelsiusTemperature);

search("New York")