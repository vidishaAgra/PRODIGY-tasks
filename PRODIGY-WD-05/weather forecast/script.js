let city = document.getElementById('city'),
    btn = document.getElementById('btn'),
    api_key = 'd8b652b8272c78472fd78b388f8548d4',
    currentWeather = document.querySelector('.left'),
    weatherIcon = document.getElementById('weather-icon'),
    hourlyForecastDiv = document.getElementById('hourly-forecast');

function getWeatherDetails(name, lat, lon, country, state) {
    const WEATHER_APP_API = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const FORECAST_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Fetch current weather data
    fetch(WEATHER_APP_API).then(res => res.json()).then(data => {
        let date = new Date();
        let time = `${date.getHours()}:${date.getMinutes()}`;
        let day = days[date.getDay()];
        let currentDate = `${date.getDate()} ${months[date.getMonth()]}`;
        let iconCode = data.weather[0].icon;
        let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        currentWeather.innerHTML = `
            <div class="placeUp">
                <div class="city">
                    <p>${name}</p>
                </div>
                <div class="place">${country}, ${state}</div>
            </div>
            <div class="placeDown">
                <div class="pdr">
                    <div class="time">${time}</div>
                    <div class="dd">
                        <div class="day">${day}</div>
                        <div class="date">${currentDate}</div>
                    </div>
                </div>
                <div class="pdl">
                    <div class="temp" id="temp-div">${data.main.temp}°C</div>
                </div>
            </div>
        `;

        weatherIcon.src = iconUrl;
        weatherIcon.alt = data.weather[0].description;
    }).catch(() => {
        alert('Failed to fetch current weather');
    });

    // Fetch hourly forecast data
    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        let forecastHTML = '<h3>Hourly Forecast</h3>';
        for (let i = 0; i < 8; i++) { // 8 intervals for the next 24 hours (3-hour intervals)
            let forecast = data.list[i];
            let date = new Date(forecast.dt * 1000);
            let hours = date.getHours();
            let formattedTime = hours % 12 || 12;
            let ampm = hours >= 12 ? 'PM' : 'AM';
            let iconCode = forecast.weather[0].icon;
            let iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
            forecastHTML += `
                <div class="hourly-forecast-item">
                    <p>${formattedTime} ${ampm}</p>
                    <img src="${iconUrl}" alt="${forecast.weather[0].description}">
                    <p>${forecast.main.temp}°C</p>
                </div>
            `;
        }
        hourlyForecastDiv.innerHTML = forecastHTML;
    }).catch(() => {
        alert('Failed to fetch hourly forecast');
    });
}

function getCityCoordinates() {
    let cityName = city.value.trim();
    city.value = ''; // Clear the input field
    if (!cityName) return;
    let GEO_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GEO_API_URL).then(res => res.json()).then(data => {
        if (data.length === 0) {
            alert(`No coordinates found for ${cityName}`);
            return;
        }
        let { name, lat, lon, country, state } = data[0];
        getWeatherDetails(name, lat, lon, country, state);
    }).catch(() => {
        alert(`Failed to fetch coordinates of ${cityName}`);
    });
}

btn.addEventListener('click', getCityCoordinates);
