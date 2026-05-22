"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ServiceItem } from "../constants/content";

interface ServicesProps {
  locale: "en" | "ar";
  servicesData: ServiceItem[];
}

export default function ServicesSection({ locale, servicesData }: ServicesProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="services" className="relative py-28 md:py-36 bg-transparent border-t border-[#a855f7]/5 overflow-hidden">
      {/* Background Ambient Glows — purple only */}
      <div className="absolute bottom-[10%] right-[-15vw] w-[50vw] h-[50vw] rounded-full bg-radial from-[#a855f7]/5 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-15vw] w-[40vw] h-[40vw] rounded-full bg-radial from-[#9d4edd]/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24 animate-fade-in">
          <span className="font-body text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#a855f7] uppercase mb-4 block eyebrow">
            OUR SERVICES | خدماتنا
          </span>
          
          <h2 className="font-display text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.08em] uppercase leading-[1.15] mb-6">
            LIGHTING THAT{" "}
            <span className="text-[#a855f7] font-normal drop-shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              TRANSFORMS
            </span>{" "}
            SPACES
            {/* Arabic Subtitle */}
            <span className="text-white/60 block font-light text-xl md:text-2xl lg:text-3xl mt-4 font-sans tracking-normal leading-relaxed text-center" dir="rtl">
              إضاءة <span className="text-[#a855f7]">تغير</span> المساحات.
            </span>
          </h2>
        </div>

        {/* 4-column, 2-row Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => {
            const images = [
              service.image,
              ...service.galleryImages.map((img) => `/images/Gallery and portfolio/${img}`)
            ];

            return (
              <Link
                href={`/${locale}/services/${service.slug}`}
                key={service.slug}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl flex flex-col justify-end p-6 border border-[#a855f7]/10 hover:border-[#a855f7]/30 transition-all duration-700 bg-white/5 backdrop-blur-[2px] hover:scale-[1.02] hover:shadow-[0_25px_60px_-15px_rgba(168,85,247,0.15)] cursor-pointer"
              >
                {/* Dynamic Service Card Background Images with Smooth Cross-Fade */}
                {images.map((img, imgIdx) => {
                  const isActive = imgIdx === (currentImageIndex % images.length);
                  return (
                    <div
                      key={img}
                      style={{ backgroundImage: `url("${img}")` }}
                      className={`absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-in-out z-0 ${
                        isActive ? "opacity-100 scale-105" : "opacity-0 scale-100"
                      }`}
                    />
                  );
                })}
              
              {/* Gradient Overlays — premium dark purple */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120524] via-[#120524]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-700 z-1" />
              <div className="absolute inset-0 bg-radial from-[#a855f7]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-1" />

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-1.5">
                <span className="font-body text-[8.5px] font-bold text-[#a855f7] tracking-[0.2em] uppercase">
                  PREMIUM SERVICE
                </span>
                
                <h3 className="font-display text-white text-lg font-light tracking-[0.06em] uppercase group-hover:text-[#a855f7] transition-colors duration-300 leading-tight">
                  {service.title}
                </h3>
                <span className="font-sans text-[11px] text-[#cbd5e1] font-medium tracking-normal block group-hover:text-[#cbd5e1]/90 transition-colors duration-300">
                  {service.arabicTitle}
                </span>
                
                <div className="font-body text-[#cbd5e1] group-hover:text-white/95 text-[11px] font-light leading-relaxed tracking-[0.02em] line-clamp-3 max-h-0 opacity-0 group-hover:max-h-28 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <p className="mb-1.5">{service.description}</p>
                  <p className="border-t border-white/10 pt-1.5 text-right text-[#c084fc]/90 text-[10px]" dir="rtl">
                    {service.arabicDescription}
                  </p>
                </div>

                <div className="font-body text-[8.5px] font-bold text-[#a855f7] group-hover:text-white tracking-[0.18em] uppercase mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100 flex items-center gap-1.5">
                  {locale === "ar" ? "عرض التفاصيل ➔" : "VIEW DETAILS ➔"}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      </div>
    </section>
  );
}
