// API Calls
const apiKey = "792ee81e691256c1aa741d76e3a33b8a";

const getWeatherData = async (city) => {
    let test = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        let cityValue = data.name;
        let tempValue = data.main.temp;
        let humiValue = data.main.humidity;
        let descValue = data.weather[0].description;
        let windSpeedValue = data.wind.speed;
        let lonValue = data.coord.lon;
        let latValue = data.coord.lat;

        console.log(`City: ${cityValue}`);
        console.log(`Temperature: ${tempValue}°F`);
        console.log(`Humidity: ${humiValue}`);
        console.log(`The description value from data is ${descValue}`);
        console.log(`The wind speed is ${windSpeedValue}`);
        console.log(`The longtitude value is ${lonValue}`);
        console.log(`The latitude value is ${latValue}`);
    }); 
}