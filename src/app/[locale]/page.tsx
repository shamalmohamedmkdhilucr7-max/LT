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

// ── Dynamic metadata for top-tier SEO crawling ────────────────────────────────
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!supportedLocales.includes(locale)) return {};

  const currentLocale = locale === "ar" ? "ar" : "en";
  const meta = localizationContent[currentLocale].meta;
  const isAr = currentLocale === "ar";

  return {
    title: meta.title,
    description: meta.description,
    keywords: isAr
      ? "إضاءة معمارية عُمان، إضاءة واجهات مسقط، إضاءة LED الخليج، إضاءة المباني التجارية، إضاءة الفعاليات الملكية، لايت تاور للإضاءة، إضاءة ليلية مسقط، تركيب الإضاءة سلطنة عُمان"
      : "LED facade lighting Oman, architectural lighting Muscat, LED building illumination GCC, premium lighting solutions Oman, event lighting Middle East, Light Tower Illumination, commercial LED lighting Oman, royal event lighting GCC, facade LED display Muscat, architectural lighting company Oman",
    metadataBase: new URL("https://lighttoweroman.com"),
    alternates: {
      canonical: `https://lighttoweroman.com/${currentLocale}`,
      languages: {
        en: "https://lighttoweroman.com/en",
        ar: "https://lighttoweroman.com/ar",
        "x-default": "https://lighttoweroman.com/en",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://lighttoweroman.com/${currentLocale}`,
      siteName: "Light Tower Illumination",
      images: [
        {
          url: "https://lighttoweroman.com/images/about-building.webp",
          width: 1200,
          height: 630,
          alt: isAr
            ? "لايت تاور للإضاءة — خبراء الإضاءة المعمارية في عُمان والخليج"
            : "Light Tower Illumination — Premier LED Facade & Architectural Lighting in Oman & GCC",
          type: "image/webp",
        },
      ],
      locale: isAr ? "ar_AR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["https://lighttoweroman.com/images/about-building.webp"],
      site: "@lighttoweroman",
      creator: "@lighttoweroman",
    },
  };
}

// ── Page Component ─────────────────────────────────────────────────────────────
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  const currentLocale = locale === "ar" ? "ar" : "en";
  const data = localizationContent[currentLocale];
  const isAr = currentLocale === "ar";

  // ── JSON-LD: LocalBusiness (enriched for Oman local SEO) ──────────────────
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://lighttoweroman.com",
    name: "Light Tower Illumination",
    alternateName: ["Light Tower Lighting Trade", "لايت تاور للإضاءة", "LIGHT TOWER ILLUMINATION"],
    description:
      "Premier LED facade, architectural, and event lighting specialists in Oman and the GCC. Over 26 years serving governments, royal ceremonies, and commercial landmarks.",
    slogan: "Delivering Happiness, Charm & Satisfaction",
    foundingDate: "1998",
    image: [
      "https://lighttoweroman.com/images/about-building.webp",
      "https://lighttoweroman.com/images/logo-transparent.png",
    ],
    logo: "https://lighttoweroman.com/images/logo-transparent.png",
    url: "https://lighttoweroman.com",
    telephone: "+96898184233",
    email: "ltillumination06@gmail.com",
    priceRange: "$$$",
    currenciesAccepted: "OMR, USD, AED, SAR",
    paymentAccepted: "Cash, Bank Transfer, Cheque",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Po. Box. No.125, 316 Postal Code, Mussannah, Al Maabela",
      addressLocality: "Muscat",
      addressRegion: "Al Batinah",
      postalCode: "316",
      addressCountry: "OM",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.7915,
      longitude: 57.8188,
    },
    hasMap: "https://maps.google.com/?q=23.7915,57.8188",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Oman" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Kuwait" },
      { "@type": "Country", name: "Bahrain" },
      { "@type": "Country", name: "Qatar" },
    ],
    knowsAbout: [
      "LED facade lighting",
      "architectural lighting",
      "building illumination",
      "event lighting",
      "royal ceremony lighting",
      "festive lighting",
      "outdoor LED display",
      "commercial lighting solutions",
      "Ramadan lighting",
      "National Day lighting",
    ],
    sameAs: ["https://wa.me/96898184233"],
  };

  // ── JSON-LD: Organization ──────────────────────────────────────────────────
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://lighttoweroman.com/#organization",
    name: "Light Tower Illumination",
    url: "https://lighttoweroman.com",
    logo: {
      "@type": "ImageObject",
      url: "https://lighttoweroman.com/images/logo-transparent.png",
      width: 512,
      height: 512,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+96898184233",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
      areaServed: "GCC",
    },
    foundingDate: "1998",
    numberOfEmployees: { "@type": "QuantitativeValue", value: "10-50" },
  };

  // ── JSON-LD: WebSite with SearchAction ────────────────────────────────────
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://lighttoweroman.com/#website",
    name: "Light Tower Illumination",
    url: "https://lighttoweroman.com",
    inLanguage: ["en", "ar"],
    publisher: { "@id": "https://lighttoweroman.com/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://lighttoweroman.com/en/services/{search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // ── JSON-LD: ItemList of Services for Google Rich Results ─────────────────
  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isAr ? "خدمات لايت تاور للإضاءة" : "Light Tower Illumination Services",
    url: `https://lighttoweroman.com/${currentLocale}`,
    numberOfItems: servicesData.length,
    itemListElement: servicesData.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: isAr ? service.arabicTitle : service.title,
      url: `https://lighttoweroman.com/${currentLocale}/services/${service.slug}`,
    })),
  };

  return (
    <>
      {/* Structured Schema Markup — Multiple schemas for rich Google results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }}
      />

      {/* Preloader & Navbar */}
      <Preloader locale={currentLocale} />
      <Navbar locale={currentLocale} navData={data.nav} />

      <main id="main-content">
        {/* Apple-style hero canvas frame sequence */}
        <HeroSequence locale={currentLocale} heroData={data.hero} />

        <div className="light-bg-section relative overflow-hidden animate-fadeIn">
          {/* Subtle sovereign palace background watermark */}
          <div
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
            aria-hidden="true"
          >
            <div
              className="absolute top-[2%] left-[1%] md:left-[3vw] w-[85vw] md:w-[70vw] h-[65vh] max-w-[950px] opacity-[0.035] mix-blend-screen bg-no-repeat bg-left bg-contain"
              style={{ backgroundImage: 'url("/images/Gallery%20and%20portfolio/image%20(60).png")' }}
            />
          </div>

          {/* Purple mesh gradients */}
          <div
            className="absolute top-[5%] left-[5%] w-[50vw] h-[50vw] max-w-[650px] rounded-full blur-[160px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(168, 85, 247, 0.32) 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute top-[35%] right-[5%] w-[45vw] h-[45vw] max-w-[550px] rounded-full blur-[170px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-[20%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] rounded-full blur-[150px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(192, 132, 252, 0.26) 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          {/* Transition gradient from dark hero */}
          <div
            className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-[#030308] to-transparent pointer-events-none z-[1]"
            aria-hidden="true"
          />

          <AboutSection locale={currentLocale} aboutData={data.about} foundersData={data.founders} />
          <ServicesSection locale={currentLocale} servicesData={servicesData} />
          <PortfolioSection locale={currentLocale} />
          <ContactSection locale={currentLocale} contactData={data.contact} />
        </div>
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
