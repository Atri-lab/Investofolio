import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/SingleStockGraph.css';

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

interface SingleStockGraphProps {
  stock: string;
}

const stockMap: { [key: string]: string } = {
  NVIDIA: "NVIDIA",
  Apple: "Apple",
  Tesla: "Tesla",
  GoldmanSachs: "GoldmanSachs"
};

const SingleStockGraph: React.FC<SingleStockGraphProps> = ({ stock }) => {
  return (
    <div className="stock-graph-container">
      <div className="single-stock-graph-graph-wrapper">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" tick={{ fill: '#888' }} />
            <YAxis tick={{ fill: '#888' }} />
            <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} itemStyle={{ color: '#ddd' }} />
            <Legend verticalAlign="top" height={36} />
            {stockMap[stock] && (
              <Line
                type="monotone"
                dataKey={stockMap[stock]}
                stroke="#007bff"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SingleStockGraph;
