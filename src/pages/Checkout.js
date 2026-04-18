// src/pages/Checkout.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For API requests (adjust based on your actual API)

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace this with an actual API call to fetch cart data
    // For example, calling your backend to get cart items from the database
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/api/cart"); // Adjust API endpoint
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleCheckout = () => {
    // Logic for handling checkout (e.g., redirecting to payment page)
    navigate("/checkout/success");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - €{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={handleCheckout} disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Checkout;