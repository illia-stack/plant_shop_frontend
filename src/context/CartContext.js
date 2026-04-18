import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // ✅ GET USER FROM AUTH CONTEXT
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ---------------------------
  // CART FUNCTIONS
  // ---------------------------

  const addToCart = (plant) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === plant.id);

      if (existing) {
        return prev.map((item) =>
          item.id === plant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: plant.id,
          name: plant.name,
          price: plant.price,
          quantity: 1
        }
      ];
    });
  };

  const increaseQty = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

  const decreaseQty = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  // ---------------------------
  // TOTAL (WITH DISCOUNT)
  // ---------------------------

  let total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (user) {
    total = total * 0.95;
  }

  // ---------------------------
  // CHECKOUT
  // ---------------------------

  const checkout = async (preparedCart) => {
    try {
      const response = await fetch(
        "http://localhost/4_Indoor_Gardening_Plants/indoor-gardening-backend/api/create-checkout-session.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ cart: preparedCart })
        }
      );

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("JSON ERROR:", err);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe error:", data);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        total,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};