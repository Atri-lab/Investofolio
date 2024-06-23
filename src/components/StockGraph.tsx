import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { FaInfoCircle } from 'react-icons/fa';
import '../styles/StockGraph.css';
import historicalData from '../historical_data.json'; // Adjust path as needed

// Define type for historical data
interface HistoricalData {
  NVDA: { Open: number; Month: string; }[];
  AAPL: { Open: number; Month: string; }[];
  TSLA: { Open: number; Month: string; }[];
  GS: { Open: number; Month: string; }[];
}

const stockMap: { [key: string]: string } = {
  NVDA: "NVIDIA",
  AAPL: "Apple",
  TSLA: "Tesla",
  GS: "GoldmanSachs"
};

// Combine all stocks data
const data = Object.keys(stockMap).reduce((acc, key) => {
  const stockKey = key as keyof HistoricalData;
  historicalData[stockKey].forEach((entry, index) => {
    if (!acc[index]) acc[index] = { Month: entry.Month };
    acc[index][stockMap[stockKey]] = entry.Open;
  });
  return acc;
}, [] as any[]);

const StockGraph: React.FC = () => {
  return (
    <div className="stock-graph-wrapper">
      <div className="stock-graph-container">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="NVIDIA" stroke="#8884d8" />
            <Line type="monotone" dataKey="Apple" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Tesla" stroke="#ffc658" />
            <Line type="monotone" dataKey="GoldmanSachs" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="summary-section">
        <h3>Portfolio Summary</h3>
        <p>
          <FaInfoCircle data-tooltip-id="riskTip" className="info-icon" /> Risk factors: Medium
        </p>
        <p>
          <FaInfoCircle data-tooltip-id="volumeTip" className="info-icon" /> Average volume: 1400
        </p>
        <p>
          <FaInfoCircle data-tooltip-id="movingAvgTip" className="info-icon" /> Moving average: 1200
        </p>
        <p>
          <FaInfoCircle data-tooltip-id="sharpeRatioTip" className="info-icon" /> Sharpe Ratio: 1.5
        </p>
        <p>
          <FaInfoCircle data-tooltip-id="betaTip" className="info-icon" /> Beta: 1.6
        </p>
        <p>
          <FaInfoCircle data-tooltip-id="performanceTip" className="info-icon" /> Overall performance: Positive
        </p>
      </div>
      <ReactTooltip id="riskTip" place="top">
        Risk factors indicate the potential volatility and uncertainty of the portfolio.
      </ReactTooltip>
      <ReactTooltip id="volumeTip" place="top">
        Average volume refers to the average number of shares traded over a specific period.
      </ReactTooltip>
      <ReactTooltip id="movingAvgTip" place="top">
        Moving average is a stock indicator that shows the average value of a stock over a set period.
      </ReactTooltip>
      <ReactTooltip id="sharpeRatioTip" place="top">
        Sharpe Ratio is a measure of risk-adjusted performance. A higher Sharpe Ratio indicates better risk-adjusted returns.
      </ReactTooltip>
      <ReactTooltip id="betaTip" place="top">
        Beta measures the volatility of a stock or portfolio in comparison to the market as a whole. A beta greater than 1 indicates higher volatility than the market.
      </ReactTooltip>
      <ReactTooltip id="performanceTip" place="top">
        Overall performance summarizes the portfolio's growth or decline over a period.
      </ReactTooltip>
    </div>
  );
};

export default StockGraph;
