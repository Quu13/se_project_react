import "./ClothesSection.css"
import ItemCard from "../ItemCard/ItemCard";
// import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick }) {
    return (
      <div className="clothes-section">
        <div className="clothes-section__container">
          <p className="clothes-section__title">Your items</p>
          <button className="clothes-section__add-btn" onClick={handleAddClick}>
            + Add new
          </button>
        </div>
        <ul className="clothes-section__items">
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                handleCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      </div>
    );
  }
  
  export default ClothesSection;