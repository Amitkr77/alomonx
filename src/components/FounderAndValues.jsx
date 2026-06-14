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
      className="w-full h-full [perspective:1200px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // When reducedMotion, skip all rotateX/Y transforms
        style={reducedMotion ? undefined : { rotateX, rotateY }}
        className="
          relative h-full rounded-3xl p-10 md:p-12 cursor-crosshair
          bg-gradient-to-br from-[#0f1c2e] to-[#080f1a]
          border border-white/5
          shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]
          [transform-style:preserve-3d]
          before:content-[''] before:absolute before:inset-0 before:rounded-3xl
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
          <div className="flex items-center gap-6 mb-4 [transform-style:preserve-3d]">
            <motion.img
              style={
                reducedMotion ? undefined : { transform: "translateZ(70px)" }
              }
              src={founder.image}
              alt={founder.name}
              // Lazy-load: founder cards may be below the fold
              loading="lazy"
              decoding="async"
              width={160}
              height={140}
              className="
                w-40 h-35 rounded-full object-cover flex-shrink-0
                border-2 border-white/10
                shadow-[0_20px_40px_rgba(0,0,0,0.5)]
              "
            />
            <div
              className="flex flex-col gap-1.5 [transform-style:preserve-3d]"
              style={
                reducedMotion ? undefined : { transform: "translateZ(50px)" }
              }
            >
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-sky-400">
                {founder.role}
              </span>
              <h3 className="text-2xl font-semibold text-slate-50 m-0 tracking-tight">
                {founder.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-[1.05rem] text-slate-400 leading-relaxed m-0"
            style={
              reducedMotion ? undefined : { transform: "translateZ(30px)" }
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

  // Note: <Head> from "next/head" does not work in the Next.js 15 App Router.
  // Move SEO metadata to your layout.tsx or page.tsx using:
  //   export const metadata = { title: "...", description: "..." }
  // It has been removed here to prevent silent hydration errors.

  return (
    <section className="min-h-screen py-24 pb-32">
      <div className="max-w-[1536px] mx-auto px-10">
        {/* Heading — whileInView eliminates the headingRef + useInView hook */}
        <motion.div
          className="mb-[72px] text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reducedMotion ? headingVariantsReduced : headingVariants}
          style={reducedMotion ? undefined : { perspective: 1000 }}
        >
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold text-white tracking-tight leading-[1.1] m-0">
            Meet Our Founders
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-10 items-stretch">
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
