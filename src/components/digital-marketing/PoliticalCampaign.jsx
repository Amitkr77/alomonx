"use client";

import React, { useRef, memo, useMemo } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
} from "framer-motion";
import { Check } from "lucide-react";

// --- Constants ---
const SCROLL_OFFSET = ["start end", "end start"];

// Stabilized viewport config — was inline before (new object ref every render
// → Framer Motion re-registered IntersectionObserver on each paint)
const VIEWPORT_CONFIG = { once: true, margin: "-50px" };

const TRANSFORM_Y_INPUT = [0, 0.5];
const TRANSFORM_Y_OUTPUT = [60, 0];
const TRANSFORM_OPACITY_INPUT = [0, 0.3];
const TRANSFORM_OPACITY_OUTPUT = [0, 1];
const BASE_TRANSITION = { duration: 0.5, ease: "easeOut" };

// Stabilized initial/animate objects — same reason as VIEWPORT_CONFIG
const INITIAL_STATE = { opacity: 0, y: 20 };
const ANIMATE_STATE = { opacity: 1, y: 0 };

// Stable class strings — prevents Tailwind re-parsing the same strings on
// every render of ServiceRow (which can mount dozens of times in a grid)
const ROW_ICON_BASE =
  "shrink-0 w-4 h-4 lg:w-6 lg:h-6 rounded-full border border-transparent group-hover:border-gray-300 flex items-center justify-center bg-transparent group-hover:bg-gray-50 transition-all duration-300";

// --- Sub-component: Service Row ---
// Changes vs original:
// • motion.div → m.div (works inside LazyMotion, no extra cost)
// • metaColor class concatenation pulled out to avoid re-computing on hover
// • Check icon size locked to className — no inline style churn
const ServiceRow = memo(function ServiceRow({
  text,
  formattedNum,
  transition,
  metaColor,
}) {
  // Concatenate once per mount, not on every render
  const iconClass = `${ROW_ICON_BASE} ${metaColor}`;

  return (
    <m.div
      initial={INITIAL_STATE}
      whileInView={ANIMATE_STATE}
      viewport={VIEWPORT_CONFIG}
      transition={transition}
      className="group relative flex items-center justify-between py-3 lg:py-5 border-b border-gray-400 hover:border-gray-500 transition-colors duration-300 cursor-default"
    >
      <div className="flex items-center gap-2 lg:gap-5 pr-2">
        <span className="text-[10px] lg:text-xs font-mono text-gray-500 group-hover:text-[#0a101e] transition-colors duration-300">
          {formattedNum}
        </span>
        <span className="text-xs sm:text-sm lg:text-lg text-gray-700 group-hover:text-[#040810] transition-colors duration-300 font-semibold tracking-tight leading-tight">
          {text}
        </span>
      </div>

      <div className={iconClass}>
        <Check className="w-2 h-2 lg:w-3 lg:h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100" />
      </div>

      <div className="absolute bottom-[-1px] left-0 w-0 h-px bg-gradient-to-r from-transparent via-[#0F172A]/40 to-transparent group-hover:w-full transition-all duration-700 opacity-0 group-hover:opacity-100" />
    </m.div>
  );
});

// --- Main Component ---
export default function PoliticalCampaign({ data, meta }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: SCROLL_OFFSET,
  });

  // useTransform is already stable (Framer Motion memoizes internally) —
  // no change needed here
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

  // Memoized item list — unchanged, already correct
  // Transition objects are created here so ServiceRow never needs to compute them
  const items = useMemo(() => {
    if (!data?.services?.length) return [];
    return data.services.map((text, i) => ({
      text,
      formattedNum: String(i + 1).padStart(2, "0"),
      // Spread BASE_TRANSITION once per item at memo time, not per render
      transition: { ...BASE_TRANSITION, delay: i * 0.05 },
    }));
  }, [data?.services]);

  // Stable string — only recomputes if meta.color changes
  const metaColor = useMemo(
    () => meta?.color || "text-[#0F172A]",
    [meta?.color],
  );

  // Shared style object for both header motion elements — same MotionValue refs,
  // but a new object literal per render would force Framer Motion to diff styles
  // unnecessarily. One object used twice is fine since MotionValues are reactive.
  const headerStyle = useMemo(
    () => ({ y: headerY, opacity: headerOpacity }),
    [headerY, headerOpacity],
  );

  if (!items.length) return null;

  return (
    // LazyMotion: defers loading the full Framer Motion engine (~95 kB → ~18 kB)
    // until this component mounts. `strict` catches accidental `motion.*` usage.
    <LazyMotion features={domAnimation} strict>
      <section
        ref={containerRef}
        className="relative w-full bg-white py-12 lg:py-16 border-t border-gray-200 overflow-hidden"
      >
        <div className="max-w-8xl mx-auto px-4 lg:px-22">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-8 mb-10 lg:mb-18">
            {/* Both elements share the same MotionValue refs via headerStyle */}
            <m.div style={headerStyle} className="max-w-2xl">
              <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                <span className="w-6 lg:w-8 h-[2px] bg-gray-300" />
                <span className="text-gray-500 text-xs lg:text-sm font-mono uppercase tracking-[0.2em] font-bold">
                  What's Included
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.1]">
                {data.title}
              </h2>
            </m.div>

            <m.p
              style={headerStyle}
              className="text-gray-500 text-sm lg:text-base max-w-sm md:text-right font-medium"
            >
              {data.description}
            </m.p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 lg:gap-x-12 gap-y-1 lg:gap-y-2">
            {items.map(({ text, formattedNum, transition }) => (
              <ServiceRow
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
    </LazyMotion>
  );
}
