"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  locale: "en" | "ar";
}

const SHUFFLE_IMAGES = [
  "/images/Gallery%20and%20portfolio/image%20(65).png",
  "/images/Gallery%20and%20portfolio/image%20(59).png",
  "/images/Gallery%20and%20portfolio/image%20(22).png",
  "/images/Gallery%20and%20portfolio/image%20(1).png",
  "/images/Gallery%20and%20portfolio/image%20(43).png",
];

export default function Preloader({ locale }: PreloaderProps) {
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("hasLoadedLightTower");
    }
    return true;
  });
  const [visible, setVisible] = useState(true);
  const [percent, setPercent] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    if (!shouldRender) return;

    // Fast preload essential scroll frames in background to ensure zero lag on landing
    const ESSENTIAL_FRAMES = 15;
    for (let i = 1; i <= ESSENTIAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = `/images/scroll-animation/frame-${String(i).padStart(3, "0")}.webp`;
    }

    // Dynamic numeric preloader counter syncing to 100%
    let startTimestamp: number | null = null;
    const duration = 2800; // 2.8 seconds total transition wait

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const progressPercentage = Math.min(progress / duration, 1);
      
      // Smooth ease-out deceleration curve
      const easeProgress = progressPercentage === 1 ? 1 : 1 - Math.pow(2, -10 * progressPercentage);
      const currentPercent = Math.floor(easeProgress * 100);
      
      setPercent(currentPercent);

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setPercent(100);
        // Short cushion hold at 100% to lock final frame
        setTimeout(() => dismiss(), 250);
      }
    };

    requestAnimationFrame(step);

    // Active Card Shuffle Interval (shuffles every 650ms)
    const shuffleInterval = setInterval(() => {
      setIsShuffling(true);
      // Wait for the slide-out phase to complete before changing the top card index
      setTimeout(() => {
        setCardIndex((prev) => (prev + 1) % SHUFFLE_IMAGES.length);
        setIsShuffling(false);
      }, 250); // slide-out transition time
    }, 650);

    const dismiss = () => {
      clearInterval(shuffleInterval);
      setVisible(false);
      sessionStorage.setItem("hasLoadedLightTower", "true");
      // Unmount preloader after the slide-up curtain and cards dispersion finishes (1.3s)
      setTimeout(() => setShouldRender(false), 1400);
    };

    return () => {
      clearInterval(shuffleInterval);
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  const isAr = locale === "ar";

  // Calculate card styles based on offsets relative to the active cardIndex
  const getCardStyle = (index: number) => {
    // Relative index in the visible stack
    const diff = (index - cardIndex + SHUFFLE_IMAGES.length) % SHUFFLE_IMAGES.length;

    // If visible is false, trigger the explosive dispersion exit transition!
    if (!visible) {
      // Scatter cards in 3D directions
      let tx = "0px";
      let ty = "0px";
      let rot = "0deg";
      if (diff === 0) { tx = "-150vw"; ty = "-150vh"; rot = "-45deg"; }
      else if (diff === 1) { tx = "150vw"; ty = "-150vh"; rot = "45deg"; }
      else if (diff === 2) { tx = "-150vw"; ty = "150vh"; rot = "-30deg"; }
      else if (diff === 3) { tx = "150vw"; ty = "150vh"; rot = "30deg"; }
      else { tx = "0px"; ty = "-200vh"; rot = "90deg"; }

      return {
        transform: `translate3d(${tx}, ${ty}, 0) rotate(${rot}) scale(0.6)`,
        opacity: 0,
        zIndex: 50 - diff,
        transition: "transform 1.3s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.9s ease-out",
      };
    }

    // Top card sliding out during shuffle
    if (diff === 0 && isShuffling) {
      return {
        transform: "translate3d(120%, -15px, 0) rotate(15deg) scale(0.9)",
        opacity: 0,
        zIndex: 50,
        transition: "transform 0.28s ease-in, opacity 0.25s ease-in",
      };
    }

    // Default stacking offsets for cards in the deck
    let transform = "translate3d(0, 0, 0) rotate(0deg) scale(1)";
    let opacity = 1;

    if (diff === 0) {
      // Active card on top
      transform = "translate3d(0, 0, 0) rotate(-1.5deg) scale(1)";
      opacity = 1;
    } else if (diff === 1) {
      transform = "translate3d(6px, 12px, 0) rotate(3deg) scale(0.96)";
      opacity = 0.9;
    } else if (diff === 2) {
      transform = "translate3d(-8px, 20px, 0) rotate(-4deg) scale(0.92)";
      opacity = 0.8;
    } else if (diff === 3) {
      transform = "translate3d(10px, 28px, 0) rotate(5deg) scale(0.88)";
      opacity = 0.6;
    } else {
      // Completely hidden cards deep in the deck
      transform = "translate3d(0, 36px, 0) rotate(0deg) scale(0.84)";
      opacity = 0;
    }

    return {
      transform,
      opacity,
      zIndex: 50 - diff,
      transition: "transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease-out",
    };
  };

  return (
    <div
      style={{
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        pointerEvents: visible ? "auto" : "none",
      }}
      className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center transition-transform duration-[1350ms] ease-[cubic-bezier(0.85,0,0.15,1)] overflow-hidden"
    >
      {/* ─── Opposing Scrolling Text Banners (Rogue Studio Marquee) ─── */}
      <div className="absolute inset-0 flex flex-col justify-center gap-24 pointer-events-none select-none z-0">
        
        {/* Top Marquee (Moving Left) */}
        <div className="w-full overflow-hidden opacity-[0.04]">
          <div className="flex w-max animate-marquee-left font-cormorant italic text-4xl md:text-[64px] uppercase tracking-[0.15em] text-white">
            <span>LIGHT TOWER ILLUMINATION • INSPIRING EXPERIENCES • ARCHITECTURAL LIGHTING • </span>
            <span>LIGHT TOWER ILLUMINATION • INSPIRING EXPERIENCES • ARCHITECTURAL LIGHTING • </span>
          </div>
        </div>

        {/* Bottom Marquee (Moving Right) */}
        <div className="w-full overflow-hidden opacity-[0.04]">
          <div className="flex w-max animate-marquee-right font-cormorant italic text-4xl md:text-[64px] uppercase tracking-[0.15em] text-white">
            <span>LIGHT TOWER ILLUMINATION • INSPIRING EXPERIENCES • ARCHITECTURAL LIGHTING • </span>
            <span>LIGHT TOWER ILLUMINATION • INSPIRING EXPERIENCES • ARCHITECTURAL LIGHTING • </span>
          </div>
        </div>

      </div>

      {/* ─── Main Content Wrapper ─── */}
      <div className="relative flex flex-col items-center justify-center z-10 gap-10 select-none">
        
        {/* Card Deck Wrapper */}
        <div className="relative w-[210px] h-[280px] md:w-[260px] md:h-[340px] flex items-center justify-center">
          {SHUFFLE_IMAGES.map((src, index) => (
            <div
              key={index}
              style={getCardStyle(index)}
              className="absolute w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#a855f7]/30 shadow-[0_15px_40px_rgba(168,85,247,0.18)] bg-[#030308] select-none"
            >
              <img
                src={src}
                alt="Light Tower Portfolio Feature"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
              {/* Sleek luxury gradient overlay inside the card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Digital Counter & Action Labels */}
        <div className="flex flex-col items-center gap-1.5 mt-2">
          <span className="font-display text-4xl md:text-5xl font-extralight tracking-widest text-[#a855f7] drop-shadow-[0_0_15px_rgba(168,85,247,0.35)] select-none">
            {String(percent).padStart(2, "0")}%
          </span>
          <span className="font-body text-[8px] md:text-[9px] font-bold tracking-[0.3em] uppercase text-zinc-500 select-none">
            {isAr ? "تحميل أعمال الضوء والابتكار" : "IGNITING CREATIVE ILLUMINATIONS"}
          </span>
        </div>

      </div>

      {/* Opposing marquee transitions & styling */}
      <style jsx>{`
        @keyframes marqueeLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-marquee-left {
          animation: marqueeLeft 32s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 32s linear infinite;
        }
      `}</style>
    </div>
  );
}
