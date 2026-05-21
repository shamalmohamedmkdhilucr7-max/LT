"use client";

import React, { useEffect, useState, useRef } from "react";

interface AboutProps {
  locale: "en" | "ar";
  aboutData: {
    eyebrow: string;
    title1: string;
    titleAccent: string;
    title2: string;
    desc: string;
    arabicText: string;
    stats: {
      number: string;
      suffix: string;
      label: string;
      desc: string;
    }[];
  };
  foundersData?: {
    eyebrow: string;
    title1: string;
    titleAccent: string;
    title2: string;
    list: {
      name: string;
      role: string;
      bio: string;
      arabicBio: string;
      image: string;
    }[];
  };
}

const FOUNDERS = [
  {
    name: "OTHMAN BIN SAID SAIF AL MASOUDI",
    nameAr: "عثمان بن سعيد بن سيف المسعودي",
    role: "MANAGING PARTNER",
    roleAr: "شريك إداري",
    initials: "OB",
    image: "/images/othman bin said saif al masoudi.png",
  },
  {
    name: "SHEEFER H. SAIT",
    nameAr: "شيفير ح. سايت",
    role: "MANAGING PARTNER",
    roleAr: "شريك إداري",
    initials: "SH",
    image: "/images/SHEEFER. H. SAIT.png",
  },
];

