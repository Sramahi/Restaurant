import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import Category from './Category'; 
import CheckoutPage from './CheckoutPage'; 

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/WelcomePage" element={<WelcomePage />} />
        <Route path="/appetizers" element={<Category category="appetizers" />} />
        <Route path="/meals" element={<Category category="meals" />} />
        <Route path="/desserts" element={<Category category="desserts" />} />
        <Route path="/checkout" element={<CheckoutPage />} /> 

      </Routes>
    </Router>
  );
}

export default App;
