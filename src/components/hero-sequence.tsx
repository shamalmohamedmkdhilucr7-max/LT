"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroSequenceProps {
  locale: "en" | "ar";
  heroData: {
    title: string;
    subtitle: string;
    cta: string;
  };
}

export default function HeroSequence({ locale, heroData }: HeroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const TOTAL_FRAMES = 76;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedPercent, setLoadedPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const renderFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - w) * 0.5, (ch - h) * 0.5, w, h);
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      if (imagesRef.current.length > 0) {
        renderFrame(0);
      }
    };

    window.addEventListener("resize", resizeCanvas, { passive: true });

    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const onLoad = () => {
      loadedCount++;
      setLoadedPercent(Math.round((loadedCount / TOTAL_FRAMES) * 100));

      if (loadedCount === TOTAL_FRAMES) {
        imagesRef.current = images;
        resizeCanvas();
        initScrollAnimation();
      }
    };

    // Preload frames in idle/async cycles
    const loadFrames = () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.decoding = "async";
        img.onload = onLoad;
        img.onerror = onLoad;
        img.src = `/images/scroll-animation/frame-${String(i).padStart(3, "0")}.webp`;
        images.push(img);
      }
    };

    if (window.requestIdleCallback) {
      window.requestIdleCallback(loadFrames);
    } else {
      setTimeout(loadFrames, 100);
    }

    const initScrollAnimation = () => {
      const obj = { frame: 0 };

      gsap.to(obj, {
        frame: TOTAL_FRAMES - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          onUpdate: (self) => {
            const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(obj.frame));
            renderFrame(frameIndex);

            // Handle hero text reveal dynamically
            if (textRef.current) {
              const progress = self.progress;
              if (progress >= 0.78) {
                textRef.current.classList.add("visible");
                textRef.current.style.opacity = "1";
                textRef.current.style.transform = "translateY(0)";
                textRef.current.style.pointerEvents = "auto";
              } else {
                textRef.current.classList.remove("visible");
                textRef.current.style.opacity = "0";
                textRef.current.style.transform = "translateY(50px)";
                textRef.current.style.pointerEvents = "none";
              }
            }
          },
        },
      });
    };

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="hero-sequence" className="relative h-[550vh] z-[2]">
      <div className="hero-sticky sticky top-0 h-screen overflow-hidden flex items-end justify-center pb-12 md:pb-20 lg:pb-[95px]">
        <div className="hero-canvas absolute inset-0 z-0">
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
        </div>
        <div className="hero-overlay absolute inset-0 z-[1] bg-gradient-to-b from-[#030308]/45 via-[#030308]/10 to-[#030308]/98" />

        {/* Hero Content */}
        <div
          ref={textRef}
          className="container hero-content relative z-10 w-full max-w-[1050px] text-center opacity-0 translate-y-[50px] transition-all duration-[1200ms] cubic-bezier(0.16,1,0.3,1) pointer-events-none pb-2"
        >
          <h1 className="font-display text-white text-2xl md:text-4xl lg:text-[46px] font-light tracking-[0.1em] uppercase leading-[1.3] text-shadow-[0_10px_40px_rgba(0,0,0,0.9)] whitespace-pre-line">
            {heroData.title}
          </h1>
          <p className="font-body text-[#e2e8f0] text-xs md:text-sm lg:text-base font-light tracking-[0.04em] mt-2.5 mb-5 md:mb-6 text-shadow-[0_4px_25px_rgba(0,0,0,0.85)]">
            {heroData.subtitle}
          </p>
          <a
            href="#services"
            className="cursor-pointer font-body text-[10px] font-medium text-white uppercase tracking-[0.22em] px-8 py-3.5 border-y border-[#a855f7]/40 bg-[#030308]/40 backdrop-blur-md hover:text-white hover:border-[#a855f7] hover:bg-[#a855f7]/10 hover:tracking-[0.28em] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-500 inline-block pointer-events-auto"
          >
            {heroData.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
