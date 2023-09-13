import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';
import './MenuCategory.css';

function Category({ category }) {
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useNavigate();

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem('order')) || [];
    const savedTotalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;
    setOrder(savedOrder);
    setTotalPrice(savedTotalPrice);
  }, []);

  const items = {
    appetizers: [
      { name: 'Crispy Spring Rolls', price: 7.99 },
      { name: 'Garlic Parmesan Fries', price: 5.99 },
      { name: 'Bruschetta', price: 8.49 },
      { name: 'Mozzarella Sticks', price: 6.99},
      { name: 'Spinach and Artichoke Dip', price: 9.49},
      { name: 'Fried Calamari', price: 11.99 },
    ],
    meals: [
      { name: 'Grilled Chicken Plate', price: 12.99 },
      { name: 'Pasta Alfredo', price: 10.49 },
      { name: 'Beef Stir-Fry', price: 13.95 },
      // Add more meals here
    ],
    desserts: [
      { name: 'Chocolate Lava Cake', price: 6.99 },
      { name: 'Fruit Parfait', price: 5.49 },
      { name: 'Cheesecake', price: 7.95 },
      // Add more desserts here
    ],
  };

  const addToOrder = (item) => {
    setOrder([...order, item]);
    setTotalPrice(totalPrice + item.price);
    updateLocalStorage([...order, item], totalPrice + item.price);
  };

  const removeFromOrder = (item) => {
    const updatedOrder = order.filter((orderItem) => orderItem !== item);
    const updatedTotalPrice = totalPrice - item.price;
    setOrder(updatedOrder);
    setTotalPrice(updatedTotalPrice);
    updateLocalStorage(updatedOrder, updatedTotalPrice);
  };

  const updateLocalStorage = (updatedOrder, updatedTotalPrice) => {
    localStorage.setItem('order', JSON.stringify(updatedOrder));
    localStorage.setItem('totalPrice', JSON.stringify(updatedTotalPrice));
  };

  const handleCheckout = () => {
    history('/checkout');
  };

  return (
    <div className="menu-category">
      <MenuBar />

      <div className="content">
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        <div className="menu-list">
          {items[category].map((item, index) => (
            <div className="menu-item" key={index}>
              <span className="item-name">{item.name}</span>
              <span className="item-price">${item.price.toFixed(2)}</span>
              <button onClick={() => addToOrder(item)}>Add to Order</button>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <div className="bill-box">
            <h2>Bill</h2>
            <ul>
              {order.map((item, index) => (
                <li key={index}>
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                  <button onClick={() => removeFromOrder(item)}>Remove</button>
                </li>
              ))}
            </ul>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
