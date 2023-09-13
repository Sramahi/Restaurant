import React, { useState } from 'react';
import './CheckoutPage.css';

function CheckoutPage() {
  const order = JSON.parse(localStorage.getItem('order')) || [];
  const totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [creditCardFilled, setCreditCardFilled] = useState(false);
  const [giftCardFilled, setGiftCardFilled] = useState(false);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setCreditCardFilled(false);
    setGiftCardFilled(false);
  };

  const handleCreditCardInfoChange = () => {
    setCreditCardFilled(true);
  };

  const handleGiftCardInfoChange = () => {
    setGiftCardFilled(true);
  };

  const handleOrderConfirm = () => {
    if (selectedPaymentMethod === 'cash') {
      // Handle cash payment confirmation
      confirmOrder();
    } else if (selectedPaymentMethod === 'credit') {
      if (creditCardFilled) {
        // Handle credit card payment confirmation
        confirmOrder();
      } else {
        alert('Please fill out the credit card information.');
      }
    } else if (selectedPaymentMethod === 'giftCard') {
      if (giftCardFilled) {
        // Handle gift card payment confirmation
        confirmOrder();
      } else {
        alert('Please fill out the gift card information.');
      }
    } else {
      alert('Please select a payment method before confirming your order.');
    }
  };

  const confirmOrder = () => {
    // Handle payment processing logic
    // Reset order and total in localStorage
    localStorage.removeItem('order');
    localStorage.removeItem('totalPrice');
    // Show success message
    alert('Your order has been confirmed. Thank you!');
  };


  const renderPaymentForm = () => {
    if (selectedPaymentMethod === 'cash') {
      return (
        <div>
          {/* Form for cash payment */}
          <p>Please prepare the exact amount in cash.</p>
        </div>
      );
    } else if (selectedPaymentMethod === 'credit') {
      return (
        <div>
          {/* Form for credit card payment */}
          <p>
          <label>
            First Name:
            <input type="text" required onChange={handleCreditCardInfoChange} />
          </label>
          <label>
            Last Name:
            <input type="text" required onChange={handleCreditCardInfoChange} />
          </label>
          <label>
            Card Number:
            <input type="number" required onChange={handleCreditCardInfoChange} />
          </label>
          <p>
          <label>
            Expiry Date:
            <input type="date" required onChange={handleCreditCardInfoChange} />
          </label>
          <label>
            CVV:
            <input type="number" required onChange={handleCreditCardInfoChange} />
          </label>
          </p>
          </p>
        </div>
      );
    } else if (selectedPaymentMethod === 'giftCard') {
      return (
        <div>
          {/* Form for gift card payment */}
          <p>
          <label>
            Gift Card Number:
            <input type="text" required onChange={handleGiftCardInfoChange} />
          </label>
          <label>
            PIN:
            <input type="password" required onChange={handleGiftCardInfoChange} />
          </label>
          </p>
        </div>
      );
    } else {
      return null; // No payment method selected
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="bill-box">
        <h2>Bill Summary</h2>
        <ul>
          {order.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p>Total: ${totalPrice.toFixed(2)}</p>
      </div>
      <h3>Choose Payment Method:</h3>
      <div>
        <label>
          <input
            type="radio"
            value="cash"
            checked={selectedPaymentMethod === 'cash'}
            onChange={() => handlePaymentMethodSelect('cash')}
          />
          Cash
        </label>
        <label>
          <input
            type="radio"
            value="credit"
            checked={selectedPaymentMethod === 'credit'}
            onChange={() => handlePaymentMethodSelect('credit')}
          />
          Credit Card
        </label>
        <label>
          <input
            type="radio"
            value="giftCard"
            checked={selectedPaymentMethod === 'giftCard'}
            onChange={() => handlePaymentMethodSelect('giftCard')}
          />
          Gift Card
        </label>
      </div>
      {renderPaymentForm()}
      <button className="order-button" onClick={handleOrderConfirm}>
      Confirm Order
      </button>
    </div>
  );
}

export default CheckoutPage;
