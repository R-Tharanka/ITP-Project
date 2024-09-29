import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addStock } from '../api';
import './styles/AddStockForm.css';

const AddStockForm = ({ showModal, onClose }) => {
  // State variables to manage form data
  const [itemType, setItemType] = useState('');
  const [sku, setSku] = useState('');
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [worth, setWorth] = useState('');
  const [occupiedSpace, setOccupiedSpace] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  // Mappings for item names and types to abbreviations
  const itemNameMap = {
    Turmeric: 'TM',
    'Dry Chilly': 'DC',
    Ginger: 'GN',
    Pepper: 'PP',
    Garlic: 'GR',
  };

  const itemTypeMap = {
    'Raw Material': 'RM',
    'Final Products': 'FP',
    'Wastage' : 'WT',
    'Semi Final Products': 'SF',
    'Returned Goods': 'RG',
  };
  
  // Function to generate SKU
  const generateSKU = (name, type) => {
    const nameAbbreviation = itemNameMap[name] || '';
    const typeAbbreviation = itemTypeMap[type] || '';
    return `#${nameAbbreviation}-${typeAbbreviation}`;
  };

  // Effect to update SKU whenever itemName or itemType changes
  useEffect(() => {
    if (itemName && itemType) {
      const newSKU = generateSKU(itemName, itemType);
      setSku(newSKU);
    }
  }, [itemName, itemType]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      itemType,
      sku,
      itemName,
      amount: parseFloat(amount),
      worth: parseFloat(worth),
      occupiedSpace: parseFloat(occupiedSpace),
      date,
    };

    console.log("Form Data Submitted: ", formData);

    try {
      const response = await addStock(formData); // Send data to the backend
      console.log('Stock added successfully:', response);

      // Optionally, you can reset the form after submission
      // setItemType('Raw Material');
      // setItemName('');
      // setAmount('');
      // setWorth('');
      // setOccupiedSpace('');
      // setDate(new Date().toISOString().slice(0, 10));

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Failed to add stock:', error);
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Add Stock</h2>
            <form onSubmit={handleSubmit} className="add-stock-form">

              <div className="add-sections-div">
                <div className="input_cont_div">
                    <label htmlFor="itemName">Item Name</label>
                    <select id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)}
                        required >
                        <option value="" disabled>Select Item Name</option>
                        <option value="Turmeric">Turmeric</option>
                        <option value="Dry Chilly">Dry Chilly</option>
                        <option value="Ginger">Ginger</option>
                        <option value="Pepper">Pepper</option>
                        <option value="Garlic">Garlic</option>
                    </select>
                </div>

                <div className="input_cont_div">
                  <label htmlFor="sku" title="Stock Keeping Unit">SKU</label>
                  <input
                    type="text"
                    id="sku"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    required readOnly
                  />
                </div>
              </div>

              <div className="item-type-section">
                <label>Select Item Types:</label>
                <div className="radio-options">
                  <label>
                    <input
                      type="radio" 
                      className="radio-btn"
                      name="itemType"
                      value="Raw Material"
                      checked={itemType === 'Raw Material'}
                      onChange={(e) => setItemType(e.target.value)}
                    />
                    Raw Material
                  </label>
                  <label>
                    <input
                      type="radio" 
                      className="radio-btn"
                      name="itemType"
                      value="Final Products"
                      checked={itemType === 'Final Products'}
                      onChange={(e) => setItemType(e.target.value)}
                    />
                    Final Products
                  </label>
                  <label>
                    <input
                      type="radio" 
                      className="radio-btn"
                      name="itemType"
                      value="Wastage"
                      checked={itemType === 'Wastage'}
                      onChange={(e) => setItemType(e.target.value)}
                    />
                    Wastage
                  </label>
                  <label>
                    <input
                      type="radio" 
                      className="radio-btn"
                      name="itemType"
                      value="Semi Final Products"
                      checked={itemType === 'Semi Final Products'}
                      onChange={(e) => setItemType(e.target.value)}
                    />
                    Semi Final Products
                  </label>
                  <label>
                    <input
                      type="radio" 
                      className="radio-btn"
                      name="itemType"
                      value="Returned Goods"
                      checked={itemType === 'Returned Goods'}
                      onChange={(e) => setItemType(e.target.value)}
                    />
                    Returned Goods
                  </label>
                </div>
              </div>
              
              <div className="add-sections-div">
                <div className="input_cont_div">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="input_cont_div">
                  <label htmlFor="amount">Amount (kg)</label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="add-sections-div">
                <div className="input_cont_div">
                  <label htmlFor="worth">Worth ($)</label>
                  <input
                    type="number"
                    id="worth"
                    value={worth}
                    onChange={(e) => setWorth(e.target.value)}
                    required
                  />
                </div>

                <div className="input_cont_div">
                  <label htmlFor="occupiedSpace">Occupied Space (m³)</label>
                  <input
                    type="number"
                    id="occupiedSpace"
                    value={occupiedSpace}
                    onChange={(e) => setOccupiedSpace(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="add-btn">Add</button>
                <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStockForm;
