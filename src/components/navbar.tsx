"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./language-switcher";
import LogoDisplay from "./logo-display";

interface NavbarProps {
  locale: "en" | "ar";
  navData: {
    about: string;
    services: string;
    founders: string;
    cta: string;
    logoText: string;
  };
}

export default function Navbar({ locale, navData }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const isHomepage = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";

  // On homepage: hide navbar after scrolling past hero (hero is h-[400vh])
  // On sub-pages: always show
  useEffect(() => {
    if (!isHomepage) {
      setVisible(true);
      return;
    }

    const handleScroll = () => {
      // Hero sequence is 550vh, so scroll range is 450vh (4.5 * innerHeight).
      // We keep the navbar visible throughout the hero scroll animation and transition (up to 5.2 * innerHeight).
      const heroEnd = window.innerHeight * 5.2;
      setVisible(window.scrollY < heroEnd);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  const getLinkHref = (hash: string) => {
    return isHomepage ? hash : `/${locale}${hash}`;
  };

  return (
    <>
      {/* Logo — pinned top-left, white filter, hero-only on homepage */}
      <Link
        href={`/${locale}`}
        aria-label="Light Tower Illumination — Return to homepage"
        className="fixed top-6 left-6 md:top-8 md:left-10 lg:left-14 z-[1001] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transform: visible ? "translateY(0)" : "translateY(-20px)",
        }}
      >
        <LogoDisplay iconClass="h-10 md:h-12 lg:h-14" textClass="text-[9px] md:text-[10px]" />
      </Link>

      {/* Desktop Navigation — pinned top-right, vertical, hero-only on homepage */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-6 right-6 md:top-8 md:right-10 lg:right-14 z-[1001] hidden md:flex flex-col items-end gap-4 select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transform: visible ? "translateY(0)" : "translateY(-20px)",
        }}
      >
        <Link
          href={getLinkHref("#about")}
          className="font-body text-xs md:text-[13px] font-semibold tracking-[0.2em] uppercase text-zinc-300 hover:text-[#a855f7] hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all duration-300"
        >
          {navData.about}
        </Link>

        <Link
          href={getLinkHref("#services")}
          className="font-body text-xs md:text-[13px] font-semibold tracking-[0.2em] uppercase text-zinc-300 hover:text-[#a855f7] hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all duration-300"
        >
          {navData.services}
        </Link>

        <a
          href="/images/Brochure.png"
          download="Light_Tower_Corporate_Brochure.png"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs md:text-[13px] font-semibold tracking-[0.2em] uppercase text-zinc-300 hover:text-[#a855f7] hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all duration-300"
        >
          {locale === "ar" ? "الكتيب" : "BROCHURE"}
        </a>

        <LanguageSwitcher currentLocale={locale} />

        <Link
          href={getLinkHref("#contact")}
          className="font-body text-xs md:text-[13px] font-semibold tracking-[0.2em] uppercase text-zinc-300 hover:text-[#a855f7] hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all duration-300"
        >
          {navData.cta}
        </Link>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-7 right-6 flex md:hidden flex-col gap-1.5 p-2 z-[1002] cursor-pointer transition-all duration-700"
        style={{
          opacity: visible || menuOpen ? 1 : 0,
          pointerEvents: visible || menuOpen ? "auto" : "none",
        }}
        aria-label="Toggle Menu"
      >
        <span
          className={`w-7 h-0.5 bg-white transition-all duration-300 rounded-sm ${
            menuOpen ? "rotate-45 translate-y-[8px] bg-[#a855f7]" : ""
          }`}
        />
        <span
          className={`w-7 h-0.5 bg-white transition-all duration-300 rounded-sm ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`w-7 h-0.5 bg-white transition-all duration-300 rounded-sm ${
            menuOpen ? "-rotate-45 -translate-y-[8px] bg-[#a855f7]" : ""
          }`}
        />
      </button>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 bg-[#030308]/96 backdrop-blur-[36px] z-[1000] flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link
          onClick={() => setMenuOpen(false)}
          href={getLinkHref("#about")}
          className="font-display text-2xl font-light text-zinc-300 tracking-[0.15em] uppercase hover:text-[#a855f7] hover:scale-105 transition-all duration-300"
        >
          {navData.about}
        </Link>
        <Link
          onClick={() => setMenuOpen(false)}
          href={getLinkHref("#services")}
          className="font-display text-2xl font-light text-zinc-300 tracking-[0.15em] uppercase hover:text-[#a855f7] hover:scale-105 transition-all duration-300"
        >
          {navData.services}
        </Link>
        <a
          onClick={() => setMenuOpen(false)}
          href="/images/Brochure.png"
          download="Light_Tower_Corporate_Brochure.png"
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-2xl font-light text-zinc-300 tracking-[0.15em] uppercase hover:text-[#a855f7] hover:scale-105 transition-all duration-300"
        >
          {locale === "ar" ? "الكتيب المؤسسي" : "CORPORATE BROCHURE"}
        </a>

        <div className="my-1">
          <LanguageSwitcher currentLocale={locale} />
        </div>

        <Link
          onClick={() => setMenuOpen(false)}
          href={getLinkHref("#contact")}
          className="font-display text-2xl font-light text-zinc-300 tracking-[0.15em] uppercase hover:text-[#a855f7] hover:scale-105 transition-all duration-300"
        >
          {navData.cta}
        </Link>
      </div>
    </>
  );
}
