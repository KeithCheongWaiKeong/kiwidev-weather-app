import dayjs from "dayjs";

const OPEN_WEATHER_API_KEY = "135d5f490c9c924a9db3b2fd3c59cb0e";

const getGeocoding = async (query) => {
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${OPEN_WEATHER_API_KEY}`;

  const geoCode = await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Unresponsive.");
      }
      return response.json();
    })
    .then((data) => {
      if (!data[0]) {
        throw new Error("City or Country not found.");
      }

      const latLon = {
        lat: data[0].lat,
        lon: data[0].lon,
      };
      return latLon;
    });

  return geoCode;
};

const getCurrentWeatherData = async (lat, lon) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`;

  const weatherData = await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Unresponsive.");
      }
      return response.json();
    })
    .then((data) => {
      const parsedData = {
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
        time: dayjs().valueOf(),
      };

      return parsedData;
    });

  return weatherData;
};

export { getGeocoding, getCurrentWeatherData };
