"use client";

import React, { useState, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Lazy-load ContactForm — only fetched when the modal is first opened ──────
// This removes ContactForm's entire JS bundle from the initial page load.
const ContactForm = lazy(() => import("@/components/ContactForm"));

// ─── Animation constants — all hoisted, zero new objects per render ───────────
const INITIAL_UP12 = { opacity: 0, y: 12 };
const ANIMATE_IN = { opacity: 1, y: 0 };
const TRANSITION_CTA = { duration: 0.5, ease: "easeOut", delay: 0.2 };

const OVERLAY_INITIAL = { opacity: 0 };
const OVERLAY_ANIMATE = { opacity: 1 };
const OVERLAY_EXIT = { opacity: 0 };

const MODAL_INITIAL = { scale: 0.95, opacity: 0 };
const MODAL_ANIMATE = { scale: 1, opacity: 1 };
const MODAL_EXIT = { scale: 0.95, opacity: 0 };

// ─── ProjectHero ──────────────────────────────────────────────────────────────
export default function ProjectHero({ title, category, heroImage, shortDesc }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  // ✅ Stable references — no new arrow functions created on each render
  const openContact = useCallback(() => setIsContactOpen(true), []);
  const closeContact = useCallback(() => setIsContactOpen(false), []);

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-10 mt-10">
        <Image
          src={heroImage}
          alt={`${title} hero`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-slate-400/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/7 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/7 via-transparent to-black/70" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto pt-32">
          {category && (
            <span className="mb-4 inline-block text-xs font-semibold tracking-widest uppercase text-white/60 border border-white/20 rounded-full px-4 py-1">
              {category}
            </span>
          )}

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold leading-tight text-white drop-shadow-2xl">
            {title}
          </h1>

          {shortDesc && (
            <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-2xl font-light leading-relaxed drop-shadow-md">
              {shortDesc}
            </p>
          )}

          <motion.div
            className="mt-6"
            initial={INITIAL_UP12}
            animate={ANIMATE_IN}
            transition={TRANSITION_CTA}
          >
            <Button
              size="lg"
              onClick={openContact}
              className="bg-white text-black hover:bg-white/90 rounded-full px-7 h-11 md:h-12 text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-md gap-2"
            >
              Expand Your Business with Us
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          <div className="w-24 h-[1px] bg-gray-500/50 mt-10" />
        </div>
      </div>

      {/* ── Contact Modal ── */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={OVERLAY_INITIAL}
            animate={OVERLAY_ANIMATE}
            exit={OVERLAY_EXIT}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={MODAL_INITIAL}
              animate={MODAL_ANIMATE}
              exit={MODAL_EXIT}
              className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto custom-scrollbar rounded-2xl shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={closeContact}
                className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-white transition-colors"
                aria-label="Close Contact Form"
              >
                <X className="w-5 h-5" />
              </button>

              {/* ✅ Suspense wrapper required for lazy() — shows nothing while
                  ContactForm's chunk loads (it's fast, no spinner needed) */}
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
