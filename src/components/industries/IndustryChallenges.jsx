"use client";

import React, { useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AlertCircle } from "lucide-react";

// --- Sub-component for individual Stacking Strips ---
// Wrapped in React.memo to prevent unnecessary re-renders during heavy scrolling
const StackingStrip = memo(function StackingStrip({
  challenge,
  index,
  totalSteps,
  progress,
  meta,
}) {
  const isLastCard = index === totalSteps - 1;
  // Native, faster string padding
  const formattedNum = String(index + 1).padStart(2, "0");

  // Animation calculation
  const sectionFraction = 1 / totalSteps;
  const start = index * sectionFraction;
  const end = start + sectionFraction;

  const scale = useTransform(
    progress,
    [start, end],
    [1, isLastCard ? 1 : 0.95],
  );

  return (
    <div
      className="sticky w-full flex items-start justify-center"
      style={{
        top: `calc(15vh + ${index * 16}px)`,
        zIndex: index + 1,
        paddingBottom: isLastCard ? "0" : "2vh",
      }}
    >
      <motion.article
        style={{
          scale,
          transformOrigin: "top center",
          backgroundColor: "#ffffff", // Pure white card
        }}
        // Light borders and soft, diffuse shadows for depth in light mode
        className="w-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 border border-gray-200 shadow-[0_-15px_40px_rgba(0,0,0,0.06)] p-6 md:p-8"
      >
        {/* Left Side: Icon and Number */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-50 border border-slate-200">
            <AlertCircle
              className={`w-4 h-4 md:w-5 md:h-5 ${meta?.color || "text-navy-900 text-[#0f172a]"}`}
            />
          </div>
          <span className="text-slate-500 font-mono text-sm md:text-base tracking-widest font-semibold">
            CHALLENGE // {formattedNum}
          </span>
        </div>

        {/* Divider for Desktop */}
        <div className="hidden md:block w-px h-12 bg-gray-200" />

        {/* Right Side: Challenge Text */}
        <div className="flex-1">
          <p className="text-base md:text-lg lg:text-xl font-medium text-slate-800 leading-relaxed tracking-tight font-['Switzer',_sans-serif]">
            {challenge}
          </p>
        </div>
      </motion.article>
    </div>
  );
});

// --- Main Section Component ---
export default function IndustryChallenges({ challenges, label, meta }) {
  if (!challenges?.length) return null;

  const containerRef = useRef(null);
  const totalSteps = challenges.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      // White section background with subtle light gray top border
      className="w-full bg-[#fffefe] pt-16 pb-24 border-t border-gray-400 relative"
      style={{
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 relative">
        {/* Section Header */}
        <header className="mb-10 w-full flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-slate-300" aria-hidden="true" />
            <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.2em] m-0 flex items-center gap-1.5">
              <span>The Problem Space</span>
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight m-0 text-slate-900 max-w-4xl">
            Challenges we solve in{" "}
            {/* Navy blue accent for the italicized text */}
            <em className="italic font-normal font-['Instrument_Serif',_Georgia,_serif] text-[#1e3a8a]">
              {label}.
            </em>
          </h2>
        </header>

        {/* Strips Stacking Field */}
        <div className="relative w-full">
          {challenges.map((challenge, index) => (
            <StackingStrip
              key={index}
              challenge={challenge}
              index={index}
              totalSteps={totalSteps}
              progress={scrollYProgress}
              meta={meta}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
