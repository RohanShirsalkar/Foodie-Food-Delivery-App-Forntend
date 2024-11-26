import api from "./config/api.config";

const endpoint = "/cart";

export const createCartItem = async (data) => {
  const response = await api.post(`${endpoint}/cartItem`, data);
  return response.data;
};

export const findCartByUserId = async (user_id) => {
  const response = await api.get(`${endpoint}/user/${user_id}`);
  return response.data;
};

export const updateCartItemById = async (cartItemId, data) => {
  const response = await api.put(`${endpoint}/cartItem/${cartItemId}`, data);
  return response.data;
};

export const deleteCartItemById = async (cartId) => {
  const response = await api.delete(`${endpoint}/cartItem/${cartId}`);
  return response.data;
};

export const deleteAllCartItemsByCartId = async (cartId) => {
  const response = await api.delete(`${endpoint}/clearCart/${cartId}`);
  return response.data;
};
