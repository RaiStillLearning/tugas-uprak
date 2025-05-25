import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animasi muncul container
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }

    // Simulasi pesan otomatis dengan jeda
    const timeout1 = setTimeout(() => {
      setMessages(["Aduh capek nih, ke Tentang Kopi yukkk"]);
    }, 1000);

    const timeout2 = setTimeout(() => {
      setMessages((prev) => [...prev, "Yukkkkk!!!"]);
    }, 3000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  useEffect(() => {
    // Animasi setiap pesan yang baru muncul
    if (!containerRef.current) return;

    const lastMessage = containerRef.current.querySelector(
      "div > div:last-child"
    );

    if (lastMessage) {
      gsap.fromTo(
        lastMessage,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [messages]);

  const handleClose = () => {
    if (!containerRef.current) return;

    // Animasi menghilang
    gsap.to(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: "power3.in",
      onComplete: () => setVisible(false),
    });
  };

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        maxWidth: "280px",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        padding: "16px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h5 style={{ margin: 0, fontWeight: "bold" }}>Ayangggg</h5>
        <button
          onClick={handleClose}
          style={{
            background: "red",
            borderRadius: "50%",
            border: "none",
            fontSize: 6,
            cursor: "pointer",
            lineHeight: 2,
          }}
          aria-label="Close chat"
        >
          &#10005;
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
              backgroundColor: index % 2 === 0 ? "#f1f0f0" : "#d1e7dd",
              padding: "8px 12px",
              borderRadius: "16px",
              maxWidth: "80%",
              fontSize: "14px",
              opacity: 1,
            }}
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
