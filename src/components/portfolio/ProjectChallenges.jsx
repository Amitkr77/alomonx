"use client";

import React, { useRef, useMemo, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  AlertCircle,
  ArrowDownRight,
  UtensilsCrossed,
  CalendarClock,
  ChefHat,
  Truck,
} from "lucide-react";

// ─── Static constants ─────────────────────────────────────────────────────────
const ICON_MAP = {
  UtensilsCrossed,
  CalendarClock,
  ChefHat,
  Truck,
};

const SCROLL_OFFSET = ["start start", "end end"];

// Precomputed sticky top styles — avoids recomputing the string each render
const getStickyTop = (index) => `calc(15vh + ${index * 1.5}rem)`;

// ─── ChallengeCard ────────────────────────────────────────────────────────────
const ChallengeCard = memo(function ChallengeCard({
  challenge,
  index,
  totalSteps,
  progress,
  metaColor,
}) {
  const isLastCard = index === totalSteps - 1;

  const formattedNum = useMemo(
    () => String(index + 1).padStart(2, "0"),
    [index]
  );

  const [rangeStart, rangeEnd] = useMemo(() => {
    const fraction = 1 / totalSteps;
    return [index * fraction, index * fraction + fraction];
  }, [index, totalSteps]);

  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, 0.92]);

  // Stable sticky top string — memoized per index
  const stickyTop = useMemo(() => getStickyTop(index), [index]);

  const IconComponent = ICON_MAP[challenge.icon] || AlertCircle;

  return (
    <div
      className="sticky w-full"
      style={{
        top: stickyTop,
        zIndex: index + 1,
        marginBottom: isLastCard ? "0" : "50vh",
      }}
    >
      <motion.article
        style={{
          scale,
          transformOrigin: "top center",
          willChange: "transform", // ✅ moved here — only the animated element needs this
        }}
        className="w-full relative isolate overflow-hidden bg-white border border-gray-200 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] rounded-[2rem] p-6 md:p-9"
        layout={false}
      >
        {/* Decorative background number */}
        <div
          aria-hidden="true"
          className="absolute -top-10 -right-6 text-[12rem] font-black text-gray-50 select-none pointer-events-none leading-none -z-10"
        >
          {formattedNum}
        </div>

        <div className="relative z-10 flex flex-col h-full gap-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 ${metaColor || "text-[#0F172A]"}`}
            >
              <IconComponent className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#0F172A]">
                Challenge
              </span>
            </div>
            <span className="text-gray-300 font-mono text-xl font-bold">
              /{formattedNum}
            </span>
          </div>

          {/* Body */}
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0F172A] leading-[1.3] tracking-tight">
              {challenge.title}
            </h3>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-8 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">
              We solve this.
            </span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0F172A] text-white">
              <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
});

ChallengeCard.displayName = "ChallengeCard";

// ─── BusinessChallenges ───────────────────────────────────────────────────────
export default function BusinessChallenges({ challenges, meta }) {
  const containerRef = useRef(null);

  // ✅ Hooks always called unconditionally — early return moved AFTER hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: SCROLL_OFFSET,
  });

  // ✅ Derived value memoized — not recomputed on every render
  const metaColor = useMemo(() => meta?.color, [meta?.color]);

  const totalSteps = challenges?.length ?? 0;

  if (!totalSteps) return null;

  return (
    <section
      ref={containerRef}
      className="w-full bg-gray-50 pt-16 pb-[18vh] relative"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        {/* ── Left: sticky sidebar ── */}
        <div className="lg:w-5/12 relative">
          <div className="lg:sticky lg:top-32 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-gray-300" aria-hidden="true" />
                <span className="text-gray-500 text-sm font-mono uppercase tracking-[0.2em] font-bold">
                  The Bottlenecks
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-[#0F172A] mb-6">
                Key Business Challenges Solved.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md font-medium">
                We identify the hidden friction points in your workflow and
                replace them with scalable, automated solutions.
              </p>
            </div>

            {/* Scroll progress ring */}
            <div
              className="hidden lg:flex items-center gap-4 mt-8"
              aria-hidden="true"
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-gray-200"
                  />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-[#17173e]"
                    style={{ pathLength: scrollYProgress }}
                    strokeLinecap="round"
                  />
                </svg>
                <ArrowDownRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                  Scroll
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  to explore
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: stacking cards ── */}
        <div className="lg:w-7/12 relative">
          {challenges.map((challenge, index) => (
            <ChallengeCard
              key={challenge.title ?? index}
              challenge={challenge}
              index={index}
              totalSteps={totalSteps}
              progress={scrollYProgress}
              metaColor={metaColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}