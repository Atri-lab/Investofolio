import React, { useEffect } from 'react';
import '../styles/LandingPage.css';
import logo from '../assets/Logo.png'; // Ensure this is just the dollar sign without the cap
import cap from '../assets/Cap.png'; // Ensure this is the image of the cap only

const LandingPage: React.FC = () => {
  useEffect(() => {
    // No longer need to handle the animation end event for the text
  }, []);

  return (
    <div className="landing-container">
      <div className="logo-container">
        <img src={logo} alt="Investiation Logo" id="logo" className="logo" />
        <img src={cap} alt="Graduation Cap" id="cap" className="cap" />
      </div>
      <div className="text-container">
        <h1 className="landing-motto">Graduate and Excel in Investments with Us!</h1>
        <p className="landing-subtitle">Scroll down to view the dashboard.</p>
        <div className="down-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21L12 3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 15L12 21L6 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;