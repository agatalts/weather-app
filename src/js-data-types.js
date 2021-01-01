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
  
  


//function showFahrenheit(event) {
  //event.preventDefault();
  //let currentTemp = document.querySelector("span.current-temp");
  //currentTemp.innerHTML = `50`
  // let fahrenheitTemp = Math.round((temperature * 9) / 5 + 32);
//}

//let clickFahrenheit = document.querySelector("a.current-fahrenheit");
//clickFahrenheit.addEventListener("click", showFahrenheit);

//function showCelcius(event) {
  //event.preventDefault();
  //let currentTemp = document.querySelector("span.current-temp");
  //currentTemp.innerHTML = `10`
//}

//let clickCelcius = document.querySelector("a.current-celcius");
//clickCelcius.addEventListener("click", showCelcius);


function search(cityName) {
  let apiKey = "791caf474f5e47b0c7a34593ae174a7e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(showConditions);
}


function showConditions(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("h4").innerHTML = response.data.weather[0].main;
  document.querySelector("li.day-and-time").innerHTML = formatDate(response.data.dt * 1000);
}

function showCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city").value;
  search(cityName);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCity);



search("New York")