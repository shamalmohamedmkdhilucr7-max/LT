"use client";

import React, { useEffect, useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Video } from "lucide-react";

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
    image: "/images/othman%20bin%20said%20saif%20al%20masoudi.png",
  },
  {
    name: "SHEEFER H. SAIT",
    nameAr: "شيفير ح. سايت",
    role: "MANAGING PARTNER",
    roleAr: "شريك إداري",
    initials: "SH",
    image: "/images/SHEEFER.%20H.%20SAIT.png",
  },
];

const REELS_DATA = [
  {
    src: "/videos/reel-1.mp4",
    poster: "/images/Gallery%20and%20portfolio/image%20(8).png",
    title: "Facade Illumination",
    titleAr: "إنارة الواجهات",
    desc: "Engineering custom interactive LED systems for skyscrapers.",
    descAr: "هندسة أنظمة LED التفاعلية المخصصة للأبراج الشاهقة."
  },
  {
    src: "/videos/reel-2.mp4",
    poster: "/images/Gallery%20and%20portfolio/image%20(43).png",
    title: "Royal Grand Events",
    titleAr: "الفعاليات الملكية الكبرى",
    desc: "Crafting atmospheric lighting architecture for national ceremonies.",
    descAr: "صناعة بيئات إضاءة غامرة للاحتفالات الوطنية والمناسبات الكبرى."
  }
];

