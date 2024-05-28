import React from 'react';
import './styles/App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <LandingPage />
      <Dashboard />
    </div>
  );
};

export default App;
