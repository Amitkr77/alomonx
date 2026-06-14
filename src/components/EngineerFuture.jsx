"use client";

import React, { useRef, memo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const defaultStepsData = [
  {
    id: "01",
    title: "Signal Received",
    subtitle: "Understanding the mission.",
    desc: "We deep-dive into your business, challenges, goals, and market opportunities to decode what truly needs to be built.",
    position: "col-start-1 col-end-5 md:col-start-1 md:col-end-6 mt-4 md:mt-10",
  },
  {
    id: "02",
    title: "Blueprint Architecture",
    subtitle: "Intelligence before execution.",
    desc: "Our architects design scalable system flows, feature ecosystems, AI integrations, and growth-focused tech roadmaps.",
    position:
      "col-start-1 col-end-5 md:col-start-7 md:col-end-12 mt-6 md:mt-32",
  },
  {
    id: "03",
    title: "Interface Engineering",
    subtitle: "Imagination becomes experience.",
    desc: "We craft cinematic UI/UX experiences with modern interactions and futuristic digital aesthetics designed to captivate.",
    position: "col-start-1 col-end-5 md:col-start-2 md:col-end-7 mt-6 md:mt-32",
  },
  {
    id: "04",
    title: "Core Development",
    subtitle: "Ideas into living technology.",
    desc: "Using agile engineering and AI-powered workflows, we build secure, scalable, and high-performance digital products.",
    position:
      "col-start-1 col-end-5 md:col-start-8 md:col-end-13 mt-6 md:mt-32",
  },
  {
    id: "05",
    title: "Launch Sequence",
    subtitle: "Deploying into the real world.",
    desc: "From cloud optimization to cybersecurity hardening, we ensure your platform launches at enterprise-grade standards.",
    position: "col-start-1 col-end-5 md:col-start-1 md:col-end-6 mt-6 md:mt-32",
  },
  {
    id: "06",
    title: "Evolution & Scaling",
    subtitle: "Evolve, not expire.",
    desc: "We continuously monitor, improve, scale, secure, and optimize your systems to keep your business ahead of the future.",
    position:
      "col-start-1 col-end-5 md:col-start-6 md:col-end-11 mt-6 md:mt-32",
  },
];

// ─── Extracted outside component so it's never recreated on re-render ────────
function titleSplit(title) {
  const spaceIdx = title.indexOf(" ");
  if (spaceIdx === -1) return title;
  const first = title.slice(0, spaceIdx);
  const rest = title.slice(spaceIdx + 1);
  return (
    <>
      {first} <br className="hidden md:block" />
      <span className="text-slate-500">{rest}</span>
    </>
  );
}

// ─── Dot decorations — static, no need to re-render ─────────────────────────
const BottomDots = memo(function BottomDots() {
  return (
    <div className="mt-3 pt-2 md:mt-5 md:pt-3 border-t border-dashed border-slate-600 flex justify-between items-center opacity-70">
      <div className="flex gap-1 md:gap-1.5">
        <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-slate-500 rounded-sm" />
        <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-slate-500 rounded-sm" />
        <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-slate-500 rounded-sm" />
      </div>
      <span className="font-mono text-[9px] md:text-[12px] text-slate-600">
        DATA_STREAM_OK
      </span>
    </div>
  );
});

// ─── Individual step card — memoized so only re-renders if its own data changes
const StepCard = memo(function StepCard({ step }) {
  return (
    <div className={`tech-node ${step.position} relative group`}>
      {/* Connector dot — desktop only */}
      <div
        className="hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-blue-950 rounded-full z-20 shadow-[0_0_15px_rgba(37,99,235,0.4)]
          group-hover:scale-150 transition-transform duration-300
          -left-[10px] md:group-odd:-left-[40px] md:group-even:-right-[40px] md:group-even:left-auto"
      />

      {/* Card */}
      <div className="relative w-full bg-gray-200 border border-slate-300 rounded-xl p-3 md:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.1)] hover:border-blue-300 transition-all duration-500 overflow-hidden backdrop-blur-sm bg-white/90 md:bg-gray-200 will-change-transform">
        {/* Hover accent lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-950 to-blue-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-slate-50 border-t border-l border-slate-100 rounded-tl-full -z-10 group-hover:scale-150 transition-transform duration-500" />

        {/* Header */}
        <div className="flex justify-between items-start mb-2 md:mb-3 border-b border-slate-100 pb-1.5 md:pb-2">
          <span className="font-mono text-[10px] md:text-sm font-bold text-black-100 bg-white px-1.5 py-0.5 md:px-2 md:py-1 rounded">
            CMD_{step.id}
          </span>
          <span className="text-[9px] md:text-xs font-mono text-slate-700">
            SYS.ACTIVE
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl md:text-3xl font-bold text-black-400 tracking-tight mb-1 md:mb-2">
          {titleSplit(step.title)}
        </h3>
        <h4 className="text-[10px] md:text-sm font-bold text-slate-900 mb-1.5 md:mb-3 tracking-wide uppercase">
          {step.subtitle}
        </h4>
        <p className="text-slate-600 leading-relaxed font-medium text-xs md:text-sm">
          {step.desc}
        </p>

        <BottomDots />
      </div>
    </div>
  );
});

// ─── SVG backgrounds — pure markup, memoized so they never re-render ─────────
const MobileSVG = memo(function MobileSVG() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[105%] pointer-events-none -z-10 block md:hidden opacity-50">
      <svg width="100%" height="100%" fill="none" className="overflow-visible">
        {/* Static background tracks */}
        <path
          d="M 50,0 V 300 L 20,330 V 700 L 50,730 V 1200 L 80,1230 V 1800 L 50,1830 V 2600"
          stroke="#e2e8f0"
          strokeWidth="4"
          strokeLinecap="square"
        />
        <path
          d="M 250,0 V 450 L 280,480 V 900 L 230,950 V 1400 L 260,1430 V 2000 L 250,2030 V 2600"
          stroke="#e2e8f0"
          strokeWidth="4"
          strokeLinecap="square"
        />
        {/* Animated streams */}
        <path
          className="mobile-circuit-stream"
          d="M 50,0 V 300 L 20,330 V 700 L 50,730 V 1200 L 80,1230 V 1800 L 50,1830 V 2600"
          stroke="#6EADBC"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          className="mobile-circuit-stream"
          d="M 250,0 V 450 L 280,480 V 900 L 230,950 V 1400 L 260,1430 V 2000 L 250,2030 V 2600"
          stroke="#6EADBC"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* Data pulses */}
        <path
          className="mobile-data-pulse"
          d="M 50,0 V 300 L 20,330 V 700 L 50,730 V 1200 L 80,1230 V 1800 L 50,1830 V 2600"
          stroke="#000000"
          strokeWidth="3"
          strokeDasharray="20 150"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          className="mobile-data-pulse"
          d="M 250,0 V 450 L 280,480 V 900 L 230,950 V 1400 L 260,1430 V 2000 L 250,2030 V 2600"
          stroke="#000000"
          strokeWidth="3"
          strokeDasharray="30 200"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  );
});

