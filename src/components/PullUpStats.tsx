import { format } from 'date-fns';
import React from 'react';
import '../styles/PullUpStats.css';
import { PullUpData, PullUpStats as Stats } from '../types';
import { GOAL } from '../utils/dataUtils';

interface PullUpStatsProps {
  stats: Stats;
  data: PullUpData[]; // Add data prop to access the full dataset
}

const PullUpStats: React.FC<PullUpStatsProps> = ({ stats, data }) => {
  const progressPercentage = Math.min(100, Math.round((stats.total / GOAL) * 100));
  
  // Function to download the pull-up data
  const downloadData = () => {
    // Sort data by date
    const sortedData = [...data].sort((a, b) => a.date.localeCompare(b.date));
    
    // Create code-like string representation of the data array
    let dataString = "export const initialData: PullUpData[] = [\n";
    
    sortedData.forEach(item => {
      dataString += `  { date: "${item.date}", count: ${item.count} },\n`;
    });
    
    dataString += "];\n";
    
    // Create and download the file
    const blob = new Blob([dataString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pullup-data.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="stats-container">
      <h2 className="stats-title">Progress Report</h2>
      
      <div className="goal-progress">
        <div className="progress-text">
          <span>{stats.total}</span> / <span>{GOAL}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="progress-percentage">{progressPercentage}%</div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">Daily Target</div>
          <div className="stat-value">{stats.requiredDaily}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Average</div>
          <div className="stat-value">{stats.average}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Days Left</div>
          <div className="stat-value">{stats.daysLeft}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Current Streak</div>
          <div className="stat-value">{stats.streak}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">
            Best Day
            <button 
              onClick={downloadData}
              className="download-btn"
              title="Download Data"
            >
              ↓
            </button>
          </div>
          <div className="stat-value">
            {stats.bestDay.count > 0 
              ? `${stats.bestDay.count} (${format(new Date(stats.bestDay.date), 'MMM d')})`
              : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PullUpStats;
