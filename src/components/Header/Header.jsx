import React from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/logo.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser } = React.useContext(CurrentUserContext)

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__profile-link">
            <div className="header__user-container">
              <p className="header__user">{currentUser?.name || "Guest"}</p>
              {currentUser.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="avatar"
                />
              ) : (
                //add currentUser.name back
                <div className="header__avatar header__avatar_backUp">
                  <p>{currentUser.name.charAt(0).toUpperCase()}</p>
                </div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <div className="header__registration">
          <button
            type="button"
            className="header__signup-btn"
            onClick={handleRegisterClick}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleLoginClick}
            className="header__signin-btn"
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
