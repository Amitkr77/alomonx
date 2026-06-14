"use client";
import React, { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

export default function FullOverview({ fullOverview, meta }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const paragraphs = useMemo(() => {
    if (!fullOverview?.overview) return [];
    return fullOverview.overview.trim().split("\n").filter(Boolean);
  }, [fullOverview]);

  if (!fullOverview) return null;

  const { title } = fullOverview;

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      ref={ref}
      className={`${jost.className} px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24`}
      style={{
        textAlign: "center",
        backgroundColor: "#000000",
      }}
    >
      <div className="mx-auto w-full max-w-[580px] sm:max-w-[680px] md:max-w-[760px] lg:max-w-[860px]">
        {/* Eyebrow */}
        <motion.p
          {...fade(0)}
          style={{
            fontSize: "clamp(10px, 1.5vw, 12px)",
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            marginBottom: "16px",
          }}
        >
          {meta?.eyebrow ?? "Industry Overview"}
        </motion.p>

        {/* Title */}
        <motion.h2
          {...fade(0.12)}
          style={{
            fontSize: "clamp(1.6rem, 4vw, 3rem)",
            fontWeight: 400,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: "clamp(20px, 3vw, 36px)",
          }}
        >
          {title}
        </motion.h2>

        {/* Body paragraphs */}
        {paragraphs.map((para, i) => (
          <motion.p
            key={i}
            {...fade(0.24 + i * 0.1)}
            style={{
              fontSize: "clamp(0.875rem, 1.8vw, 1.05rem)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.9,
              marginBottom:
                i < paragraphs.length - 1 ? "clamp(12px, 2vw, 20px)" : "0",
            }}
          >
            {para}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
