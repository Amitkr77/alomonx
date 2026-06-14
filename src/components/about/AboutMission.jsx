"use client";

import { motion, useReducedMotion } from "framer-motion";
import { memo, useMemo } from "react";

// ─── Fallback images (module-level constant, never re-created) ────────────────
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
];

// ─── Animation variants (module-level, never re-created) ──────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

// ─── Memoized card — only re-renders if its own props change ─────────────────
const MissionCard = memo(function MissionCard({
  point,
  index,
  topOffset,
  reducedMotion,
}) {
  const imgSrc = point.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

  return (
    <motion.div
      key={point.id || index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={reducedMotion ? cardVariantsReduced : cardVariants}
      // UPDATED: Scaled down border-radius and margin for mobile/tablet
      className="sticky w-full border border-white/10 bg-[#0a0a0a] rounded-xl sm:rounded-2xl lg:rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row mb-3 sm:mb-5"
      style={{ top: topOffset }}
    >
      {/* LEFT SIDE: Text Details */}
      {/* UPDATED: Scaled down padding for smaller screens */}
      <div className="w-full md:w-[60%] lg:w-[75%] p-5 sm:p-8 lg:p-12 flex flex-col justify-center">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          {/* UPDATED: Font size adjustments */}
          <span className="text-blue-700 font-mono font-bold text-base lg:text-lg">
            {point.id || `0${index + 1}`}
          </span>
          {point.subtitle && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="text-[10px] sm:text-xs lg:text-sm font-semibold tracking-widest uppercase text-gray-400">
                {point.subtitle}
              </span>
            </>
          )}
        </div>

        {/* UPDATED: Title font size adjustments */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-white mb-2 sm:mb-4 tracking-tight">
          {point.title}
        </h3>

        {/* UPDATED: Description font size adjustments */}
        <p className="text-gray-400 leading-relaxed text-sm lg:text-base lg:text-md font-light max-w-xl">
          {point.desc}
        </p>
      </div>

      {/* RIGHT SIDE: Lazy-loaded Image */}
      {/* UPDATED: Reduced minimum height of image on mobile */}
      <div className="w-full md:w-[40%] lg:w-[35%] min-h-[180px] sm:min-h-[250px] md:min-h-full relative border-t md:border-t-0 md:border-l border-white/10">
        {/* UPDATED: Image padding and border radius adjustments */}
        <div className="absolute inset-0 p-3 sm:p-5 lg:p-6">
          <div className="w-full h-full relative rounded-lg sm:rounded-xl overflow-hidden bg-black group">
            <img
              src={imgSrc}
              alt={point.title}
              loading="lazy"
              decoding="async"
              width={400}
              height={300}
              className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-color pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// ─── Main component ───────────────────────────────────────────────────────────
export default function AboutMissionStacked({ missionPoints }) {
  const points = missionPoints || [];
  const reducedMotion = useReducedMotion();

  // UPDATED: Pre-compute offsets using dynamic CSS variables instead of hard-coded pixels.
  // This allows us to inject responsive spacing classes directly into the container.
  const topOffsets = useMemo(
    () =>
      points.map(
        (_, i) => `calc(var(--stack-start) + calc(var(--stack-gap) * ${i}))`,
      ),
    [points.length],
  );

  if (points.length === 0) return null;

  return (
    <section
      // UPDATED: Section padding scaled, and CSS variables added for responsive sticky stacking
      className="min-h-screen py-10 sm:py-14 lg:py-20 px-4 sm:px-6 relative [--stack-start:10vh] sm:[--stack-start:12vh] lg:[--stack-start:15vh] [--stack-gap:16px] sm:[--stack-gap:24px] lg:[--stack-gap:40px]"
    >
      {/* Header Section */}
      <div className="max-w-8xl mx-auto mb-8 sm:mb-10 md:mb-16 px-2 sm:px-8 lg:px-12">
        <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-3 sm:mb-4">
          <span className="h-px w-4 sm:w-6 bg-blue-700" />
          Who We Are
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight tracking-tight">
          Four pillars that define <br className="hidden sm:block" />
          <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-500">
            our foundation.
          </span>
        </h2>
      </div>

      {/* Stacked Cards Container */}
      <div className="max-w-8xl mx-auto relative pb-8 px-2 sm:px-8 lg:px-12">
        {points.map((point, index) => (
          <MissionCard
            key={point.id || index}
            point={point}
            index={index}
            topOffset={topOffsets[index]}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </section>
  );
}
