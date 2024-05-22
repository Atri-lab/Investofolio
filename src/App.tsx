import React from 'react';
import './styles/App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <LandingPage />
    </div>
  );
};

export default App;
