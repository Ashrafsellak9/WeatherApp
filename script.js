const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');

const API_KEY = 'f7d3548325f3715af494b0a37912a130';

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data.cod === 200) {
            const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            weatherResult.innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <div><img src="${iconURL}" alt="${data.weather[0].description}" class="weather-icon"></div>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            weatherResult.classList.remove('d-none');
            errorMessage.classList.add('d-none');
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        errorMessage.textContent = `Error: ${error.message}`;
        errorMessage.classList.remove('d-none');
        weatherResult.classList.add('d-none');
    }
});
