import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';  // Import jsPDF
import 'jspdf-autotable';  // Import autoTable for tables in jsPDF
import { format } from 'date-fns'; // Importing format from date-fns

import StockMnHeader from '../components/stock_mn_header';
import StockMnFooter from '../components/stock_mn_footer';
import StockMnSideNav from '../components/stock_mn_sidenav';
import '../styles/inventory_stock_record.css';

const InventoryStockRecord = () => {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('loading');
    const [fileType, setFileType] = useState('csv');

    const [loadingData, setLoadingData] = useState([]); // Stock data from backend


    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const unloadingData = [
        { id: '#002', name: 'ginger', type: 'Raw Material', date: '12/02/2023', amount: '500 kg', worth: 'LKR 550 000', space: '72 m³' },
        { id: '#002', name: 'ginger', type: 'Raw Material', date: '12/02/2023', amount: '500 kg', worth: 'LKR 550 000', space: '72 m³' },
        { id: '#002', name: 'ginger', type: 'Raw Material', date: '12/02/2023', amount: '500 kg', worth: 'LKR 550 000', space: '72 m³' },
        { id: '#002', name: 'ginger', type: 'Raw Material', date: '12/02/2023', amount: '500 kg', worth: 'LKR 550 000', space: '72 m³' },
        { id: '#002', name: 'ginger', type: 'Raw Material', date: '12/02/2023', amount: '500 kg', worth: 'LKR 550 000', space: '72 m³' },
        { id: '#002', name: 'ginger', type: 'Raw Material', date: '12/02/2023', amount: '500 kg', worth: 'LKR 550 000', space: '72 m³' },
        // More unloading data here
    ];

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/stock');  // API endpoint
                setLoadingData(response.data);  //response.data contains stock records
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };
    
        fetchStocks();
    }, []);
    

    const downloadReport = (data) => {
        if (data.length === 0) {
            alert('No data available to generate a report.');
            return;
        }
    
        if (fileType === 'csv') {
            // CSV Generation
            const csvData = [
                ["SKU", "Item Name", "Type", "Date", "Amount", "Worth", "Occupied Space"],
                ...data.map(item => [
                    item.sku,  
                    item.itemName,  
                    item.itemType,  
                    format(new Date(item.date), 'yyyy-MM-dd'), // Format date
                    item.amount,
                    item.worth,
                    item.occupiedSpace
                ])
            ];
    
            const csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(",")).join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `${activeTab}_report.csv`);
            document.body.appendChild(link);
            link.click();
        } else if (fileType === 'pdf') {
            // PDF Generation
            const doc = new jsPDF();
            
            doc.text(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report`, 14, 10);
            
            doc.autoTable({
                head: [["SKU", "Item Name", "Type", "Date", "Amount", "Worth", "Occupied Space"]],
                body: data.map(item => [
                    item.sku,
                    item.itemName,
                    item.itemType,
                    format(new Date(item.date), 'yyyy-MM-dd'), // Format date
                    item.amount,
                    item.worth,
                    item.occupiedSpace
                ]),

                // Custom Styles for PDF
                styles: {
                    fontSize: 10,          // Font size for body cells
                    cellPadding: 3,        // Padding for each cell
                    valign: 'middle',      // Vertically align text to the middle
                    halign: 'left',      // Horizontally align text to the center
                    lineColor: [0, 0, 0],  // Cell border color
                    lineWidth: 0.2,        // Border width
                },
                headStyles: {
                    fillColor: [22, 160, 133], // Header background color (RGB)
                    textColor: [255, 255, 255], // Header text color (white)
                    fontSize: 12,              // Font size for header
                    fontStyle: 'bold',         // Bold header text
                    halign: 'center',          // Header text alignment
                },
                columnStyles: {
                    0: { halign: 'left', cellWidth: 20 }, // (Sku) 
                    1: { halign: 'left', cellWidth: 30 },   // (Item Name)
                    2: { halign: 'left', cellWidth: 30 },   //(Type)
                    3: { halign: 'left', cellWidth: 25 }, //(Date)
                    4: { halign: 'left', cellWidth: 22 },  //(Amount) 
                    5: { halign: 'left', cellWidth: 20 },  //(Worth)
                    6: { halign: 'left', cellWidth: 30 }, //(Occupied Space)
                },
                margin: { top: 25 },  // Top margin

            });
            
            doc.save(`${activeTab}_report.pdf`);
        }
    };

    const renderTable = (data) => (
        <table className="stock-table">
            <thead>
                <tr>
                    <th title="Stock Keeping Unit">SKU</th>
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
                        <td>{item.sku}</td>
                        <td>{item.itemName}</td>
                        <td>{item.itemType}</td>
                        <td>{format(new Date(item.date), 'yyyy-MM-dd')}</td>
                        <td>{item.amount}</td>
                        <td>{item.worth}</td>
                        <td>{item.occupiedSpace}</td>
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
                        {activeTab === 'loading' ? renderTable(loadingData) : renderTable([])}
                    </div>

                    <div className="gen-rep-btn-div">
                        <select className="select-file-type" value={fileType} onChange={(e) => setFileType(e.target.value)}>
                            <option className="file-type" value="csv">CSV</option>
                            <option className="file-type" value="pdf">PDF</option>
                        </select>

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
