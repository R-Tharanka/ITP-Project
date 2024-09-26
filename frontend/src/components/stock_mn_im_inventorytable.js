import React, { useState } from 'react';
import './styles/stock_mn_im_inventorytable.css';
import UpdateInventoryForm from './UpdateInventoryForm';
import DeleteInventory from './DeleteInventory';

const ST_InventoryTable = ({ stockpileData }) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [inventoryData, setInventoryData] = useState(stockpileData);
  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);

  // Function to open popup with the current item details
  const openPopup = (item) => {
    setCurrentItem({ ...item });
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
  const handleRemove = (itemId) => {
    const updatedData = inventoryData.filter(item => item.id !== itemId);
    setInventoryData(updatedData);
    setIsRemovePopupOpen(false);

    // Once backend is done, replace this with actual API call
    // e.g., fetch(`/api/delete/${itemId}`, { method: 'DELETE' })
  };

  return (
    <div className="inventory-table-container">
      <h2>Invetory Table</h2>
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
          {stockpileData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.location}</td>
              <td>{item.capacity}</td>
              <td>{item.categories}</td>
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
          ))}
        </tbody>
      </table>

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
