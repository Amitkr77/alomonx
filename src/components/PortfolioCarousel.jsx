"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { homepage } from "@/lib/portfolio_data";

// ─────────────────────────────────────────────────────────────
// Constants — module level, never recreated
// ─────────────────────────────────────────────────────────────
const ACCENT = "#00FFCC";

const carouselItems = homepage.map((p) => ({
  id: p.slug,
  title: p.title,
  desc: p.shortDescription,
  images: [p.images.image_2, p.images.image_3].filter(Boolean),
}));

const TOTAL_CARDS = carouselItems.length;

const DESKTOP_LAYOUT = {
  cardWidth: 350,
  gap: 16,
  widthClass: "w-[300px]",
  heightClass: "h-[600px]",
  topClass: "-top-[300px]",
  leftClass: "-left-[190px]",
  trackHeight: "h-[560px]",
  containerHeight: "min-h-[820px]",
  isMobile: false,
};

// NEW: Tablet layout configuration
const TABLET_LAYOUT = {
  cardWidth: 300,
  gap: 16,
  widthClass: "w-[300px]",
  heightClass: "h-[480px]",
  topClass: "-top-[240px]",
  leftClass: "-left-[150px]",
  trackHeight: "h-[500px]",
  containerHeight: "min-h-[700px]",
  isMobile: false,
};

const MOBILE_LAYOUT = {
  cardWidth: 260,
  gap: 14,
  widthClass: "w-[260px]",
  heightClass: "h-[360px]",
  topClass: "-top-[180px]",
  leftClass: "-left-[130px]",
  trackHeight: "h-[440px]",
  containerHeight: "min-h-[640px]",
  isMobile: true,
};

const SPRING_CFG = { damping: 20, stiffness: 400, mass: 0.2 };
const CURSOR_SPRING = { damping: 22, stiffness: 300 };

const CURSOR_VISIBLE = { opacity: 1, scale: 1 };
const CURSOR_HIDDEN = { opacity: 0, scale: 0.2 };

const IMG_TRANSITION = { duration: 1.5, ease: "easeInOut" };
const HOVER_SCALE = { scale: 1.06 };
const HOVER_TRANSITION = { duration: 0.6, ease: [0.4, 0, 0.2, 1] };

// ─────────────────────────────────────────────────────────────
// rAF-throttled mousemove hook
// ─────────────────────────────────────────────────────────────
function useRafMouseMove(mvX, mvY, containerRef) {
  const rafId = useRef(null);
  return useCallback(
    (e) => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mvX.set(e.clientX - rect.left);
        mvY.set(e.clientY - rect.top);
      });
    },
    [mvX, mvY, containerRef],
  );
}

