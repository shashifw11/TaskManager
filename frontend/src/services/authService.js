// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData);
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    return response.data;
};

const googleLogin = async (token) => {
    const response = await axios.post(API_URL + 'google-login', { token });
    return response.data;
};

export { register, login, googleLogin };
