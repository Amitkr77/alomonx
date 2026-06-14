"use client";

import React, { useRef, memo, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Bot,
  Zap,
  Shield,
  Globe,
  Users,
  Layers,
  TrendingUp,
  BrainCircuit,
} from "lucide-react";

// --- Constants ---
const SOLUTION_ICONS = [
  Bot,
  Zap,
  Shield,
  Globe,
  Users,
  Layers,
  TrendingUp,
  BrainCircuit,
];

const SPRING_CONFIG = { stiffness: 100, damping: 20, mass: 0.5 };
const SCROLL_OFFSET = ["start start", "end end"];
const X_TRANSFORM_INPUT = [0, 1];
const X_TRANSFORM_OUTPUT = ["calc(0% - 0vw)", "calc(-100% + 100vw)"];
const MOBILE_VIEWPORT = { once: true, margin: "-50px" };

// Stable animation states for MobileCard
const MOBILE_INITIAL = { opacity: 0, y: 20 };
const MOBILE_ANIMATE = { opacity: 1, y: 0 };
const MOBILE_TRANSITION = { duration: 0.5, ease: "easeOut" };

// --- Sub-component: Desktop Cinematic Card ---
const CinematicCard = memo(function CinematicCard({
  solution,
  Icon,
  label, // pre-computed "Solution // 01"
  isFirst, // only first card gets priority loading
}) {
  return (
    <div className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] max-h-[650px] shrink-0 relative group rounded-3xl overflow-hidden border border-white/10 bg-[#0F172A] shadow-2xl flex flex-col justify-end">
      {/* Background Image — eager only for first card, lazy for rest */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={solution.image}
          alt={solution.title}
          fill
          priority={isFirst}
          loading={isFirst ? "eager" : "lazy"}
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 60vw, 45vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#0F172A]/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 w-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-gray-400 font-mono text-sm uppercase tracking-widest font-semibold">
            {label}
          </span>
        </div>

        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-[1.1]">
          {solution.title}
        </h3>

        <p className="text-lg text-gray-300 leading-relaxed max-w-xl mb-8">
          {solution.description}
        </p>

        {/* Decorative bar */}
        <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="w-0 h-full bg-white transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </div>
  );
});

// --- Sub-component: Mobile Card ---
const MobileCard = memo(function MobileCard({ solution, Icon }) {
  return (
    <motion.div
      initial={MOBILE_INITIAL}
      whileInView={MOBILE_ANIMATE}
      viewport={MOBILE_VIEWPORT}
      transition={MOBILE_TRANSITION}
      className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0F172A] flex flex-col mb-6"
    >
      <div className="relative h-56 w-full overflow-hidden">
        {/* All mobile cards are below the fold — lazy load all */}
        <Image
          src={solution.image}
          alt={solution.title}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent" />
      </div>

      <div className="relative z-10 p-6 -mt-12">
        <div className="inline-flex p-3 rounded-xl bg-[#050505]/50 border border-white/10 backdrop-blur-md mb-4 shadow-xl">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">
          {solution.title}
        </h4>
        <p className="text-gray-400 leading-relaxed">{solution.description}</p>
      </div>
    </motion.div>
  );
});

// --- Main Section Component ---
export default function Solutions({ solutions, meta }) {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: SCROLL_OFFSET,
  });

  const smoothProgress = useSpring(scrollYProgress, SPRING_CONFIG);
  const x = useTransform(smoothProgress, X_TRANSFORM_INPUT, X_TRANSFORM_OUTPUT);

  // Pre-derive all per-card data in one pass — no work inside render loops
  const items = useMemo(() => {
    if (!solutions?.length) return [];
    return solutions.map((solution, i) => ({
      solution,
      Icon: SOLUTION_ICONS[i % SOLUTION_ICONS.length],
      label: `Solution // ${String(i + 1).padStart(2, "0")}`,
      isFirst: i === 0,
    }));
  }, [solutions]);

  if (!items.length) return null;

  return (
    <section className="bg-[#050505] relative isolate">
      {/* DESKTOP: Horizontal scroll (hidden on mobile) */}
      <div
        ref={targetRef}
        style={{ height: `${items.length * 65}vh` }}
        className="hidden lg:block relative"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-12">
          {/* Section header */}
          <div className="w-full px-12 lg:px-24 mb-8 z-50 pointer-events-none shrink-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-white/20" />
              <span className="text-gray-400 text-sm font-mono uppercase tracking-[0.2em] font-bold">
                What We Build
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight drop-shadow-lg">
              Our Solutions
            </h2>
          </div>

          {/* Scrolling track */}
          <motion.div
            style={{ x }}
            className="flex items-center gap-8 px-12 lg:px-24 w-max will-change-transform"
          >
            {items.map(({ solution, Icon, label, isFirst }) => (
              <CinematicCard
                key={label}
                solution={solution}
                Icon={Icon}
                label={label}
                isFirst={isFirst}
              />
            ))}
          </motion.div>

          {/* Scroll progress bar */}
          <div className="w-full px-12 lg:px-24 mt-10 z-50 flex items-center gap-6 pointer-events-none shrink-0">
            <span className="text-white/50 text-xs font-mono uppercase tracking-widest shrink-0">
              Scroll to explore
            </span>
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                className="h-full bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE: Vertical stack (hidden on desktop) */}
      <div className="block lg:hidden w-full px-6 py-24">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-white/20" />
            <span className="text-gray-400 text-sm font-mono uppercase tracking-[0.2em] font-bold">
              What We Build
            </span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight mb-2">
            Our Solutions
          </h2>
          <p className="text-gray-400">Swipe down to view our capabilities.</p>
        </div>

        <div className="flex flex-col gap-4">
          {items.map(({ solution, Icon, label }) => (
            <MobileCard key={label} solution={solution} Icon={Icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
