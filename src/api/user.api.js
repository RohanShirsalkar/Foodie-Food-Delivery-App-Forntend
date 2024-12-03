import api from "./config/api.config";

const endpoint = "/user";

export const registerUser = async (data) => {
  const response = await api.post(`${endpoint}/register`, data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post(`${endpoint}/login`, data);
  return response.data;
};
