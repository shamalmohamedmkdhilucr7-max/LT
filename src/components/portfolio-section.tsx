"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioSectionProps {
  locale: "en" | "ar";
}

const FEATURED_PROJECTS = [
  {
    id: "featured-1",
    titleEn: "WINDOW 1",
    titleAr: "النافذة الأولى",
    locationEn: "GALLERY",
    locationAr: "معرض الصور",
    images: [
      "/images/Gallery and portfolio/image (35).png",
      "/images/Gallery and portfolio/image (36).png",
      "/images/Gallery and portfolio/image (37).png",
      "/images/Gallery and portfolio/image (38).png",
      "/images/Gallery and portfolio/image (39).png",
      "/images/Gallery and portfolio/image (40).png",
      "/images/Gallery and portfolio/image (41).png",
      "/images/Gallery and portfolio/image (42).png",
      "/images/Gallery and portfolio/image (43).png",
      "/images/Gallery-and-portfolio/image-(44).png",
      "/images/Gallery and portfolio/image (45).png",
      "/images/Gallery and portfolio/image (46).png"
    ]
  },
  {
    id: "featured-2",
    titleEn: "WINDOW 2",
    titleAr: "النافذة الثانية",
    locationEn: "GALLERY",
    locationAr: "معرض الصور",
    images: [
      "/images/Gallery and portfolio/image (23).png",
      "/images/Gallery and portfolio/image (24).png",
      "/images/Gallery and portfolio/image (25).png",
      "/images/Gallery and portfolio/image (26).png",
      "/images/Gallery and portfolio/image (27).png",
      "/images/Gallery and portfolio/image (28).png",
      "/images/Gallery and portfolio/image (29).png",
      "/images/Gallery and portfolio/image (30).png",
      "/images/Gallery and portfolio/image (31).png",
      "/images/Gallery and portfolio/image (32).png",
      "/images/Gallery and portfolio/image (33).png",
      "/images/Gallery and portfolio/image (34).png"
    ]
  },
  {
    id: "featured-3",
    titleEn: "WINDOW 3",
    titleAr: "النافذة الثالثة",
    locationEn: "GALLERY",
    locationAr: "معرض الصور",
    images: [
      "/images/Gallery and portfolio/image (59).png",
      "/images/Gallery and portfolio/image (1).png",
      "/images/Gallery and portfolio/image (2).png",
      "/images/Gallery and portfolio/image (7).png",
      "/images/Gallery and portfolio/image (8).png",
      "/images/Gallery and portfolio/image (9).png",
      "/images/Gallery and portfolio/image (10).png",
      "/images/Gallery and portfolio/image (11).png",
      "/images/Gallery and portfolio/image (13).png",
      "/images/Gallery and portfolio/image (14).png",
      "/images/Gallery and portfolio/image (19).png",
      "/images/Gallery and portfolio/image (22).png"
    ]
  },
  {
    id: "featured-4",
    titleEn: "WINDOW 4",
    titleAr: "النافذة الرابعة",
    locationEn: "GALLERY",
    locationAr: "معرض الصور",
    images: [
      "/images/Gallery and portfolio/image (47).png",
      "/images/Gallery and portfolio/image (48).png",
      "/images/Gallery and portfolio/image (49).png",
      "/images/Gallery and portfolio/image (50).png",
      "/images/Gallery and portfolio/image (52).png",
      "/images/Gallery and portfolio/image (53).png",
      "/images/Gallery and portfolio/image (54).png",
      "/images/Gallery and portfolio/image (55).png",
      "/images/Gallery and portfolio/image (56).png",
      "/images/Gallery and portfolio/image (57).png",
      "/images/Gallery and portfolio/image (58).png",
      "/images/Gallery and portfolio/image (61).png"
    ]
  },
  {
    id: "featured-5",
    titleEn: "WINDOW 5",
    titleAr: "النافذة الخامسة",
    locationEn: "GALLERY",
    locationAr: "معرض الصور",
    images: [
      "/images/Gallery and portfolio/image (62).png",
      "/images/Gallery and portfolio/image (63).png",
      "/images/Gallery and portfolio/image (64).png",
      "/images/Gallery and portfolio/image (15).png",
      "/images/Gallery and portfolio/image (16).png",
      "/images/Gallery and portfolio/image (17).png",
      "/images/Gallery and portfolio/image (18).png",
      "/images/Gallery and portfolio/image (3).png",
      "/images/Gallery and portfolio/image (4).png",
      "/images/Gallery and portfolio/image (5).png",
      "/images/Gallery and portfolio/image (6).png",
      "/images/Gallery and portfolio/image (12).png",
      "/images/Gallery and portfolio/image (65).png"
    ]
  }
];

// Clean path generator to handle special space character encoding
const getCleanImagePath = (path: string) => {
  // Replace standard space with %20 or ensure correct format
  return encodeURI(path);
};

