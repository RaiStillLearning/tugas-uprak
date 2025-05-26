interface Coffee {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const CartSidebar = ({ cartItems }: { cartItems: Coffee[] }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        minHeight: "200px",
      }}
    >
      <h4 className="mb-3">🛒 Your Cart</h4>
      {cartItems.length === 0 ? (
        <p className="text-muted">Cart masih kosong.</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {cartItems.map((item, index) => (
            <li key={index} style={{ marginBottom: 10 }}>
              <strong>{item.name}</strong> — Rp {item.price.toLocaleString()}
            </li>
          ))}
        </ul>
      )}
      <hr />
      <p>
        <strong>Total:</strong> Rp {total.toLocaleString()}
      </p>
    </div>
  );
};

export default CartSidebar;
