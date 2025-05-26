import React, { useEffect, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import CartSidebar from "../components/CartSidebar";

interface Coffee {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const CoffeePage = () => {
  const [coffeeList, setCoffeeList] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCoffee() {
      try {
        const res = await axios.get("http://localhost:3000/api/coffee");
        setCoffeeList(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch coffee list");
      } finally {
        setLoading(false);
      }
    }
    fetchCoffee();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".coffee-card",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
  }, [coffeeList]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Our Coffees</h1>

      {/* Bungkus coffee-grid + sidebar */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
          justifyContent: "center",
          flexWrap: "wrap", // biar responsif di layar kecil
        }}
      >
        {/* Coffee Grid */}
        <div
          className="coffee-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            maxWidth: 960,
            flex: "1 1 auto",
          }}
        >
          {coffeeList.slice(0, 6).map((coffee) => (
            <div
              key={coffee._id}
              className="coffee-card card shadow"
              style={{
                borderRadius: "16px",
                padding: "16px",
                cursor: "pointer",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.1)";
              }}
            >
              <img
                src="/images/coffeeLatte-tentang-kopi.jpeg"
                alt={coffee.name}
                style={{
                  width: "100%",
                  height: 180,
                  borderRadius: "12px",
                  objectFit: "cover",
                  marginBottom: 12,
                }}
              />
              <h3 style={{ marginBottom: 6 }}>{coffee.name}</h3>
              <p className="text-muted" style={{ marginBottom: 12 }}>
                Rp {coffee.price.toLocaleString()}
              </p>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Add to cart: ${coffee.name}`);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar cart */}
        <CartSidebar />
      </div>
    </div>
  );
};

export default CoffeePage;
