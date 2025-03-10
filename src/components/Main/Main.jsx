import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, handleCardLike, clothingItems }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  let itemCards = [];

  for (let i = 0; i < filteredItems.length; i++) {
    if (itemCards.length !== filteredItems.length) {
      const item = filteredItems[i];
      itemCards.push(
        <ItemCard
          key={i}
          id={item.id}
          item={item}
          handleCardClick={handleCardClick}
          handleCardLike={handleCardLike}
        />
      );
    }
  }

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="main__cards">
        <p className="main__cards-text">
          Today is {weatherData.temp[currentTemperatureUnit]} {currentTemperatureUnit} &deg; / You may
          want to wear:
        </p>
        <ul className="main__cards-list">{itemCards}</ul>
      </section>
    </main>
  );
}


export default Main;
