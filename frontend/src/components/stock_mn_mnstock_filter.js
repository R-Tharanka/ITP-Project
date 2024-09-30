import React, { useState } from 'react';
import fiterIcon from '../assets/img/stockpile management/icon/filter icon.png'
import '../styles/stock_mn_mnstock_filter.css';

const InventoryFilterSection = ({ onFilterApply, setFilteredCategory, setFilteredData, tableData }) => {
    const [selectedCategory, setSelectedCategory] = useState('Raw Materials');

    const categories = [
        { id: 'raw', label: 'Raw Materials' },
        { id: 'semifinal', label: 'Semifinal Products' },
        { id: 'final', label: 'Final Products' },
        { id: 'returned', label: 'Returned Goods' },
        { id: 'wastage', label: 'Wastage' }
    ];

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleFilterApply = () => {
        setFilteredCategory(selectedCategory); // Set the selected category
        console.log(`Filtering by: ${selectedCategory}`); // Log the selected category
        const filtered = tableData.filter((item) => item.itemType === selectedCategory);
        setFilteredData(filtered); // Update filtered data based on the selected category
    };
    

    // function to clear filters
    const handleClearFilter = () => {
        setSelectedCategory('Raw Materials'); // Reset selected category
        setFilteredCategory('Raw Materials'); // Reset category in parent
        setFilteredData(tableData); // Reset to all data
        console.log('Clearing filter, showing all data');
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
                            onClick={() => handleCategoryChange(category.label)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
                
                <div className="filterAction">
                    <button onClick={handleClearFilter} className="clear-filter-button">
                            Clear Filter
                    </button>
                    <button className="filter-icon-button" onClick={handleFilterApply}>
                        <img title="filter" src={fiterIcon} alt="Filter Icon" className="filter-icon" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default InventoryFilterSection;
