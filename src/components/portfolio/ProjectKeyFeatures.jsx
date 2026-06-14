"use client";

import React, { useRef, useMemo, memo } from "react";
import Image from "next/image";
import { motion, useScroll, useReducedMotion } from "framer-motion";

// ─── Animation variants — all module-level, zero allocations per render ───────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};
const fadeLeft = {
  hidden: { opacity: 0, x: 56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};
const fadeRight = {
  hidden: { opacity: 0, x: -56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};
const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
const dotPop = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.35, ease: "backOut" },
  },
};
const ripple = {
  hidden: { scale: 0.6, opacity: 0.6 },
  visible: {
    scale: 3,
    opacity: 0,
    transition: { duration: 1.1, ease: "easeOut", delay: 0.15 },
  },
};

const VIEWPORT_DOT = { once: true, margin: "-38% 0px -38% 0px" };
const VIEWPORT_CARD = { once: true, margin: "-20% 0px -20% 0px" };

// ✅ Hoisted — was an inline array literal, causing useScroll to re-register on every render
const SCROLL_OFFSET = ["start center", "end center"];

// ─── FeatureRow ───────────────────────────────────────────────────────────────
// Extracted + memoized: only re-renders when its own enriched item changes.
// Previously, any parent re-render would re-render every row in the list.
const FeatureRow = memo(function FeatureRow({ item, reducedMotion }) {
  const { index, isRight, title, image, stepLabel } = item;

  const imgVariant = reducedMotion ? fadeOnly : isRight ? fadeRight : fadeLeft;
  const titleVariant = reducedMotion
    ? fadeOnly
    : isRight
      ? fadeLeft
      : fadeRight;
  const dotVariant = reducedMotion ? fadeOnly : dotPop;

  return (
    <div className="relative flex items-center w-full py-7 md:py-10">
      {/* ── Timeline dot ── */}
      <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 z-30 flex items-center justify-center">
        <motion.div
          variants={dotVariant}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DOT}
          className="relative w-4 h-4 rounded-full bg-blue-900 border-[2.5px] border-[#0A0F1E] shadow-[0_0_0_3px_rgba(59,130,246,0.25)]"
        >
          {!reducedMotion && (
            <motion.span
              variants={ripple}
              className="absolute inset-0 rounded-full bg-blue-700 -z-10"
            />
          )}
        </motion.div>
      </div>

      {/* ── Row: image + title ── */}
      <div className="w-full pl-12 md:pl-0 flex flex-col gap-7 md:grid md:grid-cols-2 md:gap-12 lg:gap-24 items-center">
        {/* Image panel */}
        <motion.div
          variants={imgVariant}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CARD}
          className={`w-full ${isRight ? "md:order-1" : "md:order-2"}`}
        >
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden group">
            <Image
              src={image}
              alt={title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {/* ✅ stepLabel pre-computed in enriched map — not recomputed here */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
              <span className="text-blue-600 text-xs font-mono font-bold tracking-widest">
                {stepLabel}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Title panel */}
        <motion.div
          variants={titleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CARD}
          className={`flex flex-col justify-center ${isRight ? "md:order-2" : "md:order-1"}`}
        >
          <span className="text-[11px] font-mono font-bold tracking-[0.28em] uppercase text-blue-900 mb-4">
            {/* ✅ featureLabel pre-computed — was computed twice per row */}
            Feature / {stepLabel}
          </span>

          <h3
            className={`text-2xl sm:text-3xl lg:text-4xl font-semibold text-black leading-[1.1] tracking-tight ${
              isRight ? "md:text-left" : "md:text-right"
            }`}
          >
            {title}
          </h3>

          <div
            className={`mt-4 h-[2px] w-16 bg-blue-900 rounded-full ${
              isRight ? "md:ml-0" : "md:ml-auto"
            }`}
          />
        </motion.div>
      </div>
    </div>
  );
});
FeatureRow.displayName = "FeatureRow";

// ─── ProjectKeyFeatures ───────────────────────────────────────────────────────
export default function ProjectKeyFeatures({ features }) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: SCROLL_OFFSET, // ✅ stable reference — no re-registration on each render
  });

  // ✅ stepLabel computed once here, not twice per row in JSX
  const enriched = useMemo(
    () =>
      (features || []).map((item, i) => ({
        ...item,
        index: i,
        isRight: i % 2 === 0,
        stepLabel: String(i + 1).padStart(2, "0"),
      })),
    [features],
  );

  if (enriched.length === 0) return null;

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-10 px-2 sm:px-6">
        <span className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.22em] uppercase text-slate-600 mb-3">
          <span className="h-px w-7 bg-blue-900" />
          Key Features
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black leading-tight tracking-tight">
          What we built.
        </h2>
      </div>

      {/* Timeline */}
      <div ref={containerRef} className="max-w-7xl mx-auto relative pb-12">
        {/* Static spine */}
        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-slate-900 to-transparent md:-translate-x-px z-0" />

        {/* Scroll-driven fill */}
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[3px] bg-black md:-translate-x-px origin-top z-10 rounded-full shadow-[0_0_14px_rgba(59,130,246,0.45)]"
        />

        <div className="relative z-20 flex flex-col">
          {enriched.map((item) => (
            <FeatureRow
              key={item.index}
              item={item}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
