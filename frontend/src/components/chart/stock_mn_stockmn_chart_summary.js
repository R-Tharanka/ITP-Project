import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../styles/inventory_stock_manage.css';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryChartSummary = ({ categoryData, filterType }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Amount (kg)',
            data: [],
            backgroundColor: '#85C1E9',
            borderColor: '#2980B9',
            borderWidth: 1,
        }]
    });
    
    const [summaryData, setSummaryData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);  // For total amount
    const [totalWorth, setTotalWorth] = useState(0);    // For total worth

    useEffect(() => {
        console.log('categoryData:', categoryData);
        console.log('filterType:', filterType);

        // Handle empty data
        if (!categoryData || categoryData.length === 0) {
            console.log('No category data available');
            setChartData({
                labels: [],
                datasets: [{
                    label: 'Amount (kg)',
                    data: [],
                    backgroundColor: '#85C1E9',
                    borderColor: '#2980B9',
                    borderWidth: 1,
                }]
            });
            setSummaryData([]);
            setTotalAmount(0);  // Reset total amount
            setTotalWorth(0);   // Reset total worth
            return;  // Early return to stop further processing
        }

        const summaryMap = {};
        let totalAmount = 0;  // To accumulate total amount
        let totalWorth = 0;   // To accumulate total worth

        if (filterType === 'All') {
            // Aggregate amounts by itemType when 'All' filter is selected
            categoryData.forEach((item) => {
                summaryMap[item.itemType] = (summaryMap[item.itemType] || 0) + item.amount;
                totalAmount += item.amount;   // Add to total amount
                totalWorth += item.worth;     // Add to total worth
            });
        } else {
            // Aggregate amounts by item name for specific filters
            categoryData.forEach((item) => {
                if (item.itemType === filterType) {
                    summaryMap[item.itemName] = (summaryMap[item.itemName] || 0) + item.amount;
                    totalAmount += item.amount;  // Add to total amount
                    totalWorth += item.worth;    // Add to total worth
                }
            });
        }

        // Extract labels and data from the aggregated summary map
        const labels = Object.keys(summaryMap);
        const amounts = Object.values(summaryMap);

        // Update chart and summary data with new values or reset if no labels
        if (labels.length === 0) {
            setChartData({
                labels: [],
                datasets: [{
                    label: 'Amount (kg)',
                    data: [],
                    backgroundColor: '#85C1E9',
                    borderColor: '#2980B9',
                    borderWidth: 1,
                }]
            });
            setSummaryData([]);
            setTotalAmount(0);  // Reset total amount
            setTotalWorth(0);   // Reset total worth
        } else {
            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Amount (kg)',
                        data: amounts,
                        backgroundColor: '#85C1E9',
                        borderColor: '#2980B9',
                        borderWidth: 1,
                    },
                ],
            });

            setSummaryData(labels.map((key, index) => ({
                name: key,
                amount: amounts[index],
            })));

            setTotalAmount(totalAmount);  // Update total amount
            setTotalWorth(totalWorth);    // Update total worth
        }

    }, [categoryData, filterType]); // Re-run effect whenever categoryData or filterType changes

    useEffect(() => {
        console.log('Chart Data:', chartData);
    }, [chartData]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1500, // Animation duration for bars
            easing: 'easeOutQuart', // Smooth easing for the fill effect
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value + ' kg'; // Format the y-axis label to include 'kg'
                    },
                },
            },
        },
    };

    return (
        <div className="chart-summary-container">
            {chartData.labels.length > 0 ? (
                <>
                    {/* Chart Section */}
                    <div className="chart-section">
                        <h3>{filterType === 'All' ? 'Stocks by Item Type' : 'Stocks by Item Name'}</h3>
                        <div className="chart-wrapper">
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>
    
                    {/* Summary Section */}
                    <div className="summary-section">
                        <h3>Summary</h3>
                        <ul>
                            {summaryData.map((item, index) => (
                                <li key={index}>
                                    <span>{item.name}</span>
                                    <span>{item.amount} kg</span>
                                </li>
                            ))}
                        </ul>

                        {/* Total Amount and Worth Display */}
                        <div className="total-summary">
                            <div className="summary-tot tot-amount">
                                <p><strong>Total Amount:</strong></p>
                                <p> {totalAmount} kg</p>
                            </div>
                            <hr className="tot-hr"></hr>
                            <div className="summary-tot tot-worth">
                                <p><strong>Total Worth:</strong></p>
                                <p> $ {totalWorth}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>No data available to display.</p>
            )}
        </div>
    );
};

export default InventoryChartSummary;
