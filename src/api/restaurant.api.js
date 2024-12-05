import api from "./config/api.config";

const endpoint = "/restaurant";

export const getRestaurantsByCity = async (city) => {
  const response = await api.get(`${endpoint}/city/${city}`);
  return response.data;
};

export const getRestaurantById = async (id) => {
  const response = await api.get(`${endpoint}/${id}`);
  return response.data;
};

export const getResultBySearchedQuery = async (query) => {
  const response = await api.get(`${endpoint}/search-item/${query}`);
  return response.data;
};

export const getRestaurantByItem = async (itemName) => {
  const response = await api.get(`${endpoint}/item-type/${itemName}`);
  return response.data;
};
