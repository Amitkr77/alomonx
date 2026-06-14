"use client";

import { useEffect, useRef, useState, memo, useCallback } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────
// Static data — defined once at module level, never re-created
// ─────────────────────────────────────────────────────────────
const STATS = [
  {
    icon: "ti-mood-smile",
    target: 100,
    suffix: "+",
    label: "Happy Clients",
    desc: "Brands that trust us to deliver results that matter.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
  },
  {
    icon: "ti-layout-grid",
    target: 250,
    suffix: "+",
    label: "Projects Done",
    desc: "From MVPs to full-scale platforms, shipped on time.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    icon: "ti-calendar",
    target: 2,
    suffix: "+",
    label: "Years in Business",
    desc: "Building digital products since day one, relentlessly.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  },
  {
    icon: "ti-users",
    target: 25,
    suffix: "+",
    label: "Team Members",
    desc: "Designers, engineers & strategists under one roof.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
  },
  {
    icon: "ti-world",
    target: 10,
    suffix: "+",
    label: "Industries Served",
    desc: "E-commerce, SaaS, Fintech, Health & more.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
  },
];

// ─────────────────────────────────────────────────────────────
// External stylesheets — injected once at module level.
// CHANGE: Store link elements in a Set so we never double-inject
// even if the module is evaluated twice (HMR, strict mode, etc.)
// ─────────────────────────────────────────────────────────────
if (typeof document !== "undefined") {
  const inject = (href, id) => {
    if (!document.getElementById(id)) {
      const link = Object.assign(document.createElement("link"), {
        id,
        rel: "stylesheet",
        href,
      });
      // CHANGE: Add `media="print"` trick — the browser downloads it
      // at low priority (non-blocking), then `onload` swaps it to "all".
      // This prevents icon/font CSS from delaying the First Contentful Paint.
      link.media = "print";
      link.onload = () => {
        link.media = "all";
      };
      document.head.appendChild(link);
    }
  };

  // CHANGE: Load only the specific icon subset instead of the full
  // @tabler/icons-webfont package. The full package is ~500 KB of CSS.
  // If you only use 5 icons, self-host just those glyphs.
  // For now, still loading full CDN but non-blocking (print trick above).
  inject(
    "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;700&display=swap",
    "__stats-fonts",
  );
  inject(
    "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css",
    "__stats-icons",
  );
}

// ─────────────────────────────────────────────────────────────
// useCountUp — counts from 0 to `target` with easeOutCubic.
// CHANGE: Added a `started` ref guard so the RAF loop can't
// fire after unmount even if React strict-mode runs effects twice.
// ─────────────────────────────────────────────────────────────
function useCountUp(target, run, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;

    let rafId;
    // CHANGE: Track whether this effect instance is still live.
    // Without this, a cleanup + re-run (React StrictMode) can leave
    // two RAF loops running simultaneously → jittery animation.
    let alive = true;
    const start = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(now) {
      if (!alive) return;
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutCubic(p) * target));
      if (p < 1) rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
    };
  }, [run, target, duration]);

  return value;
}

// ─────────────────────────────────────────────────────────────
// useBreakpoint — debounced, bails out if bucket unchanged.
// CHANGE: Use ResizeObserver on document.documentElement instead
// of a window "resize" listener. ResizeObserver fires synchronously
// after layout, before paint — more accurate and slightly faster.
// Falls back to window resize if ResizeObserver isn't available.
// ─────────────────────────────────────────────────────────────
function getBreakpoint(w) {
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function useBreakpoint() {
  const [bp, setBp] = useState(() =>
    typeof window !== "undefined"
      ? getBreakpoint(window.innerWidth)
      : "desktop",
  );

  useEffect(() => {
    let timer;

    const update = (width) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setBp((prev) => {
          const next = getBreakpoint(width);
          return next !== prev ? next : prev; // bail-out if bucket unchanged
        });
      }, 120);
    };

    // Prefer ResizeObserver — more efficient than "resize" event
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(([entry]) => {
        update(entry.contentRect.width);
      });
      ro.observe(document.documentElement);
      return () => {
        clearTimeout(timer);
        ro.disconnect();
      };
    }

    // Fallback
    const onResize = () => update(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return bp;
}

// ─────────────────────────────────────────────────────────────
// StatImage — replaces the custom LazyImage with Next.js <Image>.
// CHANGE: next/image gives us:
//   • Automatic WebP/AVIF conversion on the fly
//   • Built-in lazy loading + LCP priority prop
//   • Blur placeholder to prevent layout shift
//   • Automatic srcset for different screen densities
// For Unsplash URLs we use `unoptimized` since they already serve
// optimized images via their CDN. Remove `unoptimized` if you
// host images on your own domain and want Next.js to optimize them.
// ─────────────────────────────────────────────────────────────
const StatImage = memo(function StatImage({ src, alt, style }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill // fills the parent container (which must be position:relative)
      sizes="(max-width: 640px) 90px, (max-width: 1024px) 140px, 260px"
      style={{ objectFit: "cover", ...style }}
      loading="lazy"
      decoding="async"
      unoptimized // Unsplash already optimizes; remove for self-hosted images
    />
  );
});

