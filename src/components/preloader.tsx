"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  locale: "en" | "ar";
}

export default function Preloader({ locale }: PreloaderProps) {
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("hasLoadedLightTower");
    }
    return true;
  });
  const [visible, setVisible] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!shouldRender) return;

    // Fast preload essential scroll frames in background
    const ESSENTIAL_FRAMES = 15;
    for (let i = 1; i <= ESSENTIAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = `/images/scroll-animation/frame-${String(i).padStart(3, "0")}.webp`;
    }

    // Luxurious organic digital counter (0 to 100) using a smooth ease-out-exponential curve
    let startTimestamp: number | null = null;
    const duration = 2400; // 2.4 seconds loading time

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const progressPercentage = Math.min(progress / duration, 1);
      
      // Luxurious ease-out curve (start fast, decelerate organically towards 100%)
      const easeProgress = progressPercentage === 1 ? 1 : 1 - Math.pow(2, -10 * progressPercentage);
      const currentPercent = Math.floor(easeProgress * 100);
      
      setPercent(currentPercent);

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setPercent(100);
        // Add a slight luxurious cushion hold at 100% before committing the slide-up curtain wipe
        const dismissTimer = setTimeout(() => {
          dismiss();
        }, 250);
      }
    };

    requestAnimationFrame(step);

    const dismiss = () => {
      setVisible(false);
      sessionStorage.setItem("hasLoadedLightTower", "true");
      // Unmount the preloader component after the 1.3s upward curtain slide finishes
      setTimeout(() => setShouldRender(false), 1300);
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  const isAr = locale === "ar";

  return (
    <div
      style={{
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        pointerEvents: visible ? "auto" : "none",
      }}
      className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center transition-transform duration-[1300ms] ease-[cubic-bezier(0.85,0,0.15,1)] overflow-hidden"
    >
      <div className="relative flex flex-col items-center justify-center max-w-[80vw] z-10 gap-8">
        {/* Breathing logo image - magenta-cyan interlocking LT logo */}
        <div className="relative overflow-hidden">
          <img
            src="/images/logo-transparent.png"
            alt="Light Tower Illumination"
            className="w-64 md:w-80 lg:w-[350px] h-auto object-contain select-none animate-logo-pulse"
          />
        </div>

        {/* Cinematic Digital Percent Counter & Tracking Label */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-display text-5xl md:text-7xl font-extralight tracking-widest text-[#a855f7] drop-shadow-[0_0_20px_rgba(168,85,247,0.3)] select-none">
            {String(percent).padStart(2, "0")}%
          </span>
          <span className="font-body text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mt-2 select-none">
            {isAr ? "جاري تهيئة أنظمة الإضاءة المعمارية" : "INITIALIZING ARCHITECTURAL LIGHT SYSTEMS"}
          </span>
        </div>
      </div>

      {/* Breathing animation keyframes */}
      <style jsx>{`
        @keyframes logoPulse {
          0%, 100% {
            transform: scale(0.96);
            opacity: 0.65;
            filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.15));
          }
          50% {
            transform: scale(1.02);
            opacity: 1.0;
            filter: drop-shadow(0 0 30px rgba(168, 85, 247, 0.45));
          }
        }
        .animate-logo-pulse {
          animation: logoPulse 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
