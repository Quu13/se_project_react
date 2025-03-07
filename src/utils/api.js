import { BASE_URL } from "./constants";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error ${res.status}`);
  }
}

const authorization = () => {
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
  };
};

const getItems = () => {
  return fetch(`${BASE_URL}/items`, {
    method: "GET",
    headers: authorization(),
  }).then(checkResponse);
};

const addItems = ({ name, weather, imageUrl }) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: authorization(),
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(checkResponse);
};

const deleteItem = (id) => {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: authorization(),
  }).then(checkResponse);
};

const profileEdited = (name, avatar, _id, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar, _id }),
  }).then(checkResponse);
};

const addCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

const removeCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export const api = {
  getItems,
  addItems,
  deleteItem,
  profileEdited,
  addCardLike,
  removeCardLike,
};