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
      className="sticky w-full border border-white/10 bg-[#0a0a0a] rounded-2xl sm:rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row mb-5"
      style={{ top: topOffset }}
    >
      {/* LEFT SIDE: Text Details */}
      <div className="w-full md:w-[70%] lg:w-[75%] p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-blue-700 font-mono font-bold text-lg">
            {point.id || `0${index + 1}`}
          </span>
          {point.subtitle && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-400">
                {point.subtitle}
              </span>
            </>
          )}
        </div>

        <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4 tracking-tight">
          {point.title}
        </h3>

        <p className="text-gray-400 leading-relaxed text-base sm:text-md font-light max-w-xl">
          {point.desc}
        </p>
      </div>

      {/* RIGHT SIDE: Lazy-loaded Image */}
      <div className="w-full md:w-[40%] lg:w-[35%] min-h-[250px] md:min-h-full relative border-t md:border-t-0 md:border-l border-white/10">
        <div className="absolute inset-0 p-3 sm:p-5 lg:p-6">
          <div className="w-full h-full relative rounded-xl overflow-hidden bg-black group">
            <img
              src={imgSrc}
              alt={point.title}
              // Lazy-load: browser won't fetch until card is near the viewport.
              // First card could arguably be "eager" but since these are stacked
              // and the first is already visible, lazy is fine — it's a low-cost
              // image and the browser will fetch it immediately.
              loading="lazy"
              decoding="async"
              // Explicit aspect ratio prevents layout shift while loading
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

  // Pre-compute all sticky top offsets once — not on every render.
  // Returns a stable array as long as points.length doesn't change.
  const topOffsets = useMemo(
    () => points.map((_, i) => `calc(15vh + ${i * 40}px)`),
    [points.length], // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (points.length === 0) return null;

  return (
    <section className="min-h-screen py-14 sm:py-20 px-4 sm:px-6 relative">
      {/* Header Section */}
      <div className="max-w-8xl mx-auto mb-10 md:mb-16 px-8 sm:px-12">
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
          <span className="h-px w-6 bg-blue-700" />
          Who We Are
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
          Four pillars that define <br />
          <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-500">
            our foundation.
          </span>
        </h2>
      </div>

      {/* Stacked Cards Container */}
      <div className="max-w-8xl mx-auto relative pb-8 px-8 sm:px-12">
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
