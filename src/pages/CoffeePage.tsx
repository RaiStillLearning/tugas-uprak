    // CoffeePage.tsx (fix bagian style agar responsif)

    import { useEffect, useState } from "react";
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
    const [cartItems, setCartItems] = useState<Coffee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCoffee() {
        try {
            const res = await axios.get("https://uprak-be.vercel.app/api/coffee");
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

    const handleAddToCart = (coffee: Coffee) => {
        setCartItems((prev) => [...prev, coffee]);
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center text-danger mt-5">{error}</p>;

    return (
        <div className="container py-4">
        <h1 className="mb-4 text-center">Our Coffees</h1>

        <div
            style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "32px",
            flexWrap: "wrap", // biar responsif
            }}
        >
            {/* Coffee Cards */}
            <div
            style={{
                flex: "1 1 0",
                maxWidth: 960,
                minWidth: 280, // minimal lebar agar tidak terlalu kecil
            }}
            >
            <div
                className="coffee-grid"
                style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
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
                    (e.currentTarget as HTMLDivElement).style.transform =
                        "scale(1.05)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 12px 30px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform =
                        "scale(1)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 8px 15px rgba(0,0,0,0.1)";
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
                        handleAddToCart(coffee);
                    }}
                    >
                    Add to Cart
                    </button>
                </div>
                ))}
            </div>
            </div>

            {/* Cart Sidebar */}
            <div
            style={{
                width: 280,
                position: "sticky",
                top: 80,
                flexShrink: 0,
            }}
            className="cart-sidebar"
            >
            <CartSidebar cartItems={cartItems} />
            </div>
        </div>

        {/* Tambah CSS responsif via style tag */}
        <style>{`
            @media (max-width: 768px) {
            .coffee-grid {
                grid-template-columns: 1fr !important;
            }
            .cart-sidebar {
                width: 100% !important;
                position: static !important;
                margin-top: 24px;
            }
            div[style*="display: flex"][style*="justify-content: center"] {
                flex-direction: column !important;
                align-items: center !important;
            }
            }
        `}</style>
        </div>
    );
    };

    export default CoffeePage;
