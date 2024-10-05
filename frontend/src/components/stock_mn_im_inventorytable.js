import React, { useState } from 'react';
import './styles/stock_mn_im_inventorytable.css';
import UpdateInventoryForm from './UpdateInventoryForm';
import DeleteInventory from './DeleteInventory';

import { deleteInventoryItem } from '../api';

const ST_InventoryTable = ({ stockpileData }) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [inventoryData, setInventoryData] = useState(stockpileData);
  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);

  // Function to open popup with the current item details
  const openPopup = (item) => {
    setCurrentItem({
      ...item,
      categories: item.categories || [], // Ensure categories is always an array
    });
    setIsPopupOpen(true);
  };

  // Function to update the inventory data
  const handleUpdate = (updatedItem) => {
    const updatedData = inventoryData.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setInventoryData(updatedData);
    setIsPopupOpen(false);
  };

  // Function to open remove confirmation popup
  const openRemovePopup = (item) => {
    setCurrentItem({ ...item });
    setIsRemovePopupOpen(true);
  };

  // Function to handle remove action
  const handleRemove = async () => {
    if (currentItem && currentItem._id) {
      try {

        console.log(`Attempting to delete item with ID: ${currentItem._id}`);
        // Make API call to delete item using currentItem._id
        await deleteInventoryItem(currentItem._id);
        console.log(`Successfully deleted item with ID: ${currentItem._id}`);
  
        // Remove item from state
        const updatedData = inventoryData.filter(item => item._id !== currentItem._id);
        setInventoryData(updatedData);
  
        // Close the remove popup
        setIsRemovePopupOpen(false);
      } catch (error) {
        console.error('Error deleting item:', error);
        // Optionally show an error message to the user
      }
    }
  };
  

  return (
    <div className="inventory-table-sect-container">
      <h2>Invetory Table</h2>
      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Categories</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stockpileData.length > 0 ? (
              stockpileData.map((item, index) => {
                const selectedItemTypes = Object.keys(item.itemTypes)
                  .filter((key) => item.itemTypes[key]) // Get the keys where the value is true
                  .map((key) => key.replace(/([A-Z])/g, ' $1').trim()); // Convert camelCase to normal text
    
                return (
                  <tr key={index}>
                    <td>{item.Id}</td>
                    <td>{item.location}</td>
                    <td>{item.capacity}</td>
                    <td>{selectedItemTypes.length > 0 ? selectedItemTypes.join(', ') : 'No Categories Selected'}</td>
                    <td>
                      <span className={`status-badge ${item.status === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button className="update-button" onClick={() => openPopup(item)}>Update</button>
                      <button className="remove-button" onClick={() => openRemovePopup(item)}>Remove</button>
                    </td>
                  </tr>
                );
              })
              ) : (
              <tr className="no-data-message-row">
                <td colSpan="6" className="no-data-message">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Render Update Form only when isPopupOpen is true */}
      {isPopupOpen && (
        <UpdateInventoryForm
          currentItem={currentItem}
          onUpdate={handleUpdate}
          onClose={() => setIsPopupOpen(false)}
        />
      )}

      {isRemovePopupOpen && (
        <DeleteInventory
          currentItem={currentItem}
          onDelete={handleRemove}
          onClose={() => setIsRemovePopupOpen(false)}
        />
      )}

    </div>
  );
};

export default ST_InventoryTable;
