"use client";

import React, { useState } from "react";
import { localizationContent } from "@/constants/content";
import { Phone, Mail, MapPin, Award, Clock } from "lucide-react";

interface ContactProps {
  locale: "en" | "ar";
  contactData: {
    eyebrow: string;
    title1: string;
    titleAccent: string;
    title2: string;
    desc: string;
    arabicText: string;
    phone: string;
    email: string;
    location: string;
    form: {
      title: string;
      name: string;
      email: string;
      phone: string;
      projectType: string;
      projectOptions: string[];
      message: string;
      submit: string;
      privacy: string;
      whatsappCta: string;
    };
  };
}

export default function ContactSection({ locale }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const enData = localizationContent.en.contact;
  const arData = localizationContent.ar.contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting luxury lead details:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const whatsappUrl = `https://wa.me/96898184233?text=${encodeURIComponent(
    "Hello Light Tower, I would like to inquire about premier high-end architectural illumination services for my project. | مرحباً لايت تاور، أود الاستفسار عن خدمات الإضاءة المعمارية لمشروعي."
  )}`;

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-transparent border-t border-[#a855f7]/10 overflow-hidden flex items-center min-h-[90vh]">
      {/* Premium Ambient Background Video Loop */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.25]"
        >
          <source src="/videos/contact-bg.mp4" type="video/mp4" />
        </video>
        {/* Deep purple glassmorphic gradient overlay to guarantee perfect contrast and legibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c051e]/85 via-[#06030c]/92 to-black/96 backdrop-blur-[2px]" />
      </div>

      {/* Absolute Ambient Spotlight Glows */}
      <div className="absolute top-[10%] left-[-15vw] w-[50vw] h-[50vw] rounded-full bg-radial from-[#a855f7]/4 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15vw] w-[45vw] h-[45vw] rounded-full bg-radial from-[#a855f7]/4 to-transparent blur-[125px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* LEFT COLUMN: GET IN TOUCH Details */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-body text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#a855f7] uppercase block">
                  {enData.eyebrow}
                </span>
                <span className="text-[#a855f7]/30 text-xs">|</span>
                <span className="font-body text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#a855f7]/90 uppercase block" dir="rtl">
                  {arData.eyebrow}
                </span>
              </div>
              
              <div className="mb-6 flex flex-col gap-2">
                <h2 className="font-display text-white text-3xl md:text-5xl font-extralight tracking-[0.08em] uppercase leading-[1.2]">
                  <span className="text-white/60 block font-light">{enData.title1}</span>
                  <span className="text-[#a855f7] font-semibold tracking-[0.1em] drop-shadow-[0_0_12px_rgba(168,85,247,0.15)] block my-1">
                    {enData.titleAccent}
                  </span>
                  <span className="text-white block font-light">{enData.title2}</span>
                </h2>
                <h3 className="font-body text-[#a855f7] text-xl md:text-2xl font-light tracking-[0.04em] leading-normal" dir="rtl">
                  دعنا <span className="text-white font-normal">نضيء</span> مشروعك القادم.
                </h3>
              </div>

              <div className="flex flex-col gap-3 mb-10 border-l border-[#a855f7]/20 pl-4 py-1 relative">
                <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-[#a855f7]/40 via-[#a855f7]/10 to-transparent" />
                <p className="font-body text-zinc-200 text-sm md:text-base font-light leading-relaxed tracking-[0.03em]">
                  {enData.desc}
                </p>
                <p className="font-body text-zinc-300/90 text-sm md:text-base font-light leading-relaxed" dir="rtl">
                  {arData.desc}
                </p>
              </div>
            </div>

            {/* Structured Contact Block Cards */}
            <div className="flex flex-col gap-6 mt-4">
              
               <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#a855f7] drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-[9px] font-bold text-[#c084fc] tracking-[0.2em] uppercase">PHONE</span>
                    <span className="text-[#a855f7]/30 text-[9px]">|</span>
                    <span className="font-body text-[9px] font-bold text-zinc-400 tracking-[0.15em] uppercase" dir="rtl">الهاتف</span>
                  </div>
                  <div className="flex flex-col gap-0.5 mt-0.5">
                    <a href="tel:+96898184233" className="font-body text-white text-sm md:text-base font-light hover:text-[#a855f7] transition-colors tracking-wider">
                      +968 9818 4233
                    </a>
                    <a href="tel:+96890153350" className="font-body text-white text-sm md:text-base font-light hover:text-[#a855f7] transition-colors tracking-wider">
                      +968 9015 3350
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#a855f7] drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 ease-out" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-[9px] font-bold text-[#c084fc] tracking-[0.2em] uppercase">EMAIL</span>
                    <span className="text-[#a855f7]/30 text-[9px]">|</span>
                    <span className="font-body text-[9px] font-bold text-zinc-400 tracking-[0.15em] uppercase" dir="rtl">البريد الإلكتروني</span>
                  </div>
                  <a href="mailto:ltillumination06@gmail.com" className="font-body text-white text-sm md:text-base font-light hover:text-[#a855f7] transition-colors block mt-0.5">
                    ltillumination06@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#a855f7] drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] group-hover:text-white group-hover:scale-110 group-hover:translate-y-[-2px] transition-all duration-500 ease-out" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-[9px] font-bold text-[#c084fc] tracking-[0.2em] uppercase">ADDRESS</span>
                    <span className="text-[#a855f7]/30 text-[9px]">|</span>
                    <span className="font-body text-[9px] font-bold text-zinc-400 tracking-[0.15em] uppercase" dir="rtl">العنوان</span>
                  </div>
                  <div className="font-body text-white text-xs md:text-sm font-light leading-relaxed block mt-0.5">
                    <p>Po. Box. No.125, 316 Postal Code, Mussannah, Al Maabela, Sultanate of Oman</p>
                    <p className="text-zinc-300/80" dir="rtl">ص.ب ١٢٥، الرمز البريدي ٣١٦، المصنعة، المعبيلة، سلطنة عُمان</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-[#a855f7] drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] group-hover:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ease-out" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-[9px] font-bold text-[#c084fc] tracking-[0.2em] uppercase">COMMERCIAL REGISTRATION</span>
                    <span className="text-[#a855f7]/30 text-[9px]">|</span>
                    <span className="font-body text-[9px] font-bold text-zinc-400 tracking-[0.15em] uppercase" dir="rtl">السجل التجاري</span>
                  </div>
                  <div className="mt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/25 text-[#c084fc] font-body text-[10px] md:text-xs font-medium tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
                      CR No: 1281868 <span className="opacity-40">|</span> سجل تجاري: ١٢٨١٨٦٨
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#a855f7] drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] group-hover:text-white group-hover:scale-110 group-hover:rotate-[30deg] transition-all duration-500 ease-out" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-[9px] font-bold text-[#c084fc] tracking-[0.2em] uppercase">WORKING HOURS</span>
                    <span className="text-[#a855f7]/30 text-[9px]">|</span>
                    <span className="font-body text-[9px] font-bold text-zinc-400 tracking-[0.15em] uppercase" dir="rtl">ساعات العمل</span>
                  </div>
                  <div className="font-body text-white text-xs md:text-sm font-light leading-relaxed block mt-0.5">
                    <p>Sat - Thu: 8:00 AM - 6:00 PM / Friday: Closed</p>
                    <p className="text-zinc-300/80" dir="rtl">السبت - الخميس: 8:00 صباحاً - 6:00 مساءً / الجمعة: مغلق</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Glassmorphic Message Form */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full justify-center">
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-10 rounded-2xl border border-[#a855f7]/20 bg-gradient-to-br from-[#120727]/65 to-[#05020a]/85 backdrop-blur-lg flex flex-col gap-6 w-full relative overflow-hidden shadow-[0_15px_35px_rgba(168,85,247,0.1)] animate-fade-in"
            >
              {/* spotlight in form */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-radial from-[#a855f7]/8 to-transparent blur-xl pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/20 to-transparent" />

              <div className="font-display text-base font-light text-white tracking-[0.1em] uppercase flex items-center gap-3 border-b border-[#a855f7]/15 pb-4 mb-2">
                <span>SEND US A MESSAGE <span className="text-[#a855f7]">|</span> أرسل لنا رسالة</span>
              </div>

              {submitted ? (
                <div className="py-16 text-center flex flex-col items-center justify-center gap-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#a855f7]/15 border border-[#a855f7]/30 flex items-center justify-center mb-2 animate-bounce">
                    <span className="font-body text-xs text-[#c084fc] font-bold">SENT</span>
                  </div>
                  <h3 className="font-display text-lg md:text-xl text-[#c084fc] uppercase tracking-wider">
                    MESSAGE SENT SUCCESSFULLY! <span className="text-white/50">|</span> تم إرسال رسالتك بنجاح!
                  </h3>
                  <div className="font-body text-zinc-300 text-xs md:text-sm font-light max-w-md leading-relaxed flex flex-col gap-2 mt-2">
                    <p>Thank you for reaching out. One of our elite engineers will contact you shortly to review your specifications.</p>
                    <p dir="rtl" className="text-[#c084fc]/80">شكراً لتواصلك معنا. سيقوم أحد مهندسينا بالتواصل معك قريباً جداً لمناقشة التفاصيل.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name Input */}
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="FULL NAME | الاسم الكريم"
                        className="w-full bg-[#030308]/60 backdrop-blur-[2px] border border-white/10 text-white placeholder-zinc-400 rounded-xl text-xs md:text-sm px-4 py-4 focus:outline-none focus:border-[#a855f7] focus:bg-[#030308]/90 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-white/20 transition-all duration-300 font-body"
                      />
                    </div>
 
                    {/* Email Address Input */}
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="EMAIL ADDRESS | البريد الإلكتروني"
                        className="w-full bg-[#030308]/60 backdrop-blur-[2px] border border-white/10 text-white placeholder-zinc-400 rounded-xl text-xs md:text-sm px-4 py-4 focus:outline-none focus:border-[#a855f7] focus:bg-[#030308]/90 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-white/20 transition-all duration-300 font-body"
                      />
                    </div>
                  </div>
 
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Phone Number Input */}
                    <div className="relative flex items-center">
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="PHONE NUMBER | رقم الهاتف"
                        className="w-full bg-[#030308]/60 backdrop-blur-[2px] border border-white/10 text-white placeholder-zinc-400 rounded-xl text-xs md:text-sm px-4 py-4 focus:outline-none focus:border-[#a855f7] focus:bg-[#030308]/90 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-white/20 transition-all duration-300 font-body"
                      />
                    </div>
 
                    {/* Subject Input */}
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="SUBJECT | الموضوع"
                        className="w-full bg-[#030308]/60 backdrop-blur-[2px] border border-white/10 text-white placeholder-zinc-400 rounded-xl text-xs md:text-sm px-4 py-4 focus:outline-none focus:border-[#a855f7] focus:bg-[#030308]/90 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-white/20 transition-all duration-300 font-body"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="relative flex items-start">
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="MESSAGE | تفاصيل مشروعك الإبداعي"
                      className="w-full bg-[#030308]/60 backdrop-blur-[2px] border border-white/10 text-white placeholder-zinc-400 rounded-xl text-xs md:text-sm px-4 py-4 focus:outline-none focus:border-[#a855f7] focus:bg-[#030308]/90 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-white/20 transition-all duration-300 font-body resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="cursor-pointer w-full bg-[#a855f7] hover:bg-[#a855f7]/90 text-white font-body text-xs font-bold tracking-[0.2em] uppercase py-4 rounded-xl shadow-[0_8px_30px_rgba(168,85,247,0.25)] hover:shadow-[0_12px_35px_rgba(168,85,247,0.45)] transition-all duration-500 flex items-center justify-center gap-2"
                  >
                    <span>SEND MESSAGE ➔</span>
                    <span className="opacity-40">|</span>
                    <span dir="rtl">إرسال الرسالة ➔</span>
                  </button>

                  <p className="font-body text-[9px] text-zinc-400 tracking-[0.05em] flex flex-wrap items-center gap-x-2 gap-y-1 justify-center mt-1">
                    <span>{enData.form.privacy}</span>
                    <span className="text-[#a855f7]/30">|</span>
                    <span dir="rtl">{arData.form.privacy}</span>
                  </p>
                </>
              )}
            </form>

            {/* WhatsApp VIP CTA Hook */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer border border-[#a855f7]/15 hover:border-[#a855f7]/35 bg-gradient-to-br from-[#120727]/60 to-[#05020a]/80 backdrop-blur-md hover:bg-[#120727]/80 p-5 rounded-2xl flex justify-between items-center group transition-all duration-500 hover:shadow-[0_15px_35px_rgba(168,85,247,0.12)]"
            >
              {/* top line glow */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/10 to-transparent" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#a855f7] fill-[#a855f7] drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] group-hover:text-green-400 group-hover:fill-green-400 group-hover:scale-110 transition-all duration-500 ease-out" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-11.597c-.148-.247-.543-.396-1.137-.693-.593-.298-3.505-1.73-4.049-1.928-.543-.198-.939-.297-1.334.297-.395.594-1.532 1.928-1.878 2.324-.346.396-.692.445-1.286.148-.593-.297-2.505-1.01-4.773-3.033-1.766-1.577-2.958-3.525-3.304-4.119-.346-.593-.037-.914.26-1.21.266-.268.593-.693.89-1.039.3-.346.396-.594.593-1.04.197-.445.099-.841-.049-1.138-.148-.297-1.334-3.21-1.829-4.4-.48-1.153-.967-.996-1.334-.996-.346-.003-.741-.003-1.137-.003-.396 0-1.039.148-1.582.742-.543.594-2.077 2.03-2.077 4.95 0 2.92 2.126 5.74 2.422 6.137.297.396 4.185 6.39 10.139 8.96 1.417.61 2.523.975 3.386 1.25.965.305 1.844.263 2.539.159.774-.116 2.378-.973 2.716-1.913.339-.94.339-1.748.238-1.913-.1-.165-.396-.264-.988-.562z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-[9px] font-bold text-[#a855f7] tracking-[0.2em] uppercase">CHAT ON WHATSAPP</span>
                    <span className="text-[#a855f7]/40 text-[9px]">|</span>
                    <span className="font-body text-[9px] font-bold text-[#a855f7]/90 tracking-[0.15em] uppercase" dir="rtl">تحدث معنا عبر الواتساب</span>
                  </div>
                  <div className="font-body text-white text-xs md:text-sm font-light mt-0.5 tracking-wider">
                    +968 9818 4233
                  </div>
                </div>
              </div>
              
              <div className="text-[#a855f7] transition-transform duration-300 group-hover:translate-x-2">
                <span className="text-xl">➔</span>
              </div>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}
