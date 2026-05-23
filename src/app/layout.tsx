import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://lighttoweroman.com'),
  title: {
    default: 'Light Tower Illumination | Premier LED Facade & Architectural Lighting — Oman & GCC',
    template: '%s | Light Tower Illumination',
  },
  description: 'Light Tower Illumination — 26 years of world-class LED facade, architectural, and event lighting solutions across Oman and the GCC. Trusted by governments and private enterprises.',
  applicationName: 'Light Tower Illumination',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    siteName: 'Light Tower Illumination',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
