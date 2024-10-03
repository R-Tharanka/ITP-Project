import React, { useState } from 'react';
import fiterIcon from '../assets/img/stockpile management/icon/filter icon.png'
import '../styles/stock_mn_mnstock_filter.css';

const InventoryFilterSection = ({setFilteredCategory, setFilteredData, tableData }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'raw', label: 'Raw Material' },
        { id: 'semifinal', label: 'Semifinal Products' },
        { id: 'final', label: 'Final Products' },
        { id: 'returned', label: 'Returned Goods' },
        { id: 'wastage', label: 'Wastage' }
    ];

    const handleCategoryChange = (category) => {
        setSelectedCategory(category); // Update selected category when a button is clicked
    };

    const handleFilterApply = () => {
        setFilteredCategory(selectedCategory); // Set the selected category
        console.log(`Filtering by: ${selectedCategory}`); // Log the selected category

        const filtered = selectedCategory === 'All'
            ? tableData  // Show all data if "All" is selected
            : tableData.filter((item) => item.itemType === selectedCategory);
        setFilteredData(filtered);  // Update filtered data in the parent component
    };

    return (
        <div className="filter-container">
            <h1 className="filter-title">Manage Stock</h1>
            <p className="filter-subtitle">
                Overview of current stocks, raw materials, semifinal products, final products, returned goods, and wastage.
            </p>
            <div className="filter-buttons">
                <div className="filter-category-div">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`filter-button ${selectedCategory === category.label ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(category.label)}  // Handle category change
                            >
                                {category.label}
                            </button>
                        ))}
                </div>
                
                <div className="filterAction">
                    
                    <button className="filter-icon-button" onClick={handleFilterApply}>
                        <img title="filter" src={fiterIcon} alt="Filter Icon" className="filter-icon" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default InventoryFilterSection;
