"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  currentLocale: "en" | "ar";
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = currentLocale === "en" ? "ar" : "en";
    
    // Replace the active language prefix segment in the pathname
    let newPath = "";
    if (pathname.startsWith(`/${currentLocale}`)) {
      newPath = pathname.replace(`/${currentLocale}`, `/${nextLocale}`);
    } else {
      newPath = `/${nextLocale}${pathname}`;
    }
    
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="cursor-pointer font-body text-sm md:text-[15px] font-medium tracking-[0.2em] uppercase text-zinc-300 hover:text-[#a855f7] hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all duration-300 bg-transparent p-0 border-none select-none outline-none"
    >
      {currentLocale === "en" ? "العربية" : "English"}
    </button>
  );
}
