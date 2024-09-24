import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryPieChart = () => {
  // Define chart data
  const data = {
    labels: ['Free', 'Item 1', 'Item 2', 'Item 3', 'Item 4'],
    datasets: [
      {
        data: [20, 30, 15, 10, 25],  // Data percentages (should add up to 100%)
        backgroundColor: [
          '#A7D6F1',  // Light blue for Free
          '#3A8BD1',  // Dark blue for Item 1
          '#FDB678',  // Orange for Item 2
          '#FFE2B5',  // Light orange for Item 3
          '#D0D0D0',  // Grey for Item 4
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
        <h3>Inventory 1</h3>
        <p>Current Status</p>
      </div>

      <div className="inventory-chart-content-div">

        <div className="chart-container-stock-mn">
            <Pie data={data} options={options} />
        </div>
        <ul className="legend">
            <li><span className="box free"></span>Free</li>
            <li><span className="box item1"></span>Item 1</li>
            <li><span className="box item2"></span>Item 2</li>
            <li><span className="box item3"></span>Item 3</li>
            <li><span className="box item4"></span>Item 4</li>
        </ul>
      </div>
      
    </div>
  );
};

export default InventoryPieChart;
