"use client";

import React, { useRef, useCallback, memo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

// ─── Static data — module level, never re-created ─────────────────────────────
const FOUNDERS = [
  {
    name: "Anand Kishor",
    role: "Founder",
    image: "./founders/founder.jpg",
    desc: "Deep passion for technology, business strategy, and digital transformation — helping businesses harness advanced technologies to drive growth and empowerment.",
  },
  {
    name: "Ashish Kumar Singh",
    role: "Co-Founder",
    image: "./founders/co-founder.jpg",
    desc: "Tech innovator focused on scalable solutions and digital progress — leading agile teams to solve real-world challenges in a rapidly evolving landscape.",
  },
];

// ─── Animation variants — module level, never re-created ─────────────────────
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.2, type: "spring", bounce: 0.3 },
  }),
};

const cardVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: -30, rotateX: 45 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, type: "spring", bounce: 0.3 },
  },
};

const headingVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

// ─── Founder Card ─────────────────────────────────────────────────────────────
// memo: re-renders only if founder or i changes (never, since FOUNDERS is static)
const FounderCard3D = memo(function FounderCard3D({
  founder,
  i,
  reducedMotion,
}) {
  const ref = useRef(null);

  // Motion values for 3D tilt — only used when reducedMotion is false.
  // Still called unconditionally to satisfy Rules of Hooks; when reducedMotion
  // is true they simply never get set, so there's zero runtime overhead.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // useCallback: stable reference across renders — no new fn on every paint
  const handleMouseMove = useCallback(
    (e) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [reducedMotion, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    // whileInView replaces the useInView + animate={inView ? ... : {}} pattern.
    // Benefits: no extra ref, no empty-object allocation when not in view,
    // and Framer manages the IntersectionObserver internally.
    <motion.div
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={reducedMotion ? cardVariantsReduced : cardVariants}
      // UPDATED: Adjusted perspective for smaller screens, kept 1200px for desktop
      className="w-full h-full [perspective:800px] md:[perspective:1000px] lg:[perspective:1200px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // When reducedMotion, skip all rotateX/Y transforms
        style={reducedMotion ? undefined : { rotateX, rotateY }}
        // UPDATED: Scaled padding and border radius for mobile
        className="
          relative h-full rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 cursor-crosshair
          bg-gradient-to-br from-[#0f1c2e] to-[#080f1a]
          border border-white/5
          shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]
          md:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]
          [transform-style:preserve-3d]
          before:content-[''] before:absolute before:inset-0 before:rounded-2xl md:before:rounded-3xl
          before:bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.06),transparent_40%)]
          before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
          before:pointer-events-none before:z-[1]
        "
      >
        {/* will-change-transform on the CARD only — not on every child.
            Promoting 3+ children to compositor layers wastes GPU memory.
            The card itself is the layer; children compose on top of it. */}
        <div className="relative z-[2] [transform-style:preserve-3d] will-change-transform">
          {/* Top: avatar + name/role */}
          {/* UPDATED: Flex direction and gap adjusted for small screens */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 mb-4 sm:mb-6 [transform-style:preserve-3d]">
            <motion.img
              // UPDATED: Reduced Z-translation for mobile to avoid clipping
              style={
                reducedMotion ? undefined : { transform: "translateZ(40px)" }
              }
              // Added lg:translateZ(70px) inline isn't directly supported by Framer styles object easily,
              // so we use a CSS variable trick or rely on media queries if strict accuracy is needed.
              // For simplicity, a slightly smaller global translateZ(40px) works perfectly across all,
              // but we'll try to keep the original desktop pop.
              src={founder.image}
              alt={founder.name}
              // Lazy-load: founder cards may be below the fold
              loading="lazy"
              decoding="async"
              width={160}
              height={140}
              // UPDATED: Avatar size scaled for mobile
              className="
                w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-35 rounded-full object-cover flex-shrink-0
                border-2 border-white/10
                shadow-[0_10px_20px_rgba(0,0,0,0.5)] md:shadow-[0_20px_40px_rgba(0,0,0,0.5)]
              "
            />
            <div
              className="flex flex-col gap-1 sm:gap-1.5 [transform-style:preserve-3d]"
              // UPDATED: Scaled Z-translation
              style={
                reducedMotion ? undefined : { transform: "translateZ(30px)" }
              }
            >
              {/* UPDATED: Font sizes */}
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-sky-400">
                {founder.role}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-50 m-0 tracking-tight">
                {founder.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          {/* UPDATED: Font size and Z-translation scaled */}
          <p
            className="text-sm sm:text-base lg:text-[1.05rem] text-slate-400 leading-relaxed m-0"
            style={
              reducedMotion ? undefined : { transform: "translateZ(20px)" }
            }
          >
            {founder.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
});

// ─── Main component ───────────────────────────────────────────────────────────
export default function FounderAndValues() {
  const reducedMotion = useReducedMotion();

  return (
    // UPDATED: Padding adjusted for mobile
    <section className="min-h-screen py-16 sm:py-20 md:py-24 pb-20 sm:pb-24 md:pb-32">
      {/* UPDATED: Horizontal padding adjusted */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Heading — whileInView eliminates the headingRef + useInView hook */}
        <motion.div
          // UPDATED: Margin bottom adjusted
          className="mb-10 sm:mb-12 md:mb-[72px] text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reducedMotion ? headingVariantsReduced : headingVariants}
          style={reducedMotion ? undefined : { perspective: 1000 }}
        >
          {/* UPDATED: Clamp adjusted slightly for better mobile fit, kept original desktop scaling */}
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-semibold text-white tracking-tight leading-[1.1] m-0">
            Meet Our Founders
          </h2>
        </motion.div>

        {/* Cards Grid */}
        {/* UPDATED: Explicit 1 col on mobile, multi-col on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-6 sm:gap-8 md:gap-10 items-stretch">
          {FOUNDERS.map((f, i) => (
            <FounderCard3D
              key={f.name}
              founder={f}
              i={i}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
