import "./DeleteModal.css"

function DeleteModal({ activeModal, handleDeleteConfirmation, closeActiveModal }) {
    return (
      <div
        className={`modal ${activeModal === "delete-modal" && "modal_opened"}`}
      >
        <div className="delete__confirmation">
          <button
            className="delete__close-btn"
            type="button"
            onClick={closeActiveModal}
          ></button>
          <div className="delete__text">
            <p className="delete__title">
              Are you sure you want to delele this item?
            </p>
            <p className="delete__title">This action is irreversible.</p>
          </div>
          <button
            className="delete__confirm-btn"
            onClick={handleDeleteConfirmation}
          >
            Yes, delete item
          </button>
          <button className="delete__cancel-btn" onClick={closeActiveModal}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
  
  export default DeleteModal;