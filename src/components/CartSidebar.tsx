// CartSidebar.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Coffee {
  name: string;
  price: number;
}

interface CartItem {
  _id: string;
  quantity: number;
  coffeeId: Coffee;
}

const CartSidebar = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await axios.get("http://localhost:3000/api/cart");
        setCart(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch cart data");
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        width: "280px",
        background: "#f8f9fa",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h4>Your Cart</h4>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item) => (
            <li key={item._id} style={{ marginBottom: "12px" }}>
              <strong>{item.coffeeId.name}</strong>
              <br />
              Rp {item.coffeeId.price.toLocaleString()} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartSidebar;
