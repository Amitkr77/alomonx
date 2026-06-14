"use client";
import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

// ─── Inject scrollbar-hide CSS once at module level ───────────
if (
  typeof document !== "undefined" &&
  !document.getElementById("__mega-no-scrollbar")
) {
  const s = document.createElement("style");
  s.id = "__mega-no-scrollbar";
  s.textContent = ".no-scrollbar::-webkit-scrollbar{display:none}";
  document.head.appendChild(s);
}

// ─── Framer Motion constants ────────
const PANEL_INITIAL = Object.freeze({ opacity: 0, y: -8 });
const PANEL_ANIMATE = Object.freeze({ opacity: 1, y: 0 });
const PANEL_EXIT = Object.freeze({ opacity: 0, y: -8 });
const PANEL_TRANSITION = Object.freeze({ duration: 0.22, ease: "easeOut" });

const IMG_INITIAL = Object.freeze({ opacity: 0, scale: 1.04 });
const IMG_ANIMATE = Object.freeze({ opacity: 1, scale: 1 });
const IMG_EXIT = Object.freeze({ opacity: 0 });
const IMG_TRANSITION = Object.freeze({ duration: 0.28, ease: "easeOut" });

const LABEL_INITIAL = Object.freeze({ opacity: 0, y: 8 });
const LABEL_ANIMATE = Object.freeze({ opacity: 1, y: 0 });
const LABEL_EXIT = Object.freeze({ opacity: 0, y: -4 });
const LABEL_TRANSITION = Object.freeze({ duration: 0.2 });

// ─── Shared hover handlers ────
function onScrollBtnEnter(e) {
  if (e.currentTarget.disabled) return;
  e.currentTarget.style.background = "#22D3EE";
  e.currentTarget.style.color = "#020617";
}
function onScrollBtnLeave(e) {
  if (e.currentTarget.disabled) return;
  e.currentTarget.style.background = "rgba(11,17,32,0.95)";
  e.currentTarget.style.color = "#22D3EE";
}

// ─── useIsWide ─────────────────
function useIsWide() {
  const [isWide, setIsWide] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1280 : true,
  );

  useEffect(() => {
    let timer;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsWide((prev) => {
          const next = window.innerWidth >= 1280;
          return next !== prev ? next : prev;
        });
      }, 120);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isWide;
}

// ─── useScrollState ───
function useScrollState(scrollRef) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, [scrollRef]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, [checkScroll, scrollRef]);

  return { canScrollLeft, canScrollRight };
}

// ─── LinkItem ──────────────────────────────────────
const LinkItem = memo(function LinkItem({ link, isActive, onHover, onClose }) {
  return (
    <li>
      <Link
        href={link.href}
        onClick={onClose}
        onMouseEnter={onHover}
        className="group flex items-center gap-2 py-1.5 lg:py-2 pr-2 rounded-lg transition-all duration-150 relative"
        style={{
          color: isActive ? "#F8FAFC" : "#94A3B8",
          fontSize: "13px",
          fontFamily: "var(--font-jost,'Jost',sans-serif)",
          paddingLeft: isActive ? "14px" : "10px",
        }}
      >
        {isActive && (
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full"
            style={{ height: "60%", background: "#22D3EE" }}
          />
        )}
        <span className="flex-1 leading-snug">{link.label}</span>
        {isActive && (
          <ArrowRight
            size={12}
            strokeWidth={2.5}
            style={{ color: "#22D3EE", flexShrink: 0 }}
          />
        )}
        {link.badge && (
          <span
            className="text-[9px] lg:text-[10px] font-semibold tracking-wide px-1.5 py-0.5 rounded-full flex-shrink-0"
            style={{
              background: "rgba(37,99,255,0.15)",
              color: "#22D3EE",
              border: "1px solid rgba(37,99,255,0.3)",
            }}
          >
            {link.badge}
          </span>
        )}
      </Link>
    </li>
  );
});

// ─── Column ────────────────────────────────────────
const Column = memo(function Column({ col, activeLabel, onHover, onClose }) {
  const hasHeader = col.heading || col.icon;

  return (
    <div className="min-w-[140px] lg:min-w-[155px] xl:min-w-[160px]">
      {hasHeader && (
        <div
          className="flex items-center gap-2 mb-3 pb-2"
          style={{ borderBottom: "1px solid rgba(248,250,252,0.07)" }}
        >
          {col.icon && <span style={{ color: "#22D3EE" }}>{col.icon}</span>}
          {col.heading && (
            <span
              className="text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{
                color: "#94A3B8",
                fontFamily: "var(--font-jost,'Jost',sans-serif)",
              }}
            >
              {col.heading}
            </span>
          )}
        </div>
      )}
      <ul
        className="space-y-0.5"
        style={{ marginTop: hasHeader ? "0" : "8px" }}
      >
        {col.links.map((link) => (
          <LinkItem
            key={link.label}
            link={link}
            isActive={activeLabel === link.label}
            onHover={onHover(link)}
            onClose={onClose}
          />
        ))}
      </ul>
    </div>
  );
});

