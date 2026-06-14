"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, ShieldCheck, Cpu, X } from "lucide-react";
import ContactForm from "@/components/ContactForm";

// ─── Animation variants (defined once at module level, never re-created) ──────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Reduced-motion safe version — only fades, no translate
const fadeOnly = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// Static visible state — used when reduced motion is preferred so Framer
// skips all animation work entirely and just renders the final state.
const VISIBLE = "visible";
const HIDDEN = "hidden";

// ─── Component ────────────────────────────────────────────────────────────────
export default function AboutHero({ data }) {
  const [isContactOpen, setIsContactOpen] = useState(false); // Modal state added

  if (!data) return null;

  // Respect the OS-level "Reduce Motion" accessibility preference.
  // When true, we skip translate animations and disable the ping/spin.
  const shouldReduceMotion = useReducedMotion();

  const { eyebrow, headline, accentLine, subtext, image } = data;

  // Choose variant set based on motion preference
  const itemVariant = shouldReduceMotion ? fadeOnly : fadeUp;

  return (
    <>
      <section className="bg-[#050505] min-h-screen pt-7 flex items-center justify-center font-sans text-white overflow-hidden">
        {/* Main Floating Canvas */}
        <div className="relative w-full max-w-[1600px] bg-black rounded-[1rem] sm:rounded-[2rem] border border-white/10 overflow-hidden flex flex-col lg:flex-row shadow-[0_0_100px_rgba(255,255,255,0.03)] min-h-[calc(100vh-4rem)]">
          <div className="absolute top-0 left-0 w-full lg:w-1/2 h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black z-0 pointer-events-none" />

          {/* LEFT COLUMN: Typography & CTA
              whileInView + once:true means Framer only runs the animation once,
              when this element first scrolls into the viewport — not eagerly on
              mount when the section may be off-screen. */}
          <motion.div
            className="w-full lg:w-[55%] h-full flex flex-col justify-center p-8 sm:p-16 lg:p-20 xl:p-24 z-10 relative"
            initial={HIDDEN}
            whileInView={VISIBLE}
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {/* Eyebrow Pill */}
            {eyebrow && (
              <motion.div variants={itemVariant} className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] text-zinc-300 uppercase">
                    {eyebrow}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Headline */}
            {headline && (
              <motion.h1
                variants={itemVariant}
                className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-2 leading-[1.05]"
              >
                {headline.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </motion.h1>
            )}

            {/* Accent Line */}
            {accentLine && (
              <motion.h1
                variants={itemVariant}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-500 mb-5 leading-[1.05]"
              >
                {accentLine}
              </motion.h1>
            )}

            {/* Subtext */}
            {subtext && (
              <motion.p
                variants={itemVariant}
                className="text-base sm:text-md text-zinc-400 max-w-xl leading-relaxed mb-8 font-light"
              >
                {subtext}
              </motion.p>
            )}

            {/* CTA Button */}
            <motion.div variants={itemVariant}>
              <Button
                onClick={() => setIsContactOpen(true)}
                className="rounded-full px-8 py-6 font-medium bg-white text-black hover:bg-zinc-200 transition-all duration-300 flex items-center gap-3 text-sm sm:text-base group"
              >
                Contact Us Today
                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Button>
            </motion.div>

            {/* Small feature row */}
            <motion.div
              variants={itemVariant}
              className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/10"
            >
              <div className="flex items-center gap-2 text-zinc-500 text-xs tracking-wider uppercase font-medium">
                <ShieldCheck className="w-4 h-4 text-blue-500" /> Secure Systems
              </div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs tracking-wider uppercase font-medium">
                <Cpu className="w-4 h-4 text-blue-500" /> AI-Ready
              </div>
            </motion.div>
          </motion.div>

          {/* CENTER OVERLAP BADGE
              Consolidated into a single motion.div — no separate animation context
              needed since it's not a stagger parent. Reduced-motion: skip rotate. */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.5, rotate: -45 }
            }
            whileInView={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, rotate: 0 }
            }
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex absolute left-[52%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-28 h-28 rounded-full bg-black border-[4px] border-[#050505] items-center justify-center shadow-2xl overflow-hidden group"
          >
            {/* Spin animation disabled when reduced-motion is preferred */}
            <div
              className={`absolute inset-2 rounded-full border border-dashed border-white/20 ${
                shouldReduceMotion ? "" : "animate-[spin_20s_linear_infinite]"
              }`}
            />
            <div className="text-center">
              <span className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1">
                Est.
              </span>
              <span className="block text-xl font-bold text-white tracking-wider">
                2025
              </span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Image & Floating UI
              - Image uses loading="eager" + fetchpriority="high" because this IS
                the above-the-fold hero — we want it fast, not lazy.
              - width/height set explicitly to eliminate Cumulative Layout Shift.
              - The floating data card uses whileInView so it only animates when
                visible, instead of animating into a section that may be off-screen. */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-[50%] h-[450px] lg:h-auto p-6 sm:p-8 lg:p-13 lg:pl-0 z-20 relative"
          >
            <div className="w-full h-full relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden group">
              {image && (
                <img
                  src={image}
                  alt="About Hero Visual"
                  // Hero image — load eagerly and prioritise it in the browser's
                  // fetch queue so it doesn't delay LCP.
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  // Explicit dimensions prevent layout shift while the image loads.
                  // Override with your actual aspect ratio if different.
                  width={800}
                  height={1000}
                  className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
                />
              )}

              <div className="absolute inset-0 border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] z-10 pointer-events-none" />

              {/* Floating Glassmorphic Data Card */}
              <motion.div
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 bg-black/40 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center gap-4 shadow-2xl z-20"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 relative">
                  <Activity className="w-5 h-5 text-blue-400 relative z-10" />
                  {/* Ping animation disabled for reduced-motion users */}
                  {!shouldReduceMotion && (
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
                  )}
                </div>
                <div>
                  <p className="text-white text-sm font-medium tracking-wide">
                    System Active
                  </p>
                  <p className="text-zinc-300 text-xs flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Real-time monitoring
                  </p>
                </div>
              </motion.div>
            </div>
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
}
