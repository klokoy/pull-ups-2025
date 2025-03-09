import React, { useState } from 'react';
import '../styles/PullUpInput.css';
import { PullUpData } from '../types';
import { getTodayFormatted } from '../utils/dataUtils';

interface PullUpInputProps {
  data: PullUpData[];
  onAddPullUps: (count: number) => void;
}

const PullUpInput: React.FC<PullUpInputProps> = ({ data, onAddPullUps }) => {
  const [count, setCount] = useState<number>(1);
  const today = getTodayFormatted();
  const todayData = data.find(item => item.date === today);
  const todayCount = todayData ? todayData.count : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (count > 0) {
      onAddPullUps(count);
      setCount(1);
    }
  };

  return (
    <div className="pull-up-input">
      <div className="today-count">
        <h3>Today: {todayCount} pull-ups</h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <button 
            type="button" 
            onClick={() => setCount(Math.max(1, count - 1))}
            className="counter-btn"
          >
            -
          </button>
          
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 0))}
            min="1"
            className="count-input"
          />
          
          <button 
            type="button" 
            onClick={() => setCount(count + 1)}
            className="counter-btn"
          >
            +
          </button>
        </div>
        
        <button type="submit" className="add-btn">ADD PULL-UPS</button>
      </form>
    </div>
  );
};

export default PullUpInput;
