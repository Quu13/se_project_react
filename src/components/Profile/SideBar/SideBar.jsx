import React from "react";
import "./SideBar.css"
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileClick, handleLogOut }) {
    const { currentUser } = React.useContext(CurrentUserContext);

    return (
      <div className="sidebar">
        <div className="sidebar__user">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__links">
        <button
          type="button"
          className="sidebar__edit-btn"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button className="sidebar__logout-btn" onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
}
  
  export default SideBar;
  