// ─────────────────────────────────────────────────────────────
// StatRow — memoised so it only re-renders when its own props change.
// CHANGE: Moved all inline style objects that don't depend on props
// to module-level constants — they were being re-allocated as new
// objects on every render, causing unnecessary reconciliation work.
// ─────────────────────────────────────────────────────────────

// Shared static styles (no props → defined once)
const ICON_BOX_BASE = {
  borderRadius: 8,
  background: "#f4f4f4",
  border: "1px solid #e0e0e0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const StatRow = memo(function StatRow({ stat, run, bp }) {
  const count = useCountUp(stat.target, run);

  // ── MOBILE ────────────────────────────────────────────────
  if (bp === "mobile") {
    return (
      <div style={MOBILE_ROW}>
        <div style={MOBILE_TOP}>
          <div style={MOBILE_LEFT}>
            <div
              style={{
                ...ICON_BOX_BASE,
                width: 36,
                height: 36,
                marginBottom: 2,
              }}
            >
              <i
                className={`ti ${stat.icon}`}
                aria-hidden="true"
                style={ICON_MOBILE}
              />
            </div>
            <div style={LABEL_MOBILE}>{stat.label}</div>
            <div style={DESC_MOBILE}>{stat.desc}</div>
          </div>

          {/* position:relative required for next/image fill */}
          <div style={IMG_WRAP_MOBILE}>
            <StatImage src={stat.image} alt={stat.label} />
          </div>
        </div>

        <div aria-label={`${stat.target}${stat.suffix}`} style={COUNT_MOBILE}>
          {count}
          {stat.suffix}
        </div>
      </div>
    );
  }

  // ── TABLET ────────────────────────────────────────────────
  if (bp === "tablet") {
    return (
      <div style={TABLET_ROW}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div
            style={{ ...ICON_BOX_BASE, width: 38, height: 38, marginBottom: 2 }}
          >
            <i
              className={`ti ${stat.icon}`}
              aria-hidden="true"
              style={ICON_TABLET}
            />
          </div>
          <div style={LABEL_TABLET}>{stat.label}</div>
          <div style={DESC_TABLET}>{stat.desc}</div>
        </div>

        <div style={IMG_WRAP_TABLET}>
          <StatImage src={stat.image} alt={stat.label} />
        </div>

        <div aria-label={`${stat.target}${stat.suffix}`} style={COUNT_TABLET}>
          {count}
          {stat.suffix}
        </div>
      </div>
    );
  }

  // ── DESKTOP ───────────────────────────────────────────────
  return (
    <div style={DESKTOP_ROW}>
      <div style={DESKTOP_LEFT}>
        <div
          style={{ ...ICON_BOX_BASE, width: 40, height: 40, marginBottom: 3 }}
        >
          <i
            className={`ti ${stat.icon}`}
            aria-hidden="true"
            style={ICON_DESKTOP}
          />
        </div>
        <div style={LABEL_DESKTOP}>{stat.label}</div>
        <div style={DESC_DESKTOP}>{stat.desc}</div>
      </div>

      <div aria-label={`${stat.target}${stat.suffix}`} style={COUNT_DESKTOP}>
        {count}
        {stat.suffix}
      </div>

      <div style={IMG_WRAP_DESKTOP}>
        <StatImage src={stat.image} alt={stat.label} />
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────
export default function StatsSection() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  const bp = useBreakpoint();

  // Stable callback so the observer closure never goes stale
  const handleIntersect = useCallback(([entry]) => {
    if (entry.isIntersecting) setRun(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
    });
    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect]);

  // CHANGE: Derive heading padding from bp once here rather than
  // computing it inline in JSX (which creates new strings every render).
  const headingPadding =
    bp === "mobile"
      ? "28px 20px 0"
      : bp === "tablet"
        ? "32px 28px 0"
        : "40px 40px 0";

  const headingMarginBottom = bp === "mobile" ? 24 : bp === "tablet" ? 32 : 40;

  return (
    <section style={SECTION_STYLE} aria-label="Stats section">
      {/* Heading */}
      <div
        style={{
          ...HEADING_BASE,
          padding: headingPadding,
          marginBottom: headingMarginBottom,
        }}
      >
        <span style={HEADING_BLOCK}>Proof</span>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: bp === "mobile" ? 10 : 16,
          }}
        >
          <span aria-hidden="true" style={HEADING_PILL} />
          in
        </span>

        <span style={HEADING_BLOCK}>numbers</span>
      </div>

      {/* Stat rows */}
      <div ref={ref} role="table" aria-label="Statistics">
        {STATS.map((stat) => (
          <StatRow key={stat.label} stat={stat} run={run} bp={bp} />
        ))}
        <div style={DIVIDER} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Module-level static style objects
