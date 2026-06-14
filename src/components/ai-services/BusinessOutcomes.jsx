"use client";

import React, { useRef, memo, useMemo } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// --- Constants (hoisted to module scope) ---
const SCROLL_OFFSET = ["start center", "end center"];
const SPRING_CONFIG = { stiffness: 100, damping: 20, mass: 0.5 };

// --- Sub-component: The Animated Stair Connector ---
const StairConnector = memo(function StairConnector({
  progress,
  index,
  total,
  metaColor,
}) {
  const stepSize = 1 / Math.max(1, total - 1);
  const start = index * stepSize;
  const end = (index + 1) * stepSize;
  const mid = start + (end - start) * 0.7;
  const midClamped = Math.min(mid + 0.01, 1);

  const vertScale = useTransform(progress, [start, mid], [0, 1]);
  const horizScale = useTransform(progress, [mid, end], [0, 1]);
  const dotOpacity = useTransform(progress, [mid, midClamped], [0, 1]);

  return (
    <div
      className="absolute z-0 pointer-events-none"
      style={{
        top: "7px",
        left: "7px",
        height: "100%",
        width: "var(--step-width)",
      }}
    >
      {/* Vertical track */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-white/10" />
      <motion.div
        style={{ scaleY: vertScale }}
        className={`absolute top-0 left-0 w-[2px] h-full origin-top bg-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ${metaColor || ""}`}
      />

      {/* Joint dot */}
      <motion.div
        style={{ opacity: dotOpacity }}
        className="absolute bottom-[-2px] left-[-2px] w-[6px] h-[6px] rounded-full bg-white shadow-[0_0_10px_white]"
      />

      {/* Horizontal track */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/10" />
      <motion.div
        style={{ scaleX: horizScale }}
        className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ${metaColor || ""}`}
      />
    </div>
  );
});

// --- Sub-component: Individual Stair Item ---
const StairItem = memo(function StairItem({
  benefit,
  index,
  total,
  progress,
  metaColor,
  label, // pre-computed label passed from parent
}) {
  const stepSize = 1 / Math.max(1, total - 1);
  const start = index * stepSize;
  const actStart = start === 0 ? 0 : start - 0.05;
  const actEnd = start === 0 ? 0.01 : start;

  const nodeScale = useTransform(progress, [actStart, actEnd], [0, 1]);
  const nodeOpacity = useTransform(progress, [actStart, actEnd], [0, 1]);
  const textOpacity = useTransform(progress, [actStart, actEnd], [0.3, 1]);
  const textX = useTransform(progress, [actStart, actEnd], [0, 8]);

  return (
    <div
      className="relative flex items-start pb-10 md:pb-12"
      style={{ marginLeft: `calc(${index} * var(--step-width))` }}
    >
      {/* Glowing node */}
      <div className="relative mt-1 shrink-0 z-10">
        <div className="w-[14px] h-[14px] rounded-full bg-[#050505] border-2 border-white/20" />
        <motion.div
          style={{ scale: nodeScale, opacity: nodeOpacity }}
          className="absolute inset-0 rounded-full bg-white drop-shadow-[0_0_12px_rgba(255,255,255,1)]"
        />
      </div>

      {/* Text content */}
      <motion.div
        style={{ opacity: textOpacity, x: textX }}
        className="ml-6 md:ml-10 flex-1"
      >
        <span className="block text-white/50 font-mono text-xs font-bold tracking-widest mb-2">
          Outcome // {label}
        </span>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-snug max-w-2xl">
          {benefit}
        </h3>
      </motion.div>

      {index < total - 1 && (
        <StairConnector
          progress={progress}
          index={index}
          total={total}
          metaColor={metaColor}
        />
      )}
    </div>
  );
});

// --- Main Section Component ---
export default function BusinessOutcomes({ benefits, meta }) {
  const listRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: SCROLL_OFFSET,
  });

  const smoothProgress = useSpring(scrollYProgress, SPRING_CONFIG);

  // Pre-compute labels once — avoids String() + padStart on every render
  const labels = useMemo(
    () => benefits?.map((_, i) => String(i + 1).padStart(2, "0")),
    [benefits],
  );

  // Stable primitive for metaColor
  const metaColor = meta?.color ?? "";

  if (!benefits?.length) return null;

  return (
    <section
      className="relative w-full bg-[#050505] py-14 lg:py-20 overflow-hidden"
      style={{ "--step-width": "clamp(32px, 7vw, 180px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-18"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-white/20" />
            <span className="text-gray-400 text-sm font-mono uppercase tracking-[0.2em] font-bold">
              Business Outcomes
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Why It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
              Matters.
            </span>
          </h2>
        </motion.div>

        {/* Staircase list */}
        <div ref={listRef} className="flex flex-col w-full relative pb-2 pt-4">
          {benefits.map((benefit, index) => (
            <StairItem
              key={index}
              benefit={benefit}
              index={index}
              total={benefits.length}
              progress={smoothProgress}
              metaColor={metaColor}
              label={labels[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
