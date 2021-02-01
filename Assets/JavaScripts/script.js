// API Calls
const apiKey = "792ee81e691256c1aa741d76e3a33b8a";

const testApi = async (city) => {
    let test = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        let nameValue = data.name;
        let tempValue = data.main.temp;
        let descValue = data.weather[0].description;

        console.log(`The name value from data is ${nameValue}`);
        console.log(`The temperature value from data is ${tempValue}`);
        console.log(`The description value from data is ${descValue}`);
    }); 
    console.log(test);
}