export default function AboutSection({ locale, aboutData }: AboutProps) {
  const [activeReel, setActiveReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setVideoLoaded(false);
    setProgress(0);
    video.load();
    video.muted = isMuted;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Autoplay prevented or video not yet loaded:", err);
        });
      }
    } else {
      video.pause();
    }
  }, [activeReel]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted]);

  const handlePrevReel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveReel((prev) => (prev === 0 ? REELS_DATA.length - 1 : prev - 1));
  };

  const handleNextReel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveReel((prev) => (prev === REELS_DATA.length - 1 ? 0 : prev + 1));
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleVideoEnded = () => {
    handleNextReel();
  };

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

        {/* BOTTOM PORTION: Executive Leadership & Interactive Media Reels */}
        <div className="pt-12 border-t border-[#a855f7]/10">
          <div className="max-w-[700px] mb-12">
            <span className="font-body text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#a855f7] uppercase mb-3 block eyebrow">
              EXECUTIVE LEADERSHIP & PORTFOLIO ACTION | القيادة ومعرض الميديا
            </span>
            <h3 className="font-display text-white text-2xl md:text-4xl font-light tracking-[0.08em] uppercase leading-tight">
              THE VISIONARIES BEHIND OUR SUCCESS
              <span className="text-zinc-300/80 block font-light text-lg md:text-xl mt-2 font-body tracking-normal text-left" dir="rtl">
                الرؤاة المبدعون <span className="text-[#a855f7]">خلف</span> مسيرة نجاحنا
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Founder Cards (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col justify-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[760px] w-full">
                {FOUNDERS.map((founder) => (
                  <div
                    key={founder.name}
                    className="group relative rounded-2xl overflow-hidden border border-[#a855f7]/15 hover:border-[#a855f7]/40 hover:-translate-y-1 transition-all duration-500 shadow-[0_15px_40px_-15px_rgba(168,85,247,0.15)] hover:shadow-[0_24px_50px_-10px_rgba(168,85,247,0.25)] h-[420px] md:h-[460px] cursor-pointer"
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

            {/* Right: Smartphone-style Vertical Reels Player (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-start w-full relative z-20">
              <div className="relative aspect-[9/16] max-w-[340px] w-full rounded-[2.5rem] border-4 border-zinc-800/90 bg-[#06030c] overflow-hidden shadow-[0_20px_50px_rgba(168,85,247,0.22)] backdrop-blur-md group-reels">
                
                {/* Dynamic Island Notch Simulation for ultimate luxury wow factor */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4.5 bg-black rounded-full z-45 flex items-center justify-between px-2.5 pointer-events-none">
                  <div className="w-1 h-1 rounded-full bg-zinc-800" />
                  <div className="w-6 h-1 bg-zinc-900 rounded-full" />
                  <div className="w-1 h-1 rounded-full bg-[#a855f7]/40 animate-pulse" />
                </div>

                {/* Instagram-style top progress indicators */}
                <div className="absolute top-8 left-0 w-full px-4 flex gap-1 z-40">
                  {REELS_DATA.map((_, idx) => {
                    let barWidth = "0%";
                    if (idx < activeReel) barWidth = "100%";
                    else if (idx === activeReel) barWidth = `${progress}%`;
                    return (
                      <div key={idx} className="h-0.5 flex-1 bg-white/25 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#a855f7] to-[#c084fc] transition-all duration-100 ease-out"
                          style={{ width: barWidth }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Click and Touch Regions for Stories Control */}
                {/* Left 30% click area to go back */}
                <div
                  onClick={handlePrevReel}
                  className="absolute top-0 left-0 w-[30%] h-full z-30 cursor-pointer"
                  title="Previous Reel | السابق"
                />
                {/* Right 30% click area to go forward */}
                <div
                  onClick={handleNextReel}
                  className="absolute top-0 right-0 w-[30%] h-full z-30 cursor-pointer"
                  title="Next Reel | التالي"
                />
                {/* Center 40% click area to toggle play/pause */}
                <div
                  onClick={togglePlay}
                  className="absolute top-0 left-[30%] right-[30%] h-full z-30 cursor-pointer flex items-center justify-center group/playbtn"
                  title={isPlaying ? "Pause | إيقاف" : "Play | تشغيل"}
                >
                  <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover/playbtn:opacity-100 transition-all duration-300 scale-90 group-hover/playbtn:scale-100 shadow-[0_8px_32px_rgba(168,85,247,0.2)]">
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white fill-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white fill-white translate-x-0.5" />
                    )}
                  </div>
                </div>

                {/* Toggle Mute/Unmute Overlay Button */}
                <button
                  onClick={toggleMute}
                  className="absolute top-10 right-4 z-40 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer"
                  title={isMuted ? "Unmute | تشغيل الصوت" : "Mute | كتم الصوت"}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-[#c084fc]" />
                  )}
                </button>

                {/* Dynamic Portrait Video Player */}
                <video
                  ref={videoRef}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleVideoEnded}
                  onLoadedData={() => setVideoLoaded(true)}
                  poster={REELS_DATA[activeReel].poster}
                  playsInline
                  muted={isMuted}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                >
                  <source src={REELS_DATA[activeReel].src} type="video/mp4" />
                </video>

                {/* Glassmorphic Caption Card Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/85 to-transparent p-6 pt-16 z-30 text-left pointer-events-none">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#a855f7]/25 border border-[#a855f7]/35 text-[#c084fc] text-[8px] font-bold uppercase tracking-wider mb-2 select-none">
                    {locale === "ar" ? "معرض الفيديو" : "PROJECT IN ACTION"}
                  </span>
                  
                  <h4 className="font-display text-white text-sm font-semibold uppercase tracking-wider mb-1 leading-snug">
                    {locale === "ar" ? REELS_DATA[activeReel].titleAr : REELS_DATA[activeReel].title}
                  </h4>
                  <p className="font-body text-zinc-300 text-[10px] font-light leading-relaxed mb-0">
                    {locale === "ar" ? REELS_DATA[activeReel].descAr : REELS_DATA[activeReel].desc}
                  </p>
                </div>

                {/* Dynamic Ultra-Luxury loading states inside the player */}
                {!videoLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0c051a] to-[#120524] flex flex-col items-center justify-center z-25 transition-opacity duration-500">
                    <div className="w-12 h-12 rounded-full border border-[#a855f7]/20 flex items-center justify-center mb-4 relative">
                      <div className="absolute inset-0 rounded-full border-t-2 border-[#a855f7] animate-spin" />
                      <Video className="w-5 h-5 text-[#a855f7]" />
                    </div>
                    <span className="font-body text-[9px] tracking-[0.25em] uppercase text-purple-300 animate-pulse">
                      {locale === "ar" ? "جاري تحميل اللقطة..." : "LOADING VIDEO..."}
                    </span>
                  </div>
                )}
              </div>

              {/* High-fidelity Manual Selector Navigation Tabs */}
              <div className="flex justify-center gap-3 mt-5 w-full">
                {REELS_DATA.map((reel, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveReel(idx);
                      setIsPlaying(true);
                    }}
                    className={`cursor-pointer px-4 py-2 rounded-xl text-[9px] font-bold tracking-wider uppercase border transition-all duration-500 font-body ${
                      activeReel === idx
                        ? "bg-[#a855f7] border-[#a855f7] text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                        : "bg-[#120727]/40 border-[#a855f7]/20 text-zinc-400 hover:text-white hover:border-[#a855f7]/40"
                    }`}
                  >
                    {locale === "ar" ? reel.titleAr : reel.title}
                  </button>
                ))}
              </div>
            </div>
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
