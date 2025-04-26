// src/api.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Sign In
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/signin`, {
      username,
      password,
    });

    if (response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    return {
      success: false,
      msg: error.response?.data?.msg || 'Login failed.',
    };
  }
};

// Sign Up
export const signupUser = async (username, password, name, location) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      username,
      password,
      name,
      location
    });

    return response.data;
  } catch (error) {
    console.error('Signup failed:', error.response?.data || error.message);
    return error.response?.data || { success: false, msg: 'Signup failed.' };
  }
};



// Get Weather by Username
export const fetchWeatherByUsername = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { username },
    });

    return response.data.weather;
  } catch (error) {
    console.error('Failed to fetch weather:', error.response?.data || error.message);
    return null;
  }
};

// Add Weather Entry (JWT protected)
export const createWeatherEntry = async (weatherData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/weather/create`, weatherData, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to create weather entry:', error.response?.data || error.message);
    return null;
  }
};
