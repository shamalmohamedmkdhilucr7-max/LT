"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioSectionProps {
  locale: "en" | "ar";
  imageFilenames?: string[];
}

const FEATURED_PROJECTS = [
  {
    id: "featured-1",
    titleEn: "MODERN VILLA",
    titleAr: "فيلا حديثة",
    locationEn: "Muscat, Oman",
    locationAr: "مسقط، عمان",
    image: "/images/Gallery and portfolio/image (43).png",
  },
  {
    id: "featured-2",
    titleEn: "LUXURY HOME THEATER",
    titleAr: "صالة سينما منزلية فاخرة",
    locationEn: "Salalah, Oman",
    locationAr: "صلالة، عمان",
    image: "/images/Gallery and portfolio/image (15).png",
  },
  {
    id: "featured-3",
    titleEn: "SMART VILLA",
    titleAr: "فيلا ذكية",
    locationEn: "Seeb, Oman",
    locationAr: "السيب، عمان",
    image: "/images/Gallery and portfolio/image (16).png",
  },
  {
    id: "featured-4",
    titleEn: "INTELLIGENT KITCHEN",
    titleAr: "مطبخ ذكي",
    locationEn: "Muscat, Oman",
    locationAr: "مسقط، عمان",
    image: "/images/Gallery and portfolio/image (17).png",
  },
  {
    id: "featured-5",
    titleEn: "SMART APARTMENT",
    titleAr: "شقة ذكية",
    locationEn: "Qurum, Oman",
    locationAr: "القرم، عمان",
    image: "/images/Gallery and portfolio/image (18).png",
  }
];

const PURPLE = "#a855f7";
const PURPLE_GLOW = "rgba(168, 85, 247, 0.4)";

