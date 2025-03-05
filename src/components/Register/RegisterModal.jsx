import { React, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  activeModal,
  onClose,
  handleRegistrationSubmit,
  handleLoginClick,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleResetInputs = () => {
    setValues({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });
  };

  useEffect(() => {
    setValues({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });
  }, [activeModal, setValues]);

  const onRegistration = (e) => {
    e.preventDefault();
    handleRegistrationSubmit(values);
  };

  const handleOrLogInClick = () => {
    handleLoginClick();
  };

  return (
    <ModalWithForm
      titleText="Sign up"
      buttonText="Sign Up"
      buttonTextTwo="Or Log In"
      activeModal={activeModal}
      onClose={onClose}
      isOpen={activeModal === "register"}
      onSubmit={onRegistration}
      toggleLoginRegister={handleOrLogInClick}
    >
      <label htmlFor="email-register" className="modal__label">
        Email*{""}
        <input
          type="email"
          name="email"
          id="email-register"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password-register" className="modal__label">
        Password*{""}
        <input
          type="password"
          name="password"
          id="password-register"
          className="modal__input"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="name-register" className="modal__label">
        Name*{""}
        <input
          type="text"
          name="name"
          id="name-register"
          className="modal__input"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar-register" className="modal__label">
        Avatar*{""}
        <input
          type="text"
          name="avatar"
          id="avatar-register"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
