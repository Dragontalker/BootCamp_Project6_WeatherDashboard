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
        
        let searchHistory = document.getElementById("searchHistory");
        searchHistory.innerHTML += `<li class='list-group-item' id=${data.name}>${data.name}</li>`;
    }).catch(error => {
        alert("Invalid city name! Please enter again!");
    })
}

const fetchUVIndexData = async () => {
    let latValue = localStorage.getItem("lonValue");
    let lonValue = localStorage.getItem("latValue");
    let apiCall = await fetch(`http://api.openweathermap.org/data/2.5/uvi?lat=${latValue}&lon=${lonValue}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("UV", data.value);
    }).catch(error => {
        alert("Invalid city name! Please enter again!");
    });
}

const fetchForecastData = async (city) => {
    let apiCall = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        for (let i = 7; i < data.list.length; i = i + 8) {
            localStorage.setItem(`#${i}Date`, formatDate(data.list[i].dt));
            localStorage.setItem(`#${i}IconURL`, `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);
            localStorage.setItem(`#${i}temperature`, data.list[i].main.temp);
            localStorage.setItem(`#${i}humidity`, data.list[i].main.humidity);
        }
    }).catch(error => {
        alert("Invalid city name! Please enter again!");
    });
}

const fetchData = async (city) => {
    await fetchWeatherData(city);
    fetchUVIndexData();
    fetchForecastData(city);
}


// At reload, if there is no data store in localStorage, hide the weather information.
const displayDashboard = () => {
    // Update the current city and date and icon.
    let currentSection = document.getElementById("cityDateIcon");
    let cityHTML = `${localStorage.getItem("cityName")} ${localStorage.getItem("currentDate")}`;
    let iconHTML = "<img src=" +  localStorage.getItem("currentIconURL") + " alt='The icon for today's weather.'/>";
    currentSection.innerHTML = cityHTML + iconHTML;

    // Update the temperatureL.
    let currentTemp = document.getElementById("currentTemp");
    currentTemp.innerHTML = `Temperature: ${localStorage.getItem("temperature")}°F`;

    // Update the humidity.
    let currentHumi = document.getElementById("currentHumi");
    currentHumi.innerHTML = `Humidity: ${localStorage.getItem("humidity")}%`;

    // Update the UV index.
    let currentUV = document.getElementById("uvColor");
    currentUV.innerHTML = localStorage.getItem("UV");

    // Change UV index based on color.
    let uvValue = parseFloat(localStorage.getItem("UV"));
    if (uvValue <= 2) {
        currentUV.style.backgroundColor = "green";
    } else if (uvValue <= 5) {
        currentUV.style.backgroundColor = "yellow";
    } else if (uvValue <= 7) {
        currentUV.style.backgroundColor = "orange";
    } else if (uvValue <= 10) {
        currentUV.style.backgroundColor = "red";
    } else if (uvValue > 10) {
        currentUV.style.backgroundColor = "purple";
    }
}


const displayForecast = () => {
    for (let i = 7; i < 40; i = i + 8) {
        let currentForecast = document.getElementById(`forecast-#${i}`);
        currentForecast.style.backgroundColor = "lightblue";
        currentForecast.innerHTML = "";

        let date = localStorage.getItem(`#${i}Date`)
        currentForecast.innerHTML += `<h5 id="foracastDate-day1" class="card-title">${date}</h5>`;

        let icon = localStorage.getItem(`#${i}IconURL`);
        currentForecast.innerHTML += `<img id="forecastIcon-day1" src="${icon}" alt="Icon for day 1 forcast.">`;

        let temp = localStorage.getItem(`#${i}temperature`);
        currentForecast.innerHTML += `<p id="forecastTemp-day1" class="card-text">Temp: ${temp}°F</p>`;

        let humi = localStorage.getItem(`#${i}humidity`);
        currentForecast.innerHTML += `<p id="forecastHumi-day1" class="card-text">Humidity: ${humi}%</p> `;
    }
}

const displayCity = async (city) => {
    await fetchData(city);
    displayDashboard();
    displayForecast();
}

const searchCity = () => {
    let result = document.getElementById("search").value;
    displayCity(result);
}

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener('click', searchCity);