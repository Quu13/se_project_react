import React from "react";
import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleCardLike,
}) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const filteredItems = isLoggedIn
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

  const itemCards = [];

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
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__add-btn" onClick={handleAddClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">{itemCards}</ul>
    </div>
  );
}

export default ClothesSection;
