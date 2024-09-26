import React, { useState } from 'react';
import './styles/AddStockForm.css';

const AddStockForm = ({ showModal, onClose }) => {
  // State variables to manage form data
  const [itemType, setItemType] = useState('Raw Material');
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [worth, setWorth] = useState('');
  const [occupiedSpace, setOccupiedSpace] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      itemType,
      itemName,
      amount: parseFloat(amount),
      worth: parseFloat(worth),
      occupiedSpace: parseFloat(occupiedSpace),
      date,
    };

    console.log("Form Data Submitted: ", formData);

    // Add the logic to send this data to the backend when available

    // After form submission, close the modal
    onClose();
  };

  return (
    <>
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Add Stock</h2>
            <form onSubmit={handleSubmit} className="add-stock-form">

              <div className="item-name-outer-div">
                <div className="item-name-inner-div">
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
                  <label htmlFor="amount">Amount</label>
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
                  <label htmlFor="worth">Worth</label>
                  <input
                    type="number"
                    id="worth"
                    value={worth}
                    onChange={(e) => setWorth(e.target.value)}
                    required
                  />
                </div>

                <div className="input_cont_div">
                  <label htmlFor="occupiedSpace">Occupied Space</label>
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
