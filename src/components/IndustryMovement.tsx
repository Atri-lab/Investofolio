import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import '../styles/IndustryMovement.css';

const industryData = [
  { sector: 'Tech', change: 1.5, up: true },
  { sector: 'Fintech', change: -0.7, up: false },
  { sector: 'Healthcare', change: 2.1, up: true },
  { sector: 'Automotive', change: -1.3, up: false },
  { sector: 'Energy', change: 0.4, up: true },
];

const IndustryMovement: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % industryData.length);
    }, 10000); // Change every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const { sector, change, up } = industryData[currentIndex];

  return (
    <div className="industry-movement-container">
      <div className={`tv-frame ${up ? 'up' : 'down'}`}>
        <div className="tv-screen">
          <div className="stock-info">
            <span className="sector">{sector}</span>
            <span className="change">
              {up ? <FaArrowUp className="arrow-icon" /> : <FaArrowDown className="arrow-icon" />}
              {up ? '+' : ''}
              {change}%
            </span>
          </div>
          <div className="heartbeat">
            <svg viewBox="0 0 100 10" preserveAspectRatio="none">
              <polyline
                className="heartbeat-line"
                points={up ? "0,10 20,5 40,8 60,2 80,6 100,0" : "0,0 20,5 40,2 60,8 80,4 100,10"}
                fill="none"
                stroke="#fff"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryMovement;
