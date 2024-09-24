import React, { useState } from 'react';
import './styles/stock_mn_mnstock_stocktable.css';
import UnloadModal from './unload_modal';

const InventoryDataTable = ({ tableData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // Store the item to unload

    // Function to open the modal and pass selected item details
    const openModal = (item) => {
        setSelectedItem(item);  // Setting the selected item for the modal
        setIsModalOpen(true);   // Show the modal
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);  // Hide the modal
    };

    return (
        <>
            <div className="stock-table-container">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Item Name</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Amount (kg)</th>
                            <th>Worth ($)</th>
                            <th>Occupied Space (m³)</th>
                            <th>Additional Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.length > 0 ? (
                            tableData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.type}</td>
                                    <td>{item.date}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.worth}</td>
                                    <td>{item.occupiedSpace}</td>
                                    <td>
                                        {/* Unload button triggers modal with selected item */}
                                        <button className="unload-btn" onClick={() => openModal(item)}>
                                            Unload
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="no-data">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Render the Unload Modal only if modal state is open */}
            {isModalOpen && (
                <UnloadModal 
                    item={selectedItem}    // Passing selected item to the modal
                    closeModal={closeModal} // Function to close the modal
                />
            )}
        </>
    );
};

export default InventoryDataTable;
