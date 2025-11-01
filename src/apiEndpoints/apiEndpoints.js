import axios from "axios";
import { useAuthStore } from "@/store/authStore";

// Base URL for the API
const BASE_URL = "https://watch-store-3xeh.onrender.com/api";
// const BASE_URL = "http://localhost:5000/api";

// Endpoints
export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  PRODUCTS: `${BASE_URL}/product`,
};

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// ========== AUTH FUNCTIONS ==========

// Login function
export const loginUser = async (email, password) => {
  try {
    const authStore = useAuthStore();
    const { data } = await api.post(ENDPOINTS.LOGIN, { email, password });
    authStore.setToken(data.token);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Register function
export const registerUser = async (name, email, password) => {
  try {
    const authStore = useAuthStore();
    const { data } = await api.post(ENDPOINTS.REGISTER, {
      name,
      email,
      password,
    });
    authStore.setToken(data.token);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// ========= PRODUCT FUNCTIONS =========

// Get all products
export const getProducts = async () => {
  try {
    const { data } = await api.get(ENDPOINTS.PRODUCTS);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Get single product by ID
export const getProductById = async (id) => {
  try {
     const authStore = useAuthStore();
    const { data } = await api.get(`${ENDPOINTS.PRODUCTS}/${id}`, {
  headers: { Authorization: `Bearer ${authStore.token}` }
});
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Create product (requires auth)
export const createProduct = async (productData) => {
  try {
    const authStore = useAuthStore();
    const { data } = await api.post(ENDPOINTS.PRODUCTS, productData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authStore.token}` },
    });
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Update product (requires auth)
export const updateProduct = async (id, productData) => {
  try {
    const authStore = useAuthStore();
    const { data } = await api.put(`${ENDPOINTS.PRODUCTS}/update/${id}`, productData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authStore.token}` },

    });
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Delete product (requires auth)
export const deleteProduct = async (id) => {
  try {
    const authStore = useAuthStore();
    await api.delete(`${ENDPOINTS.PRODUCTS}/${id}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
  } catch (err) {
    throw err.response?.data || err;
  }
};
