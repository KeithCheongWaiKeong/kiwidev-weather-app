import React from "react";
import { getCurrentWeatherData, getGeocoding } from "./utils/OpenWeatherUtils";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [searchHistory, setSearchHistory] = useState(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    const initialHistory = JSON.parse(storedHistory);
    return initialHistory || [];
  });
  const [searchError, setSearchError] = useState("");

  const searchWeather = async (country) => {
    const query = country.join(",");

    const weatherResult = await getGeocoding(query)
      .then((result) => {
        return getCurrentWeatherData(result.lat, result.lon);
      })
      .catch((e) => {
        setSearchError(e.message);
      });

    if (weatherResult) {
      const newSearchHistory = [...searchHistory];
      newSearchHistory.unshift(weatherResult);
      setSearchHistory(newSearchHistory);

      setCurrentWeather(weatherResult);
      setSearchError("");
    }
  };

  const removeHistory = (index) => {
    if (index === -1) {
      setSearchHistory([]);
    } else {
      const newSearchHistory = searchHistory.toSpliced(index, 1);
      setSearchHistory(newSearchHistory);
    }
  };

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fromDataValues = Array.from(formData.values());

    await searchWeather(fromDataValues);
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: "url(/assets/bg-light.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="app-scroll-container">
        <div className="app-container">
          <SearchBar handleSubmit={handleSubmit} />
          <WeatherCard
            currentWeather={currentWeather}
            searchError={searchError}
            searchHistory={searchHistory}
            searchWeather={searchWeather}
            removeHistory={removeHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
