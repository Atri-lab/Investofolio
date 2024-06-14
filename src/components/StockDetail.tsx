import React from 'react';
import { FaArrowUp, FaArrowDown, FaApple, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import SingleStockGraph from './SingleStockGraph';
import { Tooltip } from 'react-tooltip';
import '../styles/StockDetail.css'; // Import the CSS file

export interface Stock {
  stock: string;
  price: number;
  change: number;
  percent: number;
  up: boolean;
}

interface StockDetailProps {
  stock: Stock;
  onBack: () => void;
}

const stockData = {
  previousClose: "213.07",
  open: "214.78",
  bid: "212.32 x 100",
  ask: "212.41 x 100",
  daysRange: "211.60 - 216.75",
  fiftyTwoWeekRange: "164.08 - 220.20",
  volume: "54,871,666",
  avgVolume: "64,859,633",
  marketCap: "3.257T"
};

const metricExplanations: { [key: string]: string } = {
  previousClose: "The last price at which the stock traded during the previous trading session.",
  open: "The price at which the stock opened for trading during the current trading session.",
  bid: "The highest price a buyer is willing to pay for the stock.",
  ask: "The lowest price a seller is willing to accept for the stock.",
  daysRange: "The lowest and highest prices at which the stock traded during the current trading session.",
  fiftyTwoWeekRange: "The lowest and highest prices at which the stock traded over the past 52 weeks.",
  volume: "The total number of shares traded during the current trading session.",
  avgVolume: "The average number of shares traded per day over a specified period.",
  marketCap: "The total market value of a company's outstanding shares."
};

const StockDetail: React.FC<StockDetailProps> = ({ stock, onBack }) => {
  return (
    <div className="stock-detail-container">
      <button onClick={onBack} className="stock-detail-back-button">
        <FaArrowLeft size={20} />
      </button>
      <div className="stock-detail-header">
        <div className="header-left">
          <FaApple size={36} color="#A3AAAE" />
          <h1>{stock.stock}</h1>
        </div>
        <div className="header-divider"></div>
        <div className="header-right">
          <p className="stock-price">${stock.price.toFixed(2)}</p>
          <p className={`stock-change ${stock.up ? 'up' : 'down'}`}>
            {stock.up ? <FaArrowUp /> : <FaArrowDown />} {stock.change.toFixed(2)} ({stock.up ? '+' : ''}{stock.percent.toFixed(2)}%)
          </p>
        </div>
      </div>
      <div className="stock-detail-content">
        <div className="stock-detail-info">
          {Object.entries(stockData).map(([key, value], index) => (
            <div key={index} className="stock-detail-info-item">
              <FaInfoCircle data-tooltip-id={`tooltip-${key}`} className="info-icon" />
              <span className="metric-key">{key.replace(/([A-Z])/g, ' $1')}</span>
              <span className="metric-value">{value}</span>
              <Tooltip id={`tooltip-${key}`} place="left">
                {metricExplanations[key]}
              </Tooltip>
            </div>
          ))}
        </div>
        <div className="stock-detail-graph-about">
          <div className="stock-detail-graph">
            <SingleStockGraph stock={stock.stock} />
          </div>
          <div className="about-section">
            <h3>About {stock.stock}</h3>
            <p>
              Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. 
              It also sells various related services. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; 
              iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, 
              Beats products, HomePod, iPod touch, and other Apple-branded and third-party accessories.
            </p>
          </div>
        </div>
        <div className="chatbot-section">
          <h3>Chatbot</h3>
          <div className="chatbot">
            {/* Placeholder for chatbot */}
            <p>Chatbot goes here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
