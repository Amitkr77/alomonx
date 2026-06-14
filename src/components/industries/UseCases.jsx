"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";

export default function UseCases({
  useCases = [],
  meta = { color: "text-blue-600" },
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  // OPTIMIZATION: Use a ref to track the index and prevent React state spam during scroll
  const currentIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!useCases.length) return;
    const step = 1 / useCases.length;
    let index = Math.floor(latest / step);

    if (index >= useCases.length) index = useCases.length - 1;
    if (index < 0) index = 0;

    // Only trigger a React re-render if the index has ACTUALLY changed
    if (index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      setActiveIndex(index);
    }
  });

  if (!useCases?.length) return null;

  return (
    <section className="relative bg-white pt-16 pb-24">
      {/* HEADER */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`w-8 h-[2px] rounded-full opacity-60 bg-current ${meta.color}`}
          />
          <span
            className={`text-xs font-bold tracking-[0.2em] uppercase ${meta.color}`}
          >
            Who It's For
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-zinc-900 tracking-tight">
          Transforming Healthcare
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* MOBILE STICKY IMAGE */}
          <div className="lg:hidden sticky top-24 z-10 w-full h-[350px] rounded-3xl overflow-hidden shadow-2xl mb-6 bg-zinc-900">
            {useCases.map((useCase, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={index}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{
                    opacity: isActive ? 0.8 : 0, // Keep mobile opacity slightly reduced
                    scale: isActive ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={useCase.image}
                    alt={useCase.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              );
            })}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
          </div>

          {/* LEFT: SCROLLING TEXT LIST */}
          <div
            ref={containerRef}
            className="w-full lg:w-1/2 flex flex-col relative"
          >
            {useCases.map((useCase, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  className="py-24 md:py-32 lg:py-40 border-b border-zinc-200 last:border-none relative group cursor-default transition-all duration-500"
                >
                  <div className="flex items-start gap-6">
                    {/* Number Indicator */}
                    <div
                      className={`text-sm font-bold font-mono mt-2 transition-colors duration-500 ${
                        isActive ? "text-zinc-900" : "text-zinc-400"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1">
                      {/* Icon Container */}
                      <div
                        className={`mb-6 inline-flex p-3.5 rounded-2xl transition-all duration-500 ${
                          isActive
                            ? "bg-zinc-900 text-white shadow-xl scale-100 opacity-100"
                            : "bg-zinc-100 text-zinc-400 scale-90 opacity-60"
                        }`}
                      >
                        <Users className="w-6 h-6" />
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-3xl md:text-4xl font-bold tracking-tight transition-all duration-500 ${
                          isActive
                            ? "text-zinc-900 translate-x-0"
                            : "text-zinc-400 -translate-x-2"
                        }`}
                      >
                        {useCase.title}
                      </h3>

                      {/* Animated Arrow */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          x: isActive ? 0 : -10,
                          height: isActive ? "auto" : 0,
                        }}
                        className="overflow-hidden mt-6 flex items-center gap-2 text-sm font-semibold text-zinc-600"
                      >
                        Explore capabilities <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: DESKTOP STICKY IMAGE */}
          <div className="hidden lg:block lg:w-1/2 sticky top-32 h-[calc(100vh-10rem)]">
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgb(0,0,0,0.15)] bg-zinc-900 relative group">
              {useCases.map((useCase, index) => {
                const isActive = index === activeIndex;
                return (
                  <motion.div
                    key={index}
                    className="absolute inset-0 will-change-transform"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.05,
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={useCase.image}
                      alt={useCase.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    {/* Dark vignette to make the floating card pop even more */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] rounded-[2.5rem]" />
                  </motion.div>
                );
              })}

              {/* Floating Label overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
                      Active Case
                    </div>
                    <div className="text-lg font-semibold text-white">
                      {useCases[activeIndex].title}
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 cursor-pointer`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
