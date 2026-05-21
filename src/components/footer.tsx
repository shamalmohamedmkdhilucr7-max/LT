"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { localizationContent } from "@/constants/content";
import LogoDisplay from "./logo-display";

interface FooterProps {
  locale: "en" | "ar";
  footerData: {
    established: string;
    copy: string;
  };
}

export default function Footer({ locale }: FooterProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const enFooter = localizationContent.en.footer;
  const arFooter = localizationContent.ar.footer;

  return (
    <>
      <footer className="relative py-12 bg-[#070310] border-t border-[#a855f7]/15 overflow-hidden z-10">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[2px] bg-gradient-to-r from-transparent via-[#a855f7]/40 to-transparent" />

        <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-[#a855f7]/10">
            
            {/* Company Logo using LogoDisplay — icon in color + white text */}
            <Link
              href={`/${locale}`}
              className="hover:opacity-85 transition-opacity duration-300"
            >
              <LogoDisplay iconClass="h-8 md:h-10" showText={true} />
            </Link>

            {/* Brochure & Established */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a
                href="/images/Brochure.png"
                download="Light_Tower_Corporate_Brochure.png"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[10px] text-[#a855f7] hover:text-white tracking-[0.15em] uppercase font-semibold transition-colors duration-300"
              >
                CORPORATE BROCHURE <span className="opacity-40">|</span> كتيب الشركة ➔
              </a>
              <div className="font-body text-[9px] md:text-[10px] text-zinc-400 tracking-[0.15em] uppercase flex items-center gap-2">
                <span>{enFooter.established}</span>
                <span className="text-[#a855f7]/30">|</span>
                <span dir="rtl">{arFooter.established}</span>
              </div>
            </div>
          </div>

          {/* Copyright notice */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
            <div className="font-body text-[10px] text-zinc-400 tracking-[0.03em] flex flex-col md:flex-row items-center justify-between w-full gap-2">
              <p>{enFooter.copy}</p>
              <p dir="rtl" className="text-zinc-500">{arFooter.copy}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        style={{
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        className="fixed bottom-8 right-8 z-[999] w-12 h-12 rounded-lg bg-white/90 border border-[#a855f7]/30 hover:border-[#a855f7] hover:bg-[#a855f7] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] text-[#a855f7] hover:text-white flex items-center justify-center transition-all duration-500 cursor-pointer shadow-[0_4px_20px_rgba(139,92,246,0.2)] backdrop-blur-md"
        aria-label="Back to Top"
      >
        <span className="font-body text-lg font-bold">↑</span>
      </button>
    </>
  );
}
