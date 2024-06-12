import React from 'react';
import { FaArrowUp, FaArrowDown, FaApple, FaBuilding, FaMicrochip, FaCar } from 'react-icons/fa';
import SingleStockGraph from './SingleStockGraph';
import { Stock } from '../types/Stock';
import '../styles/StockDetail.css'; // Import the CSS file

interface StockDetailProps {
  stock: Stock;
  onBack: () => void;
}

const StockDetail: React.FC<StockDetailProps> = ({ stock, onBack }) => {
  return (
    <div className="stock-detail-container">
      <button onClick={onBack} className="stock-detail-back-button">Back</button>
      <div className="stock-detail-card">
        <div className="stock-detail-card-header">
          {stock.stock === 'NVDA' && <FaMicrochip size={24} color="#76B900" />}
          {stock.stock === 'AAPL' && <FaApple size={24} color="#A3AAAE" />}
          {stock.stock === 'TSLA' && <FaCar size={24} color="#E82127" />}
          {stock.stock === 'GS' && <FaBuilding size={24} color="#D4AF37" />}
          <h3>{stock.stock}</h3>
        </div>
        <div className="stock-detail-dotted-border"></div>
        <div className="stock-detail-price">
          <span className="price">${stock.price}</span>
          <span className={`change ${stock.up ? 'up' : 'down'}`}>
            {stock.up ? <FaArrowUp /> : <FaArrowDown />} {stock.change}
            <span className={`change-percentage ${stock.up ? 'up' : 'down'}`}>
              ({stock.up ? '+' : ''}{stock.percent}%)
            </span>
          </span>
        </div>
      </div>
      <div className="stock-detail-graph">
        <SingleStockGraph />
      </div>
    </div>
  );
};

export default StockDetail;
