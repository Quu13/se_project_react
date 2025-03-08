import React, { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;

  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather__card">
      <p className="weather__card-temp">
      {weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit}
      </p>
      <img
        className="weather__card-image"
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"} time ${
          weatherOption?.condition
        } weather`}
      />
    </section>
  );
}

export default WeatherCard;
