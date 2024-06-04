import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import '../styles/IndustryMovement.css';
import data from '../sector_performance.json'; 

const stockTickerData = [
  { name: 'AAPL', price: 145.09, change: 1.2, up: true },
  { name: 'GOOGL', price: 2734.57, change: -2.3, up: false },
  { name: 'AMZN', price: 3401.46, change: 0.5, up: true },
  { name: 'TSLA', price: 709.74, change: -1.7, up: false },
  { name: 'MSFT', price: 299.35, change: 2.8, up: true },
];

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
              {stockTickerData.map((stock, index) => (
                <div key={index} className="ticker-item">
                  <span className="ticker-name">{stock.name}</span>
                  <span className={`ticker-change ${stock.up ? 'up' : 'down'}`}>
                    {stock.up ? <FaArrowUp /> : <FaArrowDown />}
                    {stock.price} ({stock.up ? '+' : ''}{stock.change}%)
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
