import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const chartColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
];

const borderColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

const Dashboard = ({ role, data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (!data.length) {
      return;
    }

    const chartData = {
      labels: data.map((_, index) => `Entry ${index + 1}`),
      datasets: []
    };

    const createDataset = (label, values) => ({
      label,
      data: values,
      backgroundColor: chartColors,
      borderColor: borderColors,
      borderWidth: 1
    });

    switch (role) {
      case 'Manager':
        chartData.datasets.push(
          createDataset('Total Cost', data.map(row => row[4])),
          createDataset('Cycle Time', data.map(row => row[3]))
        );
        break;
      case 'Administration Head':
        chartData.datasets.push(
          createDataset('Total Cost', data.map(row => row[0])),
          createDataset('Employee Turnover Rate', data.map(row => row[1])),
          createDataset('Training Hours', data.map(row => row[2])),
          createDataset('Vehicle Maintenance Cost', data.map(row => row[3]))
        );
        break;
      case 'Delivery Agent':
        chartData.datasets.push(
          createDataset('Delivery Time', data.map(row => row[0])),
          createDataset('On Time Delivery', data.map(row => row[1])),
          createDataset('Fuel Consumption', data.map(row => row[2])),
          createDataset('Customer Complaints', data.map(row => row[3])),
          createDataset('Late Deliveries', data.map(row => row[4]))
        );
        break;
      case 'Marketing Head':
        chartData.datasets.push(
          createDataset('Customer Satisfaction', data.map(row => row[0])),
          createDataset('On Time Delivery', data.map(row => row[1])),
          createDataset('Customer Complaints', data.map(row => row[2]))
        );
        break;
      default:
        return <div>Invalid role.</div>;
    }

    chartRef.current = new Chart(document.getElementById('chart'), {
      type: 'bar',
      data: chartData
    });

  }, [role, data]);

  if (!data.length) {
    return <div>No data available for this role.</div>;
  }

  return (
    <div>
      <h2>{role} Dashboard</h2>
      <canvas id="chart"></canvas>
    </div>
  );
};

export default Dashboard;
