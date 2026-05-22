"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  locale: "en" | "ar";
}

export default function Preloader({ locale }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Fast preload essential frames in background
    const ESSENTIAL_FRAMES = 15;
    let loadedCount = 0;
    let imagesPreloaded = false;
    let minTimeElapsed = false;

    const tryDismiss = () => {
      if (imagesPreloaded && minTimeElapsed) {
        dismiss();
      }
    };

    const onFrameLoaded = () => {
      loadedCount++;
      if (loadedCount >= ESSENTIAL_FRAMES) {
        imagesPreloaded = true;
        tryDismiss();
      }
    };

    const dismiss = () => {
      setVisible(false);
      setTimeout(() => setShouldRender(false), 800);
    };

    for (let i = 1; i <= ESSENTIAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = `/images/scroll-animation/frame-${String(i).padStart(3, "0")}.webp`;
      img.onload = onFrameLoaded;
      img.onerror = onFrameLoaded;
    }

    // Enforce a minimum display time of 3000ms so the user can see what is happening
    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      tryDismiss();
    }, 3000);

    // Safety timeout of 5500ms
    const safetyTimeout = setTimeout(() => {
      imagesPreloaded = true;
      minTimeElapsed = true;
      dismiss();
    }, 5500);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(safetyTimeout);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      className="fixed inset-0 bg-[#030308] z-[10000] flex items-center justify-center transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
    >
      {/* Conic rotating sweeping light tower projection beam */}
      <div
        className="absolute w-[160vmax] h-[160vmax] rounded-full opacity-35 animate-conic-rotate pointer-events-none z-0"
        style={{
          background: "conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.25) 15%, transparent 35%, transparent)",
        }}
      />

      {/* Layer of glowing ambient backing spots */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-radial from-[#a855f7]/15 to-transparent blur-[80px] pointer-events-none z-0" />

      {/* Elegant Corporate Logo with a breathing/pulsing animation */}
      <div className="relative flex flex-col items-center justify-center max-w-[80vw] z-10 transition-all duration-700">
        <img
          src="/images/logo-transparent.png"
          alt="Light Tower Illumination"
          className="w-64 md:w-80 lg:w-[350px] h-auto object-contain select-none animate-logo-pulse"
        />
      </div>

      {/* Inline keyframes */}
      <style jsx>{`
        @keyframes conicRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-conic-rotate {
          animation: conicRotate 6s linear infinite;
        }
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
