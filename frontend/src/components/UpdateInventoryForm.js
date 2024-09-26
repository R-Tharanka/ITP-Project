import React, { useState } from 'react';
import './styles/UpdateInventoryForm.css';

const UpdateInventoryForm = ({ currentItem, onUpdate, onClose }) => {
  const [updatedItem, setUpdatedItem] = useState(currentItem);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // Handle the form submission
  const handleSubmit = () => {
    onUpdate(updatedItem); // Call the onUpdate prop to update the table data
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Update Inventory Item</h3>
        <div className="update-input-div">
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={updatedItem.location}
              onChange={handleChange}
            />
          </label>
          <label>
            Capacity:
            <input
              type="text"
              name="capacity"
              value={updatedItem.capacity}
              onChange={handleChange}
            />
          </label>
          <label>
            Categories:
            <input
              type="text"
              name="categories"
              value={updatedItem.categories}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="up-btn-div">
          <button onClick={handleSubmit} className="update-button">
            Update
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInventoryForm;
