import { MetadataRoute } from "next";
import { servicesData } from "../constants/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lighttoweroman.com";
  
  // Core landing pages in EN and AR
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Dynamic regional service routes in EN and AR
  servicesData.forEach((service) => {
    routes.push({
      url: `${baseUrl}/en/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
    routes.push({
      url: `${baseUrl}/ar/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return routes;
}