export default function AboutSection({ locale, aboutData }: AboutProps) {
  return (
    <section id="about" className="relative py-24 md:py-36 bg-transparent overflow-hidden border-t border-[#a855f7]/10">
      {/* Ambient Background Highlights — purple only */}
      <div className="absolute top-[10%] left-[-15vw] w-[50vw] h-[50vw] rounded-full bg-radial from-[#a855f7]/8 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15vw] w-[45vw] h-[45vw] rounded-full bg-radial from-[#a855f7]/4 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* UPPER PORTION: Heading & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <span className="font-body text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#a855f7] uppercase mb-4 block eyebrow relative pl-8">
              ABOUT US | من نحن
            </span>
            
            <h2 className="font-display text-white text-3xl md:text-5xl font-extralight tracking-[0.08em] uppercase leading-[1.2] mb-6">
              <span className="text-white/60 block font-light">ILLUMINATING SPACES.</span>
              <span className="text-[#a855f7] font-semibold tracking-[0.1em] drop-shadow-[0_0_15px_rgba(168,85,247,0.15)] block my-1">
                INSPIRING
              </span>
              <span className="text-white block font-light">EXPERIENCES.</span>
              
              {/* Arabic Subtitle */}
              <span className="text-white/60 block font-light text-xl md:text-2xl mt-4 font-body tracking-normal leading-relaxed text-left" dir="rtl">
                إنارة المساحات. <span className="text-[#a855f7]">إلهام</span> التجارب.
              </span>
            </h2>

            {/* Corporate brochure button — purple */}
            <div className="mt-8">
              <a
                href="/images/Brochure.png"
                download="Light_Tower_Corporate_Brochure.png"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[#a855f7] hover:border-white bg-transparent text-[#a855f7] hover:text-white font-body text-[11px] font-semibold tracking-[0.15em] uppercase px-8 py-4 rounded-sm transition-all duration-500 hover:bg-[#a855f7] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] cursor-pointer group"
              >
                DOWNLOAD BROCHURE | تحميل الكتيب ➔
              </a>
            </div>
          </div>

          {/* Right Column: Detailed narrative text & checklist */}
          <div className="lg:col-span-6">
            <div className="mb-8">
              <p className="font-body text-zinc-200 text-sm md:text-base font-light leading-relaxed tracking-[0.03em] mb-4">
                For over 26 years, Light Tower has been at the forefront of the architectural lighting industry in the Sultanate of Oman and the GCC. We do not just light up structures; we breathe life, emotion, and prestige into architectural masterworks. Our expertise spans monumental building facades, government installations, festive city landmarks, royal weddings, and immersive events. By combining German-engineered LED technologies with local cultural sensitivity, we construct lighting experiences that inspire, transform, and stand as testaments to excellence.
              </p>
              <p className="font-body text-zinc-300/80 text-xs md:text-sm font-light leading-relaxed tracking-[0.02em] mt-4 border-t border-[#a855f7]/15 pt-4 text-right" dir="rtl">
                لأكثر من 26 عاماً، كانت لايت تاور في طليعة صناعة الإضاءة المعمارية في سلطنة عُمان ودول الخليج ومجلس التعاون. نحن لا نضيء الهياكل فحسب، بل نبث الحياة والمشاعر والهيبة في الروائع المعمارية. تشمل خبرتنا واجهات المباني الضخمة، والتركيبات الحكومية، ومعالم المدن الاحتفالية، وحفلات الزفاف الملكية، والفعاليات الغامرة. من خلال دمج تقنيات LED الألمانية المتطورة مع الحساسية الثقافية المحلية، نصنع تجارب إضاءة تلهم وتحول وتعد بمثابة شهادات على التميز.
              </p>
            </div>

            {/* Checklist of brand attributes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {[
                { en: "German-Engineered LED Tech", ar: "تقنيات LED بهندسة ألمانية" },
                { en: "High Environmental Tolerance", ar: "مقاومة عالية للظروف الجوية" },
                { en: "IP67 Double-Insulated Safety", ar: "أمان عالي مع عزل IP67" },
                { en: "Sovereign GCC Legacy", ar: "إرث ومشاريع سيادية معتمدة" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <span className="font-body text-xs text-[#a855f7] mt-0.5 select-none font-bold">—</span>
                  <div className="flex flex-col">
                    <span className="font-body text-[10px] md:text-[11px] font-semibold text-white/90 group-hover:text-white transition-colors duration-300 uppercase tracking-wider">
                      {item.en}
                    </span>
                    <span className="font-body text-[10px] text-purple-300 mt-0.5 tracking-normal">
                      {item.ar}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE PORTION: Premium Horizontal Stats Banner (No heavy outer box) */}
        <div className="mb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.stats.map((stat, idx) => (
              <StatCounterCard key={idx} stat={stat} index={idx} />
            ))}
          </div>
        </div>

        {/* BOTTOM PORTION: Simplified Leadership — Photo + Name + Role Only */}
        <div className="pt-12 border-t border-[#a855f7]/10">
          <div className="max-w-[700px] mb-12">
            <span className="font-body text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#a855f7] uppercase mb-3 block eyebrow">
              EXECUTIVE LEADERSHIP | القيادة
            </span>
            <h3 className="font-display text-white text-2xl md:text-4xl font-light tracking-[0.08em] uppercase leading-tight">
              THE VISIONARIES BEHIND OUR SUCCESS
              <span className="text-zinc-300/80 block font-light text-lg md:text-xl mt-2 font-body tracking-normal text-left" dir="rtl">
                الرؤاة المبدعون <span className="text-[#a855f7]">خلف</span> مسيرة نجاحنا
              </span>
            </h3>
          </div>

          {/* Full-image founder cards — image fills card, white text banner at bottom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[760px]">
            {FOUNDERS.map((founder) => (
              <div
                key={founder.name}
                className="group relative rounded-2xl overflow-hidden border border-[#a855f7]/15 hover:border-[#a855f7]/40 hover:-translate-y-1 transition-all duration-500 shadow-[0_15px_40px_-15px_rgba(168,85,247,0.1)] hover:shadow-[0_24px_50px_-10px_rgba(168,85,247,0.25)] h-[420px] md:h-[460px] cursor-pointer"
              >
                {/* Full background image */}
                {founder.image ? (
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0c051a] to-[#1a0a2e] flex items-center justify-center">
                    <span className="font-display text-5xl font-extralight tracking-widest text-[#a855f7]/50 group-hover:text-[#a855f7]/90 transition-colors duration-500">
                      {founder.initials}
                    </span>
                  </div>
                )}

                {/* Subtle dark vignette for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />

                {/* White text container banner at bottom */}
                <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm p-5 border-t border-[#a855f7]/20 text-center z-20">
                  <h4 className="font-display text-[#1a0a2e] text-sm md:text-base font-semibold tracking-[0.06em] uppercase leading-tight mb-0.5">
                    {founder.name}
                  </h4>
                  <span className="font-body text-[12px] text-[#7c3aed]/80 font-light block mb-2">
                    {founder.nameAr}
                  </span>
                  <span className="font-body text-[9px] text-[#a855f7] tracking-[0.25em] uppercase font-bold block">
                    {founder.role}
                  </span>
                  <span className="font-body text-[9px] text-[#7c3aed]/70 block mt-0.5">
                    {founder.roleAr}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// Single Stat Card with smooth custom Counter logic
interface StatCounterCardProps {
  stat: {
    number: string;
    suffix: string;
    label: string;
    desc: string;
  };
  index: number;
}

function StatCounterCard({ stat, index }: StatCounterCardProps) {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Robust numeric check to avoid treating "OMAN & GCC" as a number (since regex /^\d+$/ only matches digits)
  const isNumber = /^\d+$/.test(stat.number.trim());
  const targetNum = isNumber ? Number(stat.number.trim()) : 0;
  const isLongText = stat.number.length > 5;

  useEffect(() => {
    if (!isNumber || targetNum === 0) return;

    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !started) {
          started = true;
          animateCount();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    const animateCount = () => {
      const duration = 1800;
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(easeProgress * targetNum);
        setCount(current);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          setCount(targetNum);
        }
      };

      requestAnimationFrame(update);
    };

    return () => observer.disconnect();
  }, [targetNum, isNumber]);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col justify-between p-8 bg-gradient-to-br from-[#120727]/60 to-[#05020a]/80 backdrop-blur-md border border-[#a855f7]/20 hover:border-[#a855f7]/45 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 rounded-2xl shadow-[0_15px_40px_-15px_rgba(168,85,247,0.15)] hover:shadow-[0_24px_50px_-10px_rgba(168,85,247,0.3)] overflow-hidden"
    >
      {/* Absolute faint large watermark index */}
      <span className="font-body text-[100px] font-extrabold text-[#a855f7]/8 group-hover:text-[#a855f7]/12 select-none absolute right-4 -bottom-6 transition-colors duration-500 leading-none">
        0{index + 1}
      </span>
      
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Metrics Number: Bright white-purple gradient for dark bg */}
          <div className="flex items-baseline font-body leading-none">
            <span className={`${isLongText ? "text-xl lg:text-2xl" : "text-4xl lg:text-5xl"} font-extrabold tracking-tight bg-gradient-to-br from-white via-zinc-200 to-[#c084fc] bg-clip-text text-transparent`}>
              {isNumber ? count : stat.number}
            </span>
            {stat.suffix && (
              <span className="text-[#c084fc] ml-1 font-light text-2xl lg:text-3xl select-none">
                {stat.suffix}
              </span>
            )}
          </div>
          
          <div className="font-body text-[10px] font-bold text-[#c084fc] tracking-[0.25em] uppercase mt-4 group-hover:text-[#a855f7] transition-colors duration-300">
            {stat.label}
          </div>
          
          <div className="font-body text-[11px] text-zinc-300 mt-2 font-light tracking-[0.03em] leading-relaxed pr-8">
            {stat.desc}
          </div>
        </div>
      </div>
    </div>
  );
}
