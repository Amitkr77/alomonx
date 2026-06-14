"use client";

import React, { useRef, memo, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";

// --- Constants ---
const SCROLL_OFFSET = ["start end", "end start"];
const VIEWPORT_CONFIG = { once: true, margin: "-50px" };
const TRANSFORM_Y_INPUT = [0, 0.5];
const TRANSFORM_Y_OUTPUT = [60, 0];
const TRANSFORM_OPACITY_INPUT = [0, 0.3];
const TRANSFORM_OPACITY_OUTPUT = [0, 1];

// Stable base transition — only `delay` varies per item
const BASE_TRANSITION = { duration: 0.5, ease: "easeOut" };

// Stable animation states
const INITIAL_STATE = { opacity: 0, y: 20 };
const ANIMATE_STATE = { opacity: 1, y: 0 };

// --- Sub-component: Clean Line-Item Row ---
const FeatureRow = memo(function FeatureRow({
  text,
  formattedNum, // pre-computed in parent
  transition, // pre-computed in parent
  metaColor, // pre-resolved primitive
}) {
  return (
    <motion.div
      initial={INITIAL_STATE}
      whileInView={ANIMATE_STATE}
      viewport={VIEWPORT_CONFIG}
      transition={transition}
      // Reduced vertical padding on mobile
      className="group relative flex items-center justify-between py-3 lg:py-5 border-b border-gray-400 hover:border-gray-500 transition-colors duration-300 cursor-default"
    >
      <div className="flex items-center gap-2 lg:gap-5 pr-2">
        {/* Index Number: Smaller on mobile */}
        <span className="text-[10px] lg:text-xs font-mono text-gray-500 group-hover:text-[#0a101e] transition-colors duration-300">
          {formattedNum}
        </span>
        {/* Feature Text: Scaled down for 2-column mobile view */}
        <span className="text-xs sm:text-sm lg:text-lg text-gray-700 group-hover:text-[#040810] transition-colors duration-300 font-semibold tracking-tight leading-tight">
          {text}
        </span>
      </div>

      {/* Check indicator: Scaled down on mobile */}
      <div
        className={`shrink-0 w-4 h-4 lg:w-6 lg:h-6 rounded-full border border-transparent group-hover:border-gray-300 flex items-center justify-center bg-transparent group-hover:bg-gray-50 transition-all duration-300 ${metaColor}`}
      >
        <Check className="w-2 h-2 lg:w-3 lg:h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100" />
      </div>

      {/* Animated bottom highlight */}
      <div className="absolute bottom-[-1px] left-0 w-0 h-px bg-gradient-to-r from-transparent via-[#0F172A]/40 to-transparent group-hover:w-full transition-all duration-700 opacity-0 group-hover:opacity-100" />
    </motion.div>
  );
});

// --- Main Section Component ---
export default function KeyFeatures({ keyFeatures, meta }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: SCROLL_OFFSET,
  });

  const headerY = useTransform(
    scrollYProgress,
    TRANSFORM_Y_INPUT,
    TRANSFORM_Y_OUTPUT,
  );
  const headerOpacity = useTransform(
    scrollYProgress,
    TRANSFORM_OPACITY_INPUT,
    TRANSFORM_OPACITY_OUTPUT,
  );

  // Pre-compute all per-item derived values once
  const items = useMemo(() => {
    if (!keyFeatures?.length) return [];
    return keyFeatures.map((text, i) => ({
      text,
      formattedNum: String(i + 1).padStart(2, "0"),
      // Merge stable base with dynamic delay into one object per item
      transition: { ...BASE_TRANSITION, delay: i * 0.05 },
    }));
  }, [keyFeatures]);

  // Pre-resolve metaColor fallback once
  const metaColor = meta?.color || "text-[#0F172A]";

  if (!items.length) return null;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-12 lg:py-16 border-t border-gray-200 overflow-hidden"
    >
      {/* Reduced horizontal padding for mobile/tablet (px-4), kept original for desktop (lg:px-22) */}
      <div className="max-w-8xl mx-auto px-4 lg:px-22">
        {/* Header with scroll parallax */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-8 mb-10 lg:mb-18">
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
              <span className="w-6 lg:w-8 h-[2px] bg-gray-300" />
              <span className="text-gray-500 text-xs lg:text-sm font-mono uppercase tracking-[0.2em] font-bold">
                What's Included
              </span>
            </div>
            {/* Reduced heading size on mobile */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.1]">
              Core Capabilities
            </h2>
          </motion.div>

          <motion.p
            style={{ y: headerY, opacity: headerOpacity }}
            className="text-gray-500 text-sm lg:text-base max-w-sm md:text-right font-medium"
          >
            Enterprise-grade features built directly into your solution out of
            the box.
          </motion.p>
        </div>

        {/* Feature grid: Forced to 2 columns on mobile/tablet, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 lg:gap-x-12 gap-y-1 lg:gap-y-2">
          {items.map(({ text, formattedNum, transition }) => (
            <FeatureRow
              key={formattedNum}
              text={text}
              formattedNum={formattedNum}
              transition={transition}
              metaColor={metaColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
