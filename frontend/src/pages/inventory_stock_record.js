// import React, { useState, useEffect } from 'react';

// import StockMnHeader from '../components/stock_mn_header';
// import StockMnFooter from '../components/stock_mn_footer';
// import StockMnSideNav from '../components/stock_mn_sidenav';
// import '../styles/inventory_dashboard.css';
// import searchImg from '../assets/img/stockpile management/icon/search.png'

// const InventoryManage = () => {

//     const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

//     const toggleSidebar = () => {
//         setIsSidebarCollapsed(!isSidebarCollapsed);
//     };

//     return (
//     <div className="dashboard-container">
//       <StockMnHeader />

//       <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>

//         {/* Pass toggleSidebar function to the side nav component */}
//         <StockMnSideNav isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

//         <div className={`stockpile-section ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>

//             <div className="stock-search">
//                     <input
//                         type="text"
//                         className="search-input"
//                         placeholder="Search"
//                     />
//                     <img src={searchImg} alt="search-icon" className="search-Img"/>
//             </div>

//             {/* body content goes here */}

//         </div>
//       </div>

//       <StockMnFooter />
//     </div>
//   );
// };

// export default InventoryManage;


import React, { useState } from 'react';

import StockMnHeader from '../components/stock_mn_header';
import StockMnFooter from '../components/stock_mn_footer';
import StockMnSideNav from '../components/stock_mn_sidenav';
import '../styles/inventory_stock_record.css';

const InventoryStockRecord = () => {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('loading');

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const loadingData = [
        { id: '#001', name: 'turmeric', type: 'Raw Material', date: '11/02/2023', amount: '600 kg', worth: 'LKR 650 000', space: '84 m³' },
        { id: '#001', name: 'turmeric', type: 'Raw Material', date: '11/02/2023', amount: '600 kg', worth: 'LKR 650 000', space: '84 m³' },
        { id: '#001', name: 'turmeric', type: 'Raw Material', date: '11/02/2023', amount: '600 kg', worth: 'LKR 650 000', space: '84 m³' },
        { id: '#001', name: 'turmeric', type: 'Raw Material', date: '11/02/2023', amount: '600 kg', worth: 'LKR 650 000', space: '84 m³' },
        { id: '#001', name: 'turmeric', type: 'Raw Material', date: '11/02/2023', amount: '600 kg', worth: 'LKR 650 000', space: '84 m³' },
        { id: '#001', name: 'turmeric', type: 'Raw Material', date: '11/02/2023', amount: '600 kg', worth: 'LKR 650 000', space: '84 m³' },
        // More loading data here
    ];

    const unloadingData = [
        { id: '#002', name: 'ginger', type: 'Raw Material', date: '12/02/2023', amount: '500 kg', worth: 'LKR 550 000', space: '72 m³' },
        { id: '#002', name: 'ginger', type: 'Raw Material', date: '12/02/2023', amount: '500 kg', worth: 'LKR 550 000', space: '72 m³' },
        { id: '#002', name: 'ginger', type: 'Raw Material', date: '12/02/2023', amount: '500 kg', worth: 'LKR 550 000', space: '72 m³' },
        { id: '#002', name: 'ginger', type: 'Raw Material', date: '12/02/2023', amount: '500 kg', worth: 'LKR 550 000', space: '72 m³' },
        { id: '#002', name: 'ginger', type: 'Raw Material', date: '12/02/2023', amount: '500 kg', worth: 'LKR 550 000', space: '72 m³' },
        { id: '#002', name: 'ginger', type: 'Raw Material', date: '12/02/2023', amount: '500 kg', worth: 'LKR 550 000', space: '72 m³' },
        // More unloading data here
    ];

    const downloadReport = (data) => {

        if (data.length === 0) {
            alert('No data available to generate a report.');
            return;
        }
        
        const csvData = [
            ["Id", "Item Name", "Type", "Date", "Amount", "Worth", "Occupied Space"],
            ...data.map(item => [item.id, item.name, item.type, item.date, item.amount, item.worth, item.space])
        ];

        const csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${activeTab}_report.csv`);
        document.body.appendChild(link);
        link.click();

        console.log(data);  // To verify that the data being passed has rows

    };

    const renderTable = (data) => (
        <table className="stock-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Item Name</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Worth</th>
                    <th>Occupied Space</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                        <td>{item.worth}</td>
                        <td>{item.space}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="dashboard-container">
            <StockMnHeader />

            <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                
                {/* Pass toggleSidebar function to the side nav component */}
                <StockMnSideNav isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

                <div className={`stockpile-section ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                    <div className="tab-section">
                        <button className={`tab-button ${activeTab === 'loading' ? 'active' : ''}`}
                                onClick={() => setActiveTab('loading')}>
                            Loading
                        </button>
                        <button className={`tab-button ${activeTab === 'unloading' ? 'active' : ''}`}
                                onClick={() => setActiveTab('unloading')}>
                            Unloading
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'loading' ? renderTable(loadingData) : renderTable(unloadingData)}
                        
                    </div>

                    <div className="gen-rep-btn-div">
                        <button onClick={() => downloadReport(activeTab === 'loading' ? loadingData : unloadingData)} className="generate-report-btn">
                            Generate a Report
                        </button>
                    </div>
                </div>
            </div>

            <StockMnFooter />
        </div>
    );
};

export default InventoryStockRecord;
