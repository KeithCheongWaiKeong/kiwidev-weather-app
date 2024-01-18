const openWeatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const getGeocoding = async (query) => {
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${openWeatherApiKey}`;

  const result = await fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (!data[0]) {
        throw new Error('Bad Search');
      }

      const latLon = {
        lat: data[0].lat,
        lon: data[0].lon
      }
      return latLon
    });

  return result;
}

const getCurrentWeatherData = async (lat, lon) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`;

  const result = await fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const result = {
        country: {
          name: data.name,
          code: data.sys.country,
        },
        weather: data.weather[0].main,
        desc: data.weather[0].description,
        temp: {
          min: data.main.temp_min,
          max: data.main.temp_max,
        },
        humidity: data.main.humidity,
        time: Date.now(),
      }

      return result;
    });

   return result;
}

export {
  getGeocoding,
  getCurrentWeatherData
};