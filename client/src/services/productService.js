import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchProducts = () => axios.get(`${API_URL}/products`);
export const createOrder = (orderData) => axios.post(`${API_URL}/orders`, orderData)
export const createProduct = (data) => axios.post(`${API_URL}/products`, data);
export const updateProduct = (id, data) => axios.put(`${API_URL}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_URL}/products/${id}`);

export const fetchOrdersByDate = (date, page = 1) =>
  axios.get(`${API_URL}/orders`, { params: { date, page } });

export const fetchOrderDates = () =>
  axios.get(`${API_URL}/orders/dates`)

export const fetchDashboardStats = (date) =>
  axios.get(`${API_URL}/dashboard`, { params: { date } });
