"use client";
import React, { memo, useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Static data — module level, never recreated
// ─────────────────────────────────────────────────────────────
const TESTIMONIALS_DATA = [
  {
    name: "Hemnarayan Singh",
    role: "BJP State Leader",
    quote:
      "Alomonx Technology played a crucial role in managing and executing our digital campaign. Their team was proactive, creative, and deeply committed to our vision. From social media strategy to ground-level voter engagement through digital channels, their work helped amplify our message effectively.",
  },
  {
    name: "Vikash Bhardwaj",
    role: "CEO, Suvidha Events",
    quote:
      "Working with Alomonx Technology has been a great experience. Their digital marketing team understood our event business requirements and helped us improve our online presence through creative social media campaigns, engaging content, and targeted promotions.",
  },
  {
    name: "Tech Altum Institute",
    role: "Tech Altum Institute",
    quote:
      "Alomonx Technology has helped us improve our online presence and generate more student inquiries through smart digital marketing. Their team is professional, creative, and result-oriented. We're happy with the outcome!",
  },
  {
    name: "Dr. Parvinder Singh",
    role: "Owner, Gad Advance Clinic",
    quote:
      "Working with Alomonx was a great experience. They created a clean, professional, and easy-to-use website for GAD Advance Clinic that perfectly reflects our services. The team was supportive throughout the process and delivered everything on time.",
  },
  {
    name: "Sahal Khan",
    role: "Restaurant Owner",
    quote:
      "The digital marketing services provided by Alomonx Technology have been exceptional. Their team organized our Google My Business profile and manages post creation, which has significantly improved our online presence and helped us reach more customers.",
  },
  {
    name: "Parth",
    role: "Co-founder, Shree Kashi Laddoo & Namkeen",
    quote:
      "Working with Alomonx has been a great experience. They helped us build our e-commerce website and supported us with digital marketing to grow our online presence. The team was easy to work with, responsive, and always ready to help.",
  },
];

// Duplicate once — stable keys prevent React reconciliation issues
const MARQUEE_ITEMS = [
  ...TESTIMONIALS_DATA.map((t, i) => ({ ...t, _key: `orig-${i}` })),
  ...TESTIMONIALS_DATA.map((t, i) => ({ ...t, _key: `clone-${i}` })),
];

// Pre-built star index array — allocated once
const FIVE_STARS = Array.from({ length: 5 }, (_, i) => i);

// ─────────────────────────────────────────────────────────────
// Framer Motion constants — stable references prevent
// Framer's deep-compare from scheduling unnecessary updates
// ─────────────────────────────────────────────────────────────
const MARQUEE_ANIMATE = { x: ["0%", "-50%"] };
const MARQUEE_TRANSITION = { repeat: Infinity, ease: "linear", duration: 50 };

// CHANGE: `duration: 0` actually causes Framer to fire an instant
// animation on every re-render. Use `duration: 999999` instead —
// effectively paused but without the frame-0 jump.
const MARQUEE_TRANSITION_REDUCED = {
  repeat: Infinity,
  ease: "linear",
  duration: 999999,
};

// CHANGE: Hoist the marquee style + mask to a single module-level
// object. The original split it into two separate inline objects
// (`style` on the wrapper div + `style` on the motion div), both
// recreated every render. One constant covers both concerns.
const MARQUEE_WRAPPER_STYLE = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
  maskImage:
    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
};

const MARQUEE_TRACK_STYLE = { willChange: "transform" };

// CHANGE: Pause/resume animate targets as stable objects.
// Using `{ animationPlayState: "paused" }` inline causes a new
// object every render. Constants are zero-cost after first load.
const MARQUEE_RUNNING = {}; // no override — uses MARQUEE_ANIMATE
const PAUSED_STYLE = { animationPlayState: "paused" }; // CSS fallback

// ─────────────────────────────────────────────────────────────
// TestimonialCard — memoised
// CHANGE: Added aria-label to the star group so screen readers
// announce "5 stars" instead of reading 5 individual unlabelled
// SVG icons. Small accessibility win, zero perf cost.
// ─────────────────────────────────────────────────────────────
const TestimonialCard = memo(function TestimonialCard({ t }) {
  return (
    <article
      className="relative bg-[#151515] border border-gray-800 rounded-xl p-4 sm:p-6 flex flex-col w-[300px] sm:w-[400px] shrink-0 hover:border-gray-600 transition-colors duration-300"
      // CHANGE: Use <article> — a testimonial is a self-contained
      // piece of content. Improves semantic HTML and screen reader
      // landmark navigation with zero visual change.
    >
      {/* Top Row */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
          Client
        </span>
        {/* CHANGE: aria-label on the group, aria-hidden on each icon */}
        <div
          className="flex space-x-1"
          role="img"
          aria-label="5 out of 5 stars"
        >
          {FIVE_STARS.map((i) => (
            <Star
              key={i}
              aria-hidden="true"
              className="w-3.5 h-3.5 fill-orange-500 text-orange-500"
            />
          ))}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-sm flex-grow">
        {/* CHANGE: <blockquote> is the correct semantic element for
            a quoted testimonial. No visual change. */}
        "{t.quote}"
      </blockquote>

      {/* Author */}
      <footer className="border-t border-gray-800 pt-4 sm:pt-6 mt-auto">
        <h3 className="text-base font-semibold text-white">{t.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{t.role}</p>
      </footer>

      {/* Bottom cyan glow — aria-hidden: decorative only */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-cyan-500/50 blur-[4px]"
      />
    </article>
  );
});

// ─────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────
const Testimonials = () => {
  const prefersReduced = useReducedMotion();

  // CHANGE: Pause marquee on hover — better UX for users who want
  // to read a card without it scrolling away. Uses Framer Motion's
  // `animate` prop toggled by a stable boolean → stable object ref.
  const [isPaused, setIsPaused] = useState(false);
  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  // Combine reduced-motion preference with hover pause
  const shouldPause = prefersReduced || isPaused;

  return (
    <section
      className="py-10 sm:py-16 bg-[#0a0a0a] text-white font-sans overflow-hidden"
      // CHANGE: aria-label on the section gives screen reader users
      // a named landmark to navigate to directly.
      aria-label="Client testimonials"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-gray-800 pb-8">
          <div>
            <span className="text-blue-900 text-sm font-bold tracking-[0.2em] uppercase mb-3 block">
              Reviews
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              What they think about us :
            </h2>
          </div>
          <p className="mt-6 md:mt-0 text-sm text-white max-w-xl md:text-right leading-relaxed">
            Real feedback from companies that choose us for their digital
            strategies and campaign execution. Hear from our clients who have
            transformed their presence.
          </p>
        </div>

        {/* Scrolling Marquee */}
        <div
          className="relative w-full overflow-hidden"
          style={MARQUEE_WRAPPER_STYLE}
          // CHANGE: Attach pause handlers to the wrapper so the
          // entire visible area (including card gaps) triggers pause.
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="flex gap-6 pr-6 w-max"
            animate={MARQUEE_ANIMATE}
            transition={
              shouldPause ? MARQUEE_TRANSITION_REDUCED : MARQUEE_TRANSITION
            }
            style={MARQUEE_TRACK_STYLE}
          >
            {MARQUEE_ITEMS.map((t) => (
              <TestimonialCard key={t._key} t={t} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
