
import React, { useState, useEffect } from 'react';

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

    // State for dynamic data  -----------------------------------------------
    const [totalStockpiles, setTotalStockpiles] = useState(0);
    const [inStock, setInStock] = useState(0);
    const [outOfStock, setOutOfStock] = useState(0);

    // Simulate fetching data from the backend (replace this with actual fetch later)
    useEffect(() => {
        // Simulating data fetching, replace with backend call
        const fetchData = () => {
            // Replace these numbers with actual data from the backend
            const fetchedTotalStockpiles = 6;
            const fetchedInStock = 4;
            const fetchedOutOfStock = 2;

            setTotalStockpiles(fetchedTotalStockpiles);
            setInStock(fetchedInStock);
            setOutOfStock(fetchedOutOfStock);
        };

        fetchData();
    }, []); // Empty dependency array to run once on component mount ----------------------------

    const stockpileData = [
        { id: 'A3S4', location: 'Malabe', capacity: 50, categories: 'Raw Material, Final products, Wastage, Returned Goods', status: 'In Stock' },
        { id: 'B2G8', location: 'Malabe', capacity: 30, categories: 'Raw Material, Final products, Wastage, Returned Goods', status: 'Out of Stock' },
        { id: 'A3S4', location: 'Malabe', capacity: 50, categories: 'Raw Material, Final products, Wastage, Returned Goods', status: 'In Stock' },{ id: 'B2G8', location: 'Malabe', capacity: 30, categories: 'Raw Material, Final products, Wastage, Returned Goods', status: 'Out of Stock' },
        { id: 'A3S4', location: 'Malabe', capacity: 50, categories: 'Raw Material, Final products, Wastage, Returned Goods', status: 'In Stock' },
      
      ];

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
                    />
                    <img src={searchImg} alt="search-icon" className="search-Img"/>
                </div>
            </div>

             {/* Stockpile Summary Cards */}
            <div className="stockpile-summary">
                <div className="summary-card">
                    <p>Total Stockpiles</p>
                    <h2>{totalStockpiles}</h2>
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

            <StockMnInventoryTable  stockpileData={stockpileData}/>

        </div>
      </div>

      <StockMnFooter />
    </div>
  );
};

export default InventoryManage;
