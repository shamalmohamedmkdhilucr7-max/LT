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
                  <svg className="w-6 h-6 text-[#a855f7] fill-current drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] group-hover:text-green-400 group-hover:scale-110 transition-all duration-500 ease-out" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
