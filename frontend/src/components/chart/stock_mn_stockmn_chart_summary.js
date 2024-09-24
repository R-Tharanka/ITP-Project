import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../styles/inventory_stock_manage.css';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const InventoryChartSummary = ({ categoryData }) => {
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

    useEffect(() => {
        // Prepare chart and summary data based on the category data passed from parent component
        if (categoryData && categoryData.length > 0) {
            const summaryMap = {};

            // Aggregate amounts by item name
            categoryData.forEach((item) => {
                if (!summaryMap[item.name]) {
                    summaryMap[item.name] = 0;
                }
                summaryMap[item.name] += item.amount;
            });

            // Extract labels and data from the aggregated summary map
            const itemLabels = Object.keys(summaryMap);
            const itemAmounts = Object.values(summaryMap);

            // Chart Data
            setChartData({
                labels: itemLabels,  // Ensure unique labels
                datasets: [
                    {
                        label: 'Amount (kg)',
                        data: itemAmounts,  // Use the aggregated amounts
                        backgroundColor: '#85C1E9',
                        borderColor: '#2980B9',
                        borderWidth: 1,
                    },
                ],
            });

            // Summary Data for display
            setSummaryData(itemLabels.map((key, index) => ({
                name: key,
                amount: itemAmounts[index],
            })));
        }

    }, [categoryData]); // Runs whenever categoryData changes

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1500, // Animation duration for bars
            easing: 'easeOutQuart', // Smooth easing for the fill effect
            onProgress: function(animation) {
                // Customize animation progress if needed (optional)
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value + ' kg'; // Format the y-axis label to include 'kg'
                    },
                },
                // Custom animation to make bars fill bottom-to-top like filling a tube
                animation: {
                    y: {
                        from: 0, // Bars start filling from 0 (bottom)
                        to: function (ctx) {
                            return ctx.chart.data.datasets[0].data[ctx.dataIndex]; // Fill to the value of each bar
                        }
                    }
                }
            },
        },
    };
    

    return (
        <div className="chart-summary-container">
            {/* Chart Section */}
            <div className="chart-section">
                <h3>Stocks by Items</h3>
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
            </div>
        </div>
    );

    // return (
    //     <div className="chart-summary-container">
    //         {/* Check for data availability */}
    //         {categoryData.length === 0 ? (
    //             // Message displayed when no data is available for the selected category
    //             <p>No data available for the selected category.</p>
    //         ) : (
    //             <>
    //                 {/* Chart Section */}
    //                 <div className="chart-section">
    //                     <h3>Stocks by Items</h3>
    //                     <div className="chart-wrapper">
    //                         <Bar data={chartData} options={chartOptions} />
    //                     </div>
    //                 </div>
    
    //                 {/* Summary Section */}
    //                 <div className="summary-section">
    //                     <h3>Summary</h3>
    //                     <ul>
    //                         {summaryData.map((item, index) => (
    //                             <li key={index}>
    //                                 <span>{item.name}</span>
    //                                 <span>{item.amount} kg</span>
    //                             </li>
    //                         ))}
    //                     </ul>
    //                 </div>
    //             </>
    //         )}
    //     </div>
    // );
    
};

export default InventoryChartSummary;
