import { React, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  activeModal,
  onClose,
  handleLoginSubmit,
  handleRegisterClick,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const onLogin = (e) => {
    e.preventDefault();
    handleLoginSubmit(values);
    console.log(values);
  };

  const handleOrSignUp = () => {
    handleRegisterClick();
  };

  useEffect(() => {
    setValues({ email: "", password: "" });
  }, [activeModal, setValues]);

  return (
    <ModalWithForm
    titleText="Log In"
    buttonText="Log In"
    buttonTextTwo="Or Sign Up"
    activeModal={activeModal}
    onClose={onClose}
    isOpen={activeModal === "login"}
    onSubmit={onLogin}
    toggleLoginRegister={handleOrSignUp}
  >
    <label htmlFor="email-login" className="modal__label">
        Email*{""}
        <input
          type="email"
          name="email"
          id="email-login"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password-login" className="modal__label">
        Password*{""}
        <input
          type="password"
          name="password"
          id="password-login"
          className="modal__input"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
