"use client";

import React, { useRef, memo, useCallback } from "react";
import {
  Monitor,
  Smartphone,
  Globe,
  Terminal,
  Palette,
  Megaphone,
  Briefcase,
  Brain,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { allServices } from "@/lib/services-data";

// ─────────────────────────────────────────────────────────────
// Icon map — resolved at module level, never rebuilt
// ─────────────────────────────────────────────────────────────
const ICON_MAP = {
  Globe,
  Monitor,
  Smartphone,
  Terminal,
  Palette,
  Megaphone,
  Briefcase,
  Brain,
};

// ─────────────────────────────────────────────────────────────
// Derived display list — computed ONCE at module load.
// Previously this .map() ran on every render of the parent
// that imported Services, because it lived at module scope
// but referenced allServices which may be re-evaluated.
// Wrapping in a function and calling it once is the safest
// pattern: immune to HMR double-evaluation quirks.
// ─────────────────────────────────────────────────────────────
const services = (() =>
  allServices.slice(0, 8).map((svc, index) => ({
    id: svc.slug,
    title: svc.label,
    // CHANGE: Truncate once here, not on every render
    description:
      svc.details.overview.length > 80
        ? svc.details.overview.slice(0, 80).trimEnd() + "…"
        : svc.details.overview,
    badgeNumber: String(index + 1).padStart(2, "0"),
    slug: svc.href,
    Icon: ICON_MAP[svc.icon] ?? Globe,
  })))();

// ─────────────────────────────────────────────────────────────
// Module-level static style objects
// Prevents new object allocation on every render.
// ─────────────────────────────────────────────────────────────
const GLOW_STYLE = {
  background:
    "radial-gradient(circle at top left, rgba(59,130,246,0.08), transparent 60%)",
};

// CHANGE: useTransform's input/output arrays must be stable
// references or Framer Motion rebuilds the interpolator every
// frame. Define them once here.
const SCROLL_INPUT = [0, 1];
const SCROLL_OUTPUT = ["calc(-0% + 0vw)", "calc(-100% + 100vw)"];
// NOTE: The original used a function transformer:
//   (value) => `calc(-${value * 100}% + ${value * 100}vw)`
// This is recalculated every single scroll event.
// useTransform with input/output arrays uses a built-in
// linear interpolator that runs in Framer Motion's internal
// scheduler — significantly cheaper per frame.

// ─────────────────────────────────────────────────────────────
// openServicesMenu — module-level so it's never recreated.
// In the original this was also module-level which is correct.
// Kept here for clarity.
// ─────────────────────────────────────────────────────────────
function openServicesMenu() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent("open-services-menu"));
  }, 400);
}

// ─────────────────────────────────────────────────────────────
// ServiceCard
// CHANGE: Extract the footer link into its own memoised
// sub-component so hovering the arrow button doesn't force the
// entire card to re-render (React reconciles from the changed
// node downward).
// ─────────────────────────────────────────────────────────────
const CardLink = memo(function CardLink({ slug }) {
  return (
    <Link href={slug} className="group/button flex items-center gap-2 md:gap-3">
      <span className="uppercase tracking-[0.2em] text-[10px] md:text-[12px] font-semibold text-black">
        Explore
      </span>
      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center transition-all duration-300 group-hover/button:bg-blue-600 group-hover/button:rotate-45">
        <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-white" />
      </div>
    </Link>
  );
});

