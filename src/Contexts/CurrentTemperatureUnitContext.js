import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
    currentTemperatureUnitContext: "",
    handleToggleSwitchChange: () => {}
})

export  { CurrentTemperatureUnitContext };