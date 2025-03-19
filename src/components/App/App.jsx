import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { api } from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import * as auth from "../../utils/auth";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../Register/RegisterModal";
import LoginModal from "../Login/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import DeleteModal from "../DeleteModal/DeleteModal";

function App() {
  //USERS
  const [user, setUser] = useState({ email: "", name: "", avatar: "" });

  //CLOTHING ITEMS
  const [clothingItems, setClothingItems] = useState([]);

  const handleCardLike = (id, isLiked) => {
    const token = localStorage.getItem("jwt");

    if (!token && isLoggedIn === false) {
      console.log("No token found");
      return Promise.reject("No token found");
    }

    if (isLiked) {
      return api
        .addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    } else {
      return api
        .removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }
  };

  const handleDeleteItem = (card) => {
    api
      .deleteItem(card._id)
      .then(() => {
        setClothingItems(clothingItems.filter((c) => c._id !== card._id));
        closeActiveModal();
      })
      .catch((err) => console.elog(err));
  };

  //SELECTED CARDS
  const [selectedCard, setSelectedCard] = useState({});

  //TOGGLE TEMP
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  //REGISTRATION
  const handleRegistrationSubmit = ({ email, password, name, avatar }) => {
    console.log("Submitting registration with:", {
      email,
      password,
      name,
      avatar,
    });
    auth
      .register(email, password, name, avatar)
      .then(() => {
        handleLoginSubmit({ email, password });
        closeActiveModal();
      })
      .catch((err) => console.error("Error handling register submit", err));
  };

  //LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSubmit = ({ email, password }) => {
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        handleTokenCheck(data.token);
        closeActiveModal();
      })
      .catch((err) => console.error("Error handling login submit", err));
  };

  const handleTokenCheck = (token) => {
    auth
      .checkForToken(token)
      .then((data) => {
        setUser(data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setUser({});
        setIsLoggedIn(false);
      })
      .catch((err) => console.error("Error handling token check", err));
  };

  //LOGOUT
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
  };

  //EDIT PROFILE
  const handleProfileSubmit = ({ name, avatar, _id }) => {
    const token = localStorage.getItem("jwt");
    api
      .profileEdited(name, avatar, _id, token)
      .then((data) => {
        console.log(data);
        setUser(data);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        console.log("Profile updated");
      })
      .catch((err) => console.error("Error handling profile submit", err));
  };

  //DELETE ITEM
  const handleDeleteConfirmation = () => {
    const cardId = selectedCard._id;
    api
      .deleteItem(cardId)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardId)
        );

        setSelectedCard({});
        closeActiveModal();
      })
      .catch((err) => console.error("Error handling delete confirmation", err));
  };

  //MODALS
  const [activeModal, setActiveModal] = useState("");

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-modal");
  };

  //DOM UPDATES
  const [updateDom, setUpdateDom] = useState(false);

  //USE-EFFECT/API
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        if (filteredData) {
          setWeatherData(filteredData);
        } else {
          console.error("Filtered data is undefined.");
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleAddItemSubmit = (item) => {
    api
      .addItems(item)
      .then((createdItem) => {
        setClothingItems([createdItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      handleTokenCheck(token);
    } else {
      return;
    }
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser: user, clothingItems, isLoggedIn }}
    >
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                    onCardClick={handleAddClick}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute Route isLoggedIn={isLoggedIn} anonymous>
                    <Profile
                      handleAddClick={handleAddClick}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleCardLike={handleCardLike}
                      handleEditProfileClick={handleEditProfileClick}
                      handleLogOut={handleLogOut}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
            onClose={closeActiveModal}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onOpenDelete={handleDeleteClick}
          />
          <RegisterModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            handleRegistrationSubmit={handleRegistrationSubmit}
            handleLoginClick={handleLoginClick}
          />
          <LoginModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            handleLoginSubmit={handleLoginSubmit}
            handleRegisterClick={handleRegisterClick}
          />

          <EditProfileModal
            activeModal={activeModal}
            handleProfileSubmit={handleProfileSubmit}
            onClose={closeActiveModal}
          />
          <DeleteModal
            activeModal={activeModal}
            handleDeleteConfirmation={handleDeleteConfirmation}
            onClose={closeActiveModal}
            handleDeleteItem={handleDeleteItem}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