const ServiceCard = memo(function ServiceCard({ service }) {
  const { Icon, title, description, badgeNumber, slug } = service;

  return (
    <div
      className="
        relative
        w-[80vw] md:w-[440px] lg:w-[480px]
        h-[300px] md:h-full md:min-h-[380px]
        rounded-[24px] md:rounded-[40px]
        border border-black/5
        bg-white
        overflow-hidden
        flex flex-col
        p-5 md:p-8
        shrink-0
        group
        shadow-[0_20px_80px_rgba(255,255,255,0.05)]
        transition-transform duration-[350ms] ease-out
        hover:-translate-y-[10px]
        will-change-transform
      "
    >
      {/* Glow — opacity toggled by CSS group-hover, zero JS */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={GLOW_STYLE}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 h-full min-h-0">
        <div className="flex items-start justify-between mb-4 md:mb-6 shrink-0">
          {/* Icon box */}
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-[12px] md:rounded-[20px] bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <Icon
              strokeWidth={1.5}
              className="w-6 h-6 md:w-7 md:h-7 text-gray-600"
            />
          </div>
          <div className="text-[11px] md:text-[13px] tracking-[0.3em] font-bold text-gray-400">
            {badgeNumber}
          </div>
        </div>

        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <h3 className="text-[22px] md:text-[36px] leading-[1.1] tracking-[-0.04em] font-black text-black line-clamp-2 shrink-0">
            {title}
          </h3>
          <p className="mt-2 md:mt-3 text-[13px] md:text-[16px] leading-[1.5] md:leading-[1.6] text-gray-600">
            {description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between pt-3 md:pt-5 mt-auto border-t border-black/10 shrink-0">
        <span className="uppercase tracking-[0.3em] text-[9px] md:text-[12px] font-semibold text-gray-500">
          Premium Service
        </span>
        {/* Memoised separately so its hover state is isolated */}
        <CardLink slug={slug} />
      </div>

      {/* Background watermark number — aria-hidden, pointer-events-none */}
      <div
        aria-hidden="true"
        className="absolute right-2 bottom-2 text-[100px] md:text-[180px] font-black leading-none opacity-[0.03] pointer-events-none select-none text-black z-0"
      >
        {badgeNumber}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// CardsTrack — isolated into its own memoised component.
// CHANGE: The scroll-driven `x` MotionValue updates on every
// scroll event. If the track lives inside the same render tree
// as the header, a Framer Motion internal subscription update
// can trigger a React re-render that touches the header too.
// Isolating the track means only this subtree subscribes to `x`.
// ─────────────────────────────────────────────────────────────
const CardsTrack = memo(function CardsTrack({ x }) {
  return (
    <div className="flex-1 w-full relative flex items-center min-h-0 py-2 md:py-10 z-20">
      <motion.div
        style={{ x }}
        // CHANGE: Add `layout={false}` to skip Framer Motion's
        // layout measurement on this element — it's driven purely
        // by scroll, so layout animations aren't needed and
        // measuring it every frame is wasted work.
        layout={false}
        className="flex items-center w-max h-full max-h-[360px] md:max-h-[500px] gap-2 md:gap-8 px-[6vw] lg:px-[8vw]"
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </motion.div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// SectionHeader — isolated so it never re-renders when scroll
// changes (it has no scroll-dependent props).
// ─────────────────────────────────────────────────────────────
const SectionHeader = memo(function SectionHeader() {
  return (
    <div className="w-full px-4 lg:px-10 pt-14 md:pt-20 shrink-0 z-30">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-10">
          <div className="max-w-[1200px]">
            <h2 className="text-[28px] md:text-[50px] lg:text-[70px] leading-[1.1] md:leading-[0.90] tracking-[-0.03em] font-black text-white">
              Building The Infrastructure
              <br />
              Of Tomorrow.
            </h2>
          </div>
          <button
            type="button"
            onClick={openServicesMenu}
            className="group inline-flex items-center gap-2 md:gap-4 shrink-0 lg:mb-2"
          >
            <span className="text-[10px] md:text-[14px] uppercase tracking-[0.25em] font-bold text-white">
              View All Services
            </span>
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-black" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// ScrollHint — static, never changes
// ─────────────────────────────────────────────────────────────
const ScrollHint = memo(function ScrollHint() {
  return (
    <div className="w-full flex justify-center items-center gap-3 md:gap-4 z-30 pb-6 md:pb-8 shrink-0">
      <div className="w-8 md:w-16 h-[1px] bg-white/20" />
      <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-semibold text-white/60">
        Scroll Down
      </span>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────
const Services = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // CHANGE: Use array-based useTransform instead of a function
  // transformer. The array form uses Framer Motion's built-in
  // linear interpolation which runs in its optimised animation
  // scheduler rather than calling a JS function per frame.
  const x = useTransform(scrollYProgress, SCROLL_INPUT, SCROLL_OUTPUT);

  return (
    <section ref={targetRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between overflow-hidden">
        <SectionHeader />
        <CardsTrack x={x} />
        <ScrollHint />
      </div>
    </section>
  );
};

export default Services;
