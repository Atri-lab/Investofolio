import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaApple, FaBuilding, FaMicrochip, FaCar, FaPlusCircle } from 'react-icons/fa';
import StockGraph from './StockGraph';
import IndustryCalendar from './IndustryCalendar';
import IndustryMovement from './IndustryMovement';
import StockDetail from './StockDetail';
import stockData from '../stock_performance.json';
import '../styles/Dashboard.css';
import { Stock } from '../types/Stock';

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

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

  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock);
  };

  const handleBackClick = () => {
    setSelectedStock(null);
  };

  if (selectedStock) {
    return <StockDetail stock={selectedStock} onBack={handleBackClick} />;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header"></h1>
      <div className="portfolio-section">
        <h2 className="section-header"></h2>
        {stockData.map((stock, index) => (
          <div key={index} className="stock-card" onClick={() => handleStockClick(stock)}>
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
        <StockGraph />
      </div>
      <div className="calendar-section">
        <div className="calendar-widget">
          <h2 className="section-header"></h2>
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
