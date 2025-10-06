


import api from "@/lib/axios";


export const getBoosters = () => api.get("/boosters");


export const getBoosterById = (id) => api.get(`/boosters/${id}`);


export const createBooster = (newBooster) => api.post("/boosters", newBooster);


export const updateBooster = (id, updatedBooster) =>
  api.put(`/boosters/${id}`, updatedBooster);


export const patchBooster = (id, partialUpdate) =>
  api.patch(`/boosters/${id}`, partialUpdate);


export const deleteBooster = (id) => api.delete(`/boosters/${id}`);

export const getSets = () => api.get("/sets");

export const getSetByCode = (code) => api.get(`/sets?code=${code}`);