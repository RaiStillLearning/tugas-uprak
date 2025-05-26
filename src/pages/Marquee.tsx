import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const texts = ["TENTANG KOPI", "TENTANG KOPI"];

const Marquee = () => {
  const marqueeRefs = useRef<HTMLDivElement[]>([]);
  const welcomeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    marqueeRefs.current.forEach((el) => {
      const inner = el.querySelector(".marquee-inner") as HTMLDivElement;

      // Clone child untuk seamless loop
      const clone = inner.innerHTML;
      inner.innerHTML += clone;

      gsap.to(inner, {
        xPercent: -50,
        repeat: -1,
        ease: "linear",
        duration: 20,
      });
    });

    if (welcomeRef.current) {
      gsap.to(welcomeRef.current, {
        duration: 3,
        scrambleText: {
          text: "WELCOME TO OUR WEBSITE",
          chars: "upperCase",
          revealDelay: 0.5,
        },
        ease: "power2.inOut",
      });
    }
  }, []);

  return (
    <div>
      <div className="text-container" style={{ top: "40%" }}>
        <div className="welcome-text" ref={welcomeRef}>
          LOADING...
        </div>
        <div className="sub-welcome-text">
          Tugas Ujian Praktek Sekolah "Tentang Kopi☕"
        </div>
        <div className="footer-section py-5">
          <div className="footer-text">
            <p>&copy; Copyright 2025 - Ujian Praktek</p>
          </div>
        </div>
      </div>

      <div className="marquee-wrapper">
        {texts.map((text, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) marqueeRefs.current[i] = el;
            }}
            className={`marquee-container marquee-container-${i}`}
            style={{
              backgroundColor: "#270f03",
              transform: `rotate(${i === 0 ? "-4deg" : "4deg"})`,
              zIndex: 10 - i,
            }}
          >
            <div className="marquee-inner">
              {[...Array(20)].map((_, j) => (
                <span key={j} className={`marquee-text marquee-text-${i}`}>
                  {text}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
