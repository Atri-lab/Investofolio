import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import '../styles/IndustryMovement.css';
import data from '../sector_performance.json';
import stockData from '../stock_performance.json';

const IndustryMovement: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 10000); // Change every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const { sector, change, up } = data[currentIndex];

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
          <div className="stock-ticker">
            <div className="ticker-items">
              {stockData.map((stock, index) => (
                <div key={index} className="ticker-item">
                  <span className="ticker-name">{stock.stock}</span>
                  <span className={`ticker-change ${stock.up ? 'up' : 'down'}`}>
                    {stock.up ? <FaArrowUp /> : <FaArrowDown />}
                    {stock.price} ({stock.up ? '+' : ''}{stock.percent}%) 
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryMovement;
