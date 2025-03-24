import React, { useState, useEffect } from 'react';

function Points() {
  const [points, setPoints] = useState(50); // Default points

  useEffect(() => {
    const storedPoints = parseInt(localStorage.getItem('userPoints')) || 50;
    setPoints(storedPoints);
  }, []);

  return (
    <div className="points-container">
      <h2>🌿 Your Spiritual Progress</h2>
      <p>“Each step of virtue, generosity, and devotion brings you closer to enlightenment.”</p>
      
      {/* Points Display */}
      <div className="points-tracker">
        <h3>🌟 Dharma Points</h3>
        <span><strong>{points}</strong> / 100</span>
        <div className="points-bar">
          <div className="points-fill" style={{ width: `${(points / 100) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default Points;
