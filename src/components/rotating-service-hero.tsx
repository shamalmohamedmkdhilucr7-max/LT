"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingServiceHeroProps {
  galleryImages: string[];
  defaultImage: string;
}

export default function RotatingServiceHero({ galleryImages, defaultImage }: RotatingServiceHeroProps) {
  const [index, setIndex] = useState(0);

  // Construct complete array of image paths: include default cover image + gallery images
  const images = [
    defaultImage,
    ...(galleryImages || []).map((img) => `/images/Gallery and portfolio/${img}`)
  ];

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ backgroundImage: `url("${images[index]}")` }}
          className="absolute inset-0 bg-cover bg-center scale-105 filter brightness-[0.45] saturate-[0.8]"
        />
      </AnimatePresence>
    </div>
  );
}
