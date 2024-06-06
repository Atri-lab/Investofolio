import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaApple, FaBuilding, FaMicrochip, FaCar, FaPlusCircle } from 'react-icons/fa';
import StockGraph from './StockGraph';
import IndustryCalendar from './IndustryCalendar';
import IndustryMovement from './IndustryMovement';
import stockData from '../stock_performance.json';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const isMarketOpen = (date: Date) => {
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    // Assuming market hours are Monday to Friday, 9:30 AM to 4:00 PM ET
    if (day >= 1 && day <= 5) { // Monday to Friday
      if ((hour > 9 || (hour === 9 && minute >= 30)) && hour < 16) {
        return true;
      }
    }
    return false;
  };

  const marketStatus = isMarketOpen(currentTime) ? "Market Open" : "Market Closed";

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>
      <div className="portfolio-section">
        <h2 className="section-header">Stocks</h2>
        {stockData.map((stock, index) => (
          <div key={index} className="stock-card">
            <div className="stock-card-header">
              {stock.stock === 'NVDA' && <FaMicrochip size={24} color="#76B900" />}
              {stock.stock === 'AAPL' && <FaApple size={24} color="#A3AAAE" />}
              {stock.stock === 'TSLA' && <FaCar size={24} color="#E82127" />}
              {stock.stock === 'GS' && <FaBuilding size={24} color="#D4AF37" />}
              <h3>{stock.stock}</h3>
            </div>
            <div className="stock-price">
              <span className="price">${stock.price}</span>
              <span className={`change ${stock.up ? 'up' : 'down'}`}>
                {stock.up ? <FaArrowUp /> : <FaArrowDown />} {stock.change}
              </span>
              <span className={`change-percentage ${stock.up ? 'up' : 'down'}`}>
                ({stock.up ? '+' : ''}{stock.percent}%)
              </span>
            </div>
            <p>As of {formatTime(currentTime)}. {marketStatus}.</p>
          </div>
        ))}
        <div className="stock-card coming-soon">
          <FaPlusCircle size={40} color="#333" />
          <h3>Coming Soon</h3>
        </div>
      </div>
      <div className="graph-section">
        <h2 className="section-header">Graph</h2>
        <StockGraph />
      </div>
      <div className="calendar-section">
        <div className="calendar-widget">
          <h2 className="section-header">Calendar</h2>
          <IndustryCalendar />
        </div>
        <div className="industry-movement-widget">
          <IndustryMovement />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
