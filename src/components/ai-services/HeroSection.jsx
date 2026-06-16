"use client";

import React, { useRef, memo, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  GitBranch,
  Mic2,
  Sparkles,
  Search,
  TrendingUp,
  Cpu,
  Eye,
  Building2,
  Workflow,
  BrainCircuit,
  X,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

// --- Constants (module-scope — never recreated) ---
const ICON_MAP = {
  Bot,
  GitBranch,
  Mic2,
  Sparkles,
  Search,
  TrendingUp,
  Cpu,
  Eye,
  Building2,
  Workflow,
  BrainCircuit,
};

const SCROLL_OFFSET = ["start start", "end start"];
const PARALLAX_INPUT = [0, 1];
const PARALLAX_OUTPUT = ["0%", "20%"];

const TRANSITION_TAG = { duration: 0.4, delay: 0.1 };
const TRANSITION_TITLE = {
  duration: 0.65,
  delay: 0.15,
  ease: [0.22, 1, 0.36, 1],
};
const TRANSITION_TAG2 = { duration: 0.5, delay: 0.22 };
const TRANSITION_BODY = { duration: 0.5, delay: 0.28 };
const TRANSITION_CTA = { duration: 0.4, delay: 0.4 };

const INITIAL_UP10 = { opacity: 0, y: -10 };
const INITIAL_UP28 = { opacity: 0, y: 28 };
const INITIAL_UP16 = { opacity: 0, y: 16 };
const INITIAL_UP12 = { opacity: 0, y: 12 };
const ANIMATE_IN = { opacity: 1, y: 0 };

/**
 * Detect whether the media prop is a video config object.
 *
 * image prop accepts two shapes:
 *   - string           → plain image src  e.g. "/hero.jpg"
 *   - VideoMedia obj   → { type: "video", sources: [...], poster: "..." }
 *
 * VideoMedia shape:
 *   {
 *     type: "video",
 *     sources: [
 *       { src: "/hero.webm", type: "video/webm" },  // Chrome, Firefox, Android
 *       { src: "/hero.mp4",  type: "video/mp4" },   // Safari, iOS, macOS, Edge
 *     ],
 *     poster: "/hero-poster.jpg",  // always supply — iOS shows this until user taps
 *   }
 */
function isVideoMedia(media) {
  return typeof media === "object" && media !== null && media.type === "video";
}

// ---------------------------------------------------------------------------
// VideoBackground
// Cross-platform autoplay requires ALL THREE of: autoPlay + muted + playsInline
//   • muted       — required by every browser before they allow autoplay
//   • playsInline — required on iOS to prevent fullscreen takeover
//   • autoPlay    — starts immediately
//   • loop        — keeps it looping
//   • poster      — shown while loading; is the ONLY thing shown on iOS Low Power Mode
//   • Multiple <source> tags — browser picks the first codec it can decode
//                              (WebM/VP9 on Chrome+Android, MP4/H.264 on Apple)
// No parallax on video — applying CSS transform to a playing <video> causes
// severe GPU re-compositing on mobile/iOS on every scroll frame.
// ---------------------------------------------------------------------------
const VideoBackground = memo(function VideoBackground({ media }) {
  return (
    <div className="absolute inset-0 w-full h-[110%]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        poster={media.poster}
        preload="auto"
        aria-hidden="true"
      >
        {media.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
});

// ---------------------------------------------------------------------------
// ImageBackground — original parallax behaviour, unchanged
// ---------------------------------------------------------------------------
const ImageBackground = memo(function ImageBackground({
  src,
  alt,
  isPriority,
  style,
}) {
  return (
    <motion.div style={style} className="absolute inset-0 w-full h-[110%]">
      <Image
        src={src}
        alt={alt}
        fill
        priority={isPriority}
        sizes="100vw"
        className="object-cover opacity-100"
      />
    </motion.div>
  );
});

// ---------------------------------------------------------------------------
// HeroSection
// ---------------------------------------------------------------------------
const HeroSection = memo(function HeroSection({
  service,
  details,
  meta,
  isPriority = true,
}) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const { label, category, image, icon } = service;
  const IconComponent = ICON_MAP[icon] ?? Bot;
  const { bgColor, color, borderColor } = meta;
  const ctaText = details.cta?.buttonText || "Book Your Strategy Consultation Today";

  // Parallax — only applied to image; video stays fixed to avoid mobile GPU thrash
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: SCROLL_OFFSET,
  });
  const imageY = useTransform(scrollYProgress, PARALLAX_INPUT, PARALLAX_OUTPUT);

  const mediaIsVideo = isVideoMedia(image);

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full min-h-[100vh] flex flex-col justify-center overflow-hidden pt-12 md:pt-28 lg:pt-24 mt-10"
      >
        {/* Background media */}
        <div className="absolute inset-0 z-0">
          {mediaIsVideo ? (
            <VideoBackground media={image} />
          ) : (
            <ImageBackground
              src={image}
              alt={label || "AI Service Background"}
              isPriority={isPriority}
              style={{ y: imageY }}
            />
          )}

          {/* Gradient overlays — same for both media types */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
        </div>

        {/* Copy */}
        <div className="relative z-10 w-full max-w-8xl mx-auto px-7 sm:px-8 lg:px-12 flex flex-col items-start text-left">
          {/* Category pill */}
          <motion.span
            className={`inline-flex items-center gap-1.5 mb-4 md:mb-5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-sm ${bgColor} ${color} border ${borderColor}`}
            initial={INITIAL_UP10}
            animate={ANIMATE_IN}
            transition={TRANSITION_TAG}
          >
            <IconComponent className="w-3 h-3" />
            {category}
          </motion.span>

          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-tight leading-[1.10] mb-5 md:mb-6 max-w-3xl"
            initial={INITIAL_UP28}
            animate={ANIMATE_IN}
            transition={TRANSITION_TITLE}
          >
            {label}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className={`text-md md:text-md font-medium ${color} mb-3`}
            initial={INITIAL_UP16}
            animate={ANIMATE_IN}
            transition={TRANSITION_TAG2}
          >
            {details.tagline}
          </motion.p>

          {/* Overview */}
          <motion.p
            className="text-xs md:text-sm text-white/70 max-w-2xl font-normal leading-relaxed mb-8 md:mb-10"
            initial={INITIAL_UP16}
            animate={ANIMATE_IN}
            transition={TRANSITION_BODY}
          >
            {details.overview}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={INITIAL_UP12}
            animate={ANIMATE_IN}
            transition={TRANSITION_CTA}
          >
            <Button
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-white text-black hover:bg-white/90 rounded-full px-7 h-11 md:h-12 text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-md gap-2"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact modal */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto custom-scrollbar rounded-2xl shadow-2xl"
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-white transition-colors"
                aria-label="Close Contact Form"
              >
                <X className="w-5 h-5" />
              </button>

              <ContactForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default HeroSection;
