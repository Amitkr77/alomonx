"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";

// ─── Variants defined at module level — created once, never re-allocated ──────
// Since slideVariants depend on `isRightSide`, we generate both directions once.
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const slideVariantsRight = {
  hidden: { opacity: 0, x: 80, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideVariantsLeft = {
  hidden: { opacity: 0, x: -80, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Reduced-motion: fade only, no translate/scale
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
};

const dotVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const rippleVariants = {
  hidden: { scale: 0.5, opacity: 0.8 },
  visible: {
    scale: 2.8,
    opacity: 0,
    transition: { duration: 1, ease: "easeOut", delay: 0.2 },
  },
};

// Shared viewport config — defined once, reused across all motion elements
const VIEWPORT_TIGHT = { once: true, margin: "-40% 0px -40% 0px" };
const VIEWPORT_LOOSE = { once: true, margin: "-25%" };

// ─── Main component ───────────────────────────────────────────────────────────
export default function AboutValuesTimeline({ coreValues }) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const values = coreValues || [];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Pre-compute side flags and variant pairs once per values array change.
  // Avoids recalculating `index % 2` and variant lookups on every render.
  const enrichedValues = useMemo(
    () =>
      values.map((value, index) => ({
        ...value,
        index,
        isRightSide: index % 2 === 0,
        // Pick the correct directional variant at memo time, not render time
        slideVariants: index % 2 === 0 ? slideVariantsRight : slideVariantsLeft,
      })),
    [values],
  );

  if (enrichedValues.length === 0) return null;

  // When reduced motion is on, collapse all animated variants to simple fades
  const itemVariants = reducedMotion ? fadeVariants : undefined;
  const activeDotVariants = reducedMotion ? dotVariantsReduced : dotVariants;

  return (
    <section className="min-h-screen py-7 sm:py-10 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-8xl mx-auto mb-5 md:mb-7 px-8 sm:px-12">
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
          <span className="h-px w-6 bg-blue-700" />
          Core Values
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
          Principles we never <br />
          <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-500">
            compromise.
          </span>
        </h2>
      </div>

      {/* Alternating Timeline Container */}
      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10 pb-12">
        {/* Static Background Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-slate-500 to-transparent md:-translate-x-1/2 z-0" />

        {/* Animated Scrolling Line
            `useReducedMotion` doesn't disable this — it's a scroll-driven
            progress indicator, not a decorative animation, so it stays. */}
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[4px] bg-blue-800 md:-translate-x-1/2 origin-top z-10 shadow-[0_0_16px_rgba(96,165,250,0.5)] rounded-full"
        />

        <div className="flex flex-col gap-12 md:gap-0 relative z-20 pt-7">
          {enrichedValues.map(
            ({ index, isRightSide, slideVariants, ...value }) => (
              <div
                key={index}
                className={`flex items-center w-full md:py-12 ${
                  isRightSide ? "md:justify-end" : "md:justify-start"
                }`}
              >
                {/* Timeline Dot + Ripple
                  Single whileInView observer for both dot and ripple — they
                  share one IntersectionObserver instead of two. */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 z-30 flex items-center justify-center">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_TIGHT}
                    variants={activeDotVariants}
                    className="w-5 h-5 rounded-full bg-blue-700 border-[3px] border-[#0A0F1E] shadow-[0_0_0_2px_rgba(96,165,250,0.4)] relative"
                  >
                    {/* Ripple only rendered when motion is allowed — eliminates
                      a permanently-mounted animated element for reduced-motion users */}
                    {!reducedMotion && (
                      <motion.div
                        variants={rippleVariants}
                        className="absolute inset-0 rounded-full bg-blue-400 -z-10"
                      />
                    )}
                  </motion.div>
                </div>

                {/* Content block
                  Uses pre-computed `slideVariants` (right or left) from useMemo.
                  Reduced-motion: overrides with simple `fadeVariants`. */}
                <motion.div
                  variants={reducedMotion ? fadeVariants : containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_LOOSE}
                  className={`w-full pl-12 md:pl-0 md:w-[calc(50%-4rem)] lg:w-[calc(50%-6rem)] ${
                    isRightSide ? "md:mr-0" : "md:ml-0"
                  }`}
                >
                  <div className="relative z-10 flex flex-col items-start group">
                    <motion.span
                      variants={reducedMotion ? fadeVariants : slideVariants}
                      className="text-slate-400 font-mono font-bold text-sm tracking-[0.2em] mb-4 block"
                    >
                      / 0{index + 1}
                    </motion.span>

                    <motion.h3
                      variants={reducedMotion ? fadeVariants : slideVariants}
                      className="text-3xl font-semibold text-white mb-4 tracking-tight"
                    >
                      {value.title}
                    </motion.h3>

                    <motion.p
                      variants={reducedMotion ? fadeVariants : slideVariants}
                      className="text-slate-300 leading-relaxed text-lg font-light"
                    >
                      {value.desc}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
