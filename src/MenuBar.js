import React from 'react';
import { Link } from 'react-router-dom';
import './MenuBar.css';

function MenuBar() {
  return (
    <div className="menu-bar">
      <ul>
       <li><Link to="/welcomePage">WelcomePage</Link></li>
        <li><Link to="/appetizers">Appetizers</Link></li>
        <li><Link to="/meals">Meals</Link></li>
        <li><Link to="/desserts">Desserts</Link></li>
      </ul>
    </div>
  );
}

export default MenuBar;
