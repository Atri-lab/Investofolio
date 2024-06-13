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
  marketCap: "3.257T",
  beta: "1.25",
  peRatio: "33.04",
  eps: "6.43",
  earningsDate: "Aug 01, 2024 - Aug 05, 2024",
  forwardDividendYield: "1.00 (0.47%)",
  exDividendDate: "May 10, 2024",
  oneYearTargetEst: "191.97"
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
  marketCap: "The total market value of a company's outstanding shares.",
  beta: "A measure of a stock's volatility in relation to the overall market.",
  peRatio: "The ratio of a company's share price to its earnings per share.",
  eps: "The portion of a company's profit allocated to each outstanding share of common stock.",
  earningsDate: "The date on which a company is expected to release its next earnings report.",
  forwardDividendYield: "The dividend yield based on the expected dividend payments over the next 12 months.",
  exDividendDate: "The date on which a stock begins trading without the value of its next dividend payment.",
  oneYearTargetEst: "The projected stock price for the next 12 months as estimated by analysts.",
  risk: "Risk factors indicate the potential volatility and uncertainty of the portfolio.",
  avgVolumeSummary: "Average volume refers to the average number of shares traded over a specific period.",
  movingAvg: "Moving average is a stock indicator that shows the average value of a stock over a set period.",
  sharpeRatio: "Sharpe Ratio is a measure of risk-adjusted performance. A higher Sharpe Ratio indicates better risk-adjusted returns.",
  betaSummary: "Beta measures the volatility of a stock or portfolio in comparison to the market as a whole. A beta greater than 1 indicates higher volatility than the market.",
  performance: "Overall performance summarizes the portfolio's growth or decline over a period."
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
        <div className="stock-detail-graph">
          <SingleStockGraph stock={stock.stock} />
        </div>
        <div className="summary-section">
          <h3>Stock Summary</h3>
          <p>
            <FaInfoCircle data-tooltip-id="tooltip-risk" className="info-icon" /> Risk factors: Medium
            <Tooltip id="tooltip-risk" place="left">
              {metricExplanations.risk}
            </Tooltip>
          </p>
          <p>
            <FaInfoCircle data-tooltip-id="tooltip-avgVolumeSummary" className="info-icon" /> Average volume: 1400
            <Tooltip id="tooltip-avgVolumeSummary" place="left">
              {metricExplanations.avgVolumeSummary}
            </Tooltip>
          </p>
          <p>
            <FaInfoCircle data-tooltip-id="tooltip-movingAvg" className="info-icon" /> Moving average: 1200
            <Tooltip id="tooltip-movingAvg" place="left">
              {metricExplanations.movingAvg}
            </Tooltip>
          </p>
          <p>
            <FaInfoCircle data-tooltip-id="tooltip-sharpeRatio" className="info-icon" /> Sharpe Ratio: 1.5
            <Tooltip id="tooltip-sharpeRatio" place="left">
              {metricExplanations.sharpeRatio}
            </Tooltip>
          </p>
          <p>
            <FaInfoCircle data-tooltip-id="tooltip-betaSummary" className="info-icon" /> Beta: 1.6
            <Tooltip id="tooltip-betaSummary" place="left">
              {metricExplanations.betaSummary}
            </Tooltip>
          </p>
          <p>
            <FaInfoCircle data-tooltip-id="tooltip-performance" className="info-icon" /> Overall performance: Positive
            <Tooltip id="tooltip-performance" place="left">
              {metricExplanations.performance}
            </Tooltip>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
