"use client";

import React, { useRef, useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";

// ─── Default header content (module-level — preserves old "Key Benefits" copy) ─
const DEFAULT_HEADER = {
  eyebrow: "Key Benefits",
  title: null,
  description: null,
};

export default function KeyBenefits({ benefits = [], header }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentIndexRef = useRef(0);
  const totalItems = benefits.length;

  // UPDATED: merge incoming header with defaults so old call sites need zero changes
  const headerContent = useMemo(
    () => ({ ...DEFAULT_HEADER, ...header }),
    [header],
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const rotation = useTransform(smoothProgress, [0, 1], [0, 360]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!totalItems) return;
    const step = 1 / totalItems;
    let index = Math.floor(latest / step);
    if (index >= totalItems) index = totalItems - 1;
    if (index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      setActiveIndex(index);
    }
  });

  if (!benefits?.length) return null;

  const hasHeaderCopy = Boolean(
    headerContent.title || headerContent.description,
  );

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${totalItems * 100}vh` }}
    >
      <div className="sticky top-[80px] h-[calc(100vh-80px)] w-full overflow-hidden flex flex-col lg:block">
        {/* AMBIENT GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/5 blur-[80px] rounded-full pointer-events-none" />

        {/* ── MOBILE / TABLET LAYOUT (hidden on lg+) ──────────────── */}
        <div className="lg:hidden flex flex-col h-full px-5 sm:px-8 pt-8 sm:pt-10 pb-6 relative z-20">
          {/* Top bar — label + counter */}
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-5 bg-white/30" />
              <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/50 font-mono">
                {headerContent.eyebrow}
              </span>
            </div>
            <div className="flex items-center gap-1 text-white/40 font-mono text-xs">
              <span className="text-white text-sm font-light">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="mx-1 text-white/20">/</span>
              <span>{String(totalItems).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Section title + description (mobile/tablet) */}
          {hasHeaderCopy && (
            <div className="mb-5 sm:mb-6 max-w-md">
              {headerContent.title && (
                <h2 className="text-white font-medium text-xl sm:text-2xl md:text-3xl tracking-tight mb-2 text-balance">
                  {headerContent.title}
                </h2>
              )}
              {headerContent.description && (
                <p className="text-white/50 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                  {headerContent.description}
                </p>
              )}
            </div>
          )}

          {/* Mini orb */}
          <div className="flex justify-center mb-5 sm:mb-6">
            <div className="relative w-[110px] sm:w-[130px] h-[110px] sm:h-[130px]">
              {/* Outer ring */}
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full text-white/20"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="98"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="1 4"
                />
              </svg>
              {/* Rotating comet */}
              <motion.div
                style={{ rotate: rotation }}
                className="absolute inset-0 will-change-transform"
              >
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 w-full h-full"
                >
                  <defs>
                    <linearGradient
                      id="cometTailMob"
                      x1="50%"
                      y1="0%"
                      x2="100%"
                      y2="50%"
                    >
                      <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 100 1 A 99 99 0 0 1 199 100"
                    fill="none"
                    stroke="url(#cometTailMob)"
                    strokeWidth="2"
                  />
                </svg>
                {/* Comet dot */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full bg-white/10 blur-sm" />
                  <div className="relative w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.9)]" />
                </div>
              </motion.div>
              {/* Centre glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-5 sm:mb-6">
            {benefits.map((_, i) => (
              <div
                key={i}
                className={`h-[2px] rounded-full transition-all duration-500 ease-out ${
                  i === activeIndex ? "w-8 bg-white" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* Benefit text */}
          <div className="flex-1 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full will-change-transform"
              >
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-mono mb-3 flex items-center gap-2">
                  <span className="inline-block w-4 h-[1px] bg-white/20" />
                  Primary Benefit
                </div>
                <h2 className="text-white font-medium leading-[1.1] tracking-tight text-[clamp(1.6rem,7vw,2.4rem)] text-balance">
                  {benefits[activeIndex]}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom progress bar */}
          <div className="mt-6 w-full h-[1px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white/60 will-change-transform"
              style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
            />
          </div>
        </div>

        {/* ── DESKTOP LAYOUT (unchanged below, hidden below lg) ───── */}
        {/* MOBILE PROGRESS BAR — desktop only (original) */}
        <div className="hidden lg:block absolute top-0 left-0 w-full h-1 bg-white/10 z-50">
          <motion.div
            className="h-full bg-white will-change-transform"
            style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
          />
        </div>

        {/* TOP-RIGHT HEADER — title + description, desktop only, separate from the circle */}
        {hasHeaderCopy && (
          <div className="hidden lg:block absolute top-12 right-12 xl:right-20 z-30 max-w-xs xl:max-w-sm text-right pointer-events-none">
            {headerContent.title && (
              <h2 className="text-white font-medium text-2xl xl:text-3xl tracking-tight text-balance mb-2">
                {headerContent.title}
              </h2>
            )}
            {headerContent.description && (
              <p className="text-white/50 text-sm xl:text-base font-light leading-relaxed">
                {headerContent.description}
              </p>
            )}
          </div>
        )}

        {/* LEFT CIRCLE */}
        <div className="hidden lg:block absolute left-[-320px] top-1/2 -translate-y-1/2 z-0 pointer-events-none">
          <div className="relative w-[640px] h-[640px]">
            <div className="absolute inset-4 bg-white/[0.01] backdrop-blur-2xl rounded-full border border-white/5 shadow-[inset_0_0_100px_rgba(255,255,255,0.02)]" />

            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 w-full h-full text-white/20 opacity-60"
            >
              <circle
                cx="100"
                cy="100"
                r="98"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.25"
                strokeDasharray="0.5 3"
              />
              <circle
                cx="100"
                cy="100"
                r="98"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="0 39.2 0.5 0"
              />
            </svg>

            <motion.div
              style={{ rotate: rotation }}
              className="absolute inset-4 will-change-transform"
            >
              <div
                className="absolute inset-0 rounded-full opacity-60"
                style={{
                  background:
                    "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.08) 90deg, transparent 90deg)",
                }}
              />
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              >
                <defs>
                  <linearGradient
                    id="cometTail"
                    x1="50%"
                    y1="0%"
                    x2="100%"
                    y2="50%"
                  >
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 100 1 A 99 99 0 0 1 199 100"
                  fill="none"
                  stroke="url(#cometTail)"
                  strokeWidth="1.5"
                />
              </svg>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 flex items-center justify-center">
                <div className="absolute w-12 h-12 rounded-full bg-white/10 blur-md" />
                <div className="absolute w-5 h-5 rounded-full border border-white/40 bg-[#050505]" />
                <div className="relative w-2 h-2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.9)]" />
              </div>
            </motion.div>

            {/* Typography */}
            <div className="absolute left-[360px] top-1/2 -translate-y-1/2 flex flex-col items-start gap-5">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/40" />
                <div className="text-[14px] tracking-[0.4em] uppercase text-white/50 font-medium">
                  {headerContent.eyebrow}
                </div>
              </div>
              <div className="flex items-start gap-4 ml-11">
                <span className="text-white text-7xl font-light tabular-nums tracking-tighter leading-none">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col mt-1 gap-1 text-white/30 font-mono tracking-widest">
                  <span className="uppercase text-[9px]">Total</span>
                  <span className="text-lg text-white/50">
                    {String(totalItems).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 ml-11 mt-2">
                {benefits.map((_, i) => (
                  <div
                    key={i}
                    className={`h-[2px] rounded-full transition-all duration-500 ease-out ${
                      i === activeIndex ? "w-8 bg-white" : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="hidden lg:flex h-full items-center justify-start w-full relative z-20 pointer-events-none">
          <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:pl-[480px] lg:pr-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col relative pointer-events-auto will-change-transform"
              >
                <div className="hidden md:block absolute -left-8 top-2 w-[3px] h-12 bg-gradient-to-b from-white to-transparent rounded-full" />
                <div className="text-xs uppercase tracking-[0.35em] text-white/50 mb-6 font-mono flex items-center gap-4">
                  <span className="hidden lg:inline-block w-8 h-[1px] bg-white/20" />
                  Primary Benefit
                </div>
                <h2 className="text-white font-medium leading-[1.1] max-w-5xl text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-balance">
                  {benefits[activeIndex]}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
