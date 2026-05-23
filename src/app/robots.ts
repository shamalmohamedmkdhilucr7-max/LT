import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All crawlers: allow site, block internal paths
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/*.json$",
        ],
      },
      {
        // Googlebot: unrestricted for maximum crawling
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/_next/"],
      },
      {
        // Bingbot: allow full crawl
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/_next/"],
      },
    ],
    sitemap: "https://lighttoweroman.com/sitemap.xml",
    host: "https://lighttoweroman.com",
  };
}
