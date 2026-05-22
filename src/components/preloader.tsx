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

    // Fast preload essential frames in background
    const ESSENTIAL_FRAMES = 15;
    let loadedCount = 0;
    let imagesPreloaded = false;
    let minTimeElapsed = false;

    // Setup an interval to count up percent smoothly to 100% over 3000ms
    const duration = 3000;
    const intervalTime = 30; // ms
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const percentInterval = setInterval(() => {
      currentStep++;
      const nextPercent = Math.min(Math.floor((currentStep / totalSteps) * 100), 99);
      setPercent(nextPercent);
    }, intervalTime);

    const tryDismiss = () => {
      if (imagesPreloaded && minTimeElapsed) {
        clearInterval(percentInterval);
        setPercent(100);
        setTimeout(() => {
          dismiss();
        }, 400); // Give the user a moment to see the 100% complete state
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
      sessionStorage.setItem("hasLoadedLightTower", "true");
      setTimeout(() => setShouldRender(false), 800);
    };

    for (let i = 1; i <= ESSENTIAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = `/images/scroll-animation/frame-${String(i).padStart(3, "0")}.webp`;
      img.onload = onFrameLoaded;
      img.onerror = onFrameLoaded;
    }

    // Enforce a minimum display time of 3000ms so the user can see the animations
    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      tryDismiss();
    }, duration);

    // Safety timeout of 5500ms
    const safetyTimeout = setTimeout(() => {
      imagesPreloaded = true;
      minTimeElapsed = true;
      tryDismiss();
    }, 5500);

    return () => {
      clearInterval(percentInterval);
      clearTimeout(minTimer);
      clearTimeout(safetyTimeout);
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      className="fixed inset-0 bg-[#030308] z-[10000] flex flex-col items-center justify-center transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
    >
      {/* Clockwise rotating sweeping light tower projection beam */}
      <div
        className="absolute w-[180vmax] h-[180vmax] rounded-full opacity-[0.25] animate-conic-rotate pointer-events-none z-0"
        style={{
          background: "conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.3) 12%, transparent 28%, transparent)",
        }}
      />

      {/* Counter-clockwise intersecting beam for dramatic layered depth */}
      <div
        className="absolute w-[180vmax] h-[180vmax] rounded-full opacity-[0.18] animate-conic-counter-rotate pointer-events-none z-0"
        style={{
          background: "conic-gradient(from 180deg, transparent, rgba(139, 92, 246, 0.25) 10%, transparent 25%, transparent)",
        }}
      />

      {/* Laser scan line sweeping behind/through the logo */}
      <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#a855f7]/70 to-transparent blur-[1px] opacity-50 animate-laser-scan pointer-events-none z-[1]" />

      {/* Drifting luxury light sparks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(16)].map((_, i) => {
          const delay = i * 0.25;
          const left = (i * 6.7) % 100;
          const duration = 5 + (i % 4);
          const size = 1.5 + (i % 3);
          return (
            <div
              key={i}
              className="absolute bottom-[-20px] rounded-full bg-gradient-to-t from-[#c084fc] to-white opacity-40 animate-float-spark"
              style={{
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                filter: "blur(0.5px)",
              }}
            />
          );
        })}
      </div>

      {/* Layer of glowing ambient backing spots */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-radial from-[#a855f7]/15 to-transparent blur-[90px] pointer-events-none z-0" />

      {/* Elegant Corporate Logo with shimming breath pulse animation */}
      <div className="relative flex flex-col items-center justify-center max-w-[80vw] z-10 transition-all duration-700">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src="/images/logo-transparent.png"
            alt="Light Tower Illumination"
            className="w-64 md:w-80 lg:w-[350px] h-auto object-contain select-none animate-logo-pulse"
          />
          {/* Shimmer sweep reflection on the logo image */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-logo-shimmer pointer-events-none" />
        </div>

        {/* Thrilling High-Tech Loader Stats */}
        <div className="mt-8 flex flex-col items-center gap-2">
          {/* Progress Bar Container */}
          <div className="w-48 h-[3px] bg-white/5 rounded-full overflow-hidden border border-white/5 relative shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <div
              className="h-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c084fc] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(168,85,247,0.8)]"
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Counter & Action Message */}
          <div className="flex items-center gap-3 font-body text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase mt-2">
            <span className="text-purple-300/80 animate-pulse-slow">
              {percent < 100 ? "INITIALIZING SYSTEMS" : "IGNITING SYSTEM"}
            </span>
            <span className="text-white bg-[#a855f7]/25 px-2 py-0.5 rounded-sm shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              {percent}%
            </span>
          </div>
        </div>
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
          animation: conicRotate 8s linear infinite;
        }

        @keyframes conicCounterRotate {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        .animate-conic-counter-rotate {
          animation: conicCounterRotate 12s linear infinite;
        }

        @keyframes laserScan {
          0% {
            top: 25%;
          }
          50% {
            top: 75%;
          }
          100% {
            top: 25%;
          }
        }
        .animate-laser-scan {
          animation: laserScan 5s ease-in-out infinite;
        }

        @keyframes floatSpark {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-110vh) scale(1.2);
            opacity: 0;
          }
        }
        .animate-float-spark {
          animation: floatSpark infinite linear;
        }

        @keyframes logoPulse {
          0%, 100% {
            transform: scale(0.97);
            opacity: 0.7;
            filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.2));
          }
          50% {
            transform: scale(1.02);
            opacity: 1.0;
            filter: drop-shadow(0 0 35px rgba(168, 85, 247, 0.55));
          }
        }
        .animate-logo-pulse {
          animation: logoPulse 1.8s ease-in-out infinite;
        }

        @keyframes logoShimmer {
          0% {
            transform: translateX(-150%);
          }
          50% {
            transform: translateX(150%);
          }
          100% {
            transform: translateX(150%);
          }
        }
        .animate-logo-shimmer {
          animation: logoShimmer 4s ease-in-out infinite;
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
