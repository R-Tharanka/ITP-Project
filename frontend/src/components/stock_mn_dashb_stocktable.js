import React, { useState, useEffect } from 'react';
import './styles/stock_mn_dashb_stocktable.css';

const St_dshb_StockTable = () => {

  // Example data for now, replace this with backend data later
  const [stocks, setStocks] = useState([
    { id: '#0034', name: 'Tumeric', type: 'Raw Material', date: '11/02/2023', amount: '600 kg', worth: 'LKR 650 000', space: '84 m³' },
    { id: '#0034', name: 'Tumeric', type: 'Raw Material', date: '11/02/2023', amount: '600 kg', worth: 'LKR 650 000', space: '84 m³' },
    { id: '#0034', name: 'Tumeric', type: 'Raw Material', date: '11/02/2023', amount: '600 kg', worth: 'LKR 650 000', space: '84 m³' },
    { id: '#0034', name: 'Tumeric', type: 'Raw Material', date: '11/02/2023', amount: '600 kg', worth: 'LKR 650 000', space: '84 m³' },
    { id: '#0034', name: 'Tumeric', type: 'Raw Material', date: '11/02/2023', amount: '600 kg', worth: 'LKR 650 000', space: '84 m³' },
  ]);

  return (
    <div className="table-container">
      <div className="table-actions">
        <button className="add-stock">+ Add Stock</button>
        <button className="unload-stock">- Unload Stock</button>
      </div>

      <div className="table-wrapper">
        <table className="stock-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Worth</th>
                <th>Occupied Space</th>
            </tr>
            </thead>
            <tbody>
            {stocks.map((stock, index) => (
                <tr key={index}>
                <td>{stock.id}</td>
                <td>{stock.name}</td>
                <td>{stock.type}</td>
                <td>{stock.date}</td>
                <td>{stock.amount}</td>
                <td>{stock.worth}</td>
                <td>{stock.space}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default St_dshb_StockTable;
