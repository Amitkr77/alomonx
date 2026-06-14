"use client";

import React, { useRef, useEffect, useState, useCallback, memo } from "react";

// ─── Lazy-loaded image card ───────────────────────────────────────────────────
// Rendered once per service; only fetches the image when the card enters the
// viewport (IntersectionObserver).  React.memo prevents re-renders when the
// parent's scroll state changes (which it never stores in React state anyway,
// but memo protects against future refactors).
const ServiceCard = memo(function ServiceCard({ show, isOdd }) {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    // If the browser already supports loading="lazy" natively and we are in a
    // horizontal-scroll context where the native attr may not fire, back it up
    // with an IntersectionObserver with a generous rootMargin so the image
    // starts loading slightly before the card is fully visible.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // load once, then stop watching
        }
      },
      { rootMargin: "200px" }, // pre-load 200 px before entering viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`flex flex-col flex-none w-[300px] ${isOdd ? "mt-[6vw]" : ""}`}
    >
      <a
        href="#"
        className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden block group bg-zinc-800 shadow-md"
      >
        {/* Placeholder keeps layout stable while image loads */}
        <span
          ref={imgRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />
        {isVisible && (
          <img
            src={show.image}
            alt={show.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </a>

      <div className="mt-[15px]">
        <h4 className="text-white text-[16px] font-semibold uppercase tracking-wide leading-tight">
          {show.title}
        </h4>
      </div>
    </div>
  );
});

// ─── Main component ───────────────────────────────────────────────────────────
export default function ShowsList({ services }) {
  const targetRef = useRef(null);
  const scrollRef = useRef(null);
  const rafRef = useRef(null); // active rAF handle
  const resizeTimerRef = useRef(null); // debounce timer for resize
  const [containerHeight, setContainerHeight] = useState("300vh");

  // ── Height calculation (debounced resize) ──────────────────────────────────
  const updateHeight = useCallback(() => {
    if (scrollRef.current) {
      const maxScrollX = scrollRef.current.scrollWidth - window.innerWidth;
      setContainerHeight(`${maxScrollX + window.innerHeight}px`);
    }
  }, []); // no deps — reads DOM directly

  useEffect(() => {
    updateHeight();

    const onResize = () => {
      // Debounce: only recalculate after the user stops resizing for 150 ms
      clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(updateHeight, 150);
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimerRef.current);
    };
  }, [services, updateHeight]);

  // ── Horizontal scroll translation (rAF-throttled) ─────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending frame so we only run once per paint cycle
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        if (!targetRef.current || !scrollRef.current) return;

        const { top, height } = targetRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const maxScrollY = height - windowHeight;
        const currentScrollY = -top;
        const progress = Math.max(0, Math.min(currentScrollY / maxScrollY, 1));

        const maxScrollX = scrollRef.current.scrollWidth - window.innerWidth;

        if (maxScrollX > 0) {
          // Direct DOM mutation — intentionally outside React state to avoid
          // triggering a re-render on every scroll event.
          scrollRef.current.style.transform = `translateX(${
            -progress * maxScrollX
          }px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialise position

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={targetRef}
      style={{ height: containerHeight }}
      className="relative w-full font-sans text-[#333]"
    >
      {/* Header Section */}
      <div className="max-w-8xl mx-auto mb-5 md:mb-11 px-8 sm:px-12">
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
          <span className="h-px w-6 bg-blue-700" />
          What We Do
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
          Transforming Ideas into <br />
          <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-500">
            Digital Success.
          </span>
        </h2>
      </div>

      {/* Sticky viewport-locked wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center pt-[95px] mb-12">
        {/* Horizontally moving track — will-change kept here only, not on cards */}
        <div
          ref={scrollRef}
          className="flex gap-[5vw] px-[125px] will-change-transform"
        >
          {services.map((show, index) => (
            <ServiceCard key={show.title} show={show} isOdd={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
