import React from 'react';
import './styles/stock_mn_im_inventorytable.css';


const ST_InventoryTable = ({ stockpileData }) => {
  return (
    <div className="inventory-table-container">
      <h2>Invetory Table</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Categories</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stockpileData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.location}</td>
              <td>{item.capacity}</td>
              <td>{item.categories}</td>
              <td>
                <span className={`status-badge ${item.status === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>
                  {item.status}
                </span>
              </td>
              <td className="action-buttons">
                <button className="update-button">Update</button>
                <button className="remove-button">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ST_InventoryTable;
