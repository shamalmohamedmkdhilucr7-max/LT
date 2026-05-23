import React from 'react';
import type { Metadata } from 'next';
import { DM_Sans, Cormorant_Garamond, Cairo } from 'next/font/google';
import '../globals.css';
import CookieConsent from '../../components/cookie-consent';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
  preload: false, // Only needed for Arabic locale
});

export const metadata: Metadata = {
  other: {
    // Oman & GCC Local SEO geo meta tags
    'geo.region': 'OM-MA',
    'geo.placename': 'Muscat, Sultanate of Oman',
    'geo.position': '23.7915;57.8188',
    'ICBM': '23.7915, 57.8188',
  },
};

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
    <html lang={locale} dir={dir} className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* DNS Prefetch & Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Theme color for mobile browser chrome */}
        <meta name="theme-color" content="#a855f7" />
        <meta name="msapplication-TileColor" content="#030308" />
        {/* Mobile web app */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Light Tower" />

        {/* Blocking script to instantly hide preloader if session says it has loaded, preventing page flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && sessionStorage.getItem('hasLoadedLightTower')) {
                var style = document.createElement('style');
                style.id = 'preloader-bypass-style';
                style.innerHTML = '#global-preloader { display: none !important; }';
                document.head.appendChild(style);
              }
            `,
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${cormorant.variable} ${cairo.variable} bg-[#06060c] text-white antialiased overflow-x-hidden`}
      >
        {/* Skip to main content — Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:bg-[#a855f7] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-body focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        {/* Decorative noise texture — hidden from screen readers */}
        <svg className="noise" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: 'block', width: '100vw', height: '100vh' }}>
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
