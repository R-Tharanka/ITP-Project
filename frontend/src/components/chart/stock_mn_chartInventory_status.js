import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryPieChart = ({ tableData, onTotalSpaceUpdate }) => {

  console.log('tableData-piechart:', tableData);

  //Group the data by itemType and sum the amount
  const itemTypeAmounts = tableData.reduce((acc, item) => {
    const { itemType, amount } = item;
    
    if (acc[itemType]) {
      acc[itemType] += amount;  // Add amount if the itemType already exists
    } else {
      acc[itemType] = amount;   // Initialize with the current amount if new
    }
    
    return acc;
  }, {});

  //Prepare data for the chart
  const labels = Object.keys(itemTypeAmounts);  // The item types
  const dataValues = Object.values(itemTypeAmounts);  // The total amounts for each item type

  // Calculate the total occupied space
  const totalOccupiedSpace = tableData.reduce((total, item) => total + item.occupiedSpace, 0);

  // Pass the total occupied space to the parent using useEffect
  useEffect(() => {
    if (onTotalSpaceUpdate) {
      onTotalSpaceUpdate(totalOccupiedSpace);  // Pass total occupied space to the parent
    }
  }, [totalOccupiedSpace, onTotalSpaceUpdate]);

  console.log('total OccupiedSpace passing- value:', totalOccupiedSpace);

  // Define chart data
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,  // Use the combined amount data
        backgroundColor: [
          '#A7D6F1',  // Light blue
          '#3A8BD1',  // Dark blue
          '#FDB678',  // Orange
          '#FFE2B5',  // Light orange
          '#D0D0D0',  // Grey
          '#A7F1A7',  // Light green
          '#F1A7D6',  // Pink
          '#F1E0A7',  // Yellow
          '#A7B3F1',  // Light purple
        ],
        borderColor: '#ffffff',  // Optional: white border between segments
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,  // Disable the chart's default legend since we're creating a custom one
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="inventory-chart">

      <div className="inventory-chart-headings">
        <h3>Inventory</h3>
        <p>Current Status</p>
      </div>

      <div className="inventory-chart-content-div">

        <div className="chart-container-stock-mn">
            <Pie data={data} options={options} />
        </div>
        <ul className="legend">
          {labels.map((label, index) => (
            <li key={index}>
              <span className="box" style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}></span>
              {label}
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default InventoryPieChart;
