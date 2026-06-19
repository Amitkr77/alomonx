"use client";

import { useRef, useState, useCallback, lazy, Suspense } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { X, ArrowRight } from "lucide-react";

// ─── Critical above-the-fold components: load eagerly ───────
import StatsSection from "@/components/StatsSection";

// ─── Below-the-fold components: lazy load ───────────────────
const Services = lazy(() => import("@/components/Services"));
const AlomonxAISection = lazy(() => import("@/components/AlomonxAISection"));
const EngineerFuture = lazy(() => import("@/components/EngineerFuture"));
const PresentationSection = lazy(
  () => import("@/components/PresentationSection"),
);
const TechCapabilities = lazy(() => import("@/components/TechCapabilities"));
const PortfolioCarousel = lazy(() => import("@/components/PortfolioCarousel"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const MarketingBanner = lazy(() => import("@/components/MarketingBanner"));
const ContactForm = lazy(() => import("@/components/ContactForm"));

// ─────────────────────────────────────────────────────────────
// Lightweight section skeleton shown while lazy chunks load
// ─────────────────────────────────────────────────────────────
function SectionFallback() {
  return (
    <div
      aria-hidden="true"
      style={{ minHeight: 120, background: "transparent" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────────────────

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineWipe = (delay) => ({
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const HERO_LINES = [
  { text: "Building Future Ready", colored: false },
  { text: "Digital Solutions", colored: true },
  { text: "For Businesses", colored: false },
];

function StarIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-4 lg:h-4"
      style={{ fill: "#22D3EE" }}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default function Home() {
  const heroRef = useRef(null);

  const [videoFailed, setVideoFailed] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleVideoError = useCallback(() => setVideoFailed(true), []);
  const openContact = useCallback(() => setIsContactOpen(true), []);
  const closeContact = useCallback(() => setIsContactOpen(false), []);

  const handleExpertiseClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-services-menu"));
    }, 400);
  }, []);

  // ── Scroll-driven hero animations ──────────────────────────
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(
    heroProgress,
    OPACITY_INPUT,
    OPACITY_OUTPUT,
  );
  const bgY = useTransform(heroProgress, BG_Y_INPUT, BG_Y_OUTPUT);
  const scrollIndicatorOpacity = useTransform(
    heroProgress,
    SCROLL_IND_INPUT,
    SCROLL_IND_OUTPUT,
  );

  const bgYSpring = useSpring(bgY, SPRING_CONFIG);

  return (
    <div className="bg-[#000000] pb-16">
      {/* ================================================== */}
      {/* HERO                                               */}
      {/* ================================================== */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-[#020617]"
      >
        {/* ── Background ──────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 w-full h-[125%] -top-[10%]"
          style={{ y: bgYSpring, willChange: "transform" }}
        >
          {!videoFailed && (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/hero_2.jpeg"
              onError={handleVideoError}
              aria-hidden="true"
            >
              <source src="/hero-bg.webm" type="video/webm" />
              <source src="/hero-bg.mp4" type="video/mp4" />
            </video>
          )}

          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/hero_2.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundColor: "#020617",
              zIndex: videoFailed ? 0 : -1,
            }}
          />

          <div className="absolute inset-0" style={OVERLAY_1} />
          <div className="absolute inset-0" style={OVERLAY_2} />
          <div className="absolute inset-0" style={OVERLAY_3} />
        </motion.div>

        {/* ── Foreground content ──────────────────────────── */}
        <motion.div
          className="relative z-10 flex flex-col min-h-screen px-6 sm:px-10 md:px-12 lg:px-14"
          style={{ opacity: contentOpacity, willChange: "opacity" }}
        >
          <div className="flex-1" />

          {/* Bottom Content */}
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 md:gap-12 lg:gap-16 pb-26 md:pb-20 lg:pb-20"
          >
            {/* Left — headline */}
            <motion.div variants={fadeUp} className="flex-1 min-w-0">
              <h1
                className="text-[38px] sm:text-[46px] md:text-[60px] lg:text-[clamp(4rem,6vw,5.4rem)] font-medium text-[#F8FAFC] leading-[1.1] md:leading-[1.05] lg:leading-[1.0] tracking-[-0.04em]"
                style={{ fontFamily: "var(--font-jost, 'Jost', sans-serif)" }}
              >
                {HERO_LINES.map((line, i) => (
                  <span key={line.text} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      variants={lineWipe(0.45 + i * 0.18)}
                      initial="hidden"
                      animate="visible"
                    >
                      {line.colored ? (
                        <span style={{ color: "#2563FF" }}>{line.text}</span>
                      ) : (
                        line.text
                      )}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </motion.div>

            {/* Right — CTA column */}
            <motion.div
              variants={fadeUp}
              className="md:max-w-2xl lg:max-w-[340px] xl:max-w-[380px] flex-shrink-0 flex flex-col gap-5 md:gap-6 lg:gap-7 lg:pb-1"
              style={{ fontFamily: "var(--font-jost, 'Jost', sans-serif)" }}
            >
              <motion.p
                className="text-[#94A3B8] text-[14px] sm:text-[17px] md:text-[18px] lg:text-base leading-relaxed font-light"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.9 }}
              >
                Elevate your brand with powerful digital campaigns and
                innovative software solutions.
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 md:gap-4 lg:gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.05 }}
              >
                <button
                  type="button"
                  onClick={openContact}
                  className="group inline-flex items-center gap-2 md:gap-4 lg:gap-3 pl-4 md:pl-7 lg:pl-6 pr-1 md:pr-2 py-1 md:py-2 rounded-full text-[#F8FAFC] text-[9px] md:text-[12px] lg:text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-300 w-fit cursor-pointer"
                  style={BTN_PRIMARY_STYLE}
                >
                  <span>Begin Your Transformation</span>
                  <span
                    className="relative flex items-center justify-center w-8 h-6 md:w-11 md:h-9 lg:w-14 lg:h-8 rounded-full overflow-hidden"
                    style={{ background: "#020617", color: "#22D3EE" }}
                  >
                    <ArrowRight
                      className="absolute w-7 h-4 md:w-7 md:h-6 lg:w-7 lg:h-5 transition-transform duration-300 ease-out group-hover:translate-x-full"
                      strokeWidth={2.5}
                    />
                    <ArrowRight
                      className="absolute w-7 h-4 md:w-7 md:h-6 lg:w-7 lg:h-5 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"
                      strokeWidth={2.5}
                    />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleExpertiseClick}
                  className="inline-flex items-center justify-center px-5 md:px-8 lg:px-6 py-2.5 md:py-3.5 lg:py-3 rounded-full text-[9px] md:text-[12px] lg:text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 w-fit cursor-pointer"
                  style={BTN_OUTLINE_STYLE}
                >
                  Our Expertise
                </button>
              </motion.div>

              {/* Review strip */}
              <motion.div
                className="flex items-center gap-3 md:gap-4 pl-3 md:pl-4 mt-2 md:mt-2 lg:mt-0"
                style={{ borderLeft: "2px solid rgba(34,211,238,0.4)" }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 1.2 }}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-0.5">{STARS}</div>
                  <span className="text-[#94A3B8] text-[10px] md:text-[13px] lg:text-xs font-medium">
                    100+ Positive Client Reviews
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ─────────────────────────────── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <motion.div
            className="w-[1px] h-12"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(34,211,238,0.5))",
            }}
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ─── Below-fold sections ───────────────────────────── */}

      <StatsSection />

      <Suspense fallback={<SectionFallback />}>
        <motion.div
          id="services"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="scroll-mt-20"
        >
          <Services />
        </motion.div>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <AlomonxAISection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <EngineerFuture />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <PresentationSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <TechCapabilities />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <section id="portfolio" className="scroll-mt-10">
          <PortfolioCarousel />
        </section>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <MarketingBanner />
      </Suspense>

      {/* ─── Contact modal ─────────────────────────────────── */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Clicking the backdrop closes the modal
            onClick={closeContact}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              // Stop click propagation so clicking inside the card
              // doesn't close the modal.
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto custom-scrollbar rounded-2xl shadow-2xl"
            >
              <button
                onClick={closeContact}
                className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-white transition-colors"
                aria-label="Close Contact Form"
              >
                <X className="w-5 h-5" />
              </button>

              {/* ContactForm is lazy — only its JS chunk is fetched when
                  the modal opens for the first time. */}
              <Suspense fallback={<SectionFallback />}>
                <ContactForm />
              </Suspense>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Module-level constants
// Defining these outside the component means they are created
// exactly once per module load, not on every render.
// ─────────────────────────────────────────────────────────────

// useTransform input/output arrays
const OPACITY_INPUT = [0, 0.3];
const OPACITY_OUTPUT = [1, 0];
const BG_Y_INPUT = [0, 1];
const BG_Y_OUTPUT = ["0%", "15%"];
const SCROLL_IND_INPUT = [0, 0.18];
const SCROLL_IND_OUTPUT = [1, 0];

// useSpring config
const SPRING_CONFIG = { stiffness: 60, damping: 18 };

// Overlay styles (static objects — no re-allocation per render)
const OVERLAY_1 = { background: "rgba(2,6,23,0.52)", zIndex: 1 };
const OVERLAY_2 = {
  background:
    "linear-gradient(to top, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.2) 50%, transparent 100%)",
  zIndex: 1,
};
const OVERLAY_3 = {
  background:
    "linear-gradient(to right, rgba(2,6,23,0.55) 0%, transparent 65%)",
  zIndex: 1,
};

// Button styles
const BTN_PRIMARY_STYLE = {
  background: "#2563FF",
  boxShadow: "0 2px 24px rgba(37,99,255,0.45)",
};
const BTN_OUTLINE_STYLE = {
  border: "1px solid rgba(6,182,212,0.6)",
  color: "#06B6D4",
};

// Pre-render the 5 star icons as a static array — avoids recreating
// the SVG elements on every render cycle.
const STARS = Array.from({ length: 5 }, (_, i) => <StarIcon key={i} />);
