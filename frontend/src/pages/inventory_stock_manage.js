import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API calls

import StockMnHeader from '../components/stock_mn_header';
import StockMnFooter from '../components/stock_mn_footer';
import StockMnSideNav from '../components/stock_mn_sidenav';
import InventoryFilterSection from '../components/stock_mn_mnstock_filter';
import InventoryChartSummary from '../components/chart/stock_mn_stockmn_chart_summary';
import StockDataTable from '../components/stock_mn_mnstock_stocktable';
import '../styles/inventory_stock_manage.css';

const InventoryStockManage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [filteredCategory, setFilteredCategory] = useState('Raw Materials'); // For storing the selected category
    const [categoryData, setCategoryData] = useState([]); // Placeholder for selected category data

    const [tableData, setTableData] = useState([]); //for table

    //fetching data from backend
    const fetchData = async () => {
        try {
            // Make an API request to fetch the inventory status data
            const response = await axios.get('http://localhost:5000/api/inventory_status'); //API route
            setTableData(response.data); // Update tableData with fetched data from the backend
        } catch (error) {
            console.error('Error fetching inventory status data:', error);
        }
    };

    useEffect(() => {
        // Fetch data from inventory_status table when the component mounts
        fetchData();
    }, []);
    

    useEffect(() => {
        // Fetch or initialize default data
        const defaultData = [
            { name: 'Sample Item', amount: 100 },
            { name: 'Another Item', amount: 200 }
        ];
        setCategoryData(defaultData);

        // Call fetchData to load data when the component mounts
        fetchData();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleFilterApply = (category) => {
        setFilteredCategory(category);
        // Placeholder: Here you'll fetch the data from backend later
        console.log(`Filtering by: ${category}`);

        let fetchedData = [];

        // Based on category, fetch or set different data.
        // Simulated raw data for example
        // Process and filter the data based on the selected category
        if (category === 'Raw Materials') {
            fetchedData = [
            { name: 'Item 1', amount: 300 },
            { name: 'Item 2', amount: 200 }
            ];
        } else if (category === 'Returned Goods') {
            fetchedData = [
                { name: 'Turmeric', amount: 650 },
                { name: 'Ginger', amount: 450 },
                { name: 'Dry Chilli', amount: 500 },
                { name: 'Turmeric', amount: 480 },
                { name: 'Ginger', amount: 420 },
            ];
        }

        // Here you'd fetch data from backend based on the selected category (Raw Materials, etc.)
        
        // In reality, you would fetch this data from the backend.

        setCategoryData(fetchedData);// Simulate fetching data based on the selected category

    };

    return (
        <div className="dashboard-container">
            <StockMnHeader />

            <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                <StockMnSideNav isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

                <div className={`stockpile-section ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                    {/* Filter Section */}
                    <InventoryFilterSection onFilterApply={handleFilterApply} />

                    {/* Chart and Summary Section */}
                    <InventoryChartSummary categoryData={categoryData} />

                    <div className="table-container-div">
                        <StockDataTable tableData={tableData} />
                    </div>

                </div>
            </div>

            <StockMnFooter />
        </div>
    );
};

export default InventoryStockManage;
