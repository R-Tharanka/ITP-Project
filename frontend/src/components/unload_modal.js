import React, { useState } from 'react';
import './styles/unload_modal.css'; 

const InventoryUnloadModal = ({ item, closeModal }) => {
    // State for form data, including item type, name, amount, worth, etc.
    const [unloadData, setUnloadData] = useState({
        itemType: item.type, // Pre-filled with the selected item type from the table
        itemName: item.name, // Pre-filled with the selected item name from the table
        amount: '',
        worth: '',
        occupiedSpace: '',
        date: new Date().toISOString().split('T')[0], // Default to today’s date
    });

    // Handle form changes to update the state for each input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUnloadData({
            ...unloadData,
            [name]: value,
        });
    };

    // Function to handle form submission for unloading stock
    const handleUnload = () => {
        // Perform the backend call to add to the unloading table
        // Also update the inventory status table accordingly

        console.log('Unload Data: ', unloadData);

        // Call the backend logic here once it's complete

        closeModal(); // Close the modal after submission
    };

    return (
        <div className="modal-overlay"> {/* Dark background covering the entire page */}
            <div className="unload-modal"> {/* Centered modal box */}
                <h2>Unload Stock</h2>

                {/* Item Name Selection */}
                <div className="form-group item-name-div">
                    <div className="item-name-inner-div">
                        <label>Item Name</label>
                        <select
                            name="itemName"
                            value={unloadData.itemName}
                            onChange={handleChange}
                            disabled
                        >
                            <option value={item.name}>{item.name}</option>
                            {/* If you want to allow the user to change the item name */}
                            <option value="Item 2">Item 2</option>
                            <option value="Item 3">Item 3</option>
                        </select>
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                            onChange={handleChange}
                        />
                    </div>

                    {/* Amount Input */}
                    <div className="form-group">
                        <label>Amount (kg)</label>
                        <input
                            type="number"
                            name="amount"
                            value={unloadData.amount}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="unloading-sections-div">
                    {/* Worth Input */}
                    <div className="form-group">
                        <label>Worth ($)</label>
                        <input
                            type="number"
                            name="worth"
                            value={unloadData.worth}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Occupied Space Input */}
                    <div className="form-group">
                        <label>Occupied Space (m³)</label>
                        <input
                            type="number"
                            name="occupiedSpace"
                            value={unloadData.occupiedSpace}
                            onChange={handleChange}
                        />
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