export default function PortfolioSection({ locale }: PortfolioSectionProps) {
  const isRtl = locale === "ar";
  const [deckIndex, setDeckIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const nextSlide = () => {
    setDeckIndex((prev) => (prev === FEATURED_PROJECTS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDeckIndex((prev) => (prev === 0 ? FEATURED_PROJECTS.length - 1 : prev - 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomed(false);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsZoomed(false);
    document.body.style.overflow = "";
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return;
    setIsZoomed(false);
    let newIndex = lightboxIndex;
    if (direction === "next") {
      newIndex = (lightboxIndex + 1) % FEATURED_PROJECTS.length;
    } else {
      newIndex = (lightboxIndex - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length;
    }
    setLightboxIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox(isRtl ? "prev" : "next");
      if (e.key === "ArrowLeft") navigateLightbox(isRtl ? "next" : "prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, isRtl]);

  return (
    <section id="portfolio" className="relative py-24 md:py-32 bg-transparent overflow-hidden">
      {/* Background Ambient Glows — purple only */}
      <div className="absolute top-[20%] left-[-10vw] w-[45vw] h-[45vw] rounded-full bg-radial from-[#a855f7]/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10vw] w-[45vw] h-[45vw] rounded-full bg-radial from-[#9d4edd]/3 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="font-body text-xs font-bold tracking-[0.3em] text-[#a855f7] uppercase mb-3 block animate-fade-in">
            OUR PORTFOLIO
          </span>
          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <h2 className="font-display text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.08em] uppercase leading-[1.15]">
              FEATURED{" "}
              <span className="text-[#a855f7] font-normal drop-shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                PROJECTS
              </span>
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent rounded-full mt-2" />
          </div>
          
          <p className="font-body text-zinc-200 text-sm md:text-base font-light leading-relaxed tracking-[0.03em] max-w-2xl mx-auto">
            A glimpse of our innovative solutions that transform spaces and enhance lifestyles.
          </p>
          <p className="font-body text-purple-300 text-xs font-semibold tracking-[0.02em] leading-relaxed max-w-2xl mx-auto mt-2" dir="rtl">
            لمحة عن مشاريعنا المبتكرة التي تحول المساحات وتعزز جودة الحياة.
          </p>
        </div>

        {/* Featured Projects Slider */}
        <div className="relative w-full max-w-[1320px] mx-auto px-0 md:px-8 flex flex-col items-center select-none">
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-[-20px] md:left-[10px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#a855f7]/25 flex items-center justify-center text-white bg-[#030308]/60 hover:text-[#a855f7] hover:border-[#a855f7] hover:bg-[#a855f7]/10 transition-all duration-300 pointer-events-auto cursor-pointer z-30 shadow-[0_0_15px_rgba(168,85,247,0.1)] lg:hidden"
            aria-label="Previous Slide"
          >
            <span className="font-body text-lg">←</span>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-[-20px] md:right-[10px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#a855f7]/25 flex items-center justify-center text-white bg-[#030308]/60 hover:text-[#a855f7] hover:border-[#a855f7] hover:bg-[#a855f7]/10 transition-all duration-300 pointer-events-auto cursor-pointer z-30 shadow-[0_0_15px_rgba(168,85,247,0.1)] lg:hidden"
            aria-label="Next Slide"
          >
            <span className="font-body text-lg">→</span>
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden w-full min-w-0 px-2 py-4">
            <div
              className="flex lg:grid lg:grid-cols-5 gap-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full lg:!transform-none"
              style={{
                transform: `translateX(calc(-${deckIndex * 100}% - ${deckIndex * 24}px))`,
              }}
            >
              {FEATURED_PROJECTS.map((item, index) => {
                const encodedImg = encodeURI(item.image);
                return (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(index)}
                    className="w-full shrink-0 lg:w-auto lg:shrink-1 group relative rounded-2xl overflow-hidden border border-[#a855f7]/15 transition-all duration-[600ms] cursor-pointer h-[460px] md:h-[480px] hover:scale-[1.02] hover:shadow-[0_30px_70px_-15px_rgba(168,85,247,0.25)]"
                  >
                    {/* Glowing thin top-border effect */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/20 to-transparent z-20" />

                    {/* Full Card Background Image */}
                    <div
                      style={{ backgroundImage: `url("${encodedImg}")` }}
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />

                    {/* Dark vignette overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05020a] via-[#05020a]/50 to-transparent z-[1]" />

                    {/* Text overlay at bottom */}
                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-10">
                      <div className="flex flex-col gap-0.5 mb-2">
                        <h4 className="font-display text-white text-sm md:text-[15px] font-semibold tracking-[0.06em] uppercase group-hover:text-[#c084fc] transition-colors duration-300 leading-tight">
                          {item.titleEn}
                        </h4>
                        <span className="font-body text-[8.5px] font-bold text-[#c084fc] tracking-[0.18em] uppercase block mt-0.5">
                          {item.locationEn}
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-0.5" dir="rtl">
                        <h5 className="font-sans text-zinc-200 text-sm font-medium leading-tight">
                          {item.titleAr}
                        </h5>
                        <span className="font-sans text-[9px] text-[#c084fc]/70 font-light block">
                          {item.locationAr}
                        </span>
                      </div>

                      <div 
                        className="w-8 h-[2px] rounded-full mt-3 transition-all duration-500 group-hover:w-14 bg-[#a855f7]"
                        style={{ 
                          boxShadow: `0 0 8px rgba(168, 85, 247, 0.4)`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {FEATURED_PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setDeckIndex(idx)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-500 cursor-pointer"
                style={{
                  backgroundColor: deckIndex === idx ? PURPLE : "rgba(168, 85, 247, 0.15)",
                  boxShadow: deckIndex === idx ? `0 0 10px ${PURPLE}` : "none",
                  transform: deckIndex === idx ? "scale(1.25)" : "scale(1)"
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] bg-[#030308]/98 backdrop-blur-xl flex flex-col justify-between"
          >
            {/* Top Toolbar */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4 md:px-10 border-b border-white/5 bg-[#030308]/50 backdrop-blur-md select-none">
              <div className="flex flex-col">
                <span className="font-body text-[10px] text-[#a855f7] tracking-[0.25em] uppercase font-bold">
                  {isRtl ? "عرض المشروع" : "PROJECT VIEW"}
                </span>
                <span className="font-body text-xs text-[#94a3b8] font-light mt-0.5">
                  {isRtl ? "المشروع" : "Project"} {lightboxIndex + 1} / {FEATURED_PROJECTS.length}
                </span>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="px-4 py-2 border border-white/10 rounded-sm font-body text-[9px] font-bold tracking-[0.18em] text-white/80 hover:text-white hover:border-[#a855f7] hover:bg-[#a855f7]/10 transition-all duration-300 cursor-pointer uppercase"
                >
                  {isZoomed ? "ZOOM -" : "ZOOM +"}
                </button>
                <button
                  onClick={closeLightbox}
                  className="px-4 py-2 border border-white/10 rounded-sm font-body text-[9px] font-bold tracking-[0.18em] text-white/80 hover:text-[#a855f7] hover:border-[#a855f7] hover:bg-[#a855f7]/10 transition-all duration-300 cursor-pointer uppercase"
                >
                  ✕ CLOSE | إغلاق
                </button>
              </div>
            </div>

            {/* Image Canvas */}
            <div className="relative flex-grow flex items-center justify-center overflow-hidden px-4 select-none">
              <button
                onClick={() => navigateLightbox("prev")}
                className="absolute left-6 md:left-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#a855f7] hover:bg-[#a855f7]/15 transition-all duration-300 z-20 cursor-pointer"
                aria-label="Previous"
              >
                <span className="font-body text-lg">←</span>
              </button>

              <button
                onClick={() => navigateLightbox("next")}
                className="absolute right-6 md:right-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#a855f7] hover:bg-[#a855f7]/15 transition-all duration-300 z-20 cursor-pointer"
                aria-label="Next"
              >
                <span className="font-body text-lg">→</span>
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-full max-h-[70vh] flex items-center justify-center z-10"
                >
                  <motion.img
                    src={encodeURI(FEATURED_PROJECTS[lightboxIndex].image)}
                    alt={isRtl ? FEATURED_PROJECTS[lightboxIndex].titleAr : FEATURED_PROJECTS[lightboxIndex].titleEn}
                    animate={{ scale: isZoomed ? 1.3 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.8)] cursor-zoom-in"
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Details */}
            <div className="relative z-10 border-t border-white/5 bg-[#030308]/65 backdrop-blur-md px-6 py-6 md:px-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 select-none">
              <div className="flex flex-col gap-3 max-w-4xl">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-body text-[9px] font-bold tracking-[0.25em] uppercase text-[#a855f7]">
                    {FEATURED_PROJECTS[lightboxIndex].locationEn}
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="font-body text-[9px] font-bold tracking-[0.2em] text-[#a855f7]" dir="rtl">
                    {FEATURED_PROJECTS[lightboxIndex].locationAr}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-white text-xl md:text-2xl font-light tracking-[0.06em] uppercase leading-tight">
                    {FEATURED_PROJECTS[lightboxIndex].titleEn}
                  </h3>
                  <h4 className="font-sans text-white/90 text-base md:text-lg font-light tracking-[0.04em] leading-tight" dir="rtl">
                    {FEATURED_PROJECTS[lightboxIndex].titleAr}
                  </h4>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 self-stretch lg:self-auto justify-end border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                <span className="font-body text-[9px] text-white/50 tracking-widest font-bold">
                  OPTICS: DYNAMIC RETINA HIGH-PRECISION LED
                </span>
                <span className="font-body text-[9px] text-white/35 tracking-wider font-bold" dir="rtl">
                  تقنية الإضاءة: LED معمارية فائقة الدقة
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
