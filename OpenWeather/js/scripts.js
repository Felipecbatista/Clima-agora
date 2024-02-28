// Variáveis e seleção de eventos
const apiKey = "a99364341e6deeb8730cc131599b800a";
const apiCountryURL2 = "https://flagsapi.com/" + "/shiny/64.png"; //utilizado de outra forma porque a flagsapi não funciona mais

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind");

const weatherContainer = document.querySelector("#weather-data")

// Funções
const getWeatherData = async (city) => {
    const apiWeaterURL = 'https://api.openweathermap.org/data/2.5/weather?q=' +
        city + '&units=metric&appid=' +
        apiKey + '&lang=pt_br';

    const res = await fetch(apiWeaterURL);
    const data = await res.json();

    return data;
}


const showWeatheData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png');
    countryElement.setAttribute("src", "https://flagsapi.com/" + data.sys.country + "/shiny/64.png");
    humidityElement.innerText = data.main.humidity + '%';
    windElement.innerText = data.wind.speed + 'km/h';

    weatherContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const city = cityInput.value;

    showWeatheData(city);
});

cityInput.addEventListener("keyup", (e) =>{
    if(e.code === "Enter"){
        const city = e.target.value;

        showWeatheData(city);
    }
})