const DesktopSVG = memo(function DesktopSVG({ svgRef }) {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[110%] pointer-events-none -z-10 hidden md:block">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        fill="none"
        className="overflow-visible"
      >
        {/* Static background tracks */}
        <path
          className="circuit-track"
          d="M 700,0 V 200 L 300,400 V 800 L 700,1000 V 1400 L 1100,1600 V 2200"
          stroke="#121358"
          strokeWidth="14"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          className="circuit-track"
          d="M 700,0 V 300 L 1100,500 V 900 L 400,1200 V 1800 L 700,1950 V 2200"
          stroke="#121358"
          strokeWidth="14"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* Animated streams */}
        <path
          className="circuit-stream"
          d="M 700,0 V 200 L 300,400 V 800 L 700,1000 V 1400 L 1100,1600 V 2200"
          stroke="#6EADBC"
          strokeWidth="4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          className="circuit-stream"
          d="M 700,0 V 300 L 1100,500 V 900 L 400,1200 V 1800 L 700,1950 V 2200"
          stroke="#6EADBC"
          strokeWidth="4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          className="circuit-stream"
          d="M 500,100 L 200,250 V 600 L 600,800 V 1200 L 300,1350 V 2000"
          stroke="#6EADBC"
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          className="circuit-stream"
          d="M 900,100 L 1200,250 V 600 L 800,800 V 1200 L 1100,1350 V 2000"
          stroke="#6EADBC"
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* Data pulses */}
        <path
          className="data-pulse"
          d="M 700,0 V 200 L 300,400 V 800 L 700,1000 V 1400 L 1100,1600 V 2200"
          stroke="#000000"
          strokeWidth="4"
          strokeDasharray="50 300"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          className="data-pulse"
          d="M 700,0 V 300 L 1100,500 V 900 L 400,1200 V 1800 L 700,1950 V 2200"
          stroke="#000000"
          strokeWidth="4"
          strokeDasharray="85 400"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          className="data-pulse"
          d="M 500,100 L 200,250 V 600 L 600,800 V 1200 L 300,1350 V 2000"
          stroke="#000000"
          strokeWidth="3"
          strokeDasharray="25 150"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  );
});

