import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Light Tower Illumination",
  description:
    "The page you are looking for could not be found. Return to Light Tower Illumination — Oman's premier LED facade and architectural lighting specialists.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-[#030308] text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ fontFamily: "system-ui, sans-serif" }}>
        {/* Background ambient glows */}
        <div
          className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full blur-[140px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] rounded-full blur-[160px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        {/* 404 content */}
        <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-2xl mx-auto">

          {/* Logo / Brand */}
          <div className="mb-8 flex items-center gap-3 opacity-70">
            <div className="w-8 h-8 rounded-full border border-[#a855f7]/50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#a855f7]" />
            </div>
            <span className="text-sm uppercase tracking-[0.3em] text-[#a855f7] font-semibold">
              Light Tower Illumination
            </span>
          </div>

          {/* 404 number */}
          <div className="relative mb-6">
            <span
              className="text-[120px] md:text-[180px] font-light leading-none select-none"
              style={{
                fontFamily: "Georgia, serif",
                background: "linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: 0.85,
              }}
              aria-hidden="true"
            >
              404
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Page Not Found
          </h1>

          {/* Divider */}
          <div className="w-24 h-px mb-6" style={{ background: "linear-gradient(90deg, transparent, #a855f7, transparent)" }} />

          {/* Description */}
          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed mb-10 max-w-md">
            The page you&apos;re looking for has been moved, deleted, or doesn&apos;t exist.
            Let us guide you back to the light.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              href="/en"
              className="px-8 py-3.5 border border-[#a855f7] bg-[#a855f7]/15 text-white text-xs font-semibold uppercase tracking-[0.22em] hover:bg-[#a855f7]/30 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-400 backdrop-blur-sm"
            >
              Return Home
            </Link>
            <Link
              href="/en#services"
              className="px-8 py-3.5 border border-zinc-700 text-zinc-300 text-xs font-semibold uppercase tracking-[0.22em] hover:border-[#a855f7]/50 hover:text-white transition-all duration-400"
            >
              Our Services
            </Link>
          </div>

          {/* Location tag */}
          <p className="mt-12 text-[10px] uppercase tracking-[0.35em] text-zinc-600">
            Muscat, Oman · Est. 1998 · Serving GCC
          </p>
        </main>
      </body>
    </html>
  );
}
