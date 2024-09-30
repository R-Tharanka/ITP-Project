import React, { useState, useEffect } from 'react';
import './styles/UpdateInventoryForm.css';
import { updateInventoryItem } from '../api';

const UpdateInventoryForm = ({ currentItem, onUpdate, onClose }) => {
  // Initialize categories to an empty array if it's not available in currentItem
  const [updatedItem, setUpdatedItem] = useState({
    ...currentItem,
    categories: Object.keys(currentItem.itemTypes)
    .filter((type) => currentItem.itemTypes[type] === true),
  });

  const categoryOptions = [
    "Raw Material",
    "Semi Final Products",
    "Final Products",
    "Returned Goods",
    "Wastage"
  ];

  const [idError, setIdError] = useState('');    // Validation Error for ID
  const [capacityError, setCapacityError] = useState(''); // Validation Error for Capacity
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity

  // Validate ID in real-time
  const handleIdChange = (e) => {
    const value = e.target.value;
    const idPattern = /^#I\d{3}$/; // ID must be #I followed by 3 digits

    if (value === '' || idPattern.test(value)) {
      setIdError(''); // Clear error if valid
    } else {
      setIdError('ID must be in format #I followed by 3 digits (e.g., #I001)');
    }

    setUpdatedItem((prevItem) => ({
      ...prevItem,
      Id: value,
    }));
  };

   // Handle Capacity input and validation (only allow numbers and a single dot)
   const handleCapacityChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setUpdatedItem((prevItem) => ({
        ...prevItem,
        capacity: value,
      }));

      // Validate if the capacity is negative
      if (parseFloat(value) < 0) {
        setCapacityError('Capacity cannot be negative.');
      } else {
        setCapacityError(''); // Clear error if valid
      }
    }
  };

  // Prevent non-numeric characters except "." in the capacity input field
  const handleCapacityKeyDown = (e) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

    // Allow only numbers, dot, and essential keys
    if (!/[0-9.]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }

    // Prevent multiple dots
    if (e.key === '.' && updatedItem.capacity.includes('.')) {
      e.preventDefault();
    }
  };

// Handle location input keydown validation
const handleLocationKeyDown = (e) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', ' ', ',', '.', '/'];

  // Allow letters (a-z, A-Z), numbers (0-9), and specific address characters
  if (!/[a-zA-Z0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
};

  // Use useEffect to set the updated item whenever currentItem changes
  useEffect(() => {
    setUpdatedItem({
      ...currentItem,
      categories: Object.keys(currentItem.itemTypes)
        .filter((type) => currentItem.itemTypes[type] === true)
        .map((type) => {
          // Map the itemTypes back to category names
          switch (type) {
            case 'rawMaterial': return 'Raw Material';
            case 'semiFinalProducts': return 'Semi Final Products';
            case 'finalProducts': return 'Final Products';
            case 'returnedGoods': return 'Returned Goods';
            case 'wastage': return 'Wastage';
            default: return null;
          }
        }).filter(Boolean),  // Ensure we filter out any null values
    });
  }, [currentItem]);
  

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
  const handleSubmit = async () => {
    const updatedItemTypes = categoryOptions.reduce((acc, category) => {
      const key = category.split(' ').map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)).join(''); 
      acc[key] = updatedItem.categories.includes(category);
      return acc;
    }, {});
  
    const updatedData = {
      ...updatedItem,
      itemTypes: updatedItemTypes, // Include updated itemTypes in the submitted data
    };
  
    try {
      // Call the API to update the item in the database
      await updateInventoryItem(updatedItem._id, updatedData);

      // Optionally, notify the user of success or close the form
      alert('Inventory item updated successfully');
      onUpdate(updatedData); // Call parent handler to refresh data

      onClose(); // Close the form
    } catch (error) {
      console.error('Failed to update inventory item:', error);
      alert('Failed to update item');
    }
  };

  // Debugging logs
  console.log('currentItem', currentItem); // Check the value of currentItem
  console.log('updatedItem', updatedItem); // Check the value of updatedItem

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Update Inventory Item</h3>
        <div className="update-input-div">
          <label>
            ID:
            <input className="loc-cap"
              type="text"
              name="Id"
              value={updatedItem.Id}
              onChange={handleIdChange}
            />
            {idError && <div className="error-message">{idError}</div>}
          </label>
          <label>
            Location:
            <input className="loc-cap"
              type="text"
              name="location"
              value={updatedItem.location}
              onChange={handleChange}
              onKeyDown={handleLocationKeyDown}
            />
          </label>
          <label>
            Capacity:
            <input className="loc-cap"
              type="number"
              name="capacity"
              value={updatedItem.capacity}
              onChange={handleChange}
              onKeyDown={handleCapacityKeyDown}
            />
            {capacityError && <div className="error-message">{capacityError}</div>}
          </label>
          <div className="category-options">
            <h3>Select Category Types</h3>
            {categoryOptions.map((category) => (
              <label key={category} className="category-label">
                <input
                  type="checkbox"
                  value={category}
                  checked={updatedItem.categories?.includes(category) || false} // Safely check if category is included
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
