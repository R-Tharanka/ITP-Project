import React from 'react';
import './styles/stock_mn_inventory_status.css';
import InventoryPieChart from './chart/stock_mn_chartInventory_status';

const St_InventoryStatus = () => {
  return (
    <div className="inventory-container">

      {/* Left section: Pie chart */}

      <InventoryPieChart/>

      {/* Right section: Inventory details */}

      <div className="inventory-details">

            <div className="inventory-details-headings">
                <h3>Inventory Status</h3>
                <p>Current Status</p>
            </div>

            <div className="details">

                <div className="details-row">
                <p className="label"><strong>Inventory Id:</strong></p>
                <p className="value">#0010</p>
                </div>

                <hr />
                <div className="details-row">
                <p className="label"><strong>Location:</strong></p>
                <p className="value">Malabe</p>
                </div>

                <hr />
                <div className="details-row">
                <p className="label"><strong>Capacity:</strong></p>
                <p className="value">10,000 m³</p>
                </div>

                <hr />
                <div className="details-row">
                <p className="label"><strong>Item Types:</strong></p>
                <p className="value">Raw Material, Final Products, Wastage, Returned Goods</p>
                </div>

            </div>

            <div className="progress-bar">
                <div className="used"></div>
            </div>
            <div className="status-labels">
                <span>Used</span>
                <span>Free</span>
            </div>
        </div>


    </div>
  );
};

export default St_InventoryStatus;
