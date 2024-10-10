import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';  // Import jsPDF
import 'jspdf-autotable';  // Import autoTable for tables in jsPDF
import { format } from 'date-fns'; // Importing format from date-fns

import StockMnHeader from '../components/stock_mn_header';
import StockMnFooter from '../components/stock_mn_footer';
import StockMnSideNav from '../components/stock_mn_sidenav';
import '../styles/inventory_stock_record.css';
import searchImg from '../assets/img/stockpile management/icon/search.png'

const InventoryStockRecord = () => {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('loading');

    const [fileType, setFileType] = useState('csv');
    const [searchQuery, setSearchQuery] = useState('');

    const [loadingData, setLoadingData] = useState([]); // LoadingStock data from backend
    const [unloadingData, setUnloadingData] = useState([]);// UnloadingStock data from backend


    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    //fetch the loading data from backend API
    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/stock');  // API endpoint
                console.log("Fetched data:", response.data);
                setLoadingData(response.data);  //response.data contains stock records
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };
    
        fetchStocks();
    }, []);

    //fetch the unloading data from backend API
    useEffect(() => {
        const fetchUnloadingStocks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/unload_stocks');  // Replace with your actual API endpoint
                console.log("Fetched unloading data:", response.data);
                setUnloadingData(response.data);  // Store the fetched data in the state
            } catch (error) {
                console.error("Error fetching unloading stock data:", error);
            }
        };
    
        fetchUnloadingStocks();  // Fetch the unloading data when the component mounts
    }, []);  // Empty dependency array to run only once
    
    
    // Filter data based on search query
    const filterData = (data) => {
        return data.filter(item =>
            item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.itemType.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // Filtered loading and unloading data  based on the search query
    const filteredLoadingData = filterData(loadingData);
    const filteredUnloadingData = filterData(unloadingData);


    const downloadReport = (data) => {
        if (data.length === 0) {
            alert('No data available to generate a report.');
            return;
        }
        
        const companyName = "NELCO";
        const companyAddress = "Malwatta, Godakawela, Ratnapura, Sri Lanka, 70160"; 
        const companyEmail = "info@nelco.lk";
        const fax = "0452 240 242  "
        const currentDate = format(new Date(), 'yyyy-MM-dd');

        if (fileType === 'csv') {
            // CSV Generation
            const csvData = [

                [`${companyName}`,``,``,``,``,`Date:`, `${currentDate}`], //company name and date
                [], // Empty line for separation
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

            console.log("csvData:", csvData);
            
            // Join data with proper line endings for CSV files
            const csvContent = csvData.map(row => row.join(",")).join("\r\n");
            console.log("csvContent:", csvContent);

            // Create a blob from the CSV string to ensure proper download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);

            // Create a download link
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `${activeTab}_report.csv`);
            console.log(csvContent); //for debug CSV content before download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } else if (fileType === 'pdf') {
            // PDF Generation
            const doc = new jsPDF();

            // Add the company name and current date
            doc.setFontSize(16);
            doc.text(companyName, 14, 10);

            doc.setFontSize(10);
            doc.text(companyAddress, 14, 19);  // Address at position (14, 16)
            doc.text(`Email: ${companyEmail}`, 14, 24);  // Email at position (14, 22)
            doc.text(`Fax: ${fax}`, 14, 29)

            doc.setFontSize(10);
            doc.text(`Date: ${currentDate}`, 191, 10, { align: 'right' });

            doc.setLineWidth(0.5);
            doc.line(14, 33, 191, 33); // From x1, y1 (left) to x2, y2 (right)
            
            doc.setFontSize(14);
            doc.text(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report`, 14, 41);
            
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
                    1: { halign: 'left', cellWidth: 30 },  // (Item Name)
                    2: { halign: 'left', cellWidth: 30 },  //(Type)
                    3: { halign: 'left', cellWidth: 25 }, //(Date)
                    4: { halign: 'left', cellWidth: 22 },  //(Amount) 
                    5: { halign: 'left', cellWidth: 20 },  //(Worth)
                    6: { halign: 'left', cellWidth: 30 }, //(Occupied Space)
                },
                margin: { top: 46 },  // Top margin

            });
            
            doc.save(`${activeTab}_report.pdf`);
        }
    };

    const renderTable = (data) => (
        <div  className="stock-rec-table-container">
            <table className="stock-rec-table">
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
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.sku}</td>
                                <td>{item.itemName}</td>
                                <td>{item.itemType}</td>
                                <td>{format(new Date(item.date), 'yyyy-MM-dd')}</td>
                                <td>{item.amount}</td>
                                <td>{item.worth}</td>
                                <td>{item.occupiedSpace}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            {/* Displaying "No data available" message within a table row, spanning all columns */}
                            <td colSpan="7">
                                <p>No {activeTab} data available</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="dashboard-container">
            <StockMnHeader />

            <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                
                {/* Pass toggleSidebar function to the side nav component */}
                <StockMnSideNav isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

                <div className={`stockpile-section ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                    <div className="tab-section">
                        <div>
                            <button className={`tab-button ${activeTab === 'loading' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('loading')}>
                                Loading
                            </button>
                            <button className={`tab-button ${activeTab === 'unloading' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('unloading')}>
                                Unloading
                            </button>
                        </div>
                        <div className="stock-record-search">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}  // Update searchQuery
                            />
                            <img src={searchImg} alt="search-icon" className="search-Img"/>
                        </div>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'loading' ? renderTable(filteredLoadingData) : renderTable(filteredUnloadingData)}
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
