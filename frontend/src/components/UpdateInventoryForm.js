import React, { useState } from 'react';
import './styles/UpdateInventoryForm.css';

const UpdateInventoryForm = ({ currentItem, onUpdate, onClose }) => {
  const [updatedItem, setUpdatedItem] = useState(currentItem);

  const categoryOptions = [
    "Raw Material",
    "Semi Final Products",
    "Final Products",
    "Returned Goods",
    "Wastage"
  ];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // Handle category checkbox changes
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setUpdatedItem((prevItem) => {
      const newCategories = checked
        ? [...prevItem.categories, value] // Add selected category
        : prevItem.categories.filter((category) => category !== value); // Remove unselected category

      return {
        ...prevItem,
        categories: newCategories,
      };
    });
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
            <input className="loc-cap"
              type="text"
              name="location"
              value={updatedItem.location}
              onChange={handleChange}
            />
          </label>
          <label>
            Capacity:
            <input className="loc-cap"
              type="text"
              name="capacity"
              value={updatedItem.capacity}
              onChange={handleChange}
            />
          </label>
          <div className="category-options">
            <h3>Select Category Types</h3>
            {categoryOptions.map((category) => (
              <label key={category} className="category-label">
                <input
                  type="checkbox"
                  value={category}
                  checked={updatedItem.categories.includes(category)}
                  onChange={handleCategoryChange}
                />
                {category}
              </label>
            ))}
          </div>

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
