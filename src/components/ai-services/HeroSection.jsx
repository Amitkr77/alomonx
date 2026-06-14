"use client";

import React, { useRef, memo, useState } from "react";
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
  Bot,
  GitBranch,
  Mic2,
  Sparkles,
  Search,
  TrendingUp,
  Cpu,
  Eye,
  Building2,
  Workflow,
  BrainCircuit,
  X,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

// --- Constants (module-scope — never recreated) ---
const ICON_MAP = {
  Bot,
  GitBranch,
  Mic2,
  Sparkles,
  Search,
  TrendingUp,
  Cpu,
  Eye,
  Building2,
  Workflow,
  BrainCircuit,
};

const SCROLL_OFFSET = ["start start", "end start"];
const PARALLAX_INPUT = [0, 1]; // numbers, not strings
const PARALLAX_OUTPUT = ["0%", "20%"]; // kept as % strings for CSS transform

// Stable transition objects — Framer Motion skips diffing when reference is identical
const TRANSITION_TAG = { duration: 0.4, delay: 0.1 };
const TRANSITION_TITLE = {
  duration: 0.65,
  delay: 0.15,
  ease: [0.22, 1, 0.36, 1],
};
const TRANSITION_TAG2 = { duration: 0.5, delay: 0.22 };
const TRANSITION_BODY = { duration: 0.5, delay: 0.28 };
const TRANSITION_CTA = { duration: 0.4, delay: 0.4 };

// Stable initial states
const INITIAL_UP10 = { opacity: 0, y: -10 };
const INITIAL_UP28 = { opacity: 0, y: 28 };
const INITIAL_UP16 = { opacity: 0, y: 16 };
const INITIAL_UP12 = { opacity: 0, y: 12 };
const ANIMATE_IN = { opacity: 1, y: 0 };

const HeroSection = memo(function HeroSection({
  service,
  details,
  meta,
  isPriority = true,
}) {
  const [isContactOpen, setIsContactOpen] = useState(false); // Modal state added

  const { label, category, image, icon } = service;

  // Resolve icon once — fallback to Bot if key missing
  const IconComponent = ICON_MAP[icon] ?? Bot;

  // Destructure meta once to avoid repeated property lookups in JSX
  const { bgColor, color, borderColor } = meta;

  // Pre-resolve CTA text before JSX
  const ctaText = details.cta?.buttonText || "Start a Project";

  // --- Parallax ---
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: SCROLL_OFFSET,
  });
  const imageY = useTransform(scrollYProgress, PARALLAX_INPUT, PARALLAX_OUTPUT);

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full min-h-[100vh] flex flex-col justify-center overflow-hidden pt-12 md:pt-28 lg:pt-24 mt-10"
      >
        {/* Parallax background image */}
        <div className="absolute inset-0 z-0">
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 w-full h-[110%]"
          >
            <Image
              src={image}
              alt={label || "AI Service Background"}
              fill
              priority={isPriority} // eager for hero, lazy if below fold
              sizes="100vw"
              // quality defaults to 75 — sufficient for full-bleed BG, saves ~40% payload
              // restore quality={100} only if pixelation is visible at target screen sizes
              className="object-cover opacity-100"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>

        {/* Left-aligned copy */}
        <div className="relative z-10 w-full max-w-8xl mx-auto px-7 sm:px-8 lg:px-12 flex flex-col items-start text-left">
          {/* Hero tag pill */}
          <motion.span
            className={`inline-flex items-center gap-1.5 mb-4 md:mb-5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-sm ${bgColor} ${color} border ${borderColor}`}
            initial={INITIAL_UP10}
            animate={ANIMATE_IN}
            transition={TRANSITION_TAG}
          >
            <IconComponent className="w-3 h-3" />
            {category}
          </motion.span>

          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-tight leading-[1.10] mb-5 md:mb-6 max-w-3xl"
            initial={INITIAL_UP28}
            animate={ANIMATE_IN}
            transition={TRANSITION_TITLE}
          >
            {label}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className={`text-md md:text-md font-medium ${color} mb-3`}
            initial={INITIAL_UP16}
            animate={ANIMATE_IN}
            transition={TRANSITION_TAG2}
          >
            {details.tagline}
          </motion.p>

          {/* Overview */}
          <motion.p
            className="text-xs md:text-sm text-white/70 max-w-2xl font-normal leading-relaxed mb-8 md:mb-10"
            initial={INITIAL_UP16}
            animate={ANIMATE_IN}
            transition={TRANSITION_BODY}
          >
            {details.overview}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={INITIAL_UP12}
            animate={ANIMATE_IN}
            transition={TRANSITION_CTA}
          >
            <Button
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-white text-black hover:bg-white/90 rounded-full px-7 h-11 md:h-12 text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-md gap-2"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
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
});

export default HeroSection;
