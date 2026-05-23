"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  locale: "en" | "ar";
}

const SHUFFLE_IMAGES = [
  "/images/Gallery%20and%20portfolio/image%20(65).png",
  "/images/Gallery%20and%20portfolio/image%20(1).png",
  "/images/Gallery%20and%20portfolio/image%20(13).png",
  "/images/Gallery%20and%20portfolio/image%20(27).png",
  "/images/Gallery%20and%20portfolio/image%20(42).png",
];

const COLLAGE_IMAGES = [
  "/images/Gallery%20and%20portfolio/image%20(1).png",
  "/images/Gallery%20and%20portfolio/image%20(2).png",
  "/images/Gallery%20and%20portfolio/image%20(3).png",
  "/images/Gallery%20and%20portfolio/image%20(9).png",
  "/images/Gallery%20and%20portfolio/image%20(10).png",
  "/images/Gallery%20and%20portfolio/image%20(13).png",
  "/images/Gallery%20and%20portfolio/image%20(14).png",
  "/images/Gallery%20and%20portfolio/image%20(15).png",
  "/images/Gallery%20and%20portfolio/image%20(16).png",
  "/images/Gallery%20and%20portfolio/image%20(17).png",
  "/images/Gallery%20and%20portfolio/image%20(18).png",
  "/images/Gallery%20and%20portfolio/image%20(20).png",
  "/images/Gallery%20and%20portfolio/image%20(21).png",
  "/images/Gallery%20and%20portfolio/image%20(27).png",
  "/images/Gallery%20and%20portfolio/image%20(28).png",
  "/images/Gallery%20and%20portfolio/image%20(29).png",
  "/images/Gallery%20and%20portfolio/image%20(30).png",
  "/images/Gallery%20and%20portfolio/image%20(41).png",
  "/images/Gallery%20and%20portfolio/image%20(42).png",
  "/images/Gallery%20and%20portfolio/image%20(46).png",
  "/images/Gallery%20and%20portfolio/image%20(60).png",
  "/images/Gallery%20and%20portfolio/image%20(61).png",
  "/images/Gallery%20and%20portfolio/image%20(62).png",
  "/images/Gallery%20and%20portfolio/image%20(65).png",
];

