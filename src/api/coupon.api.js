import api from "./config/api.config";

const endpoint = "/coupon";

export const getCouponsByRestaurantId = async (restaurant_id) => {
  const response = await api.get(`${endpoint}/restaurant/${restaurant_id}`);
  return response.data;
};

export const getCouponByCode = async (code) => {
  const response = await api.get(`${endpoint}/restaurant/${code}`);
  return response.data;
};
