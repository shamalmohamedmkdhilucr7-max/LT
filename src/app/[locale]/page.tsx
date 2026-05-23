import React from "react";
import { notFound } from "next/navigation";
import { localizationContent, servicesData } from "../../constants/content";

// Component imports
import Preloader from "../../components/preloader";
import Navbar from "../../components/navbar";
import HeroSequence from "../../components/hero-sequence";
import AboutSection from "../../components/about-section";
import ServicesSection from "../../components/services-section";
import PortfolioSection from "../../components/portfolio-section";
import ContactSection from "../../components/contact-section";
import Footer from "../../components/footer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const supportedLocales = ["en", "ar"];

// Next.js dynamic metadata generation for top-tier SEO crawling
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!supportedLocales.includes(locale)) return {};

  const currentLocale = locale === "ar" ? "ar" : "en";
  const meta = localizationContent[currentLocale].meta;

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL("https://lighttoweroman.com"),
    alternates: {
      canonical: `/${currentLocale}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${currentLocale}`,
      siteName: "Light Tower Illumination",
      images: [
        {
          url: "/images/about-building.webp",
          width: 1200,
          height: 630,
          alt: "Light Tower Illumination",
        },
      ],
      locale: currentLocale === "ar" ? "ar_AR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/images/about-building.webp"],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  // Validate locale parameter safety
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  const currentLocale = locale === "ar" ? "ar" : "en";
  const data = localizationContent[currentLocale];

  // Pre-curated premium selection of 16 key images (2 from each of the 8 services) to optimize load speed and focus the gallery
  const imageFilenames: string[] = [
    "image (1).png", "image (2).png",   // Commercial Buildings
    "image (8).png", "image (9).png",   // Festive Markets
    "image (15).png", "image (16).png", // Outlet Stores
    "image (22).png", "image (23).png", // Ramadan & Calligraphy
    "image (29).png", "image (30).png", // Shopping Centers
    "image (36).png", "image (37).png", // Towns & Cities
    "image (43).png", "image (44).png", // Weddings & Ceremonies
    "image (50).png", "image (51).png"  // Event Lighting
  ];

  // Structural Local Business JSON-LD Schema to boost localized GCC rankings
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Light Tower Illumination",
    "image": "https://lighttoweroman.com/images/about-building.webp",
    "@id": "https://lighttoweroman.com",
    "url": "https://lighttoweroman.com",
    "telephone": "+968 98184233",
    "email": "ltillumination06@gmail.com",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Po. Box. No.125, 316 Postal Code, Mussannah, Al Maabela",
      "addressLocality": "Mussannah",
      "addressRegion": "Al Batinah",
      "addressCountry": "OM"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.7915,
      "longitude": 57.8188
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://wa.me/96898184233"
    ]
  };

  return (
    <>
      {/* Inject Structured Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Interactive Layout Wrappers & Preloader */}
      <Preloader locale={currentLocale} />
      <Navbar locale={currentLocale} navData={data.nav} />

      <main>
        {/* Apple-style hero canvas frame sequence */}
        <HeroSequence locale={currentLocale} heroData={data.hero} />

        <div className="light-bg-section relative overflow-hidden animate-fadeIn">
          {/* Subtle sovereign palace background watermark overlay for About section using image (60).png — shifted left for perfect alignment */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
            <div 
              className="absolute top-[2%] left-[1%] md:left-[3vw] w-[85vw] md:w-[70vw] h-[65vh] max-w-[950px] opacity-[0.035] mix-blend-screen bg-no-repeat bg-left bg-contain"
              style={{ backgroundImage: 'url("/images/Gallery%20and%20portfolio/image%20(60).png")' }}
            />
          </div>

          {/* Interactive purple mesh gradients */}
          <div 
            className="absolute top-[5%] left-[5%] w-[50vw] h-[50vw] max-w-[650px] rounded-full blur-[160px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.32) 0%, transparent 70%)' }}
          />
          <div 
            className="absolute top-[35%] right-[5%] w-[45vw] h-[45vw] max-w-[550px] rounded-full blur-[170px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, transparent 70%)' }}
          />
          <div 
            className="absolute bottom-[20%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] rounded-full blur-[150px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(192, 132, 252, 0.26) 0%, transparent 70%)' }}
          />
          
          {/* Transition gradient from dark hero to light background */}
          <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-[#030308] to-transparent pointer-events-none z-[1]" />

          {/* Localized detailed About section */}
          <AboutSection locale={currentLocale} aboutData={data.about} foundersData={data.founders} />

          {/* Premium Service grid */}
          <ServicesSection
            locale={currentLocale}
            servicesData={servicesData}
          />

          {/* Premium Gallery & Portfolio Section */}
          <PortfolioSection locale={currentLocale} />

          {/* Fully managed responsive Contact lead form */}
          <ContactSection locale={currentLocale} contactData={data.contact} />
        </div>
      </main>

      {/* Global copyright footer */}
      <Footer locale={currentLocale} />
    </>
  );
}
