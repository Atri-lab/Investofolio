import React from 'react';
import '../styles/Dashboard.css';
import { FaArrowUp, FaArrowDown, FaApple, FaBuilding, FaMicrochip, FaCar, FaPlusCircle } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>
      <div className="portfolio-section">
        <h2 className="section-header">Stocks</h2>
        <div className="stock-card">
          <div className="stock-card-header">
            <FaMicrochip size={24} color="#76B900" />
            <h3>NVIDIA Corporation (NVDA)</h3>
          </div>
          <div className="stock-price">
            <span className="price">$949.41</span>
            <span className="change down">
              <FaArrowDown /> -4.45
            </span>
            <span className="change-percentage down">(-0.47%)</span>
          </div>
          <p>As of 1:09 PM EDT. Market Open.</p>
        </div>
        <div className="stock-card">
          <div className="stock-card-header">
            <FaApple size={24} color="#A3AAAE" />
            <h3>Apple Inc. (AAPL)</h3>
          </div>
          <div className="stock-price">
            <span className="price">$145.09</span>
            <span className="change up">
              <FaArrowUp /> +2.15
            </span>
            <span className="change-percentage up">(+1.50%)</span>
          </div>
          <p>As of 1:09 PM EDT. Market Open.</p>
        </div>
        <div className="stock-card">
          <div className="stock-card-header">
            <FaCar size={24} color="#E82127" />
            <h3>Tesla Inc. (TSLA)</h3>
          </div>
          <div className="stock-price">
            <span className="price">$650.57</span>
            <span className="change up">
              <FaArrowUp /> +14.65
            </span>
            <span className="change-percentage up">(+2.30%)</span>
          </div>
          <p>As of 1:09 PM EDT. Market Open.</p>
        </div>
        <div className="stock-card">
          <div className="stock-card-header">
            <FaBuilding size={24} color="#D4AF37" />
            <h3>Goldman Sachs (GS)</h3>
          </div>
          <div className="stock-price">
            <span className="price">$370.22</span>
            <span className="change down">
              <FaArrowDown /> -2.98
            </span>
            <span className="change-percentage down">(-0.80%)</span>
          </div>
          <p>As of 1:09 PM EDT. Market Open.</p>
        </div>
        <div className="stock-card coming-soon">
          <FaPlusCircle size={40} color="#333" />
          <h3>Coming Soon</h3>
        </div>
      </div>
      <div className="graph-section">
        <h2 className="section-header"> Graph</h2>
        {/* Placeholder for the graph */}
        <div className="graph-placeholder">Graph will be here</div>
      </div>
      <div className="calendar-section">
        <div className="calendar-widget">
          <h2 className="section-header">Market Calendar</h2>
          {/* Placeholder for the calendar */}
          <div className="calendar-placeholder">Calendar will be here</div>
        </div>
        <div className="industry-movement-widget">
          <h2 className="section-header">Industry Movement</h2>
          {/* Placeholder for industry movement */}
          <div className="industry-placeholder">Industry movement will be here</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
