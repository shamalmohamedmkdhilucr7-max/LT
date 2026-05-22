"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { localizationContent } from "@/constants/content";
import LogoDisplay from "./logo-display";

interface FooterProps {
  locale: "en" | "ar";
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

  const isAr = locale === "ar";
  const activeData = localizationContent[locale];
  const enData = localizationContent.en;
  const arData = localizationContent.ar;

  // Localized title strings
  const labels = {
    navigation: isAr ? "تصفح الموقع" : "NAVIGATION",
    contact: isAr ? "بيانات الاتصال" : "CONTACT DETAILS",
    established: isAr ? "تأسست في عام ١٩٩٨" : "ESTABLISHED 1998",
    crLabel: isAr ? "رقم السجل التجاري" : "COMMERCIAL REGISTRATION",
    brochureLabel: isAr ? "كتيب الشركة" : "CORPORATE BROCHURE",
    downloadBtn: isAr ? "تحميل كتيب الشركة" : "DOWNLOAD BROCHURE",
    brandDesc: isAr
      ? "لايت تاور لتجارة الإضاءة (لايت تاور للإضاءة) هي الشريك النخبوي الرائد لحلول واجهات الـ LED المعمارية والتركيبات السيادية في سلطنة عُمان والخليج العربي لأكثر من ٢٦ عاماً، ملتزمون بتقديم الجمال والكمال في كل زاوية مضيئة."
      : "LIGHT TOWER LIGHTING TRADE ASSO (Light Tower Illumination) is the GCC's premier sovereign-grade lighting specialist. For over 26 years, we have delivered happiness, charm, and high-fidelity lighting satisfaction across Omani landmarks and royal ceremonies.",
    telephones: isAr ? "أرقام الهاتف" : "TELEPHONES",
    email: isAr ? "البريد الإلكتروني" : "EMAIL ADDRESS",
    hqAddress: isAr ? "المقر الرئيسي" : "HQ ADDRESS",
    aboutUs: isAr ? "من نحن" : "About Us",
    services: isAr ? "خدماتنا" : "Our Services",
    founders: isAr ? "المؤسسون" : "The Founders",
    contactUs: isAr ? "اتصل بنا" : "Contact Us",
  };

