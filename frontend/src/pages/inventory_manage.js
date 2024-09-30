
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import StockMnHeader from '../components/stock_mn_header';
import StockMnFooter from '../components/stock_mn_footer';
import StockMnSideNav from '../components/stock_mn_sidenav';
import StockMnInventoryTable from '../components/stock_mn_im_inventorytable'
import '../styles/inventory_dashboard.css';
import '../styles/inventory_manage.css';
import searchImg from '../assets/img/stockpile management/icon/search.png'

const InventoryManage = () => {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    //-------------search--------------
    const [searchQuery, setSearchQuery] = useState(''); // To hold the search input value
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Update the search query
    };
    

    const [inventoryData, setInventoryData] = useState([]); // State for inventory data

    // State for dynamic data  -----------------------------------------------
    const [totalInventories, settotalInventories] = useState(0);
    const [inStock, setInStock] = useState(1);
    const [outOfStock, setOutOfStock] = useState(1);

    // fetching data from the backend
    useEffect(() => {
        // Simulating data fetching, replace with backend call
        // const fetchData = () => {
        //     // Replace these numbers with actual data from the backend
        //     const fetchedtotalInventories = 6;
        //     const fetchedInStock = 4;
        //     const fetchedOutOfStock = 2;

        //     settotalInventories(fetchedtotalInventories);
        //     setInStock(fetchedInStock);
        //     setOutOfStock(fetchedOutOfStock);
        // };

        // fetchData();

        const fetchInventoryData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/inventory'); //URL to match  API
                const fetchedData = response.data; // Set fetched data
                setInventoryData(response.data); 

                // Calculate total inventories, in stock, and out of stock
                const totalInventoriesCount = fetchedData.length;

                // Update state with calculated values
                setInventoryData(fetchedData); 
                settotalInventories(totalInventoriesCount);

            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };
    
        fetchInventoryData();
        
    }, []);

    // console.log(inventoryData);

    // Filter inventory data based on search query
    const filteredInventory = inventoryData.filter(item => {
        const selectedItemTypes = Object.keys(item.itemTypes || {})
            .filter(key => item.itemTypes[key]) // Get the keys where the value is true
            .map(key => key.replace(/([A-Z])/g, ' $1').trim()); // Convert camelCase to normal text
    
        return (
            item.Id.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.capacity.toString().toLowerCase().includes(searchQuery.toLowerCase()) || // Convert capacity to string for searching
            selectedItemTypes.join(', ').toLowerCase().includes(searchQuery.toLowerCase()) // Search in selectedItemTypes
        );
    });
    

    return (
    <div className="dashboard-container">
      <StockMnHeader />

      <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>

        {/* Pass toggleSidebar function to the side nav component */}
        <StockMnSideNav isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

        <div className={`stockpile-section ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>

            {/* Title Section */}
            <div className="stockpile-overview">
                
                <div className="text-wrap">
                    <h1 className="stockpile-title">Manage Invetory</h1>
                    <p className="stockpile-description">
                                Overview of current inventory, raw materials, semifinished products, final products, returned goods, and wastage
                    </p>
                </div>

                <div className="stockpile-search">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <img src={searchImg} alt="search-icon" className="search-Img"/>
                </div>

            </div>

             {/* Stockpile Summary Cards */}
            <div className="stockpile-summary">
                <div className="summary-card">
                    <p>Total Inventories</p>
                    <h2>{totalInventories}</h2>
                </div>
                <div className="summary-card">
                    <p>In Stock</p>
                    <h2>{inStock}</h2>
                </div>
                <div className="summary-card">
                    <p>Out of Stock</p>
                    <h2>{outOfStock}</h2>
                </div>
            </div>

            <StockMnInventoryTable  stockpileData={filteredInventory}/>

        </div>
      </div>

      <StockMnFooter />
    </div>
  );
};

export default InventoryManage;
