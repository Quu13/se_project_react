import React, { useContext, useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
// const [currentTempatureUnit, handleToggleSwitchChange] = useState("C")  

  //const handleChange = (e) => {
  //  if ( currentTempatureUnit === 'C') handleToggleSwitchChange('F')
  //  if ( currentTempatureUnit === 'F') handleToggleSwitchChange('C')  

  //}
  //console.log(currentTempatureUnit)

  const {currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext)
  return (
    <label className="switch">
      <input type="checkbox" 
      className="switch__box" 
      onChange={handleToggleSwitchChange} />
      <span className={
        currentTempatureUnit === "F"
         ? "switch__slider swicth__slider-F"
         : "switch__slider switch__slider-C" 
         }
         ></span>
      <p className={`switch__temp-F ${currentTemperatureUnit === 'F' && "switch__active"}`}>F</p>
      <p className={`switch__temp-C ${currentTemperatureUnit === 'C' && "switch__active"}`}>C</p>
    </label>
  );
};

export default ToggleSwitch;
