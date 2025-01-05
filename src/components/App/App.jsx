import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";

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
  const [clothingItems, setClothingItems] = useState([]);

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

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather })
      .then((res) => {
        setClothingItems((prevItems) => {
          return [res, ...prevItems];
        });
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleToggleSwitchChange =() =>{
    if (currentTemperatureUnit === 'C')setCurrentTemperatureUnit('F')
    if (currentTemperatureUnit === 'F')setCurrentTemperatureUnit('C')  
  }

  const handleOpenDelete = () => {
    setActiveModal("confirm");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  console.log(currentTemperatureUnit)
  
  return (
    <div className="page">
       <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />


        <Routes>
          <Route 
          path="/" 
          element={
          <Main weatherData={weatherData}
           handleCardClick={handleCardClick}
           clothingItems={clothingItems} /> 
        } 
      />
          <Route 
          path="/profile" 
          element=
          {<Profile  
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}/> } />
        </Routes>
        
        <Footer />
      </div>
     <AddItemModal
     isOpen={activeModal  === "add-garment"}
     onAddItem={handleAddItemSubmit}
     onClose= {closeActiveModal} />
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
        onOpenDelete={handleOpenDelete}
      />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
