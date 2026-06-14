"use client";
import React, { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Jost } from "next/font/google";

// Optimally load the font at build-time (Zero Layout Shift)
// Playfair Display and Lora were removed because they were never used in your styles!
const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

export default function FullOverview({ fullOverview, meta }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Memoize paragraph splitting so it doesn't recalculate on every animation frame/render
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
      className={jost.className} // Applies the Jost font globally to this section efficiently
      style={{
        padding: "50px 16px",
        textAlign: "center",
        backgroundColor: "#000000",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Eyebrow */}
        <motion.p
          {...fade(0)}
          style={{
            fontSize: "12px",
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
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 400,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: "30px",
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
              fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.9,
              marginBottom: i < paragraphs.length - 1 ? "16px" : "0",
            }}
          >
            {para}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
