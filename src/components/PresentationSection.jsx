"use client";

import React, { useEffect, useRef, memo, useCallback } from "react";
import { allIndustries } from "@/lib/industries-data"; // adjust path as needed

// ─── Constants ────────────────────────────────────────────────────────────────
const ACCENT = "#00ffcc";
const TRANSLATION = 4500;

// ─── Image pools (unchanged) ──────────────────────────────────────────────────
const poolA = [
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561580125-028ee3bd62eb?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
];

const poolB = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?q=80&w=600&auto=format&fit=crop",
];

// ─── Build runway ─────────────────────────────────────────────────────────────
function buildRunway(pool, offset = 0) {
  const rotated = [
    ...pool.slice(offset % pool.length),
    ...pool.slice(0, offset % pool.length),
  ];
  return [...rotated, ...rotated];
}

const ROWS = [
  { data: buildRunway(poolA, 0), direction: "left" },
  { data: buildRunway(poolB, 4), direction: "right" },
  { data: buildRunway(poolA, 8), direction: "left" },
  { data: buildRunway(poolB, 12), direction: "right" },
  { data: buildRunway(poolA, 3), direction: "left" },
  { data: buildRunway(poolB, 7), direction: "right" },
];

// ─── ImageTile ────────────────────────────────────────────────────────────────
const FALLBACK_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='160'%3E%3Crect width='240' height='160' fill='%231a1a1a'/%3E%3C/svg%3E";

const ImageTile = memo(function ImageTile({ src }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      onError={(e) => { e.currentTarget.src = FALLBACK_SRC; }}
      className="w-[140px] h-[90px] md:w-[240px] md:h-[160px] shrink-0 rounded-xl object-cover"
    />
  );
});

// ─── ImageStrip ───────────────────────────────────────────────────────────────
const ImageStrip = memo(function ImageStrip({ row, rowIndex, stripRef, initialX }) {
  return (
    <div
      ref={stripRef}
      className="flex gap-2 w-max will-change-transform"
      style={initialX ? { transform: `translate3d(-${TRANSLATION}px, 0, 0)` } : undefined}
    >
      {row.data.map((src, imgIndex) => (
        <ImageTile key={`r${rowIndex}-i${imgIndex}`} src={src} />
      ))}
    </div>
  );
});

// ─── ArrowRightIcon ───────────────────────────────────────────────────────────
const ArrowRightIcon = memo(function ArrowRightIcon() {
  return (
    <svg
      className="w-4 h-4 md:w-5 md:h-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"
      />
    </svg>
  );
});

// ─── IndustryCard — uses href from allIndustries ──────────────────────────────
const IndustryCard = memo(function IndustryCard({ index, label, description, href }) {
  return (
    <div className="max-w-md">
      <div className="text-white/20 text-5xl md:text-6xl font-black mb-2 leading-none select-none">
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{label}</h3>
      <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-5 md:mb-6">
        {description}
      </p>
      <a
        href={href}
        className="inline-flex items-center gap-4 uppercase text-[12px] md:text-sm font-medium hover:text-[#00ffcc] transition-colors group"
        aria-label={`Explore work in ${label}`}
      >
        Explore Work
        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00ffcc]/20 transition-colors">
          <ArrowRightIcon />
        </span>
      </a>
    </div>
  );
});

// ─── Main component ───────────────────────────────────────────────────────────
export default function PresentationSection() {
  const sectionRef = useRef(null);
  const progressLineRef = useRef(null);
  const rafIdRef = useRef(null);
  const rowRefs = useRef(ROWS.map(() => null));

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollDistance = rect.height - window.innerHeight;
    const raw = rect.top <= 0 ? Math.abs(rect.top) / scrollDistance : 0;
    const progress = Math.max(0, Math.min(1, raw));

    const leftX = -(progress * TRANSLATION);
    const rightX = -TRANSLATION + progress * TRANSLATION;

    const refs = rowRefs.current;
    for (let i = 0; i < ROWS.length; i++) {
      const el = refs[i];
      if (!el) continue;
      el.style.transform = `translate3d(${ROWS[i].direction === "left" ? leftX : rightX}px, 0, 0)`;
    }

    if (progressLineRef.current) {
      progressLineRef.current.style.height = `${progress * 100}%`;
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current) return;
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        handleScroll();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-clip py-12 md:py-[80px]"
    >
      <div className="px-[5%]">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-[80px]">
            <div className="flex items-center gap-3 mb-4 md:mb-[22px]">
              <div
                className="w-7 h-[1px]"
                style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
              />
              <span
                className="font-['DM_Sans',sans-serif] text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: ACCENT }}
              >
                What We Serve
              </span>
            </div>
            <h1
              className="font-extrabold m-0 text-[clamp(2.5rem,9vw,7rem)] leading-[0.88] tracking-[-0.03em] text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              industries
              <br />
              <span className="text-white/15">we design for</span>
            </h1>
            <p className="mt-4 font-['DM_Sans',sans-serif] text-sm md:text-[0.93rem] text-white/30 font-light max-w-[600px] leading-relaxed">
              Precision-crafted digital experiences across every vertical — from
              concept to launch.
            </p>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-8 md:gap-12 items-start text-white">
            {/* Left: Sticky Parallax Gallery */}
            <div className="sticky top-[10vh] md:top-[16vh] h-[45vh] md:h-[70vh] overflow-hidden rounded-2xl md:rounded-3xl z-10 md:z-0 bg-black md:bg-transparent">
              <div className="relative w-full h-full">
                <div
                  className="absolute top-1/2 left-1/2 w-[220%] h-[220%]
                             -translate-x-1/2 -translate-y-1/2
                             flex flex-col justify-center gap-2
                             rotate-[-12deg] scale-[1.25]"
                >
                  {ROWS.map((row, rowIndex) => (
                    <ImageStrip
                      key={rowIndex}
                      row={row}
                      rowIndex={rowIndex}
                      stripRef={(el) => { rowRefs.current[rowIndex] = el; }}
                      initialX={row.direction === "right"}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Middle: Progress bar */}
            <div className="hidden md:flex justify-center w-full h-full relative z-10">
              <div className="sticky top-[30vh] mt-[10vh] h-[40vh] w-[3px] bg-white/5 rounded-full">
                <div
                  ref={progressLineRef}
                  className="absolute top-0 left-0 w-full rounded-full will-change-[height]"
                  style={{
                    height: "0%",
                    background: "linear-gradient(to bottom, rgba(0,255,204,0.1), rgba(0,255,204,0.8), #00ffcc)",
                    boxShadow: "0 0 10px rgba(0,255,204,0.4)",
                  }}
                >
                  <div
                    className="absolute -bottom-[4px] -left-[3.5px] w-[10px] h-[10px] rounded-full bg-[#00ffcc]"
                    style={{ boxShadow: "0 0 15px 4px rgba(0,255,204,0.8)" }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Industry cards */}
            <div className="flex flex-col gap-[20vh] md:gap-[40vh] pb-[8vh] md:pb-[16vh] pt-[4vh] md:pt-[8vh] relative z-0 md:z-10">
              {allIndustries.map((industry, index) => (
                <IndustryCard
                  key={industry.slug}
                  index={index}
                  label={industry.label}
                  description={industry.description}
                  href={industry.href}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}