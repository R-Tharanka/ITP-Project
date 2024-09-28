import React, { useState } from 'react';
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setItemTypes({ ...itemTypes, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
                onChange={(e) => setId(e.target.value)} 
                placeholder="Input Inventory Id" 
                required 
                />
            </div>
            <div className="input-group">
                <label>Location</label>
                <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="Input Location" 
                required 
                />
            </div>
            <div className="input-group">
                <label>Capacity</label>
                <input 
                type="number" 
                value={capacity} 
                onChange={(e) => setCapacity(e.target.value)} 
                placeholder="Input Capacity" 
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


