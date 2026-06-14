"use client";

import React, { useRef, useMemo, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AlertCircle, ArrowDownRight } from "lucide-react";

// ─── Stable constant outside the tree ────────────────────────────────────────
// Defining the offset array here (not inline) means useScroll never sees a new
// reference between renders, preventing unnecessary scroll-listener teardowns.
const SCROLL_OFFSET = ["start start", "end end"];

// ─── ChallengeCard ────────────────────────────────────────────────────────────
// Wrapped in React.memo so it only re-renders when its own props change.
// The only prop that changes at runtime is `progress` (a MotionValue object),
// which is a stable reference — so memoisation effectively prevents all
// parent-triggered re-renders.
const ChallengeCard = memo(function ChallengeCard({
  challenge,
  index,
  totalSteps,
  progress,
  metaColor,
}) {
  const isLastCard = index === totalSteps - 1;

  // Memoize pure derived strings — avoids padStart / template-literal allocations
  // on every render (cheap but adds up across many cards).
  const formattedNum = useMemo(
    () => String(index + 1).padStart(2, "0"),
    [index],
  );

  // Memoize scroll range boundaries. These are stable for the lifetime of the
  // component (index and totalSteps never change after mount).
  const [rangeStart, rangeEnd] = useMemo(() => {
    const fraction = 1 / totalSteps;
    return [index * fraction, index * fraction + fraction];
  }, [index, totalSteps]);

  // useTransform must be called unconditionally at the component level (Rules of
  // Hooks). It subscribes to `progress` and drives the CSS transform directly via
  // Framer Motion's MotionValue pipeline — no React re-render on scroll.
  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, 0.92]);

  return (
    <div
      className="sticky w-full"
      style={{
        top: `calc(15vh + ${index * 1.5}rem)`,
        zIndex: index + 1,
        marginBottom: isLastCard ? "0" : "50vh",
        // Tell the compositor this element will be transformed, so it gets its
        // own GPU layer. Eliminates paint invalidation during scroll animation.
        willChange: "transform",
      }}
    >
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        // `isolate` creates a stacking context so cards overlap without bleed.
        // `contain: strict` (via Tailwind's `contain-strict` if available, or
        // inline style) would be ideal, but `isolate + overflow-hidden` already
        // prevents most layout contagion.
        className="w-full relative isolate overflow-hidden bg-white border border-gray-200 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] rounded-[2rem] p-6 md:p-9"
        // Opt out of Framer Motion's layout diffing — this element never changes
        // size, so layout measurement would be pure overhead.
        layout={false}
      >
        {/* Decorative background number — hidden from assistive tech */}
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
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
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
              {challenge}
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
export default function BusinessChallenges({ businessChallenges, meta }) {
  if (!businessChallenges?.length) return null;

  const containerRef = useRef(null);
  const totalSteps = businessChallenges.length;

  // Extract primitive once at this level so child memo comparisons stay stable.
  const metaColor = meta?.color;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: SCROLL_OFFSET, // stable reference — no listener teardown on re-render
  });

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
                Core challenges we solve for your business.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md font-medium">
                We identify the hidden friction points in your workflow and
                replace them with scalable, automated solutions.
              </p>
            </div>

            {/* Scroll progress ring — hidden from assistive tech */}
            <div
              className="hidden lg:flex items-center gap-4 mt-8"
              aria-hidden="true"
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                {/*
                  Framer Motion drives strokeDashoffset via direct DOM mutation on
                  the MotionValue — zero React re-renders during scroll, already
                  optimal.
                */}
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
          {businessChallenges.map((challenge, index) => (
            <ChallengeCard
              key={index}
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
