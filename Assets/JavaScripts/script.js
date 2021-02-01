// API Calls
const apiKey = "792ee81e691256c1aa741d76e3a33b8a";

const formatDate = (value) => {
    let UTC = new Date(value * 1000);
    let dayValue = UTC.getDate();
    let monthValue = UTC.getMonth() + 1;
    let yearValue = UTC.getUTCFullYear();
    return `${monthValue}/${dayValue}/${yearValue}`;
}

const fetchWeatherData = async (city) => {
    let apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("cityName", data.name);
        localStorage.setItem("temperature", data.main.temp);
        localStorage.setItem("humidity", data.main.humidity);
        localStorage.setItem("description", data.weather[0].description);
        localStorage.setItem("windSpeed", data.wind.speed);
        localStorage.setItem("lonValue", data.coord.lon);
        localStorage.setItem("latValue", data.coord.lat);
        localStorage.setItem("currentIconURL", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        localStorage.setItem("currentDate", formatDate(data.dt));
    }); 
}

const fetchUVIndexData = async () => {
    let latValue = localStorage.getItem("lonValue");
    let lonValue = localStorage.getItem("latValue");
    let apiCall = await fetch(`http://api.openweathermap.org/data/2.5/uvi?lat=${latValue}&lon=${lonValue}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("UV", data.value);
    })
}

const fetchForecastData = async (city) => {
    let apiCall = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        for (let i = 7; i < data.list.length; i = i + 8) {
            localStorage.setItem(`#${i}Date`, formatDate(data.list[i].dt));
            localStorage.setItem(`#${i}IconURL`, `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);
            localStorage.setItem(`#${i}temperature`, data.list[i].main.temp);
            localStorage.setItem(`#${i}humidity`, data.list[i].main.humidity);
        }
    })
}

const fetchData = async (city) => {
    fetchWeatherData(city);
    fetchUVIndexData();
    fetchForecastData(city);
}

console.log(`City: ${localStorage.getItem("cityName")}`);
console.log(`Temperature: ${localStorage.getItem("temperature")}°F`);
console.log(`Humidity: ${localStorage.getItem("humidity")}`);
console.log(`The description value from data is ${localStorage.getItem("description")}`);
console.log(`The wind speed is ${localStorage.getItem("windSpeed")}MPH`);
console.log(`The longtitude value is ${localStorage.getItem("lonValue")}`);
console.log(`The latitude value is ${localStorage.getItem("latValue")}`);
console.log(`The image url for current date icon is ${localStorage.getItem("currentIconURL")}`);
console.log(`The UV index valuue is ${localStorage.getItem("UV")}`);
console.log(`The UTC time is ${localStorage.getItem("currentDate")}`);

// At reload, if there is no data store in localStorage, hide the weather information.
const displayDashboard = () => {
    // Update the current city and date and icon.
    let currentSection = document.getElementById("cityDateIcon");
    let cityHTML = `<h3>${localStorage.getItem("cityName")} ${localStorage.getItem("currentDate")}</h3>`;
    let iconHTML = "<img src=" +  localStorage.getItem("currentIconURL") + " alt='The icon for today's weather.'/>";
    currentSection.innerHTML = cityHTML + iconHTML;
}
// document.getElementById('temprature').innerText = `Temperature: ${tempValue}°F`;
// document.getElementById('humidity').innerText = `Humidity: ${humiValue}%`;