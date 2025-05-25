import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './App.css';

import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrambleTextPlugin);

const texts = ['TENTANG KOPI', 'TENTANG KOPI'];

const Marquee = () => {
  const marqueeRefs = useRef<HTMLDivElement[]>([]);
  const welcomeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // marquee gerak
    marqueeRefs.current.forEach((el) => {
      const inner = el.querySelector('.marquee-inner') as HTMLDivElement;

      gsap.to(inner, {
        xPercent: -100,
        y: -30,
        repeat: -1,
        duration: 20,
        ease: 'linear'
      });
    });

    // animasi scramble text
    if (welcomeRef.current) {
      gsap.to(welcomeRef.current, {
        duration: 3,
        scrambleText: {
          text: "WELCOME TO OUR WEBSITE",
          chars: "upperCase",
          revealDelay: 0.5
        },
        ease: "power2.inOut"
      });
    }
  }, []);

  return (
    <div>
      <div className="welcome-text" ref={welcomeRef}>LOADING...</div>

      <div className="marquee-wrapper">
        {texts.map((text, i) => (
          <div
            key={i}
            ref={(el) => el && (marqueeRefs.current[i] = el)}
            className={`marquee-container marquee-container-${i}`}
            style={{
              backgroundColor: i % 2 === 0 ? '#2e0e00' : '#1a0b00',
              transform: `rotate(${i === 0 ? '-4deg' : '4deg'})`,
              zIndex: 10 - i
            }}
          >
            <div className="marquee-inner">
              {[...Array(30)].map((_, j) => (
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
