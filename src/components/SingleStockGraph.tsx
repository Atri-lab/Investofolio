import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { FaInfoCircle } from 'react-icons/fa';
import '../styles/SingleStockGraph.css';

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
  


const SingleStockGraph: React.FC = () => {
    const [selectedStock, setSelectedStock] = useState<string | null>(null);

    const handleStockSelect = (stock: string | null) => {
        setSelectedStock(stock);
    };

    return (
        <div className="stock-graph-container">
            <div className="single-stock-graph-graph-wrapper">
                <div className="stock-selection">
                    <button onClick={() => handleStockSelect(null)}>All</button>
                    <button onClick={() => handleStockSelect('NVIDIA')}>NVIDIA</button>
                    <button onClick={() => handleStockSelect('Apple')}>Apple</button>
                    <button onClick={() => handleStockSelect('Tesla')}>Tesla</button>
                    <button onClick={() => handleStockSelect('GoldmanSachs')}>Goldman Sachs</button>
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
            <div className="single-stock-summary-section">
                <h3>Stock Performance Summary</h3>
                <p>
                    <FaInfoCircle data-tooltip-id="riskTip" className="single-stock-graph-info-icon" /> Volume: placeholder
                </p>
                <p>
                    <FaInfoCircle data-tooltip-id="volumeTip" className="single-stock-graph-info-icon" /> Beta: placeholder
                </p>
                <p>
                    <FaInfoCircle data-tooltip-id="movingAvgTip" className="single-stock-graph-info-icon" /> P/E Ratio: placeholder
                </p>
                <p>
                    <FaInfoCircle data-tooltip-id="sharpeRatioTip" className="single-stock-graph-info-icon" /> Revenue: placeholder
                </p>
                <p>
                    <FaInfoCircle data-tooltip-id="betaTip" className="single-stock-graph-info-icon" /> Ebidta: placeholder
                </p>
                <p>
                    <FaInfoCircle data-tooltip-id="performanceTip" className="single-stock-graph-info-icon" /> Market Cap: placeholder
                </p>
            </div>
            <ReactTooltip id="riskTip" place="top">
                The volume of a stock refers to the total number of shares that have been traded during a specific period of time, 
                typically within a trading day.
            </ReactTooltip>
            <ReactTooltip id="volumeTip" place="top">
                Beta measures the volatility of a stock or portfolio in relation to the overall market, 
                with a beta greater than 1 indicating higher volatility and a beta less than 1 indicating lower volatility.
            </ReactTooltip>
            <ReactTooltip id="movingAvgTip" place="top">
                The price-to-earnings (P/E) is used to assess a company's current stock price relative to its earnings per share, 
                indicating how much investors are willing to pay for each dollar of earnings.
            </ReactTooltip>
            <ReactTooltip id="sharpeRatioTip" place="top">
                Revenue refers to the total income generated by a company from its primary business activities, 
                such as sales of goods or services, before deducting any expenses or costs.
            </ReactTooltip>
            <ReactTooltip id="betaTip" place="top">
                EBITDA, measures a company's operating performance by excluding certain expenses, 
                providing a clearer picture of its operational profitability.
            </ReactTooltip>
            <ReactTooltip id="performanceTip" place="top">
                Market cap is a measure of a company's total value in the stock market, 
                calculated by multiplying its current share price by the total number of outstanding shares.
            </ReactTooltip>
        </div>
    );
};

export default SingleStockGraph;
