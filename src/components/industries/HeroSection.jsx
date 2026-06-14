"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  ChevronRight,
  Activity,
  GraduationCap,
  Landmark,
  Vote,
  ShoppingCart,
  Utensils,
  Ticket,
  MessageSquare,
  Zap,
  Sprout,
  Building2,
  Share2,
  Cpu,
  X,
} from "lucide-react";

import ContactForm from "@/components/ContactForm";

const iconMap = {
  Activity,
  GraduationCap,
  Landmark,
  Vote,
  ShoppingCart,
  Utensils,
  Ticket,
  MessageSquare,
  Zap,
  Sprout,
  Building2,
  Share2,
  Cpu,
};

export default function HeroSection({ industry, meta, iconName }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const IconComponent = iconMap[iconName] ?? Building2;
  const { label, image, details, category } = industry;

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full min-h-[100svh] flex flex-col justify-end sm:justify-center overflow-hidden mb-8 md:mb-10 pt-24 sm:pt-28 lg:pt-24 pb-10 sm:pb-0"
      >
        {/* Parallax background image */}
        <div className="absolute inset-0 z-0">
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 w-full h-[110%]"
          >
            <Image
              src={image}
              alt={label || "Hero Background"}
              fill
              priority
              sizes="100vw"
              quality={85}
              className="object-cover opacity-100"
            />
          </motion.div>
          {/* Stronger left gradient on mobile so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 sm:from-black/50 sm:via-black/30 sm:to-black/7" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 sm:from-black/16 sm:to-black/50" />
        </div>

        {/* ── Copy ─────────────────────────────────── */}
        <div className="relative z-10 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-start text-left">
          {/* Hero tag pill */}
          {(details.heroTag ?? category) && (
            <motion.span
              className={`inline-flex items-center gap-1.5 mb-3 md:mb-4 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase ${meta.bgColor} ${meta.color} border ${meta.borderColor}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <IconComponent className="w-3 h-3" />
              {details.heroTag ?? category}
            </motion.span>
          )}

          {/* Heading */}
          <motion.h1
            className="text-[clamp(1.75rem,6vw,3.75rem)] text-white tracking-tight leading-[1.08] mb-4 md:mb-6 max-w-[90vw] sm:max-w-2xl md:max-w-3xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {details.heroTitleLight ? (
              <>
                <span className="font-light block">
                  {details.heroTitleLight}
                </span>
                <span className="font-black block">
                  {details.heroTitleBold}
                </span>
                {details.heroTitleEnd && (
                  <span className="font-light block">
                    {details.heroTitleEnd}
                  </span>
                )}
              </>
            ) : (
              <span className="font-semibold">
                {details.heroTitle ?? label}
              </span>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-sm md:text-[15px] text-white/70 w-full max-w-[90vw] sm:max-w-xl md:max-w-2xl font-normal leading-relaxed mb-7 md:mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            {details.overview}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-white text-black hover:bg-white/90 rounded-full px-6 sm:px-7 h-10 sm:h-11 md:h-12 text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-md gap-2"
            >
              {details.cta?.buttonText || "Start a Project"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Modal ───────────────────────── */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.97, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 40 }}
              className="relative w-full sm:max-w-6xl max-h-[92svh] sm:max-h-[95vh] overflow-y-auto custom-scrollbar rounded-t-2xl sm:rounded-2xl shadow-2xl"
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-white transition-colors"
                aria-label="Close Contact Form"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <ContactForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
