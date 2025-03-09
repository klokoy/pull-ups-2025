import React, { useEffect, useState } from 'react';
import './App.css';
import MatrixBackground from './components/MatrixBackground';
import PullUpChart from './components/PullUpChart';
import PullUpInput from './components/PullUpInput';
import PullUpStats from './components/PullUpStats';
import { PullUpData } from './types';
import { addPullUps, calculateStats, loadPullUpData, savePullUpData } from './utils/dataUtils';

function App() {
  const [pullUpData, setPullUpData] = useState<PullUpData[]>([]);
  
  useEffect(() => {
    setPullUpData(loadPullUpData());
  }, []);
  
  const handleAddPullUps = (count: number) => {
    const updatedData = addPullUps(pullUpData, count);
    setPullUpData(updatedData);
    savePullUpData(updatedData);
  };
  
  const stats = calculateStats(pullUpData);

  return (
    <div className="app">
      <MatrixBackground />
      
      <div className="app-content">
        <header className="app-header">
          <h1>MATRIX PULL-UPS</h1>
          <p>GOAL: 5000 IN {new Date().getFullYear()}</p>
        </header>
        
        <PullUpInput data={pullUpData} onAddPullUps={handleAddPullUps} />
        
        <PullUpStats stats={stats} />
        
        <PullUpChart data={pullUpData} />
      </div>
    </div>
  );
}

export default App;
