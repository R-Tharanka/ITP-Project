import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import AddStockForm from './AddStockForm';
import './styles/stock_mn_dashb_stocktable.css';

const St_dshb_StockTable = ({ tableData }) => {

  const [showAddStockModal, setShowAddStockModal] = useState(false); //State to handle modal visibility

  return (
    <div className="table-container">
      <div className="table-actions">
        <button className="add-stock">
          <li className="add-stock-btn" onClick={() => setShowAddStockModal(true) } title="Add Stock">
            <span>+ Add Stock</span>
          </li>
        </button>
        <Link to="/stock_manage">
          <button className="unload-stock">- Unload Stock</button>
        </Link>
      </div>

      <div className="table-wrapper">
        <div className="table-scrollable">
          <table className="stock-table">
              <thead>
              <tr>
                <th title="Stock Keeping Unit">SKU</th>
                <th>Item Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount (kg)</th>
                <th>Worth ($)</th>
                <th>Occupied Space (m³)</th>
              </tr>
              </thead>
              <tbody>
                  {tableData.length > 0 ? (
                      tableData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.sku}</td>
                            <td>{item.itemName}</td>
                            <td>{item.itemType}</td>
                            <td>{format(new Date(item.date), 'yyyy-MM-dd')}</td>
                            <td>{item.amount}</td>
                            <td>{item.worth}</td>
                            <td>{item.occupiedSpace}</td>
                        </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan="8" className="no-data">No data available</td>
                      </tr>
                  )}
              </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding Stock */}
      <AddStockForm 
        showModal={showAddStockModal} // **NEW** Pass the modal visibility state
        onClose={() => setShowAddStockModal(false)} // **NEW** Function to close the modal
      />
      
    </div>
  );
};

export default St_dshb_StockTable;
