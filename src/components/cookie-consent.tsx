"use client";

import React, { useEffect, useState } from "react";

interface CookieConsentProps {
  locale: "en" | "ar";
}

export default function CookieConsent({ locale }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem("lightTowerCookieConsent");
    if (!consent) {
      // Delay the pop-up slightly (2.5 seconds) for a premium, deliberate entrance feel
      const timer = setTimeout(() => {
        setShouldRender(true);
        // Force a reflow for transition animation
        setTimeout(() => setVisible(true), 50);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setVisible(false);
    localStorage.setItem("lightTowerCookieConsent", "accepted");
    setTimeout(() => setShouldRender(false), 600);
  };

  const handleDecline = () => {
    setVisible(false);
    localStorage.setItem("lightTowerCookieConsent", "declined");
    setTimeout(() => setShouldRender(false), 600);
  };

  if (!shouldRender) return null;

  const isAr = locale === "ar";

  return (
    <div
      style={{
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
        opacity: visible ? 1 : 0,
      }}
      className={`fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md z-[99999] border border-[#a855f7]/20 bg-[#0a0418]/95 backdrop-blur-xl p-6 rounded-2xl flex flex-col gap-4 shadow-[0_24px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(168,85,247,0.15)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Top ambient accent glow line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent" />

      {/* Content section */}
      <div className="flex gap-4 items-start">
        {/* Glowing custom cookie/shield icon */}
        <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/25 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <svg
            className="w-5 h-5 text-[#c084fc] fill-none stroke-current"
            viewBox="0 0 24 24"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M12 6v6l4 2" />
            <path d="M16.2 7.8c-.29-.08-.59-.14-.9-.18M7.8 16.2c.29.08.59.14.9.18M7.8 7.8c-.08.29-.14.59-.18.9M16.2 16.2c.08-.29.14-.59.18-.9" />
          </svg>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1.5 text-left">
          <h4 className="font-display text-[11px] font-bold tracking-[0.2em] text-white uppercase">
            {isAr ? "ملفات تعريف الارتباط والخصوصية" : "COOKIES & PRIVACY"}
          </h4>
          <p className="font-body text-zinc-300 text-[11px] md:text-[12px] font-light leading-relaxed tracking-wide">
            {isAr
              ? "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك الرقمية، وتحليل أداء الموقع، وعرض حلول الإضاءة المعمارية المخصصة بما يتوافق مع اهتماماتك الفنية."
              : "We use cookies to elevate your digital experience, analyze traffic dynamics, and present bespoke architectural lighting solutions tailored to your preferences."}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 mt-1 border-t border-[#a855f7]/10 pt-4">
        {/* Decline Button */}
        <button
          onClick={handleDecline}
          className="cursor-pointer font-body text-[10px] md:text-[11px] font-bold tracking-wider uppercase text-zinc-400 hover:text-white px-4 py-2.5 rounded-xl transition-all duration-300 border border-white/5 hover:border-white/15 bg-white/[0.02]"
        >
          {isAr ? "رفض" : "DECLINE"}
        </button>

        {/* Accept Button */}
        <button
          onClick={handleAccept}
          className="cursor-pointer font-body text-[10px] md:text-[11px] font-bold tracking-wider uppercase bg-[#a855f7] hover:bg-[#a855f7]/90 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(168,85,247,0.25)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.45)]"
        >
          {isAr ? "قبول الكل" : "ACCEPT ALL"}
        </button>
      </div>
    </div>
  );
}
