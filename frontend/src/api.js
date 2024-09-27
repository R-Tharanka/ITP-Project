
// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/inventory'; // Update the base API URL to match the backend route

// Function to get inventory items (you can add this route later if needed)
export const getItems = async () => {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
};

// Function to add a new inventory item (used in the form)
export const addInventory = async (itemData) => {
    const response = await axios.post(`${API_URL}/add`, itemData); // Match the POST route in backend
    return response.data;
};

// Add more functions as needed for other API calls
