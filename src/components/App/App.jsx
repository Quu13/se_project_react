import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F')
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  /*MODAL*/
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange =() =>{

  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
       <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        isOpen={activeModal === "add-garment"}
      >
        <label htmlFor="name" className="modal__label modal__label-input">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label modal__label-input">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <div className="modal__radio-button">
            <input
              type="radio"
              className="modal__radio-input"
              id="hot"
              name="options"
            />
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              Hot
            </label>
          </div>
          <div className="modal__radio-button">
            <input
              type="radio"
              className="modal__radio-input"
              id="warm"
              name="options"
            />
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              Warm
            </label>
          </div>
          <div className="modal__radio-button">
            <input
              type="radio"
              className="modal__radio-input"
              id="cold"
              name="options"
            />
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
