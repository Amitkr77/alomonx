"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";

export default function KeyBenefits({ benefits = [] }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // OPTIMIZATION 1: Use a ref to track the index and prevent React state spam
  const currentIndexRef = useRef(0);

  const totalItems = benefits.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // OPTIMIZATION 2: Apply a physics spring to the scroll progress for fluid momentum
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // OPTIMIZATION 3: Map rotation directly to the scroll spring (bypasses React state)
  const rotation = useTransform(smoothProgress, [0, 1], [0, 360]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!totalItems) return;

    const step = 1 / totalItems;
    let index = Math.floor(latest / step);

    if (index >= totalItems) {
      index = totalItems - 1;
    }

    // Only trigger a React re-render if the index has ACTUALLY changed
    if (index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      setActiveIndex(index);
    }
  });

  if (!benefits?.length) return null;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height: `${totalItems * 100}vh`,
      }}
    >
      {/* Adjust top-[80px] and calc(100vh - 80px) to match your exact header height */}
      <div className="sticky top-[80px] h-[calc(105vh-80px)] w-full overflow-hidden flex flex-col lg:block">
        {/* AMBIENT GLOW - Simplified for better paint performance */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/5 blur-[80px] rounded-full pointer-events-none" />

        {/* MOBILE PROGRESS BAR */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-1 bg-white/10 z-50">
          <motion.div
            className="h-full bg-white will-change-transform"
            style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
          />
        </div>

        {/* LEFT CIRCLE */}
        <div className="hidden lg:block absolute left-[-320px] top-1/2 -translate-y-1/2 z-0 pointer-events-none">
          <div className="relative w-[640px] h-[640px]">
            <div className="absolute inset-4 bg-white/[0.01] backdrop-blur-2xl rounded-full border border-white/5 shadow-[inset_0_0_100px_rgba(255,255,255,0.02)]" />

            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 w-full h-full text-white/20 opacity-60"
            >
              <circle
                cx="100"
                cy="100"
                r="98"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.25"
                strokeDasharray="0.5 3"
              />
              <circle
                cx="100"
                cy="100"
                r="98"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="0 39.2 0.5 0"
              />
            </svg>

            {/* DIRECT SCROLL-DRIVEN ROTATION */}
            <motion.div
              style={{ rotate: rotation }}
              className="absolute inset-4 will-change-transform"
            >
              <div
                className="absolute inset-0 rounded-full opacity-60"
                style={{
                  background:
                    "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.08) 90deg, transparent 90deg)",
                }}
              />

              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              >
                <defs>
                  <linearGradient
                    id="cometTail"
                    x1="50%"
                    y1="0%"
                    x2="100%"
                    y2="50%"
                  >
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 100 1 A 99 99 0 0 1 199 100"
                  fill="none"
                  stroke="url(#cometTail)"
                  strokeWidth="1.5"
                />
              </svg>

              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 flex items-center justify-center">
                <div className="absolute w-12 h-12 rounded-full bg-white/10 blur-md" />
                <div className="absolute w-5 h-5 rounded-full border border-white/40 bg-[#050505]" />
                <div className="relative w-2 h-2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.9)]" />
              </div>
            </motion.div>

            {/* Typography */}
            <div className="absolute left-[360px] top-1/2 -translate-y-1/2 flex flex-col items-start gap-5">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/40" />
                <div className="text-[14px] tracking-[0.4em] uppercase text-white/50 font-medium">
                  Key Benefits
                </div>
              </div>

              <div className="flex items-start gap-4 ml-11">
                <span className="text-white text-7xl font-light tabular-nums tracking-tighter leading-none">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-col mt-1 gap-1 text-white/30 font-mono tracking-widest">
                  <span className="uppercase text-[9px]">Total</span>
                  <span className="text-lg text-white/50">
                    {String(totalItems).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 ml-11 mt-2">
                {benefits.map((_, i) => (
                  <div
                    key={i}
                    className={`h-[2px] rounded-full transition-all duration-500 ease-out ${
                      i === activeIndex ? "w-8 bg-white" : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="h-full flex items-center justify-center lg:justify-start w-full relative z-20 pointer-events-none">
          <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:pl-[480px] lg:pr-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col relative pointer-events-auto will-change-transform"
              >
                <div className="hidden md:block absolute -left-8 top-2 w-[3px] h-12 bg-gradient-to-b from-white to-transparent rounded-full" />

                <div className="text-xs uppercase tracking-[0.35em] text-white/50 mb-6 font-mono flex items-center gap-4">
                  <span className="text-white/40 lg:hidden bg-white/10 px-3 py-1 rounded-full">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(totalItems).padStart(2, "0")}
                  </span>
                  <span className="hidden lg:inline-block w-8 h-[1px] bg-white/20" />
                  Primary Benefit
                </div>

                <h2 className="text-white font-medium leading-[1.1] max-w-5xl text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-balance">
                  {benefits[activeIndex]}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
