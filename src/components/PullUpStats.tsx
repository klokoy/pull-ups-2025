import { format } from 'date-fns';
import React from 'react';
import '../styles/PullUpStats.css';
import { PullUpStats as Stats } from '../types';
import { GOAL } from '../utils/dataUtils';

interface PullUpStatsProps {
  stats: Stats;
}

const PullUpStats: React.FC<PullUpStatsProps> = ({ stats }) => {
  const progressPercentage = Math.min(100, Math.round((stats.total / GOAL) * 100));

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
          <div className="stat-label">Best Day</div>
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
