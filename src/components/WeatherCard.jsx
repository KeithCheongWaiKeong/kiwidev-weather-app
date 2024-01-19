import React from "react";
import PropTypes from "prop-types";
import CurrentWeather from "./CurrentWeather";
import SearchHistory from "./SearchHistory";

const WeatherCard = ({
  currentWeather,
  searchError,
  searchHistory,
  searchWeather,
  removeHistory,
}) => {
  return (
    <div className="weather-card-container">
      <CurrentWeather
        currentWeather={currentWeather}
        searchError={searchError}
      />
      <SearchHistory
        searchHistory={searchHistory}
        searchWeather={searchWeather}
        removeHistory={removeHistory}
      />
    </div>
  );
};

WeatherCard.propTypes = {
  currentWeather: PropTypes.object.isRequired,
  searchError: PropTypes.bool.isRequired,
  searchHistory: PropTypes.object.isRequired,
  searchWeather: PropTypes.func.isRequired,
  removeHistory: PropTypes.func.isRequired,
};

export default WeatherCard;
