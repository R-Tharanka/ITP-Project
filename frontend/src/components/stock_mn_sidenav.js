import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddStockForm from './AddStockForm';
import AddInventoryForm from './AddInventoryForm';
import './styles/stock_mn_sidenav.css';

import DashboardIcon from '../assets/img/stockpile management/icon/dashboard.png';
import AddStockpileIcon from '../assets/img/stockpile management/icon/add inventory.png';
import ManageStockpileIcon from '../assets/img/stockpile management/icon/inventory management.png';
import AddStockIcon from '../assets/img/stockpile management/icon/add stock.png';
import StockRecordIcon from '../assets/img/stockpile management/icon/stock record.png';
import ManageStockIcon from '../assets/img/stockpile management/icon/manage stock.png';
import ToggleIcon from '../assets/img/stockpile management/icon/menu.png'; 

const St_SideNav = ({ isCollapsed, toggleSidebar }) => {
  
   const [activeItem, setActiveItem] = useState("Dashboard"); // Track active item

   const [showAddStockModal, setShowAddStockModal] = useState(false); //State to handle modal visibility
   
   const [showAddInventoryModal, setShowAddInventoryModal] = useState(false); // **Added state for Add Inventory modal**

  return (
    <div className={isCollapsed ? "sidebar collapsed" : "sidebar"}>

      <div className="toggle-btn" onClick={toggleSidebar}>
        <img src={ToggleIcon} alt="Toggle" className="toggle-icon" />
      </div>

      <ul className="nav-items">

        <li className={`nav-item ${activeItem === "Dashboard" ? "active" : ""}`} onClick={() => setActiveItem("Dashboard")}>
          <Link to="/inventory">
            <img src={DashboardIcon} alt="Dashboard" className="icon" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
        </li>

        <li className={`nav-item ${activeItem === "Add Inventory" ? "active" : ""}`} onClick={() => {setActiveItem("Add Inventory"); setShowAddInventoryModal(true);}}>
          <img src={AddStockpileIcon} alt="Add Inventory" className="icon" />
          {!isCollapsed && <span>Add Inventory</span>}
        </li>

        <li className={`nav-item ${activeItem === "Manage Inventory" ? "active" : ""}`} onClick={() => setActiveItem("Manage Inventory")}>
          <Link to="/inventory_manage">
            <img src={ManageStockpileIcon} alt="Manage Inventory" className="icon" />
            {!isCollapsed && <span>Manage Inventory</span>}
          </Link>
        </li>

        {/* Updated onClick event to show the modal */}
        <li className={`nav-item ${activeItem === "Add Stock" ? "active" : ""}`} 
            onClick={() => { setActiveItem("Add Stock"); setShowAddStockModal(true); //Open modal when Add Stock is clicked
            }}>
          <img src={AddStockIcon} alt="Add Stock" className="icon" />
          {!isCollapsed && <span>Add Stock</span>}
        </li>

        <li className={`nav-item ${activeItem === "Stock Record" ? "active" : ""}`} onClick={() => setActiveItem("Stock Record")}>
          <Link to="/stock_record">
            <img src={StockRecordIcon} alt="Stock Record" className="icon" />
            {!isCollapsed && <span>Stock Record</span>}
          </Link>
        </li>

        <li className={`nav-item ${activeItem === "Manage Stock" ? "active" : ""}`} onClick={() => setActiveItem("Manage Stock")}>
          <Link to="/stock_manage">
            <img src={ManageStockIcon} alt="Manage Stock" className="icon" />
            {!isCollapsed && <span>Manage Stock</span>}
          </Link>
        </li>

      </ul>

      {/* Modal for Adding Stock */}
      <AddStockForm 
        showModal={showAddStockModal} // **NEW** Pass the modal visibility state
        onClose={() => setShowAddStockModal(false)} // **NEW** Function to close the modal
      />

       {/* Modal for Adding Inventory */}
       <AddInventoryForm 
         showModal={showAddInventoryModal} // **Pass the modal visibility state for Add Inventory**
         onClose={() => setShowAddInventoryModal(false)} // **Function to close the modal for Add Inventory**
       />

    </div>
  );
};

export default St_SideNav;
