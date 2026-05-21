"use client";

import React, { useState } from "react";


interface FAQItem {
  q: string;
  a: string;
  qAr: string;
  aAr: string;
}

interface FAQAccordionProps {
  locale: "en" | "ar";
  faqs: FAQItem[];
}

export default function FAQAccordion({ locale, faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4 mt-8 w-full max-w-[850px] mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const question = locale === "ar" ? faq.qAr : faq.q;
        const answer = locale === "ar" ? faq.aAr : faq.a;

        return (
          <div
            key={index}
            className="glass rounded-lg border border-[#9d4edd]/15 bg-[#0a0b18]/45 transition-all duration-300 hover:border-[#a855f7]/40 overflow-hidden"
          >
            {/* Header / Question Toggle */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex justify-between items-center text-left dir-rtl:text-right gap-4 cursor-pointer focus:outline-none"
            >
              <h3 className="font-display text-white text-base md:text-lg font-light tracking-[0.05em] uppercase transition-colors duration-300 hover:text-[#a855f7]">
                {question}
              </h3>
              
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0a0b18]/60 border border-[#9d4edd]/20 flex items-center justify-center text-[#a855f7] transition-all duration-300">
                {isOpen ? (
                  <span className="font-body text-sm text-[#a855f7] transition-all duration-300">—</span>
                ) : (
                  <span className="font-body text-sm text-[#a855f7] transition-all duration-300">+</span>
                )}
              </div>
            </button>

            {/* Answer Content */}
            <div
              style={{
                maxHeight: isOpen ? "300px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
              className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2 border-t border-[#9d4edd]/5">
                <p className="font-body text-[#94a3b8] text-xs md:text-sm font-light leading-relaxed tracking-[0.02em]">
                  {answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