// ─────────────────────────────────────────────────────────────
// useCardTransforms
// ─────────────────────────────────────────────────────────────
function useCardTransform(dragX, index, STEP, TOTAL_WIDTH) {
  const xOffset = useTransform(dragX, (v) => {
    const raw = index * STEP + v;
    const half = TOTAL_WIDTH / 2;
    let wrapped = ((raw % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH;
    if (wrapped > half) wrapped -= TOTAL_WIDTH;
    return wrapped;
  });

  const scale = useTransform(
    xOffset,
    [-STEP * 1.5, 0, STEP * 1.5],
    [0.92, 1, 0.92],
  );

  return { xOffset, scale };
}

// ─────────────────────────────────────────────────────────────
// ImageCycler
// ─────────────────────────────────────────────────────────────
const ImageCycler = memo(function ImageCycler({ images, title, isVisible }) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!isVisible || images.length <= 1) return;
    const id = setInterval(
      () => setImgIndex((p) => (p + 1) % images.length),
      4500,
    );
    return () => clearInterval(id);
  }, [isVisible, images.length]);

  return (
    <>
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={imgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={IMG_TRANSITION}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div
              whileHover={HOVER_SCALE}
              transition={HOVER_TRANSITION}
              className="absolute inset-0 w-full h-full origin-center"
            >
              <Image
                src={images[imgIndex]}
                alt={title}
                fill
                sizes="(max-width: 768px) 260px, (max-width: 1024px) 300px, 350px"
                className="object-cover"
                loading="lazy"
                decoding="async"
                unoptimized
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />
      </div>

      <div className="absolute bottom-5 left-5 md:bottom-7 md:left-7 flex gap-1.5 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-700 ${
              i === imgIndex ? "w-4 bg-white" : "w-1 bg-white/30"
            }`}
          />
        ))}
      </div>
    </>
  );
});

// ─────────────────────────────────────────────────────────────
// NavButton
// ─────────────────────────────────────────────────────────────
const NavButton = memo(function NavButton({ id, title }) {
  const router = useRouter();

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      router.push(`/portfolio/${id}`);
    },
    [router, id],
  );

  return (
    <button
      onClick={handleClick}
      // Stop pointer down events so framer-motion doesn't interpret it as a drag
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={`View ${title}`}
      style={{ color: ACCENT, borderColor: `${ACCENT}40` }}
      // CHANGED: opacity-100 base ensures it shows on mobile/tablet.
      // md:opacity-0 and md:group-hover:opacity-100 applies the hover effect strictly on larger screens
      className="relative z-50 flex items-center justify-center w-10 h-10 md:w-9 md:h-9 rounded-full border bg-black/60 md:bg-black/30 backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-black/50 cursor-pointer pointer-events-auto"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 12L12 2M12 2H5M12 2v7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
});

// ─────────────────────────────────────────────────────────────
// PremiumCard
// ─────────────────────────────────────────────────────────────
const PremiumCard = memo(function PremiumCard({
  item,
  index,
  dragX,
  layout,
  isVisible,
  onMouseEnter,
  onMouseLeave,
}) {
  const { cardWidth, gap } = layout;
  const STEP = cardWidth + gap;
  const TOTAL_WIDTH = TOTAL_CARDS * STEP;

  const { xOffset, scale } = useCardTransform(dragX, index, STEP, TOTAL_WIDTH);

  return (
    <motion.div
      style={{ x: xOffset, scale }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute ${layout.topClass} ${layout.leftClass} ${layout.widthClass} ${layout.heightClass} rounded-[24px] md:rounded-[28px] overflow-hidden shadow-2xl group`}
    >
      <ImageCycler
        images={item.images}
        title={item.title}
        isVisible={isVisible}
      />

      <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-between text-white pointer-events-none">
        <div className="flex justify-end items-start w-full pointer-events-none">
          {/* Button handles its own pointer-events-auto */}
          <NavButton id={item.id} title={item.title} />
        </div>

        <div className="flex flex-col gap-1.5 md:gap-2 pb-8 pointer-events-none z-10">
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight leading-tight">
            {item.title}
          </h3>
          <div className="h-[1px] w-8 bg-white/40 my-1" />
          <p className="text-[11px] md:text-sm font-light leading-relaxed text-white/80 line-clamp-2">
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

