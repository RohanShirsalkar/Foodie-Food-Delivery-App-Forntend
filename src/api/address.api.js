import api from "./config/api.config";

const endpoint = "/address";

export const createAddress = async (data) => {
  const response = await api.post(`${endpoint}`, data);
  return response.data;
};

export const getAddressesByUserId = async (userId) => {
  const response = await api.get(`${endpoint}/user/${userId}`);
  return response.data;
};
