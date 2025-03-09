import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import '../styles/PullUpChart.css';
import { PullUpData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PullUpChartProps {
  data: PullUpData[];
}

const PullUpChart: React.FC<PullUpChartProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => 
    parseISO(a.date).getTime() - parseISO(b.date).getTime());
  
  // Last 30 days chart data
  const last30Days = sortedData.slice(-30);
  const labels30 = last30Days.map(item => format(parseISO(item.date), 'MMM d'));
  const counts30 = last30Days.map(item => item.count);
  
  // Monthly totals
  const today = new Date();
  const currentYear = today.getFullYear();
  
  const monthlyTotals = Array(12).fill(0);
  
  sortedData.forEach(item => {
    const date = parseISO(item.date);
    if (date.getFullYear() === currentYear) {
      monthlyTotals[date.getMonth()] += item.count;
    }
  });
  
  const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Common options that work for both chart types
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: '#00FF00' },
        grid: { color: 'rgba(0, 255, 0, 0.1)' }
      },
      y: {
        ticks: { color: '#00FF00' },
        grid: { color: 'rgba(0, 255, 0, 0.1)' }
      }
    },
    plugins: {
      legend: {
        labels: { color: '#00FF00' }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 20, 0, 0.8)',
        titleColor: '#00FF00',
        bodyColor: '#00FF00',
        borderColor: '#00FF00',
        borderWidth: 1
      }
    }
  };
  
  // Type-specific options
  const lineChartOptions: ChartOptions<'line'> = commonOptions;
  const barChartOptions: ChartOptions<'bar'> = commonOptions;

  return (
    <div className="charts-container">
      <div className="chart-wrapper">
        <h3>Last 30 Days</h3>
        <Line
          data={{
            labels: labels30,
            datasets: [
              {
                label: 'Pull-Ups',
                data: counts30,
                borderColor: '#00FF00',
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                tension: 0.2,
              },
            ],
          }}
          options={lineChartOptions}
        />
      </div>
      
      <div className="chart-wrapper">
        <h3>Monthly Progress</h3>
        <Bar
          data={{
            labels: monthLabels,
            datasets: [
              {
                label: 'Monthly Total',
                data: monthlyTotals,
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
                borderColor: '#00FF00',
                borderWidth: 1,
              },
            ],
          }}
          options={barChartOptions}
        />
      </div>
    </div>
  );
};

export default PullUpChart;
