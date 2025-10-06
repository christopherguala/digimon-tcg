

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
    // Si tienes un token en localStorage:
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en API:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;