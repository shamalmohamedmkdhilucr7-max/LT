import React from 'react';
import { DM_Sans, Cormorant_Garamond, Cairo } from 'next/font/google';
import '../globals.css';
import CookieConsent from '../../components/cookie-consent';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
});

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${dmSans.variable} ${cormorant.variable} ${cairo.variable} bg-[#06060c] text-white antialiased overflow-x-hidden`}
      >
        <svg className="noise" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100vw', height: '100vh' }}>
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        {children}
        <CookieConsent locale={locale as "en" | "ar"} />
      </body>
    </html>
  );
}
