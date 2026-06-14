"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const DEFAULT_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
    caption: "Our team at work",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop",
    caption: "Delivering excellence",
  },
  {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop",
    caption: "Precision in every detail",
  },
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop",
    caption: "Collaborative approach",
  },
];

export default function DetailOverview({
  fullOverview = "",
  images = DEFAULT_IMAGES,
}) {
  const [activeIdx, setActiveIdx] = useState(null);

  // OPTIMIZATION: Memoize string parsing so it doesn't recalculate when the lightbox opens/closes
  const { headline, displayBullets } = useMemo(() => {
    const rawParagraphs = fullOverview.split("\n\n").filter(Boolean);
    const allBullets =
      rawParagraphs.length > 0
        ? rawParagraphs.flatMap((p) =>
            p
              .split(/(?<=[.!?])\s+/)
              .filter((s) => s.trim().length > 20)
              .slice(0, 2),
          )
        : [
            "We build digital experiences that drive real business growth.",
            "End-to-end expertise from ideation and architecture to delivery.",
            "Agile teams that integrate seamlessly with your workflow.",
            "Proven track record across startups, SMEs, and enterprises.",
          ];

    return {
      headline: allBullets[0]?.trim().replace(/\.$/, "") || "What We Do Best",
      displayBullets: allBullets.slice(1, 6),
    };
  }, [fullOverview]);

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl min-h-[540px] ${dmSans.className}`}
    >
      {/* ─── LEFT: Editorial Text Panel ─── */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative bg-[#121111] flex flex-col justify-start px-8 py-8 lg:px-12 overflow-hidden"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-700 via-blue-600 to-transparent" />

        <div className="relative z-10">
          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-[3px] bg-blue-600 rounded-full" />
            <p className="text-blue-800 text-sm font-semibold tracking-[0.25em] uppercase">
              Overview
            </p>
          </div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white text-2xl lg:text-2xl font-bold leading-snug mb-7 max-w-2xl"
          >
            {headline}
            <span className="text-blue-800"> ...</span>
          </motion.h2>

          {/* Numbered bullets */}
          <div className="space-y-4">
            {displayBullets.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex items-start gap-4 group"
              >
                {/* Number badge */}
                <div className="flex-shrink-0 w-7 h-7 rounded-md bg-blue-600/10 border border-blue-600/40 flex items-center justify-center mt-2.5">
                  <span className="text-blue-900 text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* Text */}
                <p className="text-white/100 text-[14px] font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-200">
                  {point.trim().replace(/\.$/, "")}
                  {!point.trim().endsWith(".") && "."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── RIGHT: Mosaic Image Panel ─── */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        className="relative bg-[#111827] overflow-hidden"
      >
        {/* Mosaic grid layout */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[3px] p-[3px]">
          {/* Large image — top-left, spans rows */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="row-span-2 relative overflow-hidden cursor-pointer group"
            onClick={() => setActiveIdx(activeIdx === 0 ? null : 0)}
          >
            <Image
              src={images[0]?.src}
              alt={images[0]?.caption}
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-white text-xs font-medium">
                {images[0]?.caption}
              </p>
            </div>
          </motion.div>

          {/* Top-right image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative overflow-hidden cursor-pointer group"
            onClick={() => setActiveIdx(activeIdx === 1 ? null : 1)}
          >
            <Image
              src={images[1]?.src}
              alt={images[1]?.caption}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 left-3 right-3 -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-white text-xs font-medium">
                {images[1]?.caption}
              </p>
            </div>
          </motion.div>

          {/* Bottom-right: split into two smaller cells */}
          <div className="grid grid-cols-2 gap-[3px]">
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative overflow-hidden cursor-pointer group"
              onClick={() => setActiveIdx(activeIdx === 2 ? null : 2)}
            >
              <Image
                src={images[2]?.src}
                alt={images[2]?.caption}
                fill
                sizes="(max-width: 1024px) 25vw, 15vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative overflow-hidden cursor-pointer group"
              onClick={() => setActiveIdx(activeIdx === 3 ? null : 3)}
            >
              <Image
                src={images[3]?.src}
                alt={images[3]?.caption}
                fill
                sizes="(max-width: 1024px) 25vw, 15vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </div>
        </div>

        {/* Corner accent lines */}
        <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none z-10">
          <div className="absolute top-0 right-0 w-full h-[2px] bg-blue-500" />
          <div className="absolute top-0 right-0 w-[2px] h-full bg-blue-500" />
        </div>
        <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none z-10">
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500/50" />
          <div className="absolute bottom-0 left-0 w-[2px] h-full bg-blue-500/50" />
        </div>

        {/* Lightbox overlay */}
        <AnimatePresence>
          {activeIdx !== null && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-30 bg-black/85 flex flex-col items-center justify-center p-6 cursor-pointer"
              onClick={() => setActiveIdx(null)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-[70%]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[activeIdx]?.src}
                  alt={images[activeIdx]?.caption}
                  fill
                  className="rounded-xl object-contain shadow-2xl"
                />
              </motion.div>
              <p className="text-white/80 text-sm mt-4 font-medium">
                {images[activeIdx]?.caption}
              </p>
              <p className="text-white/30 text-xs mt-1">
                Click anywhere to close
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
