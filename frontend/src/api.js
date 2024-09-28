import axios from 'axios';

// Base API URLs for inventory and stock
const INVENTORY_API_URL = 'http://localhost:5000/api/inventory'; 
const STOCK_API_URL = 'http://localhost:5000/api/stock'; 

// Function to get inventory items
// export const getItems = async () => {
//     const response = await axios.get(`${INVENTORY_API_URL}/items`);
//     return response.data;
// };

// Function to add a new inventory item (used in the form)
export const addInventory = async (itemData) => {
    const response = await axios.post(`${INVENTORY_API_URL}/add`, itemData); // Match the POST route in backend
    return response.data;
};

// Function to update inventory item
export const updateInventoryItem = async (id, updatedData) => {
    try {
      const response = await axios.put(`${INVENTORY_API_URL}/inventory/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating inventory item:', error);
      throw error;
    }
};

// Function to delete inventory item
export const deleteInventoryItem = async (id) => {
    try {
      const response = await axios.delete(`${INVENTORY_API_URL}/${id}`);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Failed to delete item:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
};
  
// Stock-related functions

// Function to add a new stock item
export const addStock = async (stockData) => {
    try {
      const response = await axios.post(`${STOCK_API_URL}/add`, stockData); // Match the POST route for stock
      return response.data;
    } catch (error) {
      console.error('Error adding stock:', error);
      throw error;
    }
};
  
// Function to get stock items
export const getStocks = async () => {
    try {
      const response = await axios.get(`${STOCK_API_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stocks:', error);
      throw error;
    }
};