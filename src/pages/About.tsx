import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ImageAll from "./../../public/images/Profile-PNG-Photo.png";

const cardsData = [
  {
    color: "#FF6B6B",
    title: "Raka Arkana",
    image: { ImageAll },
    description: "Software Engineer from Jakarta.",
  },
  {
    color: "#4ECDC4",
    title: "Sadik Shardi",
    image: { ImageAll },
    description: "UI/UX Designer from Bandung.",
  },
  {
    color: "#556270",
    title: "Raffi Ramadhan",
    image: { ImageAll },
    description: "Product Manager from Surabaya.",
  },
  {
    color: "#FF6B6B",
    title: "Affan Akbar",
    image: { ImageAll },
    description: "Digital Marketer from Bali.",
  },
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (!cardsRef.current[activeIndex]) return;
    if (isMobile) return;

    const card = cardsRef.current[activeIndex];
    gsap.fromTo(
      card,
      { scale: 0.9, opacity: 0.7 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [activeIndex, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    if (!containerRef.current || !cardsRef.current[activeIndex]) return;

    const card = cardsRef.current[activeIndex];
    const container = containerRef.current;

    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const containerWidth = container.offsetWidth;

    const scrollPos = cardLeft - (containerWidth / 2 - cardWidth / 2);

    container.scrollTo({ left: scrollPos, behavior: "smooth" });
  }, [activeIndex, isMobile]);

  return (
    <div
      style={{
        position: "relative",
        padding: "40px 20px",
        maxWidth: "100vw",
        boxSizing: "border-box",
      }}
    >
      {/* Container Cards */}
      <div
        ref={containerRef}
        className="container-cards"
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "20px",
          overflowX: isMobile ? "visible" : "auto",
          scrollSnapType: isMobile ? undefined : "x mandatory",
          scrollBehavior: "smooth",
          justifyContent: isMobile ? "center" : undefined,
          alignItems: isMobile ? undefined : "center",
          height: isMobile ? "auto" : "70vh",
          userSelect: "none",
          paddingBottom: "10px",
        }}
      >
        {cardsData.map(({ color, title, image, description }, i) => {
          const isActive = !isMobile && i === activeIndex;
          const isHovered = i === hoverIndex;

          return (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{
                flex: isMobile ? undefined : "0 0 80vw",
                height: isMobile ? "auto" : "400px",
                backgroundColor: color,
                borderRadius: "16px",
                boxShadow: isHovered
                  ? "0 12px 30px rgba(0,0,0,0.5)"
                  : "0 8px 20px rgba(0,0,0,0.15)",
                scrollSnapAlign: isMobile ? undefined : "center",
                color: "white",
                display: "flex",
                flexDirection: "row",
                padding: "20px",
                alignItems: "center",
                gap: "30px",
                maxWidth: isMobile ? "600px" : undefined,
                margin: isMobile ? "0 auto" : undefined,
                transform: isHovered
                  ? "scale(1.05)"
                  : isActive
                  ? "scale(1)"
                  : "scale(0.9)",
                opacity: !isMobile && i === activeIndex ? 1 : 0.7,
                transition:
                  "transform 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={image.ImageAll}
                alt={title}
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <h2 style={{ marginBottom: "12px" }}>{title}</h2>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.5" }}>
                  {description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      {!isMobile && (
        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
            userSelect: "none",
          }}
        >
          {cardsData.map((_, i) => (
            <span
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                display: "inline-block",
                width: "14px",
                height: "14px",
                margin: "0 8px",
                borderRadius: "50%",
                backgroundColor: i === activeIndex ? "#333" : "#bbb",
                cursor: "pointer",
                boxShadow:
                  i === activeIndex ? "0 0 10px 3px rgba(0,0,0,0.3)" : "none",
                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
              }}
              aria-label={`Go to slide ${i + 1}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActiveIndex(i);
              }}
            />
          ))}
        </div>
      )}

      {/* Info slide */}
      {!isMobile && (
        <div
          style={{
            marginTop: "10px",
            textAlign: "center",
            color: "#333",
            fontWeight: "600",
            fontSize: "1.1rem",
            userSelect: "none",
          }}
        >
          Card {activeIndex + 1} dari {cardsData.length}
        </div>
      )}
    </div>
  );
};

export default About;
