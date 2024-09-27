// src/api.js
import axios from 'axios';

const API_URL = '/api'; // Assuming this is the endpoint for your backend

export const getItems = async () => {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
};

export const addItem = async (itemData) => {
    const response = await axios.post(`${API_URL}/items`, itemData);
    return response.data;
};

// Add more functions as needed for other API calls
