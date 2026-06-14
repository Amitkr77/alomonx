"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

export default function WhyChooseUs({
  items = [],
  sectionLabel = "Why Choose Us",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef([]);

  const slides = useMemo(() => {
    return items.map((item, i) => ({
      num: String(i + 1).padStart(2, "0"),
      img: item.image,
      text: item.description,
      alt: item.title,
    }));
  }, [items]);

  useEffect(() => {
    if (!slides.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    const currentRefs = imageRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section className="text-[#FDFBE2] font-sans relative">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* ── MOBILE / TABLET layout (below lg) ─────────────────────────── */}
        <div className="lg:hidden">
          {/* Section label */}
          <div className="flex items-baseline gap-2 pt-12 pb-10">
            <span className="font-serif text-2xl font-bold text-[#FDFBE2] leading-tight">
              {sectionLabel}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-900 inline-block" />
              <span className="w-2 h-2 rounded-full bg-blue-900 inline-block" />
              <span className="w-2 h-2 rounded-full bg-blue-900 inline-block" />
            </span>
          </div>

          {/* Each slide stacked: number → image → text */}
          <div className="flex flex-col gap-14 pb-16">
            {slides.map((slide, index) => (
              <div key={index} className="flex flex-col gap-5">
                {/* Number */}
                <span className="text-[80px] sm:text-[100px] leading-none font-medium tracking-tighter text-[#FDFBE2]/20">
                  {slide.num}
                </span>

                {/* Image */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={slide.img}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>

                {/* Text */}
                <div className="pt-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#FDFBE2] mb-2 leading-snug">
                    {slide.alt}
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed text-[#FDFBE2]/75">
                    {slide.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP layout (lg and above) ─────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-start relative">
          {/* LEFT COLUMN (STICKY) - Nav & Big Number */}
          <div className="lg:col-span-3 sticky top-0 h-screen">
            <div className="h-full flex flex-col justify-between py-12">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-[#FDFBE2] leading-tight">
                  {sectionLabel}
                </span>
                <span className="flex items-center gap-1 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-blue-900 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-blue-900 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-blue-900 inline-block" />
                </span>
              </div>

              <div className="h-[220px] overflow-hidden relative">
                <div
                  className="transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col"
                  style={{ transform: `translateY(-${activeIndex * 220}px)` }}
                >
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className="h-[220px] shrink-0 text-[220px] leading-[0.8] font-medium tracking-tighter flex items-end"
                    >
                      {slide.num}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN (SCROLLING) - Images */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="w-full flex flex-col pt-[18vh] pb-[15vh] gap-[12vh]">
              {slides.map((slide, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={index}
                    data-index={index}
                    ref={(el) => {
                      if (el) imageRefs.current[index] = el;
                    }}
                    className={`relative w-full max-w-[370px] aspect-[5/6] bg-black/20 transition-all duration-700 ease-in-out ${
                      index % 2 === 0 ? "self-start" : "self-end"
                    } ${
                      isActive
                        ? "opacity-100 grayscale-0 scale-100"
                        : "opacity-30 grayscale scale-95"
                    }`}
                  >
                    <Image
                      src={slide.img}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover drop-shadow-2xl"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN (STICKY) - Crossfading Text + Title */}
          <div className="lg:col-span-4 sticky top-0 h-screen">
            <div className="h-full flex items-center relative">
              <div className="relative w-full max-w-[320px]">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute top-1/2 -translate-y-1/2 left-0 w-full transition-opacity duration-700 ease-in-out ${
                      activeIndex === index
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="text-sm font-medium text-[#FDFBE2]/50 mb-2 uppercase tracking-widest">
                      {slide.num}
                    </p>
                    <h3 className="text-xl font-semibold text-[#FDFBE2] mb-3 leading-snug">
                      {slide.alt}
                    </h3>
                    <p className="text-lg leading-relaxed text-[#FDFBE2]/80">
                      {slide.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
