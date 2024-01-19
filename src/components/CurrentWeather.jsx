import React from "react";
import PropTypes from "prop-types";
import {
  formatDate,
  formatTemp,
  formatToPascalCase,
  formatToPercent,
} from "../utils/StringFormatUtils";
import ErrorCard from "./ErrorCard";

const CurrentWeather = ({ currentWeather, searchError }) => {
  return (
    <div className="current-weather-container">
      <h2 className="current-weather-title">Today&apos;s Weather</h2>
      {searchError && (
        <ErrorCard errorTitle="Search Error" errorMessage={searchError} />
      )}
      {currentWeather && !searchError && (
        <>
          <div className="weather-details-container">
            <h6>{`${currentWeather.country.name}, ${currentWeather.country.code}`}</h6>
            <h1>{currentWeather.weather}</h1>
          </div>
          <div className="weather-details-container">
            <h6 className="small-font">Description</h6>
            <h6>{formatToPascalCase(currentWeather.desc)}</h6>
            <h6 className="small-font">Temperature</h6>
            <h6>{`${formatTemp(currentWeather.temp.min, true)} - ${formatTemp(currentWeather.temp.max, true)}`}</h6>
          </div>
          <div className="weather-details-container">
            <h6 className="small-font">Humidity</h6>
            <h6>{formatToPercent(currentWeather.humidity)}</h6>
            <h6 className="small-font">Time</h6>
            <h6>{formatDate(currentWeather.time)}</h6>
          </div>
        </>
      )}
    </div>
  );
};

CurrentWeather.propTypes = {
  currentWeather: PropTypes.object.isRequired,
  searchError: PropTypes.bool.isRequired,
};

export default CurrentWeather;
