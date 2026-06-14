"use client";

import React, { useRef, memo, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";

// ─── Static constants ─────────────────────────────────────────────────────────
const SCROLL_OFFSET = ["start end", "end start"];
const VIEWPORT_CONFIG = { once: true, margin: "-50px" };
const BASE_TRANSITION = { duration: 0.5, ease: "easeOut" };
const INITIAL_STATE = { opacity: 0, y: 20 };
const ANIMATE_STATE = { opacity: 1, y: 0 };

// ✅ useTransform input/output ranges hoisted — inline arrays are new refs every render,
// forcing Framer Motion to re-subscribe its spring internally
const HEADER_Y_INPUT = [0, 0.5];
const HEADER_Y_OUTPUT = [60, 0];
const HEADER_OPACITY_INPUT = [0, 0.3];
const HEADER_OPACITY_OUTPUT = [0, 1];

// ✅ Pre-build transition objects at module level up to a reasonable list size.
// Previously { ...BASE_TRANSITION, delay: i * 0.05 } was spread inside useMemo,
// creating new objects on every outcomes change.
const MAX_PREBUILT = 30;
const PREBUILT_TRANSITIONS = Array.from({ length: MAX_PREBUILT }, (_, i) => ({
  ...BASE_TRANSITION,
  delay: i * 0.05,
}));
const getTransition = (i) =>
  i < MAX_PREBUILT
    ? PREBUILT_TRANSITIONS[i]
    : { ...BASE_TRANSITION, delay: i * 0.05 }; // fallback for unusually long lists

// ─── OutcomeRow ───────────────────────────────────────────────────────────────
const OutcomeRow = memo(function OutcomeRow({
  text,
  formattedNum,
  transition,
}) {
  return (
    <motion.div
      initial={INITIAL_STATE}
      whileInView={ANIMATE_STATE}
      viewport={VIEWPORT_CONFIG}
      transition={transition}
      className="group relative flex items-center justify-between py-5 border-b border-gray-500 hover:border-gray-900 transition-colors duration-300 cursor-default"
    >
      <div className="flex items-center gap-5">
        <span className="text-xs font-mono text-blue-800 group-hover:text-blue-900 transition-colors duration-300 tracking-[0.2em]">
          {formattedNum}
        </span>
        <span className="text-base md:text-lg text-gray-900 font-medium tracking-tight">
          {text}
        </span>
      </div>

      {/* Check indicator */}
      <div className="w-6 h-6 rounded-full border border-transparent group-hover:border-gray-700 flex items-center justify-center bg-transparent group-hover:bg-gray-100 transition-all duration-100 text-black flex-shrink-0">
        <Check className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100" />
      </div>

      {/* Animated bottom highlight */}
      <div className="absolute bottom-[-1px] left-0 w-0 h-px bg-gradient-to-r from-transparent via-blue-600/40 to-transparent group-hover:w-full transition-all duration-700 opacity-0 group-hover:opacity-100" />
    </motion.div>
  );
});
OutcomeRow.displayName = "OutcomeRow";

// ─── ProjectOutcomes ──────────────────────────────────────────────────────────
export default function ProjectOutcomes({ outcomes }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: SCROLL_OFFSET,
  });

  // ✅ Hoisted range arrays — stable refs, no Framer Motion re-subscription
  const headerY = useTransform(
    scrollYProgress,
    HEADER_Y_INPUT,
    HEADER_Y_OUTPUT,
  );
  const headerOpacity = useTransform(
    scrollYProgress,
    HEADER_OPACITY_INPUT,
    HEADER_OPACITY_OUTPUT,
  );

  // ✅ Shared style object — both header elements use the same motion values,
  // so one object reference is enough; no need to create two separate objects
  const headerStyle = useMemo(
    () => ({ y: headerY, opacity: headerOpacity }),
    [headerY, headerOpacity],
  );

  const items = useMemo(() => {
    if (!outcomes?.length) return [];
    return outcomes.map((text, i) => ({
      text,
      formattedNum: String(i + 1).padStart(2, "0"),
      transition: getTransition(i), // ✅ returns pre-built object, no spread
    }));
  }, [outcomes]);

  if (!items.length) return null;

  return (
    <section
      ref={containerRef}
      className="relative w-full py-9 overflow-hidden mb-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-7 lg:px-7">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-7 lg:mb-10">
          <motion.div style={headerStyle} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-gray-400" />
              <span className="text-gray-500 text-xs font-mono uppercase tracking-[0.22em] font-bold">
                Outcomes
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0A0F1E] tracking-tight leading-tight">
              What changed.
            </h2>
          </motion.div>

          {/* ✅ Same headerStyle object reused — both elements animate identically */}
          <motion.p
            style={headerStyle}
            className="text-gray-800 max-w-sm md:text-right text-sm font-bold leading-relaxed"
          >
            Real results delivered directly through the work we shipped.
          </motion.p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-9 gap-y-1">
          {items.map(({ text, formattedNum, transition }) => (
            <OutcomeRow
              key={formattedNum}
              text={text}
              formattedNum={formattedNum}
              transition={transition}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
