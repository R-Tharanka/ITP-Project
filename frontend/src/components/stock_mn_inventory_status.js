import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/stock_mn_inventory_status.css';
import InventoryPieChart from './chart/stock_mn_chartInventory_status';

const St_InventoryStatus = ({ tableData }) => {

  const [totalOccupiedSpace, setTotalOccupiedSpace] = useState(0);

  const [inventoryData, setInventoryData] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState(null);

  console.log('total OccupiedSpace- dashboard summary section:', totalOccupiedSpace);

  // Callback to update total occupied space
  const handleOccupiedSpaceCalculated = (occupiedSpace) => {
    console.log('Occupied space received from pie chart:', occupiedSpace);
    setTotalOccupiedSpace(occupiedSpace);
  };

  const fetchInventoryData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/inventory'); //URL to match  API
        const fetchedData = response.data; // Set fetched data

        console.log('fetchedData dashboard summary section:', fetchedData);

        const filteredInventory = fetchedData.find(item => item.Id === "#I001");
        setSelectedInventory(filteredInventory);

    } catch (error) {
        console.error('Error fetching inventory data:', error);
    }
};

// Fetch data on component mount
useEffect(() => {
  fetchInventoryData();
}, []);
  
  return (
    <div className="inventory-container">

      {/* Left section: Pie chart */}

      <InventoryPieChart tableData={tableData} onTotalSpaceUpdate={handleOccupiedSpaceCalculated} />

      {/* Right section: Inventory details */}

      <div className="inventory-details">

        <div className="inventory-details-headings">
            <h3>Inventory Status</h3>
            <p>Current Status</p>
        </div>

        {selectedInventory ? (
          <div className="details">
            <div className="details-row">
              <p className="label"><strong>Inventory Id:</strong></p>
              <p className="value">{selectedInventory.Id}</p>
            </div>

            <hr />
            <div className="details-row">
              <p className="label"><strong>Location:</strong></p>
              <p className="value">{selectedInventory.location}</p>
            </div>

            <hr />
            <div className="details-row">
              <p className="label"><strong>Capacity:</strong></p>
              <p className="value">{selectedInventory.capacity} m³</p>
            </div>

            <hr />
            <div className="details-row">
              <p className="label"><strong>Item Types:</strong></p>
              <p className="value">
                {selectedInventory.itemTypes.rawMaterial && 'Raw Material, '}
                {selectedInventory.itemTypes.semiFinalProducts && 'Semi-Final Products, '}
                {selectedInventory.itemTypes.finalProducts && 'Final Products, '}
                {selectedInventory.itemTypes.returnedGoods && 'Returned Goods, '}
                {selectedInventory.itemTypes.wastage && 'Wastage'}
              </p>
            </div>

            <div className="progress-bar">
              <div className="used" style={{ width: `${(totalOccupiedSpace / selectedInventory.capacity) * 100}%` }}></div>
            </div>
            <div className="status-labels">
                <span>Used</span>
                <span>Free</span>
            </div>

          </div>
        ) : (
          <p>Loading inventory data...</p>
        )}
      </div>

    </div>
  );
};

export default St_InventoryStatus;
