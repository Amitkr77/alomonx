"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { memo, useMemo } from "react";

// ─── Fallback images (module-level, never re-created) ────────────────────────
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

// ─── Stable viewport config (module-level, never re-created) ─────────────────
// Previously created inline on every render → new object reference every time
// → Framer Motion re-registered the IntersectionObserver unnecessarily.
const VIEWPORT_CONFIG = { once: true, margin: "-5%" };

// ─── Stable class strings (module-level) ─────────────────────────────────────
// Prevents Tailwind from re-parsing the same long string on every render.
const CARD_CLASS =
  "sticky w-full border border-white/10 bg-[#0a0a0a] rounded-xl sm:rounded-2xl lg:rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row mb-3 sm:mb-5";

const IMG_WRAPPER_CLASS =
  "w-full h-full relative rounded-lg sm:rounded-xl overflow-hidden bg-black group";

// ─── Memoized card ────────────────────────────────────────────────────────────
// • useReducedMotion moved inside — avoids prop-drilling an unstable boolean
//   and prevents the parent from re-rendering all cards on preference change.
// • Removed the redundant `key` prop on the inner motion element (already
//   keyed by the parent map — double-keying forces unnecessary reconciliation).
// • Added fetchPriority + sizes on <img> so the browser fetches the right
//   resolution and doesn't stall the LCP image.
const PackageCard = memo(function PackageCard({ pkg, index, topOffset }) {
  const reducedMotion = useReducedMotion();
  const imgSrc = pkg.image ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={reducedMotion ? cardVariantsReduced : cardVariants}
      className={CARD_CLASS}
      style={{ top: topOffset }}
    >
      {/* LEFT: Text */}
      <div className="w-full md:w-[60%] lg:w-[75%] p-5 sm:p-8 lg:p-12 flex flex-col justify-center">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="text-blue-700 font-mono font-bold text-base lg:text-lg">
            {`0${index + 1}`}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span className="text-[10px] sm:text-xs lg:text-sm font-semibold tracking-widest uppercase text-gray-400">
            Package Details
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-white mb-2 sm:mb-4 tracking-tight">
          {pkg.title}
        </h3>

        <p className="text-gray-400 leading-relaxed text-sm lg:text-base font-light max-w-xl">
          {pkg.description}
        </p>
      </div>

      {/* RIGHT: Image */}
      <div className="w-full md:w-[40%] lg:w-[35%] min-h-[180px] sm:min-h-[250px] md:min-h-full relative border-t md:border-t-0 md:border-l border-white/10">
        <div className="absolute inset-0 p-3 sm:p-5 lg:p-6">
          <div className={IMG_WRAPPER_CLASS}>
            <img
              src={imgSrc}
              alt={pkg.title}
              loading="lazy"
              decoding="async"
              // fetchPriority: first card is likely in-view on load → eager;
              // rest stay lazy so they don't compete with LCP resources.
              fetchPriority={index === 0 ? "high" : "low"}
              // sizes: tells the browser the rendered width at each breakpoint
              // so it doesn't download a full-width image for a 35% column.
              sizes="(max-width: 768px) 100vw, 35vw"
              width={400}
              height={300}
              className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-color pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </m.div>
  );
});

// ─── Title word splitter — memoized helper ────────────────────────────────────
// Previously ran `data.title.split(" ").map(...)` on every render of the
// parent. Now computed once and stable as long as the title string doesn't
// change.
function useTitleWords(title) {
  return useMemo(() => {
    const words = (title ?? "").split(" ");
    return words.map((word, i) =>
      i === words.length - 1 ? (
        <span
          key={i}
          className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-500"
        >
          {" "}
          {word}
        </span>
      ) : (
        <span key={i}>{word} </span>
      ),
    );
  }, [title]);
}

// ─── Main component ───────────────────────────────────────────────────────────
// Wrapped in LazyMotion so only the domAnimation feature set (~18 kB instead
// of ~95 kB full bundle) is loaded. `m` is the lightweight motion element.
export default function CampaignPackages({ data }) {
  const packages = data?.packages ?? [];
  const titleWords = useTitleWords(data?.title);

  // Pre-compute CSS calc strings. Dep is `packages.length` — correct because
  // the array identity can change while length stays the same.
  const topOffsets = useMemo(
    () =>
      packages.map(
        (_, i) => `calc(var(--stack-start) + calc(var(--stack-gap) * ${i}))`,
      ),
    [packages.length], // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (packages.length === 0) return null;

  return (
    // LazyMotion defers loading the full Framer Motion animation engine until
    // this component actually mounts — keeps the initial JS bundle lean.
    <LazyMotion features={domAnimation} strict>
      <section className="bg-black min-h-screen py-10 sm:py-14 lg:py-20 px-4 sm:px-6 relative [--stack-start:10vh] sm:[--stack-start:12vh] lg:[--stack-start:15vh] [--stack-gap:16px] sm:[--stack-gap:24px] lg:[--stack-gap:40px]">
        {/* Header */}
        <div className="max-w-8xl mx-auto mb-8 sm:mb-10 md:mb-16 px-2 sm:px-8 lg:px-12">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-3 sm:mb-4">
            <span className="h-px w-4 sm:w-6 bg-blue-700" />
            Our Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight tracking-tight">
            {titleWords}
          </h2>
        </div>

        {/* Stacked cards */}
        <div className="max-w-8xl mx-auto relative pb-8 px-2 sm:px-8 lg:px-12">
          {packages.map((pkg, index) => (
            <PackageCard
              key={pkg.id ?? index}
              pkg={pkg}
              index={index}
              topOffset={topOffsets[index]}
            />
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}