  return (
    <>
      <footer className="relative bg-[#04010a] border-t border-[#a855f7]/15 pt-20 pb-12 overflow-hidden z-10">
        
        {/* Top boundary laser glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/40 to-transparent" />
        
        {/* Ambient Spotlights Background */}
        <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] rounded-full bg-radial from-[#a855f7]/3 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] left-[-10vw] w-[35vw] h-[35vw] rounded-full bg-radial from-[#a855f7]/3 to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#a855f7]/10 text-left" dir={isAr ? "rtl" : "ltr"}>
            
            {/* Column 1: Brand & Description */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <Link href={`/${locale}`} className="hover:opacity-85 transition-opacity duration-300 inline-block w-fit">
                <LogoDisplay iconClass="h-9 md:h-11" showText={true} />
              </Link>
              <p className="font-body text-zinc-400 text-xs md:text-sm font-light leading-relaxed max-w-sm">
                {labels.brandDesc}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#a855f7]/20 bg-[#a855f7]/5 text-[#c084fc] font-body text-[10px] font-semibold uppercase tracking-wider w-fit">
                <span>OMAN & GCC · EST. 1998</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 flex flex-col gap-5 md:pl-4 lg:pl-8">
              <h4 className="font-display text-[10px] font-bold tracking-[0.25em] text-[#c084fc] uppercase border-b border-[#a855f7]/15 pb-2 w-fit">
                {labels.navigation}
              </h4>
              <ul className="flex flex-col gap-3 font-body text-xs text-zinc-400 font-light">
                <li>
                  <Link href={`/${locale}#about`} className="hover:text-[#c084fc] transition-colors duration-300 flex items-center gap-1">
                    <span>{isAr ? "←" : "➔"}</span> {labels.aboutUs}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}#services`} className="hover:text-[#c084fc] transition-colors duration-300 flex items-center gap-1">
                    <span>{isAr ? "←" : "➔"}</span> {labels.services}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}#founders`} className="hover:text-[#c084fc] transition-colors duration-300 flex items-center gap-1">
                    <span>{isAr ? "←" : "➔"}</span> {labels.founders}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}#contact`} className="hover:text-[#c084fc] transition-colors duration-300 flex items-center gap-1">
                    <span>{isAr ? "←" : "➔"}</span> {labels.contactUs}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              <h4 className="font-display text-[10px] font-bold tracking-[0.25em] text-[#c084fc] uppercase border-b border-[#a855f7]/15 pb-2 w-fit">
                {labels.contact}
              </h4>
              <div className="flex flex-col gap-4 font-body text-xs text-zinc-300 font-light">
                {/* Telephones */}
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-[#c084fc] tracking-wider uppercase opacity-75">{labels.telephones}</span>
                  <a href="tel:+96898184233" className="hover:text-[#c084fc] transition-colors tracking-wide block">
                    +968 9818 4233
                  </a>
                  <a href="tel:+96890153350" className="hover:text-[#c084fc] transition-colors tracking-wide block mt-0.5">
                    +968 9015 3350
                  </a>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-[#c084fc] tracking-wider uppercase opacity-75">{labels.email}</span>
                  <a href="mailto:ltillumination06@gmail.com" className="hover:text-[#c084fc] transition-colors tracking-wide block break-all">
                    ltillumination06@gmail.com
                  </a>
                </div>

                {/* HQ Address */}
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-[#c084fc] tracking-wider uppercase opacity-75">{labels.hqAddress}</span>
                  <p className="leading-relaxed">
                    {activeData.contact.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Column 4: CR and Corporate Brochure */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              <h4 className="font-display text-[10px] font-bold tracking-[0.25em] text-[#c084fc] uppercase border-b border-[#a855f7]/15 pb-2 w-fit">
                {labels.brochureLabel}
              </h4>
              <div className="p-4 rounded-xl border border-[#a855f7]/15 bg-gradient-to-br from-[#120727]/40 to-[#05020a]/60 backdrop-blur-md flex flex-col gap-4 shadow-sm hover:border-[#a855f7]/30 transition-all duration-500">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-bold text-[#c084fc] tracking-wider uppercase opacity-75">{labels.crLabel}</span>
                  <span className="text-white text-xs font-semibold tracking-wide block mt-1">
                    {activeData.footer.cr || "CR No: 1281868"}
                  </span>
                </div>
                <a
                  href="/images/Brochure.png"
                  download="Light_Tower_Corporate_Brochure.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-[#a855f7] to-[#8b5cf6] hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] text-white font-body text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{labels.downloadBtn}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Fine Print Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 text-center" dir={isAr ? "rtl" : "ltr"}>
            <div className="font-body text-[10px] text-zinc-400 tracking-[0.03em] flex flex-col md:flex-row items-center justify-between w-full gap-4">
              <p className="font-light text-left md:text-left">{activeData.footer.copy}</p>
              <div className="flex items-center gap-2">
                <span className="font-light text-zinc-500 uppercase tracking-widest text-[9px]">
                  {activeData.footer.established}
                </span>
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* Back to Top Floating Trigger */}
      <button
        onClick={scrollToTop}
        style={{
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        className="fixed bottom-8 right-8 z-[999] w-12 h-12 rounded-lg bg-[#070310]/95 border border-[#a855f7]/30 hover:border-[#a855f7] hover:bg-[#a855f7] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] text-[#a855f7] hover:text-white flex items-center justify-center transition-all duration-500 cursor-pointer shadow-[0_4px_20px_rgba(139,92,246,0.2)] backdrop-blur-md"
        aria-label="Back to Top"
      >
        <span className="font-body text-lg font-bold">↑</span>
      </button>
    </>
  );
}
