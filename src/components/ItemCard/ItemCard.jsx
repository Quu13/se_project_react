import "./ItemCard.css";
import { useState, useEffect, useContext } from "react";
import likeButton from "../../assets/like-button.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ id, item, handleCardClick, handleCardLike }) {
  const { currentUser, isLoggedIn, clothingItems } =
    useContext(CurrentUserContext);

  const handleCardPreview = () => {
    handleCardClick(item);
  };
  const cardKey = item._id;

  let isLiked = item.likes.includes(currentUser?._id);
  const [isCurrentlyLiked, setIsCurrentlyLiked] = useState(isLiked);

  useEffect(() => {
    if (!clothingItems?.length || !cardKey || !currentUser) return;
    const currentItem = clothingItems.find(
      (clothingItem) => clothingItem._id === cardKey
    );

    setIsCurrentlyLiked(
      currentItem?.likes.includes(currentUser?._id || !cardKey)
    );
  }, [clothingItems, id, currentUser]);

  const handleCardLikeState = () => {
    handleCardLike(cardKey, !isCurrentlyLiked)
      .then(() => setIsCurrentlyLiked((prevState) => !prevState))
      .catch((err) => console.error(err));
  };

  const itemLikeButtonClassName = `card__like-btn_is-liked`;

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            type="button"
            src={likeButton}
            alt="like button"
            className={`card__like-btn ${
              isCurrentlyLiked ? itemLikeButtonClassName : ""
            }`}
            onClick={handleCardLikeState}
            disabled={!isLoggedIn}
          ></button>
        )}
      </div>

      <img
        onClick={handleCardPreview}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
