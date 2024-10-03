import React, { useState } from 'react';
import axios from 'axios';
import './styles/unload_modal.css'; 

const InventoryUnloadModal = ({ item, closeModal }) => {
    // State for form data, including item type, name, amount, worth, etc.
    const [unloadData, setUnloadData] = useState({
        itemType: item.itemType, // Pre-filled with the selected item type from the table
        itemName: item.itemName, // Pre-filled with the selected item name from the table
        sku: item.sku,
        amount: '',
        worth: '',
        occupiedSpace: '',
        date: new Date().toISOString().split('T')[0], // Default to today’s date
    });

    console.log(item.type);

    // State for input errors
    const [errors, setErrors] = useState({
        amount: '',
        worth: '',
        occupiedSpace: '',
        date: '',
    });

    // Prevent non-numeric characters except "." in the capacity input field
    const handleCapacityKeyDown = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

        // Allow only numbers, dot, and essential keys
        if (!/[0-9.]$/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
        }
    };

    // Handle form changes to update the state for each input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUnloadData({
            ...unloadData,
            [name]: value,
        });

        // Clear error for the field once the user starts typing
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    // Function to handle form submission for unloading stock
    const handleUnload = async () => {

        const { amount, worth, occupiedSpace, date } = unloadData;

        // Validation for empty fields
        let validationErrors = {};
        if (!amount) validationErrors.amount = 'Amount is required.';
        if (!worth) validationErrors.worth = 'Worth is required.';
        if (!occupiedSpace) validationErrors.occupiedSpace = 'Occupied Space is required.';
        if (!date) validationErrors.date = 'Date is required.';

        // If there are any validation errors, set them and stop form submission
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Stop submission
        }

        try {
            // Make a POST request to submit unload data
            const response = await axios.post('http://localhost:5000/api/unload_stocks/unload', unloadData);
            console.log('Unload successful: ', response.data);

            // Close the modal after submission
            closeModal();
        } catch (error) {
            console.error('Error unloading stock: ', error);

            if (error.response) {
                alert(error.response.data.message);  // Display the error message to the user
            } else {
                alert('Error unloading stock');
            }
        }
    };

    return (
        <div className="modal-overlay"> {/* Dark background covering the entire page */}
            <div className="unload-modal"> {/* Centered modal box */}
                <h2>Unload Stock</h2>

                {/* Item Name Selection */}
                <div className="unloading-sections-div">
                    {/* Date Selection */}
                    <div className="form-group">
                        <label>Item Name</label>
                        <select
                            name="itemName"
                            value={unloadData.itemName}
                            onChange={handleChange}
                            readOnly
                        >
                            <option value={item.itemName}>{item.itemName}</option>
                            {/* If want to allow the user to change the item name */}
                            {/* <option value="Ginger">Ginger</option>
                            <option value="Pepper">Pepper</option>
                            <option value="Garlic">Garlic</option> */}
                        </select>
                    </div>

                    {/* Amount Input */}
                    <div className="form-group">
                        <label htmlFor="sku" title="Stock Keeping Unit">SKU</label>
                        <input
                            type="text"
                            id="sku"
                            value={unloadData.sku}
                            onChange={handleChange}
                            required readOnly
                        />
                    </div>
                </div>

                {/* Select Item Type - Radio Buttons */}
                <div className="form-group radio-group-outer-div">
                    <label>Select Item Types:</label>
                    <div className="radio-group">
                        <label>
                            <input className="radio-btn"
                                type="radio"
                                name="itemType"
                                value="Raw Material"
                                checked={unloadData.itemType === 'Raw Material'}
                                onChange={handleChange}
                                disabled={true}
                            />
                            Raw Material
                        </label>
                        <label>
                            <input className="radio-btn"
                                type="radio"
                                name="itemType"
                                value="Final Products"
                                checked={unloadData.itemType === 'Final Products'}
                                onChange={handleChange}
                                disabled={true}
                            />
                            Final Products
                        </label>
                        <label>
                            <input className="radio-btn"
                                type="radio"
                                name="itemType"
                                value="Wastage"
                                checked={unloadData.itemType === 'Wastage'}
                                onChange={handleChange}
                                disabled={true}
                            />
                            Wastage
                        </label>
                        <label>
                            <input className="radio-btn"
                                type="radio"
                                name="itemType"
                                value="Semi Final Products"
                                checked={unloadData.itemType === 'Semi Final Products'}
                                onChange={handleChange}
                                disabled={true}
                            />
                            Semi Final Products
                        </label>
                        <label>
                            <input className="radio-btn"
                                type="radio"
                                name="itemType"
                                value="Returned Goods"
                                checked={unloadData.itemType === 'Returned Goods'}
                                onChange={handleChange}
                                disabled={true}
                            />
                            Returned Goods
                        </label>
                    </div>
                </div>

                <div className="unloading-sections-div">
                    {/* Date Selection */}
                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={unloadData.date}
                            max={new Date().toISOString().slice(0, 10)}
                            onChange={handleChange}
                            required
                        />
                        {errors.date && <p className="error">{errors.date}</p>}
                    </div>

                    {/* Amount Input */}
                    <div className="form-group">
                        <label>Amount (kg)</label>
                        <input
                            type="number"
                            name="amount"
                            min="0"
                            max={unloadData.amount}
                            value={unloadData.amount}
                            onChange={handleChange}
                            onKeyDown={handleCapacityKeyDown}
                            required
                        />
                        {errors.amount && <p className="error">{errors.amount}</p>}
                    </div>
                </div>

                <div className="unloading-sections-div">
                    {/* Worth Input */}
                    <div className="form-group">
                        <label>Worth ($)</label>
                        <input
                            type="number"
                            name="worth"
                            min="0"
                            max={unloadData.worth}
                            value={unloadData.worth}
                            onChange={handleChange}
                            onKeyDown={handleCapacityKeyDown}
                            required
                        />
                        {errors.worth && <p className="error">{errors.worth}</p>}
                    </div>

                    {/* Occupied Space Input */}
                    <div className="form-group">
                        <label>Occupied Space (m³)</label>
                        <input
                            type="number"
                            name="occupiedSpace"
                            min="0"
                            max={unloadData.occupiedSpace}
                            value={unloadData.occupiedSpace}
                            onChange={handleChange}
                            onKeyDown={handleCapacityKeyDown}
                            required
                        />
                        {errors.occupiedSpace && <p className="error">{errors.occupiedSpace}</p>}
                    </div>
                </div>

                {/* Action Buttons: Unload and Cancel */}
                <div className="modal-buttons">
                    <button className="unload-btn" onClick={handleUnload}>
                        Unload
                    </button>
                    <button className="cancel-btn" onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InventoryUnloadModal;
