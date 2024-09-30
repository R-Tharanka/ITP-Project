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
    const [filteredCategory, setFilteredCategory] = useState('Raw Material'); // For storing the selected category
    const [categoryData, setCategoryData] = useState([]); // Placeholder for selected category data
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
        // **Filter the data whenever tableData or filteredCategory changes**
        const filtered = tableData.filter((item) => item.itemType === filteredCategory);
        setFilteredData(filtered); // **Update filteredData with the filtered results**
    }, [tableData, filteredCategory]);
    
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


    // Function to filter data based on the selected category
    const filterData = (data, category) => {
        const filtered = data.filter((item) => item.itemType === category);
        setFilteredData(filtered);
    };

    const handleFilterApply = (category) => {
        setFilteredCategory(category); // Set the selected category
        console.log(`Filtering by: ${category}`); // Log the selected category
        const filtered = tableData.filter((item) => item.itemType === category);
        setFilteredData(filtered); // Update filtered data based on the selected category
    };
    
    

    // const handleFilterApply = (category) => {
    //     setFilteredCategory(category);
    //     // Placeholder: Here you'll fetch the data from backend later
    //     filterData(tableData, category);
    //     console.log(`Filtering by: ${category}`);

    //     let fetchedData = [];

    //     // Based on category, fetch or set different data.
    //     // Simulated raw data for example
    //     // Process and filter the data based on the selected category
    //     if (category === 'Raw Materials') {
    //         fetchedData = [
    //         { name: 'Item 1', amount: 300 },
    //         { name: 'Item 2', amount: 200 }
    //         ];
    //     } else if (category === 'Returned Goods') {
    //         fetchedData = [
    //             { name: 'Turmeric', amount: 650 },
    //             { name: 'Ginger', amount: 450 },
    //             { name: 'Dry Chilli', amount: 500 },
    //             { name: 'Turmeric', amount: 480 },
    //             { name: 'Ginger', amount: 420 },
    //         ];
    //     }

    //     // Here you'd fetch data from backend based on the selected category (Raw Materials, etc.)
        
    //     // In reality, you would fetch this data from the backend.

    //     setCategoryData(fetchedData);// Simulate fetching data based on the selected category

    // };

    return (
        <div className="dashboard-container">
            <StockMnHeader />

            <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                <StockMnSideNav isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

                <div className={`stockpile-section ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                    {/* Filter Section */}
                    {/* <InventoryFilterSection onFilterApply={handleFilterApply} /> */}
                    <InventoryFilterSection 
                        onFilterApply={handleFilterApply} 
                        setFilteredCategory={setFilteredCategory} 
                        setFilteredData={setFilteredData}
                        tableData={tableData} // Pass tableData as a prop
                    />

                    {/* Chart and Summary Section */}
                    <InventoryChartSummary categoryData={categoryData} />

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
