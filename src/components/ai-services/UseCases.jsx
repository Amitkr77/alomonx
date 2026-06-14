"use client";

import React, { useState, memo, useCallback, useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight, Layers } from "lucide-react";

// --- Constants ---
const CARD_CONTAIN_STYLE = {
  contain: "layout style paint",
};
const ACCORDION_TRANSITION = "flex 350ms cubic-bezier(0.4,0,0.2,1)";

// Stable image style objects — only active/inactive states, no inline computation
const IMG_STYLE_ACTIVE = {
  transform: "scale(1.05)",
  filter: "none",
  opacity: 1,
  transition:
    "transform 350ms cubic-bezier(0.4,0,0.2,1), filter 350ms, opacity 350ms",
  willChange: "transform",
};
const IMG_STYLE_INACTIVE = {
  transform: "scale(1)",
  filter: "grayscale(30%)",
  opacity: 0.6,
  transition:
    "transform 350ms cubic-bezier(0.4,0,0.2,1), filter 350ms, opacity 350ms",
  willChange: "transform",
};

// Stable overlay style objects
const OVERLAY_STYLE_ACTIVE = {
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 200ms",
};
const OVERLAY_STYLE_INACTIVE = {
  opacity: 1,
  pointerEvents: "auto",
  transition: "opacity 200ms 200ms",
};
const EXPAND_STYLE_ACTIVE = {
  opacity: 1,
  pointerEvents: "auto",
  transition: "opacity 250ms 100ms",
};
const EXPAND_STYLE_INACTIVE = {
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 150ms",
};
const CONTENT_STYLE_ACTIVE = {
  transform: "translateY(0)",
  opacity: 1,
  transition: "transform 250ms 50ms, opacity 250ms 50ms",
};
const CONTENT_STYLE_INACTIVE = {
  transform: "translateY(20px)",
  opacity: 0,
  transition: "none",
};

const VERTICAL_TEXT_STYLE = {
  writingMode: "vertical-rl",
  transform: "rotate(180deg)",
};

// --- Sub-component: Accordion Card ---
const UseCaseCard = memo(function UseCaseCard({
  title,
  image,
  index,
  isActive,
  metaColor, // pre-resolved in parent
  label, // pre-computed "01." string
  onActivate, // pre-bound to this index in parent
}) {
  return (
    <div
      onMouseEnter={onActivate}
      onClick={onActivate}
      className="relative overflow-hidden rounded-3xl cursor-pointer group border border-white/10"
      style={{
        ...CARD_CONTAIN_STYLE,
        flex: isActive ? 5 : 1,
        transition: ACCORDION_TRANSITION,
      }}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
        sizes="(max-width: 1024px) 100vw, 30vw"
        className="object-cover"
        style={isActive ? IMG_STYLE_ACTIVE : IMG_STYLE_INACTIVE}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent" />

      {/* Inactive state */}
      <div
        className="absolute inset-0 flex items-end justify-center lg:pb-12"
        style={isActive ? OVERLAY_STYLE_ACTIVE : OVERLAY_STYLE_INACTIVE}
      >
        {/* Desktop vertical text */}
        <span
          className="hidden lg:block text-white/50 font-bold tracking-widest uppercase text-sm whitespace-nowrap group-hover:text-white transition-colors"
          style={VERTICAL_TEXT_STYLE}
        >
          {title}
        </span>

        {/* Mobile collapsed label */}
        <div className="lg:hidden w-full flex items-center justify-between px-6 pb-4">
          <span className="text-white/70 font-semibold text-sm">{label}</span>
        </div>
      </div>

      {/* Active state */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10"
        style={isActive ? EXPAND_STYLE_ACTIVE : EXPAND_STYLE_INACTIVE}
      >
        <div
          className="flex flex-col gap-4"
          style={isActive ? CONTENT_STYLE_ACTIVE : CONTENT_STYLE_INACTIVE}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white flex items-center justify-center shrink-0 ${metaColor}`}
            >
              <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-md">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
});

// --- Main Section Component ---
export default function UseCases({ useCases, meta }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Pre-resolve metaColor once
  const metaColor = meta?.color || "text-[#050505]";

  // Pre-derive all per-card data + pre-bind handlers in one pass
  const items = useMemo(() => {
    if (!useCases?.length) return [];
    return useCases.map((uc, i) => ({
      title: uc.title,
      image: uc.image,
      label: `${String(i + 1).padStart(2, "0")}.`,
      // Pre-bound handler — no arrow function needed in JSX
      onActivate: () => setActiveIndex(i),
    }));
  }, [useCases]);

  if (!items.length) return null;

  return (
    <section className="relative w-full py-16 lg:py-20 overflow-hidden isolate">
      {/* Keyframes via JSX style tag — no DOM manipulation, SSR-safe */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .uc-header { animation: fadeInUp 0.5s ease forwards; }
        @media (prefers-reduced-motion: reduce) { .uc-header { animation: none; } }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="uc-header mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-white/20" />
            <span className="text-gray-400 text-sm font-mono uppercase tracking-[0.2em] font-bold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Industries &amp; Scenarios
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Proven{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
              Use Cases.
            </span>
          </h2>
        </div>

        {/* Accordion Gallery */}
        <div className="flex flex-col lg:flex-row w-full h-[75vh] min-h-[600px] max-h-[800px] gap-2 lg:gap-4">
          {items.map(({ title, image, label, onActivate }, index) => (
            <UseCaseCard
              key={label}
              title={title}
              image={image}
              index={index}
              isActive={activeIndex === index}
              metaColor={metaColor}
              label={label}
              onActivate={onActivate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