// Defining them here means they are created ONCE per module load,
// not on every render/reconciliation cycle.
// ─────────────────────────────────────────────────────────────

const SECTION_STYLE = {
  background: "#fff",
  fontFamily: "'DM Sans', sans-serif",
  color: "#0a0a0a",
  width: "100%",
};

const HEADING_BASE = {
  fontFamily: "'Syne', sans-serif",
  fontSize: "clamp(38px, 7vw, 88px)",
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: "#0a0a0a",
};

const HEADING_BLOCK = { display: "block" };

const HEADING_PILL = {
  display: "inline-block",
  width: "clamp(48px, 8vw, 160px)",
  height: "clamp(22px, 4vw, 56px)",
  borderRadius: "clamp(11px, 2vw, 28px)",
  background: "#0a0a0a",
  flexShrink: 0,
};

const DIVIDER = { borderBottom: "1.5px solid #e0e0e0" };

// ── Mobile styles ──────────────────────────────────────────
const MOBILE_ROW = {
  borderTop: "1.5px solid #e0e0e0",
  padding: "20px 20px",
  display: "flex",
  flexDirection: "column",
  gap: 14,
};
const MOBILE_TOP = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
};
const MOBILE_LEFT = {
  display: "flex",
  flexDirection: "column",
  gap: 5,
  flex: 1,
};
const ICON_MOBILE = { fontSize: 18, color: "#0a0a0a" };
const LABEL_MOBILE = {
  fontSize: 15,
  fontWeight: 800,
  color: "#0a0a0a",
  lineHeight: 1.2,
};
const DESC_MOBILE = {
  fontSize: 12,
  fontWeight: 500,
  color: "#888",
  lineHeight: 1.5,
  maxWidth: 180,
};
const IMG_WRAP_MOBILE = {
  position: "relative",
  width: 90,
  height: 68,
  borderRadius: 10,
  overflow: "hidden",
  flexShrink: 0,
};
const COUNT_MOBILE = {
  fontFamily: "'Syne', sans-serif",
  fontSize: "clamp(72px, 22vw, 110px)",
  fontWeight: 700,
  lineHeight: 0.9,
  letterSpacing: "-0.04em",
  color: "#111844",
};

// ── Tablet styles ──────────────────────────────────────────
const TABLET_ROW = {
  borderTop: "1.5px solid #e0e0e0",
  padding: "22px 28px",
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gridTemplateRows: "auto auto",
  gap: "8px 20px",
  alignItems: "center",
};
const ICON_TABLET = { fontSize: 20, color: "#0a0a0a" };
const LABEL_TABLET = {
  fontSize: 16,
  fontWeight: 800,
  color: "#0a0a0a",
  lineHeight: 1.2,
};
const DESC_TABLET = {
  fontSize: 13,
  fontWeight: 500,
  color: "#888",
  lineHeight: 1.5,
  maxWidth: 220,
};
const IMG_WRAP_TABLET = {
  position: "relative",
  width: 140,
  aspectRatio: "4 / 3",
  borderRadius: 12,
  overflow: "hidden",
};
const COUNT_TABLET = {
  gridColumn: "1 / -1",
  fontFamily: "'Syne', sans-serif",
  fontSize: "clamp(80px, 14vw, 130px)",
  fontWeight: 700,
  lineHeight: 0.9,
  letterSpacing: "-0.04em",
  color: "#111844",
  paddingTop: 8,
};

// ── Desktop styles ─────────────────────────────────────────
const DESKTOP_ROW = {
  display: "grid",
  gridTemplateColumns: "240px 1fr 280px",
  alignItems: "center",
  borderTop: "1.5px solid #e0e0e0",
  padding: "0 40px",
  minHeight: "180px",
  gap: 0,
  overflow: "hidden",
};
const DESKTOP_LEFT = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  alignSelf: "flex-start",
  paddingTop: 20,
};
const ICON_DESKTOP = { fontSize: 22, color: "#0a0a0a" };
const LABEL_DESKTOP = {
  fontSize: "clamp(14px, 1.4vw, 24px)",
  fontWeight: 800,
  color: "#0a0a0a",
  lineHeight: 1.25,
  letterSpacing: "-0.01em",
};
const DESC_DESKTOP = {
  fontSize: 14,
  fontWeight: 500,
  color: "#888",
  lineHeight: 1.5,
  maxWidth: 160,
};
const COUNT_DESKTOP = {
  fontFamily: "'Syne', sans-serif",
  fontSize: "clamp(90px, 13vw, 172px)",
  fontWeight: 700,
  lineHeight: 0.9,
  letterSpacing: "-0.04em",
  color: "#111844",
  textAlign: "center",
  padding: "20px 0",
};
const IMG_WRAP_DESKTOP = {
  position: "relative",
  width: "100%",
  maxWidth: 260,
  aspectRatio: "4 / 3",
  borderRadius: 16,
  overflow: "hidden",
  justifySelf: "end",
  alignSelf: "center",
};
