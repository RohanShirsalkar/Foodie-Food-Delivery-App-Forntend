import api from "./config/api.config";

const endpoint = "/order";

export const createOrder = async (data) => {
  const response = await api.post(`${endpoint}`, data);
  return response.data;
};

export const findOrderById = async (id) => {
  const response = await api.get(`${endpoint}/${id}`);
  return response.data;
};

export const findOrderByUserId = async (userId) => {
  const response = await api.get(`${endpoint}/user/${userId}`);
  return response.data;
};
