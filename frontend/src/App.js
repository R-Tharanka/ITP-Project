import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';

import OperationPortal from './pages/operation_portal';
import InventoryDashboard from './pages/inventory_dashboard';
import InventoryManage from './pages/inventory_manage';
import InventoryStockRecord from './pages/inventory_stock_record'
import InventoryStockManage from './pages/inventory_stock_manage'

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<OperationPortal />} /> 
        <Route path="/inventory" element={<InventoryDashboard />} />
        <Route path="/inventory_manage" element={<InventoryManage/>} />
        <Route path="/stock_record" element={<InventoryStockRecord/>} />
        <Route path="/stock_manage" element={<InventoryStockManage/>} />

      </Routes>
    </Router>
  );
}

export default App;
