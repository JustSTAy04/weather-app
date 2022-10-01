function addZero(elem) {
  if (elem < 10) {
    return `0${elem}`;
  } else {
    return elem;
  }
}

let city = document.querySelector("#city");
let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let date = new Date();
let day = document.querySelector("#day");
let weekDay = document.querySelector("#weekDay");
let time = document.querySelector("#time");

day.innerHTML = `${date.getDate()}/${addZero(date.getMonth() + 1)}`;
weekDay.innerHTML = `${weekDays[date.getDay()]}`;
time.innerHTML = `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
let weather = document.querySelectorAll(".weekDay");

let count = 0;
for (let i = 0; i < weather.length; i++) {
  if (date.getDay() + i + 1 < 7) {
    weather[i].innerHTML = `${weekDays[date.getDay() + i]}`;
  } else {
    weather[i].innerHTML = `${weekDays[count]}`;
    count++;
  }
}

let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
let tempNow = document.querySelector("#temperatureNow");
let humid = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let geoloc = document.querySelector(".fa-location-dot");
let tempMax = document.querySelectorAll("#temperatureMax");
let tempMin = document.querySelectorAll("#temperatureMin");
let button = document.querySelector(".search");

function location(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  tempNow.innerHTML = temperature;
  humid.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  city.innerHTML = response.data.name;
  let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&units=metric&appid=${apiKey}`;
  axios.get(url2).then(showTempDays);
}

function showTempDays(response) {
  let forecast = response.data.daily;
  for (let i = 0; i < 5; i++) {
    tempMax[i].innerHTML = Math.round(response.data.daily[i].temp.max);
    tempMin[i].innerHTML = Math.round(response.data.daily[i].temp.min);
  }
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url1).then(showTemp);
}

function submit(event) {
  event.preventDefault();
  let input = document.querySelector(".enter");
  city.innerHTML = input.value;
  let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}`;
  axios.get(url1).then(showTemp);
}
button.addEventListener("click", submit);
geoloc.addEventListener("click", location);
