import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { FaInfoCircle } from 'react-icons/fa';
import '../styles/StockGraph.css';

const data = [
  {
    name: 'Jan',
    NVIDIA: 1000,
    Apple: 1200,
    Tesla: 1100,
    GoldmanSachs: 900,
    volume: 1200,
    movingAvg: 1100,
    risk: 0.1,
    sharpeRatio: 1.2,
    beta: 1.3,
  },
  {
    name: 'Feb',
    NVIDIA: 1050,
    Apple: 1250,
    Tesla: 1150,
    GoldmanSachs: 950,
    volume: 1300,
    movingAvg: 1150,
    risk: 0.15,
    sharpeRatio: 1.3,
    beta: 1.4,
  },
  {
    name: 'Mar',
    NVIDIA: 1100,
    Apple: 1300,
    Tesla: 1200,
    GoldmanSachs: 1000,
    volume: 1400,
    movingAvg: 1200,
    risk: 0.2,
    sharpeRatio: 1.4,
    beta: 1.5,
  },
  {
    name: 'Apr',
    NVIDIA: 1150,
    Apple: 1350,
    Tesla: 1250,
    GoldmanSachs: 1050,
    volume: 1500,
    movingAvg: 1250,
    risk: 0.25,
    sharpeRatio: 1.5,
    beta: 1.6,
  },
  {
    name: 'May',
    NVIDIA: 1200,
    Apple: 1400,
    Tesla: 1300,
    GoldmanSachs: 1100,
    volume: 1600,
    movingAvg: 1300,
    risk: 0.3,
    sharpeRatio: 1.6,
    beta: 1.7,
  },
];

const StockGraph: React.FC = () => {
  return (
    <div className="graph-wrapper">
      <ResponsiveContainer width="88%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="NVIDIA" stroke="#8884d8" />
          <Line type="monotone" dataKey="Apple" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Tesla" stroke="#ffc658" />
          <Line type="monotone" dataKey="GoldmanSachs" stroke="#ff7300" />
          <Line type="monotone" dataKey="movingAvg" stroke="#0000FF" dot={false} />
          <Line type="monotone" dataKey="volume" stroke="#413ea0" />
          <Line type="monotone" dataKey="risk" stroke="#FF0000" />
          <Line type="monotone" dataKey="sharpeRatio" stroke="#FF1493" dot={false} />
          <Line type="monotone" dataKey="beta" stroke="#7B68EE" dot={false} />
        </LineChart>
      </ResponsiveContainer>
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
