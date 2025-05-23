import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockMnHeader from '../components/stock_mn_header';
import StockMnFooter from '../components/stock_mn_footer';
import StockMnSideNav from '../components/stock_mn_sidenav';
import St_InventoryStatus from '../components/stock_mn_inventory_status';
import St_dshb_StockTable from '../components/stock_mn_dashb_stocktable';
import AddInventoryForm from '../components/AddInventoryForm';
import '../styles/inventory_dashboard.css';

import item1img from '../assets/img/stockpile management/item1.png';

import finalChilyPowder from '../assets/img/stockpile management/final-chily-powder.png';
import finalTurmeric from '../assets/img/stockpile management/final-turmeric.png';
import itemrwChlily from '../assets/img/stockpile management/rw-chlily.png';
import rwGarlic from '../assets/img/stockpile management/rw-garlic.png';
import rwGinger from '../assets/img/stockpile management/rw-ginger.png';
import rwTurmeric from '../assets/img/stockpile management/rw-turmeric.png';
import wasteGarlic from '../assets/img/stockpile management/waste-garlic.png';
import wasteGinger from '../assets/img/stockpile management/waste-ginger.png';


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

  // Filter the data where amount is <= 100
  const filteredItems = allTableData.filter(item => item.amount <= 100);

  const getItemImage = (itemType, itemName) => {
    const imageMap = {
      'Raw Material': {
        'Ginger': rwGinger,
        'Garlic': rwGarlic,
        'Turmeric': rwTurmeric,
        'Dry Chilly': itemrwChlily,
      },
      'Final Products': {
        'Dry Chilly': finalChilyPowder,
        'Turmeric': finalTurmeric,
      },
      'Wastage': {
        'Ginger': wasteGinger,
        'Garlic': wasteGarlic,
      },
      // Add more mappings as needed
    };

    console.log('Checking image for:', itemType, itemName);

    // Return the appropriate image if found, otherwise fallback to item1img
    const itemImage = imageMap[itemType]?.[itemName] || item1img; // Access itemName without toLowerCase()
    if (itemImage === item1img) {
      console.warn(`Image not found for: ${itemType} - ${itemName}`); // Log a warning if the image is not found
    }
    return itemImage;
  };

  return (
    <div className="dashboard-container">
      <StockMnHeader />

      <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        {/* Pass toggleSidebar function to the side nav component */}
        <StockMnSideNav isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

        <div className={`stockpile-section ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
          <div className="stockpile-header">
            <button className="stockpile-btn">Stockpile #I001</button>
            <button className="add-stockpile-btn" onClick={() => setShowAddInventoryModal(true)}>+ Add Inventory</button>
          </div>

          <div className="stockpile-items">

            {/* Mapping over filtered items and rendering them */}
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div key={index} className="stockpile-item">
                  <div className="stockpile-item-indiv1">
                    {/* Dynamically select the image based on itemType and itemName */}
                    <img src={getItemImage(item.itemType, item.itemName)} alt={item.itemName} />
                    <h3>{item.itemName}</h3> {/* Display the Item Name */}
                    <div class="arrow"></div>
                  </div>
                  <div className="stockpile-item-indiv2">
                    <p>{item.itemType}</p>
                    <span>{item.amount} kg</span> {/* Display the Item Amount */}
                  </div>
                </div>
              ))
            ) : (
              <p>No items matching the criteria.</p>
            )}

          </div>

          <St_InventoryStatus tableData={allTableData} />

          <St_dshb_StockTable tableData={allTableData} />

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