export default function Preloader({ locale }: PreloaderProps) {
  const [shouldRender, setShouldRender] = useState(true);
  const [visible, setVisible] = useState(true);
  const [percent, setPercent] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [collageState, setCollageState] = useState<"none" | "populating" | "complete">("none");

  useEffect(() => {
    // Check if already loaded on client-side mount (after hydration complete)
    const hasLoaded = sessionStorage.getItem("hasLoadedLightTower");
    if (hasLoaded) {
      setShouldRender(false);
      setVisible(false);
      return;
    }

    // Fast preload essential scroll frames in background to ensure zero lag on landing
    const ESSENTIAL_FRAMES = 15;
    for (let i = 1; i <= ESSENTIAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = `/images/scroll-animation/frame-${String(i).padStart(3, "0")}.webp`;
    }

    // Active Card Shuffle Interval (shuffles every 650ms)
    const shuffleInterval = setInterval(() => {
      setIsShuffling(true);
      // Wait for the slide-out phase to complete before changing the top card index
      setTimeout(() => {
        setCardIndex((prev) => (prev + 1) % SHUFFLE_IMAGES.length);
        setIsShuffling(false);
      }, 250); // slide-out transition time
    }, 650);

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
        // Stop shuffling immediately so the active card stays static in the final state
        clearInterval(shuffleInterval);
        
        // 1. Hold the luxurious final state (stacked text + crown doodle) for 3.2 seconds
        setTimeout(() => {
          // 2. Transition into the beautiful full-screen collage state
          setCollageState("populating");
          
          // 3. Keep the collage fully populated for 2.5 seconds, then dismiss
          setTimeout(() => {
            dismiss();
          }, 2500);
        }, 3200);
      }
    };

    requestAnimationFrame(step);

    const dismiss = () => {
      clearInterval(shuffleInterval);
      setVisible(false);
      sessionStorage.setItem("hasLoadedLightTower", "true");
      // Unmount preloader after the slide-up curtain and cards dispersion finishes (1.4s)
      setTimeout(() => setShouldRender(false), 1400);
    };

    return () => {
      clearInterval(shuffleInterval);
    };
  }, []);

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

    // At 100% load, spread cards stack into left and right columns to make center text 100% visible
    if (percent === 100 && visible) {
      const isEven = index % 2 === 0;
      let tx = "0px";
      let ty = "0px";
      let rot = "0deg";
      let scale = 1;
      let opacity = 1;

      if (index === 0) {
        tx = "calc(1.1 * var(--card-spread-x, 24vw))"; ty = "-15px"; rot = "5deg"; scale = 0.88; opacity = 1;
      } else if (index === 1) {
        tx = "calc(-1.1 * var(--card-spread-x, 24vw))"; ty = "20px"; rot = "-6deg"; scale = 0.88; opacity = 1;
      } else if (index === 2) {
        tx = "calc(1.35 * var(--card-spread-x, 24vw))"; ty = "35px"; rot = "-3deg"; scale = 0.8; opacity = 0.85;
      } else if (index === 3) {
        tx = "calc(-1.35 * var(--card-spread-x, 24vw))"; ty = "-25px"; rot = "8deg"; scale = 0.8; opacity = 0.85;
      } else if (index === 4) {
        tx = "calc(1.6 * var(--card-spread-x, 24vw))"; ty = "-5px"; rot = "2deg"; scale = 0.72; opacity = 0.7;
      }

      return {
        transform: `translate3d(${tx}, ${ty}, 0) rotate(${rot}) scale(${scale})`,
        opacity,
        zIndex: 50 - diff,
        transition: "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease-out",
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
      id="global-preloader"
      style={{
        transform: visible ? "translateY(0%)" : "translateY(-100%)",
        pointerEvents: visible ? "auto" : "none",
      }}
      className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center transition-transform duration-[1350ms] ease-[cubic-bezier(0.85,0,0.15,1)] overflow-hidden"
    >
      {/* Inline script to instantly hide the preloader if it has already been loaded, preventing flash without modifying DOM classes to avoid hydration mismatch */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && sessionStorage.getItem('hasLoadedLightTower')) {
              var style = document.createElement('style');
              style.id = 'preloader-bypass-style';
              style.innerHTML = '#global-preloader { display: none !important; }';
              document.head.appendChild(style);
            }
          `,
        }}
      />

      {/* ─── Opposing Scrolling Text Banners (Rogue Studio Marquee) ─── */}
      <div
        style={{
          opacity: percent === 100 ? 0 : 1,
          transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="absolute inset-0 flex flex-col justify-center gap-24 pointer-events-none select-none z-0"
      >
        {/* Top Marquee (Moving Left) */}
        <div className="w-full overflow-hidden opacity-[0.07]">
          <div className="flex w-max animate-marquee-left font-cormorant italic text-4xl md:text-[64px] uppercase tracking-[0.15em] text-[#a855f7]">
            <span>LIGHT TOWER ILLUMINATION • INSPIRING EXPERIENCES • ARCHITECTURAL LIGHTING • </span>
            <span>LIGHT TOWER ILLUMINATION • INSPIRING EXPERIENCES • ARCHITECTURAL LIGHTING • </span>
          </div>
        </div>

        {/* Bottom Marquee (Moving Right) */}
        <div className="w-full overflow-hidden opacity-[0.07]">
          <div className="flex w-max animate-marquee-right font-cormorant italic text-4xl md:text-[64px] uppercase tracking-[0.15em] text-[#a855f7]">
            <span>LIGHT TOWER ILLUMINATION • INSPIRING EXPERIENCES • ARCHITECTURAL LIGHTING • </span>
            <span>LIGHT TOWER ILLUMINATION • INSPIRING EXPERIENCES • ARCHITECTURAL LIGHTING • </span>
          </div>
        </div>
      </div>

      {/* ─── Final State Big Typography (Rogue Studio Style) ─── */}
      {percent === 100 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-20 animate-fade-in-up">
          <div className="text-center flex flex-col items-center justify-center leading-none">
            <span className="font-cormorant text-2xl md:text-5xl lg:text-6xl font-light tracking-[0.25em] text-white uppercase">
              {isAr ? "إنارة المساحات •" : "CREATING SPACES *"}
            </span>
            <span className="font-sans text-[11vw] md:text-[8vw] lg:text-[7vw] font-black tracking-tighter text-[#a855f7] drop-shadow-[0_0_25px_rgba(168,85,247,0.6)] uppercase leading-none my-3 md:my-4 font-stretch-condensed">
              {isAr ? "مبهرة" : "IMPOSSIBLE"}
            </span>
            <span className="font-cormorant text-2xl md:text-5xl lg:text-6xl font-light tracking-[0.25em] text-white uppercase">
              {isAr ? "للنسيان" : "TO IGNORE"}
            </span>
          </div>
        </div>
      )}

      {/* ─── Main Content Wrapper ─── */}
      <div className="relative flex flex-col items-center justify-center z-10 gap-10 select-none">
        
        {/* Card Deck Wrapper - Updated to Widescreen Landscape to match Portfolio Aspect and show full work */}
        <div className="relative w-[280px] h-[190px] md:w-[420px] md:h-[280px] flex items-center justify-center">
          
          {/* Main shuffling card stack */}
          {SHUFFLE_IMAGES.map((src, index) => {
            const isTopCard = index === cardIndex;
            return (
              <div
                key={index}
                style={getCardStyle(index)}
                className="absolute w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#a855f7]/30 shadow-[0_20px_50px_rgba(168,85,247,0.22)] bg-[#030308] select-none"
              >
                <img
                  src={src}
                  alt="Light Tower Portfolio Feature"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
                
                {/* Sleek luxury gradient overlay inside the card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent z-10" />

                {/* Rogue Studio custom hand-drawn red crown doodle, fades in absolute on top card at 100% loading */}
                {percent === 100 && isTopCard && visible && (
                  <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-14 h-14 md:w-20 md:h-20 text-[#ef4444] animate-doodle-bounce select-none pointer-events-none z-30 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                      {/* Artistic hand-drawn crown profile */}
                      <path d="M12 75 L22 35 L42 58 L52 25 L62 58 L82 35 L92 75 Z" />
                      {/* Double supporting underline strokes */}
                      <path d="M18 82 L82 82" />
                      <path d="M28 88 L72 88" strokeWidth="4" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>


      </div>

      {/* ─── Full-Screen Image Collage State (Fades in over final state before transition) ─── */}
      {collageState !== "none" && (
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-100%)",
            transition: "transform 1.35s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.8s ease-out",
          }}
          className="absolute inset-0 bg-black z-50 flex items-center justify-center p-2 md:p-3 overflow-hidden select-none pointer-events-none"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 w-full h-full gap-2 overflow-hidden">
            {COLLAGE_IMAGES.map((src, index) => (
              <div
                key={index}
                style={{
                  animationDelay: `${index * 40}ms`,
                }}
                className="animate-collage-cell overflow-hidden rounded-lg md:rounded-2xl border border-[#a855f7]/10 bg-[#030308] relative w-full h-full"
              >
                <img
                  src={src}
                  alt="Light Tower Masterpiece Collage"
                  className="w-full h-full object-cover filter brightness-[0.88] saturate-[1.05]"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none z-10" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Opposing marquee transitions, fadeInUp typography & doodle keyframes */}
      <style jsx>{`
        #global-preloader {
          --card-spread-x: 35vw;
        }
        @media (min-width: 768px) {
          #global-preloader {
            --card-spread-x: 25vw;
          }
        }
        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 32s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 32s linear infinite;
        }
        @keyframes fadeInUp {
          0% { transform: translate3d(0, 30px, 0) scale(0.98); opacity: 0; }
          100% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes doodleBounce {
          0%, 100% { transform: translate3d(-50%, -4px, 0) rotate(-2deg); }
          50% { transform: translate3d(-50%, 4px, 0) rotate(2deg); }
        }
        .animate-doodle-bounce {
          animation: doodleBounce 1.8s ease-in-out infinite;
        }
        @keyframes collageFadeIn {
          from {
            opacity: 0;
            transform: scale(1.1) translate3d(0, 12px, 0);
            filter: brightness(0.35) saturate(0.7);
          }
          to {
            opacity: 1;
            transform: scale(1) translate3d(0, 0, 0);
            filter: brightness(0.95) saturate(1);
          }
        }
        .animate-collage-cell {
          opacity: 0;
          animation: collageFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      

    </div>
  );
}
