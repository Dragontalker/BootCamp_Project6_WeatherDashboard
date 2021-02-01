// API Calls
const apiKey = "792ee81e691256c1aa741d76e3a33b8a";

const apiCall = async (city) => {
    let url = `api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    let jsonData = await fetch(url);
    return jsonData;
}

let toronto = apiCall("Toronto");
console.log(toronto);
