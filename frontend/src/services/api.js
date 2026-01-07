// src/services/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use((config) => {
  const user_id = localStorage.getItem("user_id");

  if (user_id) {
    config.headers.user_id = user_id;
  }

  return config;
});
