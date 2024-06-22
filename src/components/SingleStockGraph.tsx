import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/SingleStockGraph.css';
import historicalData from '../historical_data.json'; // Adjust path as needed

// Define type for historical data
interface HistoricalData {
  NVDA: { Open: number; Month: string; }[];
  AAPL: { Open: number; Month: string; }[];
  TSLA: { Open: number; Month: string; }[];
  GS: { Open: number; Month: string; }[];
}

interface SingleStockGraphProps {
  stock: keyof HistoricalData; // Ensure stock is one of 'NVDA', 'AAPL', 'TSLA', 'GS'
}

const stockMap: { [key: string]: string } = {
  NVDA: "NVIDIA",
  AAPL: "Apple",
  TSLA: "Tesla",
  GS: "GoldmanSachs"
};

const SingleStockGraph: React.FC<SingleStockGraphProps> = ({ stock }) => {
  // Use type assertion to tell TypeScript that stock is a valid key of HistoricalData
  const data = historicalData[stock] as { Open: number; Month: string; }[];

  if (!data) {
    return <div>No data available for {stock}</div>;
  }

  return (
    <div className="stock-graph-container">
      <div className="single-stock-graph-graph-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="Month" tick={{ fill: '#888' }} />
            <YAxis tick={{ fill: '#888' }} />
            <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} itemStyle={{ color: '#ddd' }} />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="Open"
              name={stockMap[stock]}
              stroke="#007bff"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SingleStockGraph;