// ─────────────────────────────────────────────────────────────
// NavTabs
// ─────────────────────────────────────────────────────────────
const NavTabs = memo(function NavTabs({ activeIndex, onNav, isMobile }) {
  return (
    <div className="z-10 flex items-center gap-4 mb-5 md:mb-8 px-5 md:px-8 overflow-x-auto w-full max-w-[1400px] mx-auto justify-start [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {carouselItems.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onNav(index)}
          className="group relative px-2 py-1 flex flex-col items-center gap-2"
        >
          <span
            style={{ fontFamily: "'DM Sans',sans-serif" }}
            className={`text-[11px] md:text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-500 whitespace-nowrap ${
              activeIndex === index
                ? "text-white"
                : "text-white/30 group-hover:text-white/60"
            }`}
          >
            {item.title}
          </span>
          <div
            className={`h-[2px] rounded-full transition-all duration-500 ${activeIndex === index ? "w-full" : "w-0"}`}
            style={{
              backgroundColor: activeIndex === index ? ACCENT : "transparent",
            }}
          />
        </button>
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// SectionHeader
// ─────────────────────────────────────────────────────────────
const SectionHeader = memo(function SectionHeader({ isMobile }) {
  return (
    <div className="max-w-[1400px] mx-auto w-full px-5 md:px-8 relative z-10">
      <div style={{ marginBottom: isMobile ? 24 : 50 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: isMobile ? 16 : 22,
          }}
        >
          <div
            style={{
              width: 28,
              height: 1,
              background: ACCENT,
              boxShadow: `0 0 6px ${ACCENT}`,
            }}
          />
          <span style={LABEL_STYLE}>Our Portfolio</span>
        </div>

        <h1 style={HEADING_STYLE}>
          featured
          <br />
          <span style={{ color: "rgba(255,255,255,0.13)" }}>projects</span>
        </h1>

        <p style={SUBHEADING_STYLE}>
          Precision-crafted digital experiences across every vertical — from
          concept to launch.
        </p>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// CarouselCore
// ─────────────────────────────────────────────────────────────
function CarouselCore({ layout }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const dragX = useMotionValue(0);
  const STEP = layout.cardWidth + layout.gap;
  const TOTAL_WIDTH = TOTAL_CARDS * STEP;

  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useMotionValueEvent(dragX, "change", (latest) => {
    let next = Math.round(-latest / STEP);
    next = ((next % TOTAL_CARDS) + TOTAL_CARDS) % TOTAL_CARDS;
    if (next !== activeIndex) setActiveIndex(next);
  });

  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, CURSOR_SPRING);
  const cursorY = useSpring(mouseY, CURSOR_SPRING);

  const handleMouseMove = useRafMouseMove(mouseX, mouseY, containerRef);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleCardEnter = useCallback(() => setIsCardHovered(true), []);
  const handleCardLeave = useCallback(() => setIsCardHovered(false), []);

  const showDragCursor = isHovered && !isCardHovered && !layout.isMobile;

  const handlePan = useCallback(
    (_, info) => {
      dragX.set(dragX.get() + info.delta.x * 1.2);
    },
    [dragX],
  );

  const handlePanEnd = useCallback(
    (_, info) => {
      const cur = dragX.get();
      const momentum = info.velocity.x * 0.18;
      animate(dragX, cur + momentum, {
        type: "spring",
        stiffness: 60,
        damping: 18,
        mass: 1.2,
        restDelta: 0.5,
      });
    },
    [dragX],
  );

  const handleNavClick = useCallback(
    (targetIndex) => {
      const cur = dragX.get();
      const tBase = -targetIndex * STEP;
      const diff =
        ((((tBase - cur + TOTAL_WIDTH / 2) % TOTAL_WIDTH) + TOTAL_WIDTH) %
          TOTAL_WIDTH) -
        TOTAL_WIDTH / 2;
      animate(dragX, cur + diff, {
        type: "spring",
        stiffness: 150,
        damping: 25,
      });
    },
    [dragX, STEP, TOTAL_WIDTH],
  );

  return (
    <div
      ref={sectionRef}
      className={`relative w-full ${layout.containerHeight} flex flex-col font-sans overflow-hidden select-none py-10 md:py-12 pt-16 isolate mb-12`}
    >
      <SectionHeader isMobile={layout.isMobile} />

      <NavTabs
        activeIndex={activeIndex}
        onNav={handleNavClick}
        isMobile={layout.isMobile}
      />

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{ touchAction: "pan-y" }}
        className={`relative w-full ${layout.trackHeight} flex justify-center items-center cursor-grab active:cursor-grabbing`}
      >
        {!layout.isMobile && (
          <motion.div
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={showDragCursor ? CURSOR_VISIBLE : CURSOR_HIDDEN}
            className="hidden md:flex absolute top-0 left-0 z-[100] pointer-events-none w-[80px] h-[80px] bg-white/5 backdrop-blur-xl rounded-full items-center justify-center border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <span
              style={{ fontFamily: "'DM Sans',sans-serif" }}
              className="text-white text-[10px] font-bold tracking-[0.3em]"
            >
              DRAG
            </span>
          </motion.div>
        )}

        <div className="absolute w-0 h-0">
          {carouselItems.map((item, index) => (
            <PremiumCard
              key={item.id}
              item={item}
              index={index}
              dragX={dragX}
              layout={layout}
              isVisible={isVisible}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Root wrapper — handles SSR hydration & responsive layout swap
// ─────────────────────────────────────────────────────────────
export default function PremiumCarousel() {
  const [layoutType, setLayoutType] = useState(null);

  useEffect(() => {
    const checkLayout = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setLayoutType("mobile");
      } else if (width < 1024) {
        setLayoutType("tablet");
      } else {
        setLayoutType("desktop");
      }
    };

    // Initial check
    checkLayout();

    let debounceId;
    const onResize = () => {
      clearTimeout(debounceId);
      debounceId = setTimeout(checkLayout, 150);
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(debounceId);
    };
  }, []);

  if (!layoutType) {
    return (
      <div
        className="min-h-[820px] w-full"
        style={{ background: "#050505" }}
        aria-hidden="true"
      />
    );
  }

  const activeLayout =
    layoutType === "mobile"
      ? MOBILE_LAYOUT
      : layoutType === "tablet"
        ? TABLET_LAYOUT
        : DESKTOP_LAYOUT;

  return <CarouselCore layout={activeLayout} key={layoutType} />;
}

// ─────────────────────────────────────────────────────────────
// Module-level static style objects for SectionHeader
// ─────────────────────────────────────────────────────────────
const LABEL_STYLE = {
  fontFamily: "'DM Sans',sans-serif",
  fontSize: 11,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: ACCENT,
  fontWeight: 500,
};

const HEADING_STYLE = {
  fontFamily: "'Syne',sans-serif",
  fontWeight: 800,
  margin: 0,
  fontSize: "clamp(3rem,9vw,7rem)",
  lineHeight: 0.88,
  letterSpacing: "-0.03em",
  color: "white",
};

const SUBHEADING_STYLE = {
  marginTop: 16,
  fontFamily: "'DM Sans',sans-serif",
  fontSize: "0.93rem",
  color: "rgba(255,255,255,0.28)",
  fontWeight: 300,
  maxWidth: 600,
  lineHeight: 1.5,
};
