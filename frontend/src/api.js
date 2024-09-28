import axios from 'axios';

const API_URL = 'http://localhost:5000/api/inventory'; // base API URL that match the backend route

// Function to get inventory items
// export const getItems = async () => {
//     const response = await axios.get(`${API_URL}/items`);
//     return response.data;
// };

// Function to add a new inventory item (used in the form)
export const addInventory = async (itemData) => {
    const response = await axios.post(`${API_URL}/add`, itemData); // Match the POST route in backend
    return response.data;
};

// Function to update inventory item
export const updateInventoryItem = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/inventory/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating inventory item:', error);
      throw error;
    }
};

// Function to delete inventory item
export const deleteInventoryItem = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Failed to delete item:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
};
  
