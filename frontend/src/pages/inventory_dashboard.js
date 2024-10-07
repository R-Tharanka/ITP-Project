import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import StockMnHeader from '../components/stock_mn_header';
import StockMnFooter from '../components/stock_mn_footer';
import StockMnSideNav from '../components/stock_mn_sidenav';
import St_InventoryStatus from '../components/stock_mn_inventory_status';
import St_dshb_StockTable from '../components/stock_mn_dashb_stocktable';
import AddInventoryForm from '../components/AddInventoryForm';
import '../styles/inventory_dashboard.css';

const InventoryDashboard = () => {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [allTableData, setallTableData] = useState([]);

  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false); // state for Add Inventory modal

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  //fetching data from backend
  const fetchData = async () => {
    try {
        // Make an API request to fetch the inventory status data
        const response = await axios.get('http://localhost:5000/api/inventory_status'); //API route
        setallTableData(response.data); // Update tableData with fetched data from the backend

        console.log(response.data);
    } catch (error) {
        console.error('Error fetching inventory status data:', error);
    }
  };

  useEffect(() => {
    // Fetch data from inventory_status table when the component mounts
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <StockMnHeader />

      <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        {/* Pass toggleSidebar function to the side nav component */}
        <StockMnSideNav isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

        <div className={`stockpile-section ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
          <div className="stockpile-header">
            <button className="stockpile-btn">Stockpile #I001</button>
            <button className="add-stockpile-btn"  onClick={() => setShowAddInventoryModal(true) }>+ Add Inventory</button>
          </div>

          <div className="stockpile-items">
            <div className="stockpile-item">
              <div className="stockpile-item-indiv1">
                <img src={require('../assets/img/stockpile management/item1.png')} alt="Item 1" />
                <h3>Item 1</h3>
              </div>
              <div className="stockpile-item-indiv2">
                <p>Item count</p>
                <span>600 kg</span>
              </div>
            </div>
            
            <div className="stockpile-item">
              <div className="stockpile-item-indiv1">
                <img src={require('../assets/img/stockpile management/item2.png')} alt="Item 2" />
                <h3>Item 2</h3>
              </div>
              <div className="stockpile-item-indiv2">
                <p>Item count</p>
                <span>200 kg</span>
              </div>
            </div>

            <div className="stockpile-item">
              <div className="stockpile-item-indiv1">
                <img src={require('../assets/img/stockpile management/item1.png')} alt="Item 3" />
                <h3>Item 3</h3>
              </div>
              <div className="stockpile-item-indiv2">
                <p>Item count</p>
                <span>500 kg</span>
              </div>
            </div>

            <div className="stockpile-item">
              <div className="stockpile-item-indiv1">
                <img src={require('../assets/img/stockpile management/item2.png')} alt="Item 4" />
                <h3>Item 4</h3>
              </div>
              <div className="stockpile-item-indiv2">
              <p>Item count</p>
              <span>100 kg</span>
              </div>
            </div>
            
          </div>

          <St_InventoryStatus tableData={allTableData}/>

          <St_dshb_StockTable tableData={allTableData}  />

        </div>
      </div>

      <div className={`footer-main-container ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <StockMnFooter />
      </div>

      {/* Modal for Adding Inventory */}
      <AddInventoryForm 
         showModal={showAddInventoryModal} // **Pass the modal visibility state for Add Inventory**
         onClose={() => setShowAddInventoryModal(false)} // **Function to close the modal for Add Inventory**
       />

    </div>
  );
};

export default InventoryDashboard;
