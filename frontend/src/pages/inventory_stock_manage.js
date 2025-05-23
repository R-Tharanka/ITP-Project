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

    const [filteredCategory, setFilteredCategory] = useState('All'); // For storing the selected category
    const [filteredData, setFilteredData] = useState([]); // For storing the filtered data based on category

    const [tableData, setTableData] = useState([]); //for table

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    //fetching data from backend
    const fetchData = async () => {
        try {
            // Make an API request to fetch the inventory status data
            const response = await axios.get('http://localhost:5000/api/inventory_status'); //API route
            setTableData(response.data); // Update tableData with fetched data from the backend
            setFilteredData(response.data); // Initialize filteredData with the fetched data

            console.log(response.data); // Log the fetched data to check its structure
        } catch (error) {
            console.error('Error fetching inventory status data:', error);
        }
    };

    useEffect(() => {
        // Fetch data from inventory_status table when the component mounts
        fetchData();
    }, []);

    useEffect(() => {
        // **Filter the data whenever tableData or filteredCategory changes**
        if (filteredCategory === 'All') {
            setFilteredData(tableData);  // Show all data when "All" is selected
        } else {
            const filtered = tableData.filter((item) => item.itemType === filteredCategory);
            setFilteredData(filtered);  // Update filtered data based on category
        }
    }, [tableData, filteredCategory]);


    // // Function to filter data based on the selected category
    // const filterData = (data, category) => {
    //     const filtered = data.filter((item) => item.itemType === category);
    //     setFilteredData(filtered);
    // };

    // const handleFilterApply = (category) => {
    //     setFilteredCategory(category); // Set the selected category
    //     console.log(`Filtering by: ${category}`); // Log the selected category
    //     const filtered = tableData.filter((item) => item.itemType === category);
    //     setFilteredData(filtered); // Update filtered data based on the selected category
    // };

    return (
        <div className="dashboard-container">
            <StockMnHeader />

            <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                <StockMnSideNav isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

                <div className={`stockpile-section ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>

                    {/* Filter Section */}
                    <InventoryFilterSection
                        setFilteredCategory={setFilteredCategory}
                        setFilteredData={setFilteredData}
                        tableData={tableData}  // Pass tableData to the filter section
                    />

                    {/* Chart and Summary Section */}
                    <InventoryChartSummary categoryData={filteredData} filterType={filteredCategory} />

                    <div className="table-container-div">
                        <StockDataTable tableData={filteredData} />
                    </div>

                </div>
            </div>

            <StockMnFooter />
        </div>
    );
};

export default InventoryStockManage;
