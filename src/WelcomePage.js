import React from 'react';
import MenuBar from './MenuBar';
import './WelcomePage.css';

function WelcomePage() {
  return (
    <div className="welcome-page">
      <MenuBar />
      <div className="welcome-content">
        <h1>Welcome to our Restaurant!</h1>
        <p>Explore our delicious offerings in the menu above.</p>
      </div>
    </div>
  );
}

export default WelcomePage;
