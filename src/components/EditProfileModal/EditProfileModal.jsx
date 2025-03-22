import { React, useContext, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/hooks";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ activeModal, onClose, handleProfileSubmit }) {
    const { currentUser } = useContext(CurrentUserContext);
    const { values, handleChange, setValues } = useForm({
      name: "",
      avatar: "",
    });
  
    useEffect(() => {
      if (currentUser?.name && activeModal === "edit-profile") {
        console.log("Updating form values with currentUser data:", {
          name: currentUser.name,
          avatar: currentUser.avatar,
        });
  
        setValues({
          name: currentUser.name,
          avatar: currentUser.avatar,
        });
      }
    }, [currentUser, activeModal, setValues]);
  
    const profileEditSubmit = (e) => {
      e.preventDefault();
      handleProfileSubmit(values);
    };
  
    return (
      <ModalWithForm
        titleText="Change profile data"
        buttonText="Save changes"
        activeModal={activeModal}
        onClose={onClose}
        isOpen={activeModal === "edit-profile"}
        onSubmit={profileEditSubmit}
      >
        <label htmlFor="name-profile" className="modal__label">
          Name*{""}
          <input
            type="text"
            name="name"
            id="name-profile"
            className="modal__input"
            //placeholder="Name"
            value={values.name || ""}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="avatar-profile" className="modal__label">
          Avatar*{""}
          <input
            type="text"
            name="avatar"
            id="avatar-profile"
            className="modal__input"
            //placeholder="Avatar"
            value={values.avatar || ""}
            onChange={handleChange}
          />
        </label>
      </ModalWithForm>
    );
  }
  
  export default EditProfileModal;