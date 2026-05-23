import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Light Tower Illumination — Premier LED Facade & Architectural Lighting",
    short_name: "Light Tower",
    description:
      "Light Tower Illumination — 26 years of world-class LED facade, architectural, and event lighting across Oman and the GCC.",
    start_url: "/en",
    display: "standalone",
    background_color: "#030308",
    theme_color: "#a855f7",
    orientation: "portrait-primary",
    categories: ["business", "lighting", "architecture"],
    lang: "en",
    dir: "ltr",
    scope: "/",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Our Services",
        short_name: "Services",
        description: "Explore LED facade and architectural lighting services",
        url: "/en#services",
        icons: [{ src: "/icon.png", sizes: "96x96" }],
      },
      {
        name: "Contact Us",
        short_name: "Contact",
        description: "Get in touch with Light Tower Illumination",
        url: "/en#contact",
        icons: [{ src: "/icon.png", sizes: "96x96" }],
      },
    ],
  };
}
