import "./DeleteModal.css";

function DeleteModal({
  activeModal,
  handleDeleteConfirmation,
  onClose,
}) {
  return (
    <div
      className={`modal ${activeModal === "delete-modal" && "modal_opened"}`}
    >
        <div className="modal-delete__confirmation">
          <button
            className="modal-delete__close-btn"
            type="button"
            onClick={onClose}
          ></button>
          <div className="modal-delete__text">
            <p className="modal-delete__title">
              Are you sure you want to delele this item?
            </p>
            <p className="modal-delete__title">This action is irreversible.</p>
          </div>
          <button
            className="modal-delete__confirm-btn"
            onClick={handleDeleteConfirmation}
          >
            Yes, delete item
          </button>
          <button className="modal-delete__cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
  );
}

export default DeleteModal;
