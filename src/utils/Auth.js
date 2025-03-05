import { BASE_URL } from "./constants"
import { checkResponse } from "./api"

export const register =(email, password, name, avatar) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST", 
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, name, avatar }),  
    }).then(checkResponse);
};

export const login =(email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST", 
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, }),  
    }).then(checkResponse);
};

export const checkForToken =(token) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};