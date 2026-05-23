import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { servicesData, localizationContent } from "../../../../constants/content";

// Component imports
import Navbar from "../../../../components/navbar";
import Footer from "../../../../components/footer";
import ServiceGallery from "../../../../components/service-gallery";
import RotatingServiceHero from "../../../../components/rotating-service-hero";

interface ServicePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Generate static routes at build time
export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  const locales = ["en", "ar"];

  locales.forEach((locale) => {
    servicesData.forEach((service) => {
      params.push({
        locale,
        slug: service.slug,
      });
    });
  });

  return params;
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return {};

  const currentLocale = locale === "ar" ? "ar" : "en";
  const title = currentLocale === "ar" 
    ? `${service.arabicTitle} | لايت تاور للإضاءة` 
    : `${service.title} | Light Tower Illumination`;
  const description = currentLocale === "ar" ? service.arabicDescription : service.description;

  return {
    title,
    description,
    metadataBase: new URL("https://lighttoweroman.com"),
    alternates: {
      canonical: `/${currentLocale}/services/${slug}`,
      languages: {
        en: `/en/services/${slug}`,
        ar: `/ar/services/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${currentLocale}/services/${slug}`,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const currentLocale = locale === "ar" ? "ar" : "en";
  const navData = localizationContent[currentLocale].nav;

  const title = currentLocale === "ar" ? service.arabicTitle : service.title;

  // JSON-LD Service Schema
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "description": currentLocale === "ar" ? service.arabicDescription : service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Light Tower Illumination",
      "telephone": "+968 98184233",
      "email": "ltillumination06@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Po. Box. No.125, 316 Postal Code, Mussannah, Al Maabela",
        "addressLocality": "Sultanate of Oman",
        "addressCountry": "OM"
      }
    },
    "areaServed": "GCC",
    "serviceType": "Architectural Illumination"
  };

  // JSON-LD BreadcrumbList Schema for Google Search Snippets
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": currentLocale === "ar" ? "الرئيسية" : "Home",
        "item": `https://lighttoweroman.com/${currentLocale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": `https://lighttoweroman.com/${currentLocale}/services/${slug}`
      }
    ]
  };

  return (
    <>
      {/* Inject Structured Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar locale={currentLocale} navData={navData} />

      <main className="min-h-screen bg-[#030308] text-white">
        
        {/* Hero with Service Title */}
        <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <RotatingServiceHero galleryImages={service.galleryImages} defaultImage={service.image} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/60 via-[#030308]/40 to-[#030308] z-1" />
          <div className="absolute inset-0 bg-radial from-[#a855f7]/10 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-[900px] text-center px-6 mt-16 flex flex-col items-center">
            
            {/* Back link */}
            <Link
              href={`/${currentLocale}#services`}
              className="cursor-pointer font-body text-[10px] font-bold text-[#a855f7] hover:text-white tracking-[0.25em] uppercase mb-6 flex items-center gap-2 border border-[#a855f7]/20 hover:border-[#a855f7] px-4 py-2 rounded-lg bg-[#030308]/50 backdrop-blur-md transition-all duration-300"
            >
              {currentLocale === "ar" ? (
                <>→ العودة للرئيسية</>
              ) : (
                <>← BACK TO HOMEPAGE</>
              )}
            </Link>

            <h1 className="font-display text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.08em] uppercase leading-tight mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {title}
            </h1>
            
            <div className="w-[100px] h-[1px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent mt-4" />
          </div>
        </section>

        {/* PHOTOS ONLY — Gallery Grid */}
        <ServiceGallery
          locale={currentLocale}
          galleryImages={service.galleryImages}
          serviceTitle={title}
        />

      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
