"use client";

import React, { useRef, useMemo, memo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// Wrapped in React.memo to prevent unnecessary re-renders during heavy scrolling
const StackingCard = memo(function StackingCard({
  step,
  index,
  totalSteps,
  progress,
}) {
  const isLastCard = index === totalSteps - 1;
  const formattedTotal = String(totalSteps).padStart(2, "0");

  // 1. Define the stack limit and calculate the current card's position in the stack
  const STACK_LIMIT = 4;
  const stackPosition = index % STACK_LIMIT; // Returns 0, 1, 2, 3, then resets to 0

  const sectionFraction = 1 / totalSteps;
  const start = index * sectionFraction;
  const end = start + sectionFraction;

  const scale = useTransform(
    progress,
    [start, end],
    [1, isLastCard ? 1 : 0.88],
  );

  return (
    <div
      className="sticky w-full flex items-start justify-center"
      style={{
        // 2. Replace 'index' with 'stackPosition' here
        top: `calc(8vh + ${stackPosition * 32}px)`,
        zIndex: index + 1, // Keep this as index + 1 so the new stack covers the old one
        paddingBottom: isLastCard ? "0" : "4vh",
      }}
    >
      <motion.article
        style={{
          scale,
          transformOrigin: "top center",
          fontFeatureSettings: '"ss01", "ss02"',
          backgroundColor: "#18181b",
          isolation: "isolate",
        }}
        className="w-full flex flex-col md:flex-row border border-[#1514142e] shadow-[0_-20px_50px_rgba(0,0,0,0.9)] rounded-none overflow-hidden h-auto md:h-[62vh] min-h-[500px]"
      >
        {/* Left Side: Media Asset */}
        <div
          className="relative w-full md:w-1/2 min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-[#ffffff2e] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#0a0a0b" }}
        >
          <Image
            src={step.image}
            alt={step.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw" // Optimized for bandwidth
            className="object-cover"
            quality={100}
            priority={index === 0} // Only eager load the very first image in the stack
          />
        </div>

        {/* Right Side: Copy/Content */}
        <div
          className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center"
          style={{ backgroundColor: "#000000" }}
        >
          <span className="text-[#fafafa] font-mono text-sm tracking-widest font-semibold mb-6 block">
            {step.num}
            <span className="text-[#7a7a76] mx-2 font-light">/</span>
            {formattedTotal}
          </span>

          <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-[#fafafa] font-['Switzer',_sans-serif]">
            {step.title}
          </h3>

          <p className="text-[#c8c7c2] text-base md:text-lg leading-relaxed mb-10 max-w-[95%] font-['Switzer',_sans-serif]">
            {step.description}
          </p>

          {/* Render deliverables if they exist */}
          {step.deliverables && step.deliverables.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-3 list-none p-0 m-0">
              {step.deliverables.map((item, i) => (
                <li
                  key={i}
                  className="text-[#9a9994] text-xs font-mono uppercase tracking-[0.15em] flex items-center gap-2.5"
                >
                  <span className="w-1.5 h-1.5 bg-[#ffffff29] inline-block rounded-none" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.article>
    </div>
  );
});

export default function Solutions({ solutions, label, meta }) {
  if (!solutions?.length) return null;

  const containerRef = useRef(null);
  const totalSteps = solutions.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Memoize solutions data so we don't recalculate the array on every render
  const stepsData = useMemo(() => {
    return solutions.map((s, i) => ({
      num: String(i + 1).padStart(2, "0"),
      title: s.title,
      description: s.description,
      image: s.image,
      deliverables: s.deliverables || [], // Safely inherit from data if present
    }));
  }, [solutions]);

  return (
    <section
      ref={containerRef}
      className="text-[#fafafa] pt-20 pb-20 w-full relative border-t border-[#f4efef2e]"
      id="solutions"
      style={{
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        fontFamily: '"Switzer", system-ui, sans-serif',
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 relative">
        {/* Section Header */}
        <header className="mb-16 w-full flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#7a7a76]" aria-hidden="true" />
            <p className="text-[#9a9994] text-xs font-mono uppercase tracking-[0.2em] m-0 flex items-center gap-1.5">
              <span>Solutions / What We Build</span>
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight m-0 text-[#fafafa]">
            Our{" "}
            <em className="italic font-normal font-['Instrument_Serif',_Georgia,_serif] text-[#f4f5f1]">
              {label}
            </em>{" "}
            <em className="italic font-normal font-['Instrument_Serif',_Georgia,_serif] text-[#0859fa]">
              solutions.
            </em>
          </h2>
        </header>

        {/* Cards Stacking Field */}
        <div className="relative w-full">
          {stepsData.map((step, index) => (
            <StackingCard
              key={step.num}
              step={step}
              index={index}
              totalSteps={totalSteps}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