// ─── Main component ───────────────────────────────────────────────────────────
export default function TechEcosystem({ steps = defaultStepsData }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      // ── Card reveal animations ──────────────────────────────────────────────
      // Batch all card animations into a single ScrollTrigger batch instead of
      // one trigger per card — far fewer ScrollTrigger instances.
      ScrollTrigger.batch(".tech-node", {
        start: "top center",
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: isMobile ? 0.6 : 0.8,
            ease: "power3.out",
            stagger: 0.05,
          }),
        onLeaveBack: (els) =>
          gsap.to(els, {
            opacity: 0,
            y: isMobile ? 25 : 50,
            scale: isMobile ? 0.98 : 0.95,
          }),
      });

      // Set initial hidden state in one batch call
      gsap.set(".tech-node", {
        opacity: 0,
        y: isMobile ? 25 : 50,
        scale: isMobile ? 0.98 : 0.95,
      });

      // ── Circuit path draw animations ───────────────────────────────────────
      // Cache path lengths upfront — getTotalLength() forces a layout reflow
      // each call; computing once and storing is significantly cheaper.
      const circuitPaths = gsap.utils.toArray(
        ".circuit-stream, .mobile-circuit-stream",
      );

      // Single scrub ScrollTrigger for all circuit paths
      const circuitST = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top+=100",
        end: "bottom bottom",
        scrub: 1,
        onRefresh() {}, // placeholder to avoid null warning
      });

      circuitPaths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          scrollTrigger: circuitST,
          strokeDashoffset: 0,
          ease: "none",
        });
      });

      // ── Data pulse animations ──────────────────────────────────────────────
      // One shared ScrollTrigger for all pulses
      const pulseST = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      });

      gsap.to(".data-pulse, .mobile-data-pulse", {
        scrollTrigger: pulseST,
        strokeDashoffset: -2000,
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-white text-slate-900 font-sans overflow-hidden pb-20 md:pb-40"
    >
      {/* Heading section */}
      <div className="relative z-20 w-full max-w-8xl mx-auto pt-6 md:pt-10 pb-8 md:pb-12 px-4 md:px-6">
        <h1
          className="text-[2.25rem] md:text-[5rem] lg:text-[6rem] font-black leading-tight md:leading-[0.80] tracking-[-0.07em] text-black font-semibold"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          How We Engineer <br />
          The Future .
        </h1>
        <p className="mt-3 md:mt-4 max-w-3xl text-sm md:text-lg font-semibold leading-relaxed tracking-[-0.02em] text-[#6b6b6b] ml-1 md:ml-2">
          Every product we build moves through a precision-engineered ecosystem
          of strategy, design, intelligence, and scalable execution.
        </p>
      </div>

      {/* Ecosystem grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-2 md:px-4">
        {/* SVG backgrounds — memoized, never re-render */}
        <MobileSVG />
        <DesktopSVG svgRef={svgRef} />

        {/* Step cards */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-3 md:gap-4 relative z-10 w-full px-4 md:px-12">
          {steps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
}
