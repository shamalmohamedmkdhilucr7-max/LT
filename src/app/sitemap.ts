import { MetadataRoute } from "next";
import { servicesData } from "../constants/content";

const BASE_URL = "https://lighttoweroman.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Core landing pages (EN & AR) ──────────────────────────────────────────
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          ar: `${BASE_URL}/ar`,
        },
      },
    },
    {
      url: `${BASE_URL}/ar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          ar: `${BASE_URL}/ar`,
        },
      },
    },
  ];

  // ── Dynamic service pages (EN & AR) ───────────────────────────────────────
  servicesData.forEach((service) => {
    routes.push({
      url: `${BASE_URL}/en/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/services/${service.slug}`,
          ar: `${BASE_URL}/ar/services/${service.slug}`,
        },
      },
    });
    routes.push({
      url: `${BASE_URL}/ar/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/services/${service.slug}`,
          ar: `${BASE_URL}/ar/services/${service.slug}`,
        },
      },
    });
  });

  return routes;
}