// ─── MegaMenuPanel ────────────────────────────────────────────
const MegaMenuPanel = memo(function MegaMenuPanel({ data, onClose }) {
  const allLinks = useMemo(() => {
    if (data.links) return data.links;
    if (data.columns) return data.columns.flatMap((col) => col.links);
    return [];
  }, [data]);

  const displayColumns = useMemo(() => {
    if (data.columns) return data.columns;
    if (data.links) {
      const chunkSize = 5;
      const chunks = [];
      for (let i = 0; i < data.links.length; i += chunkSize) {
        chunks.push({
          _key: `chunk-${i}`,
          links: data.links.slice(i, i + chunkSize),
        });
      }
      return chunks;
    }
    return [];
  }, [data]);

  const [activeLink, setActiveLink] = useState(() => allLinks[0] ?? null);

  const scrollRef = useRef(null);
  const { canScrollLeft, canScrollRight } = useScrollState(scrollRef);
  const isWide = useIsWide();

  const { previewImage, previewDescription, previewLabel } = useMemo(
    () => ({
      previewImage: activeLink?.image || allLinks[0]?.image || "",
      previewDescription: activeLink?.description || "",
      previewLabel: activeLink?.label || "",
    }),
    [activeLink, allLinks],
  );

  const scrollBy = useCallback((dir) => {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  }, []);

  const scrollLeft = useCallback(() => scrollBy(-1), [scrollBy]);
  const scrollRight = useCallback(() => scrollBy(1), [scrollBy]);

  const hoverHandlerMap = useMemo(() => {
    const map = new Map();
    allLinks.forEach((link) => {
      map.set(link, () => setActiveLink(link));
    });
    return map;
  }, [allLinks]);

  const getHoverHandler = useCallback(
    (link) => hoverHandlerMap.get(link),
    [hoverHandlerMap],
  );

  const scrollBtnStyle = useCallback(
    (enabled) => ({
      background: enabled ? "rgba(11,17,32,0.95)" : "rgba(11,17,32,0.4)",
      border: `1px solid ${enabled ? "rgba(34,211,238,0.35)" : "rgba(248,250,252,0.08)"}`,
      color: enabled ? "#22D3EE" : "rgba(148,163,184,0.3)",
      cursor: enabled ? "pointer" : "not-allowed",
    }),
    [],
  );

  return (
    <motion.div
      className="absolute top-full left-0 w-screen"
      initial={PANEL_INITIAL}
      animate={PANEL_ANIMATE}
      exit={PANEL_EXIT}
      transition={PANEL_TRANSITION}
    >
      <div
        style={{
          background: "#0F0E0E",
          borderBottom: "1px solid rgba(248,250,252,0.07)",
          boxShadow: "0 24px 60px rgba(2,6,23,0.75)",
        }}
      >
        <div
          className="max-w-7xl mx-auto flex"
          style={{ minHeight: isWide ? "360px" : "300px" }}
        >
          {/* ── LEFT: link columns ── */}
          <div
            className="flex-shrink-0 relative"
            style={{
              width: isWide ? "55%" : "100%",
              borderRight: isWide ? "1px solid rgba(248,250,252,0.06)" : "none",
            }}
          >
            {canScrollLeft && (
              <div
                className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(to right, #0F0E0E, transparent)",
                }}
              />
            )}
            {canScrollRight && (
              <div
                className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(to left, #0B1120, transparent)",
                }}
              />
            )}

            <div
              ref={scrollRef}
              className="no-scrollbar py-6 px-5 lg:px-8 xl:px-12 flex gap-6 lg:gap-8 xl:gap-10"
              style={{
                overflowX: "auto",
                overflowY: "hidden",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {displayColumns.map((col, idx) => (
                <Column
                  key={col.heading || col._key || idx}
                  col={col}
                  activeLabel={previewLabel}
                  onHover={getHoverHandler}
                  onClose={onClose}
                />
              ))}
            </div>

            {(canScrollLeft || canScrollRight) && (
              <div
                className="flex items-center justify-center gap-3 py-3"
                style={{ borderTop: "1px solid rgba(248,250,252,0.06)" }}
              >
                <button
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                  className="flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full transition-all duration-200"
                  style={scrollBtnStyle(canScrollLeft)}
                  onMouseEnter={onScrollBtnEnter}
                  onMouseLeave={onScrollBtnLeave}
                  aria-label="Scroll left"
                >
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={scrollRight}
                  disabled={!canScrollRight}
                  className="flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full transition-all duration-200"
                  style={scrollBtnStyle(canScrollRight)}
                  onMouseEnter={onScrollBtnEnter}
                  onMouseLeave={onScrollBtnLeave}
                  aria-label="Scroll right"
                >
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT: image preview — xl+ only ── */}
          {isWide && (
            <div
              className="flex-1 relative overflow-hidden"
              style={{ minHeight: "360px" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={previewImage}
                  className="absolute inset-0"
                  initial={IMG_INITIAL}
                  animate={IMG_ANIMATE}
                  exit={IMG_EXIT}
                  transition={IMG_TRANSITION}
                >
                  <img
                    src={previewImage}
                    alt={previewLabel}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, #0B1120 0%, rgba(11,17,32,0.3) 35%, transparent 60%), linear-gradient(to top, rgba(2,6,23,0.85) 0%, transparent 50%)",
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-0 left-0 p-6 z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={previewLabel}
                    initial={LABEL_INITIAL}
                    animate={LABEL_ANIMATE}
                    exit={LABEL_EXIT}
                    transition={LABEL_TRANSITION}
                  >
                    <p
                      className="text-[12px] font-bold uppercase tracking-[0.15em] mb-1"
                      style={{
                        color: "#22D3EE",
                        fontFamily: "var(--font-jost,'Jost',sans-serif)",
                      }}
                    >
                      {previewLabel}
                    </p>
                    <p
                      className="text-[13px] leading-snug max-w-[240px]"
                      style={{
                        color: "rgba(248,250,252,0.7)",
                        fontFamily: "var(--font-jost,'Jost',sans-serif)",
                      }}
                    >
                      {previewDescription}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default MegaMenuPanel;
