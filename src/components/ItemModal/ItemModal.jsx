import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onOpenDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  // Checking if the current user is the owner of the current clothing item
  const isOwn = currentUser && card.owner === currentUser._id;
  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__button-delete ${
    isOwn ? "" : "modal__button-delete_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close-preview"
          id="clothes-button-close"
          aria-label="Close button"
        ></button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__item-description">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={onOpenDelete}
            className={`modal__button-delete ${itemDeleteButtonClassName}`}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
