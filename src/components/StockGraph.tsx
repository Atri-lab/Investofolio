import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { FaInfoCircle } from 'react-icons/fa';
import '../styles/StockGraph.css';

const data = [
  {
    name: 'Feb',
    NVIDIA: 66.06,
    Apple: 183.09,
    Tesla: 255.19,
    GoldmanSachs: 368.14,
  },
  {
    name: 'Mar',
    NVIDIA: 79.99,
    Apple: 179.66,
    Tesla: 200.52,
    GoldmanSachs: 392.19,
  },
  {
    name: 'Apr',
    NVIDIA: 90.37,
    Apple: 169.30,
    Tesla: 177.45,
    GoldmanSachs: 410.30,
  },
  {
    name: 'May',
    NVIDIA: 86.40,
    Apple: 186.35,
    Tesla: 179.31,
    GoldmanSachs: 439.40,
  },
  {
    name: 'Jun',
    NVIDIA: 131.88,
    Apple: 212.49,
    Tesla: 178.01,
    GoldmanSachs: 446.46,
  },
];

const StockGraph: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const handleStockSelect = (stock: string | null) => {
    setSelectedStock(stock);
  };

  return (
    <div className="stock-graph-wrapper">
      <div className="stock-graph-container">
        <div className="stock-selection">
          <button className={!selectedStock ? 'selected' : ''} onClick={() => handleStockSelect(null)}>All</button>
          <button className={selectedStock === 'NVIDIA' ? 'selected' : ''} onClick={() => handleStockSelect('NVIDIA')}>NVIDIA</button>
          <button className={selectedStock === 'Apple' ? 'selected' : ''} onClick={() => handleStockSelect('Apple')}>Apple</button>
          <button className={selectedStock === 'Tesla' ? 'selected' : ''} onClick={() => handleStockSelect('Tesla')}>Tesla</button>
          <button className={selectedStock === 'GoldmanSachs' ? 'selected' : ''} onClick={() => handleStockSelect('GoldmanSachs')}>Goldman Sachs</button>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {!selectedStock || selectedStock === 'NVIDIA' ? <Line type="monotone" dataKey="NVIDIA" stroke="#8884d8" /> : null}
            {!selectedStock || selectedStock === 'Apple' ? <Line type="monotone" dataKey="Apple" stroke="#82ca9d" /> : null}
            {!selectedStock || selectedStock === 'Tesla' ? <Line type="monotone" dataKey="Tesla" stroke="#ffc658" /> : null}
            {!selectedStock || selectedStock === 'GoldmanSachs' ? <Line type="monotone" dataKey="GoldmanSachs" stroke="#ff7300" /> : null}
            <Line type="monotone" dataKey="movingAvg" stroke="#0000FF" dot={false} />
            <Line type="monotone" dataKey="volume" stroke="#413ea0" />
            <Line type="monotone" dataKey="risk" stroke="#FF0000" />
            <Line type="monotone" dataKey="sharpeRatio" stroke="#FF1493" dot={false} />
            <Line type="monotone" dataKey="beta" stroke="#7B68EE" dot={false} />
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