// API Calls
const apiKey = "792ee81e691256c1aa741d76e3a33b8a";

const fetchWeatherData = async (city) => {
    let apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        let lonValue = data.coord.lon;
        let latValue = data.coord.lat;

        localStorage.setItem("cityName", data.name);
        localStorage.setItem("temperature", data.main.temp);
        localStorage.setItem("humidity", data.main.humidity);
        localStorage.setItem("description", data.weather[0].description);
        localStorage.setItem("windSpeed", data.wind.speed);

        console.log(`City: ${localStorage.getItem("cityName")}`);
        console.log(`Temperature: ${localStorage.getItem("temperature")}°F`);
        console.log(`Humidity: ${localStorage.getItem("humidity")}`);
        console.log(`The description value from data is ${localStorage.getItem("description")}`);
        console.log(`The wind speed is ${localStorage.getItem("windSpeed")}MPH`);
        console.log(`The longtitude value is ${lonValue}`);
        console.log(`The latitude value is ${latValue}`);

        
    }); 
}

// document.getElementById('temprature').innerText = `Temperature: ${tempValue}°F`;
// document.getElementById('humidity').innerText = `Humidity: ${humiValue}%`;