"use client";

import React, { useState, useEffect } from "react";


interface ServiceGalleryProps {
  locale: "en" | "ar";
  galleryImages: string[];
  serviceTitle: string;
}

export default function ServiceGallery({ locale, galleryImages, serviceTitle }: ServiceGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const isRtl = locale === "ar";

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
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
      newIndex = (lightboxIndex + 1) % galleryImages.length;
    } else {
      newIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    setLightboxIndex(newIndex);
  };

  // Keyboard controls
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

  if (!galleryImages || galleryImages.length === 0) return null;

  return (
    <section className="relative py-16 md:py-24 bg-transparent border-t border-[#a855f7]/10 overflow-hidden">
      {/* Glows */}
      <div className="absolute top-[20%] right-[-10vw] w-[40vw] h-[40vw] rounded-full bg-radial from-[#a855f7]/4 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10vw] w-[40vw] h-[40vw] rounded-full bg-radial from-[#a855f7]/4 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 border-b border-[#a855f7]/15 pb-6">
          <span className="font-body text-xs font-semibold tracking-[0.25em] text-[#a855f7] uppercase mb-3 block">
            {isRtl ? "معرض أعمال المشروع" : "PROJECT GALLERY"}
          </span>
          <h2 className="font-display text-white text-2xl md:text-4xl font-light tracking-[0.08em] uppercase flex items-center gap-3">
            {isRtl ? "سجل مشاريعنا الناجحة" : "OUR REPRESENTATIVE PROJECTS"}
          </h2>
        </div>

        {/* Grid Display (Actual Colors, High Quality) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((imgName, idx) => {
            const imagePath = `/images/Gallery and portfolio/${imgName}`;
            return (
              <div
                key={imgName}
                onClick={() => openLightbox(idx)}
                className="group relative aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden border border-[#a855f7]/15 hover:border-[#a855f7]/40 cursor-pointer shadow-lg hover:scale-[1.03] transition-all duration-500 bg-[#07030f]"
              >
                {/* High-fidelity full-window cover image */}
                <img
                  src={imagePath}
                  alt={serviceTitle}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
                />
                
                {/* Dark bottom gradient for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05020a]/90 via-[#05020a]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

                {/* Info Overlay (Slides up on Hover) */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-10 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-end">
                  <span className="font-body text-[9px] font-bold text-[#c084fc] tracking-[0.2em] uppercase">
                    {serviceTitle}
                  </span>
                  <h4 className="font-display text-white text-sm font-semibold tracking-wide mt-1 uppercase">
                    {isRtl ? "عرض تفاصيل المشروع" : "Project Detail"}
                  </h4>
                </div>

                {/* Action Indicator (Top-Right) */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#120727]/80 backdrop-blur-sm border border-[#a855f7]/25 flex items-center justify-center text-[#c084fc] opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 z-20 shadow-sm">
                  <span className="font-body text-[8px] text-[#c084fc] uppercase tracking-widest font-bold">VIEW</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Lightbox Theater Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[2000] bg-[#030308]/98 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-6 transition-all duration-500 select-none animate-fadeIn">
          
          {/* Top Control Bar */}
          <div className="flex justify-between items-center w-full relative z-30 pb-4 border-b border-white/5">
            <div className="font-body text-[10px] text-white/40 tracking-wider">
              {serviceTitle} — {lightboxIndex + 1} / {galleryImages.length}
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="px-4 py-2 border border-white/10 rounded-lg font-body text-[10px] text-[#a855f7] hover:text-white hover:border-[#a855f7] hover:bg-[#a855f7]/20 transition-all duration-300 cursor-pointer backdrop-blur-md"
                title="Toggle Zoom"
              >
                {isZoomed ? "ZOOM -" : "ZOOM +"}
              </button>
              
              <button
                onClick={closeLightbox}
                className="px-4 py-2 border border-white/10 rounded-lg font-body text-[10px] text-white/70 hover:text-white hover:border-red-500 hover:bg-red-500/20 transition-all duration-300 cursor-pointer backdrop-blur-md"
                title="Close"
              >
                ✕ CLOSE | إغلاق
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="relative flex-grow flex items-center justify-center overflow-hidden py-4">
            
            {/* Navigation Trigger Left */}
            <button
              onClick={() => navigateLightbox(isRtl ? "next" : "prev")}
              className="absolute left-4 z-30 w-12 h-12 rounded-full bg-[#030308]/80 border border-white/10 hover:border-[#a855f7] text-white/60 hover:text-white transition-all cursor-pointer hidden md:flex items-center justify-center"
            >
              <span className="font-body text-base">←</span>
            </button>

            {/* Immersive Image Display */}
            <div
              className={`relative flex items-center justify-center transition-all duration-700 ease-out max-w-full max-h-full ${
                isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={`/images/Gallery and portfolio/${galleryImages[lightboxIndex]}`}
                alt={serviceTitle}
                className="max-w-[90vw] max-h-[70vh] md:max-h-[75vh] object-contain rounded-lg border border-white/5 shadow-2xl transition-all"
              />
            </div>

            {/* Navigation Trigger Right */}
            <button
              onClick={() => navigateLightbox(isRtl ? "prev" : "next")}
              className="absolute right-4 z-30 w-12 h-12 rounded-full bg-[#030308]/80 border border-white/10 hover:border-[#a855f7] text-white/60 hover:text-white transition-all cursor-pointer hidden md:flex items-center justify-center"
            >
              <span className="font-body text-base">→</span>
            </button>

          </div>

          {/* Bottom Caption Bar */}
          <div className="w-full text-center py-4 border-t border-white/5 flex flex-col items-center gap-2">
            <p className="font-display text-white text-sm font-semibold tracking-wider uppercase">
              {isRtl ? "معرض أعمال المشروع" : "Project Showcase"}
            </p>
            <p className="font-body text-[9px] text-[#a855f7] tracking-[0.2em] uppercase">
              {serviceTitle}
            </p>
          </div>

        </div>
      )}
    </section>
  );
}
