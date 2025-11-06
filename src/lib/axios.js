//no vean este archivo es de cuando usaba axios, solo mantengo el ejemplo

import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:4000", 
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en API:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;