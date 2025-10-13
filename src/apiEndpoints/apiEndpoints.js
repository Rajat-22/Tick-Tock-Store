import axios from "axios";

// Base URL for the API
const BASE_URL = "https://watch-store-3xeh.onrender.com/api";

// Endpoints
export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
};

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// ========== AUTH FUNCTIONS ==========

// Login function
export const loginUser = async (email, password) => {
  try {
    const { data } = await api.post(ENDPOINTS.LOGIN, { email, password });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Register function
export const registerUser = async (name, email, password) => {
  try {
    const { data } = await api.post(ENDPOINTS.REGISTER, {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