const PURPLE = "#a855f7";

export default function PortfolioSection({ locale }: PortfolioSectionProps) {
  const isRtl = locale === "ar";
  
  // Slider states for small viewports
  const [deckIndex, setDeckIndex] = useState<number>(0);
  
  // Rotating image index for the 5-second interval
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  
  // Lightbox states
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Rotate index dynamically up to the max images count in any window (13)
  const maxImagesCount = Math.max(...FEATURED_PROJECTS.map(p => p.images.length));
  
  // Sync background rotating images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % maxImagesCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [maxImagesCount]);

  const nextSlide = () => {
    setDeckIndex((prev) => (prev === FEATURED_PROJECTS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDeckIndex((prev) => (prev === 0 ? FEATURED_PROJECTS.length - 1 : prev - 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxImageIndex(currentImageIndex);
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
    const imagesCount = FEATURED_PROJECTS[lightboxIndex].images.length;
    if (direction === "next") {
      setLightboxImageIndex((prev) => (prev + 1) % imagesCount);
    } else {
      setLightboxImageIndex((prev) => (prev - 1 + imagesCount) % imagesCount);
    }
  };

  // Keyboard navigation for lightbox
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
            {isRtl ? "معرض أعمالنا" : "OUR PORTFOLIO"}
          </span>
          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <h2 className="font-display text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.08em] uppercase leading-[1.15]">
              {isRtl ? "المشاريع " : "FEATURED "}{" "}
              <span className="text-[#a855f7] font-normal drop-shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                {isRtl ? "المميزة" : "PROJECTS"}
              </span>
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent rounded-full mt-2" />
          </div>
          
          <p className="font-body text-zinc-300 text-sm md:text-base font-light leading-relaxed tracking-[0.03em] max-w-2xl mx-auto">
            A beautiful demonstration of our premium illuminations, featuring rotating live showcases across 5 strategic architectural windows.
          </p>
          <p className="font-body text-purple-300 text-xs font-medium tracking-[0.02em] leading-relaxed max-w-2xl mx-auto mt-2" dir="rtl">
            عرض رائع لحلول الإضاءة الفاخرة لدينا، يتميز بنوافذ حية تفاعلية تتغير تلقائياً كل 5 ثوانٍ لتستعرض خبراتنا المتكاملة.
          </p>
        </div>

        {/* Featured Projects Slider */}
        <div className="relative w-full max-w-[1320px] mx-auto px-0 md:px-8 flex flex-col items-center select-none">
          
          {/* Navigation Buttons for mobile slider */}
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
              className="flex lg:grid lg:grid-cols-6 gap-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full lg:!transform-none"
              style={{
                transform: `translateX(calc(-${deckIndex * 100}% - ${deckIndex * 24}px))`,
              }}
            >
              {FEATURED_PROJECTS.map((item, index) => {
                const activeImage = item.images[currentImageIndex] || item.images[0];
                const encodedImg = getCleanImagePath(activeImage);
                
                return (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(index)}
                    className={`w-full shrink-0 group relative rounded-2xl overflow-hidden border border-[#a855f7]/15 transition-all duration-[600ms] cursor-pointer h-[380px] md:h-[400px] hover:scale-[1.02] hover:shadow-[0_30px_70px_-15px_rgba(168,85,247,0.3)] bg-[#07030f] ${
                      index < 2 ? "lg:col-span-3 lg:h-[480px]" : "lg:col-span-2 lg:h-[400px]"
                    }`}
                  >
                    {/* Glowing thin top-border effect */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent z-20" />

                    {/* Animated Card Background with Full Window Cover */}
                    <div className="absolute inset-0 z-0 overflow-hidden bg-[#07030f]">
                      <AnimatePresence mode="popLayout">
                        <motion.img
                          key={`img-${encodedImg}`}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                          src={encodedImg}
                          alt={item.titleEn}
                          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                        />
                      </AnimatePresence>
                    </div>

                    {/* Premium Ambient Purple Border Glow on Hover */}
                    <div className="absolute inset-0 border border-[#a855f7]/0 group-hover:border-[#a855f7]/45 rounded-2xl transition-colors duration-500 z-10 pointer-events-none" />

                    {/* Subtle dark vignette overlay for top indicator contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/35 z-[2] pointer-events-none" />

                    {/* Sliding indicator bars at the very top of each window card showing image progression */}
                    <div className="absolute top-3 left-4 right-4 flex gap-1 z-30">
                      {Array.from({ length: item.images.length }).map((_, dotIdx) => {
                        const activeDotIdx = currentImageIndex % item.images.length;
                        return (
                          <div
                            key={dotIdx}
                            className="h-[2px] flex-1 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: activeDotIdx === dotIdx 
                                ? "rgba(168, 85, 247, 0.9)" 
                                : "rgba(255, 255, 255, 0.15)",
                              boxShadow: activeDotIdx === dotIdx 
                                ? "0 0 6px rgba(168, 85, 247, 0.8)" 
                                : "none"
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator for mobile navigation */}
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
                  {isRtl ? "نافذة العرض التفاعلية للمشروع" : "INTERACTIVE PROJECT WINDOW"}
                </span>
                <span className="font-body text-xs text-[#94a3b8] font-light mt-0.5">
                  {isRtl ? "المشروع" : "Project"}: {isRtl ? FEATURED_PROJECTS[lightboxIndex].titleAr : FEATURED_PROJECTS[lightboxIndex].titleEn} ({lightboxImageIndex + 1} / {FEATURED_PROJECTS[lightboxIndex].images.length})
                </span>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="px-4 py-2 border border-white/10 rounded-sm font-body text-[9px] font-bold tracking-[0.18em] text-white/80 hover:text-white hover:border-[#a855f7] hover:bg-[#a855f7]/10 transition-all duration-300 cursor-pointer uppercase"
                >
                  {isZoomed ? (isRtl ? "تصغير -" : "ZOOM -") : (isRtl ? "تكبير +" : "ZOOM +")}
                </button>
                <button
                  onClick={closeLightbox}
                  className="px-4 py-2 border border-white/10 rounded-sm font-body text-[9px] font-bold tracking-[0.18em] text-white/80 hover:text-[#a855f7] hover:border-[#a855f7] hover:bg-[#a855f7]/10 transition-all duration-300 cursor-pointer uppercase"
                >
                  ✕ {isRtl ? "إغلاق" : "CLOSE"}
                </button>
              </div>
            </div>

            {/* Image Canvas with 12-image Navigation */}
            <div className="relative flex-grow flex items-center justify-center overflow-hidden px-4 select-none">
              {/* Left Navigation */}
              <button
                onClick={() => navigateLightbox("prev")}
                className="absolute left-6 md:left-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#a855f7] hover:bg-[#a855f7]/15 transition-all duration-300 z-20 cursor-pointer bg-zinc-950/40"
                aria-label="Previous Image"
              >
                <span className="font-body text-lg">←</span>
              </button>

              {/* Right Navigation */}
              <button
                onClick={() => navigateLightbox("next")}
                className="absolute right-6 md:right-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#a855f7] hover:bg-[#a855f7]/15 transition-all duration-300 z-20 cursor-pointer bg-zinc-950/40"
                aria-label="Next Image"
              >
                <span className="font-body text-lg">→</span>
              </button>

              {/* Image Frame */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-full max-h-[70vh] flex items-center justify-center z-10"
                >
                  <motion.img
                    src={getCleanImagePath(FEATURED_PROJECTS[lightboxIndex].images[lightboxImageIndex])}
                    alt={`${FEATURED_PROJECTS[lightboxIndex].titleEn} - Image ${lightboxImageIndex + 1}`}
                    animate={{ scale: isZoomed ? 1.3 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.8)] cursor-zoom-in border border-white/5"
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Gallery Slider & Info Panel */}
            <div className="relative z-10 border-t border-white/5 bg-[#030308]/65 backdrop-blur-md px-6 py-6 md:px-12 flex flex-col gap-6 select-none">
              
              {/* Thumbnail Navigator */}
              <div className="flex justify-center items-center gap-2 overflow-x-auto py-1 max-w-full mx-auto">
                {FEATURED_PROJECTS[lightboxIndex].images.map((imgUrl, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => {
                      setIsZoomed(false);
                      setLightboxImageIndex(dotIdx);
                    }}
                    className="relative w-12 h-12 rounded-md overflow-hidden border transition-all duration-300 flex-shrink-0 cursor-pointer"
                    style={{
                      borderColor: lightboxImageIndex === dotIdx ? "#a855f7" : "rgba(255,255,255,0.1)",
                      opacity: lightboxImageIndex === dotIdx ? 1 : 0.4,
                      transform: lightboxImageIndex === dotIdx ? "scale(1.1)" : "scale(1)"
                    }}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center" 
                      style={{ backgroundImage: `url("${getCleanImagePath(imgUrl)}")` }} 
                    />
                  </button>
                ))}
              </div>

              {/* Title & Technical Metadata */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-t border-white/5 pt-4">
                <div className="flex flex-col gap-2 max-w-4xl">
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

                <div className="flex flex-col items-end gap-1.5 self-stretch lg:self-auto justify-end">
                  <span className="font-body text-[9px] text-white/50 tracking-widest font-bold">
                    OPTICS: GERMAN-ENGINEERED IP67 ARCHITECTURAL LED
                  </span>
                  <span className="font-body text-[9px] text-white/35 tracking-wider font-bold" dir="rtl">
                    تقنية الإضاءة: LED معمارية ألمانية الصنع مقاومة للظروف الجوية IP67
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

