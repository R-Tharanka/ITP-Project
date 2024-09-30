import React, { useState, useEffect } from 'react';
import './styles/AddInventoryForm.css';
import { addInventory } from '../api';

const AddInventoryForm = ({ showModal, onClose }) => {
  const [Id, setId] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [itemTypes, setItemTypes] = useState({
    rawMaterial: false,
    semiFinalProducts: false,
    finalProducts: false,
    returnedGoods: false,
    wastage: false,
  });

  const [idError, setIdError] = useState('');    // Validation Error for ID
  const [capacityError, setCapacityError] = useState(''); // Validation Error for Capacity
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setItemTypes({ ...itemTypes, [name]: checked });
  };

  // Validate ID in real-time ------
  const handleIdChange = (e) => {
    const value = e.target.value;
    const idPattern = /^#I\d{3}$/; // ID must be #I followed by 3 digits

    if (value === '' || idPattern.test(value)) {
      setIdError(''); // Clear error if valid
    } else {
      setIdError('ID must be in format #I followed by 3 digits (e.g., #I001)');
    }

    setId(value);  // Set the updated value to the state
  };

  // Handle Capacity input, only allow numbers and a single dot
  const handleCapacityChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {   // Allow only numbers and "."
      setCapacity(value);  // Set value in the state
      if (parseFloat(value) < 0) {   // Check if the value is negative
        setCapacityError('Capacity cannot be negative.');
      } else {
        setCapacityError('');  // Clear error if valid
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
      if (e.key === '.' && capacity.includes('.')) {
        e.preventDefault();
      }
  };

  const handleLocationKeyDown = (e) => {
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', ' ', ',', '.', '/',
    ];
  
    // Allow letters (a-z, A-Z), numbers (0-9), and specific address characters
    if (!/[a-zA-Z0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };
  
  
  
  // Function to check if the form is valid
  useEffect(() => {
    const isValid =
      !idError &&
      !capacityError &&
      Id !== '' &&
      location !== '' &&
      capacity !== '' &&
      Object.values(itemTypes).some((checked) => checked); // Ensure at least one item type is checked

    setIsFormValid(isValid);
  }, [Id, location, capacity, idError, capacityError, itemTypes]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are valid
    if (idError || capacityError || !Id || !location || !capacity) {
      return;  // Prevent submission if there are errors or required fields are missing
    }
    // Submit form data (location, capacity, itemTypes) to the backend
    const formData = {
      Id,
      location,
      capacity,
      itemTypes,
    };

    console.log('Submitting Form Data:', formData);
    
    try {
      // Send form data to backend
      const response = await addInventory(formData);
      console.log(response);

      // Close modal after successful submission
      onClose();
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  };

  if (!showModal) {
    return null; // Modal is hidden
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Inventory</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-div">
          <div className="input-group">
                <label>ID</label>
                <input 
                type="text" 
                value={Id} 
                onChange={handleIdChange} 
                placeholder="Input Inventory Id:  ex- #I001" 
                required 
                />
                {idError && <p className="error-message">{idError}</p>}  {/* Display error message */}
            </div>
            <div className="input-group">
                <label>Location</label>
                <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                onKeyDown={handleLocationKeyDown}  // Attach keydown handler
                placeholder="Input Location" 
                required 
                />
            </div>
            <div className="input-group">
                <label>Capacity</label>
                <input 
                type="number" 
                value={capacity} 
                onChange={handleCapacityChange}
                onKeyDown={handleCapacityKeyDown}
                placeholder="Input Capacity" 
                min="0"
                required 
                />
            </div>
          </div>
          <div className="checkbox-group">
            <div>
                <label className="slect-type">Select Item Types:</label>
                <div className="select-div">
                    <div className="checkbox-item">
                    <input id="raw_mat"
                        type="checkbox" 
                        name="rawMaterial" 
                        checked={itemTypes.rawMaterial} 
                        onChange={handleCheckboxChange} 
                    />
                    <label for="raw_mat">Raw Material</label>
                    </div>
                    <div className="checkbox-item">
                    <input id="sem_finl_p"
                        type="checkbox" 
                        name="semiFinalProducts" 
                        checked={itemTypes.semiFinalProducts} 
                        onChange={handleCheckboxChange} 
                    />
                    <label for="sem_finl_p">Semi Final Products</label>
                    </div>
                </div>
                <div className="select-div">
                    <div className="checkbox-item">
                    <input id="finl_p"
                        type="checkbox" 
                        name="finalProducts" 
                        checked={itemTypes.finalProducts} 
                        onChange={handleCheckboxChange} 
                    />
                    <label for="finl_p">Final Products</label>
                    </div>
                    <div className="checkbox-item">
                    <input id="return_g"
                        type="checkbox" 
                        name="returnedGoods" 
                        checked={itemTypes.returnedGoods} 
                        onChange={handleCheckboxChange} 
                    />
                    <label for="return_g">Returned Goods</label>
                    </div>
                </div>
                <div className="checkbox-item select-div">
                <input id="waste"
                    type="checkbox" 
                    name="wastage" 
                    checked={itemTypes.wastage} 
                    onChange={handleCheckboxChange} 
                />
                <label for="waste">Wastage</label>
                </div>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-add">Add</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventoryForm;


