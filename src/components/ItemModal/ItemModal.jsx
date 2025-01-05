import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onOpenDelete }) {
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

        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        <button
          type="text"
          className="modal__item-delete-btn"
          onClick={onOpenDelete}
        >
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
