"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";

// Sourced from reliable Wikipedia links to avoid hotlink blocking during testing
const baseLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/3/3f/Boston_Consulting_Group_202x_logo.svg",
  "https://placehold.co/300x100/transparent/white?text=AMERICANA&font=montserrat",
  "https://upload.wikimedia.org/wikipedia/commons/9/9d/KPMG_logo.svg",
  "https://upload.wikimedia.org/wikipedia/en/b/bf/KFC_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/3/3e/Domino%27s_pizza_logo.svg",
];

const multipliedLogos = [
  ...baseLogos,
  ...baseLogos,
  ...baseLogos,
  ...baseLogos,
];

export default function HeroSection({ image, label, details }) {
  const [isContactOpen, setIsContactOpen] = useState(false); // Modal state added

  return (
    <>
      <section className="relative w-full min-h-[100vh] flex flex-col justify-center items-center overflow-hidden mb-8 md:mb-10">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={label || "Hero Background"}
            fill
            priority // EAGER LOAD: Critical for Hero sections to prevent LCP penalties
            sizes="100vw"
            quality={90}
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/75" />
        </div>

        <motion.div
          className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center mt-10 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {details.heroTag && (
            <span className="mb-2 md:mb-3 text-[#f9fafa] font-bold tracking-widest uppercase text-xs md:text-sm">
              {details.heroTag}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.2] md:leading-[1.1] mb-4 md:mb-6">
            {details.heroTitle || label}
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-[#e9efef] max-w-4xl font-medium md:font-semibold mx-auto leading-relaxed mb-8 md:mb-10 px-2 md:px-0">
            {details.overview}
          </p>

          <Button
            onClick={() => setIsContactOpen(true)}
            className="bg-white text-black hover:bg-gray-100 rounded-full px-6 md:px-8 h-10 md:h-12 text-xs md:text-[14px] font-semibold transition-transform hover:scale-105 duration-300"
          >
            {details.cta?.buttonText || "Book a Consultation"}
          </Button>
        </motion.div>

        {/* Trusted By & Carousel Section */}
        <div className="absolute bottom-6 md:bottom-10 left-0 w-full z-10 overflow-hidden flex flex-col gap-4 md:gap-6">
          <motion.div
            className="max-w-4xl mx-auto flex items-center justify-center gap-3 md:gap-4 px-4 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="h-[1px] bg-gradient-to-r from-transparent to-white/60 flex-1 max-w-[80px] md:max-w-[120px]" />
            <span className="text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase text-center">
              Trusted by several industries, enterprises and startups alike
            </span>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-white/60 flex-1 max-w-[80px] md:max-w-[120px]" />
          </motion.div>

          {/* Carousel Container */}
          {/* <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              className="flex w-max"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 50,
              }}
            >
              {/* Set 1 */}
          {/* <div className="flex gap-10 md:gap-16 pr-10 md:pr-16 items-center">
                {multipliedLogos.map((logo, index) => (
                  <Image
                    key={`set1-${index}`}
                    src={logo}
                    alt={`Client Logo ${index}`}
                    width={120}
                    height={40}
                    unoptimized // Bypasses server optimization for external SVGs
                    className="h-6 sm:h-7 md:h-9 w-auto max-w-[90px] md:max-w-[120px] object-contain opacity-50 brightness-0 invert hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                  />
                ))}
              </div> */}

          {/* Set 2: Exact Clone */}
          {/* <div className="flex gap-10 md:gap-16 pr-10 md:pr-16 items-center">
                {multipliedLogos.map((logo, index) => (
                  <Image
                    key={`set2-${index}`}
                    src={logo}
                    alt={`Client Logo Duplicate ${index}`}
                    width={120}
                    height={40}
                    unoptimized
                    className="h-6 sm:h-7 md:h-9 w-auto max-w-[90px] md:max-w-[120px] object-contain opacity-50 brightness-0 invert hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                  />
                ))}
              </div>
            </motion.div>
          </div> */}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          Modal Overlay for Contact Form
      ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto custom-scrollbar rounded-2xl shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-white transition-colors"
                aria-label="Close Contact Form"
              >
                <X className="w-5 h-5" />
              </button>

              <ContactForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
