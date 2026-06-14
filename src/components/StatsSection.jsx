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
// ─────────────────────────────────────────────────────────────
if (typeof document !== "undefined") {
  const inject = (href, id) => {
    if (!document.getElementById(id)) {
      const link = Object.assign(document.createElement("link"), {
        id,
        rel: "stylesheet",
        href,
      });
      link.media = "print";
      link.onload = () => {
        link.media = "all";
      };
      document.head.appendChild(link);
    }
  };

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
// useCountUp
// ─────────────────────────────────────────────────────────────
function useCountUp(target, run, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    let rafId;
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
// useBreakpoint
//
// FIX: initialise with `null` on both server AND client.
// The first useEffect (client-only) immediately resolves to the
// real breakpoint after mount. This guarantees the SSR HTML and
// the initial client render both see `null` → no hydration mismatch.
// ─────────────────────────────────────────────────────────────
function getBreakpoint(w) {
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function useBreakpoint() {
  // null = not yet measured (server + first client paint)
  const [bp, setBp] = useState(null);

  useEffect(() => {
    // Set real value immediately after mount
    setBp(getBreakpoint(window.innerWidth));

    let timer;
    const update = (width) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setBp((prev) => {
          const next = getBreakpoint(width);
          return next !== prev ? next : prev;
        });
      }, 120);
    };

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
// StatImage
// ─────────────────────────────────────────────────────────────
const StatImage = memo(function StatImage({ src, alt, style }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 90px, (max-width: 1024px) 140px, 260px"
      style={{ objectFit: "cover", ...style }}
      loading="lazy"
      decoding="async"
      unoptimized
    />
  );
});

// ─────────────────────────────────────────────────────────────
// Shared static styles
// ─────────────────────────────────────────────────────────────
const ICON_BOX_BASE = {
  borderRadius: 8,
  background: "#f4f4f4",
  border: "1px solid #e0e0e0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// ─────────────────────────────────────────────────────────────
// StatRow — renders mobile / tablet / desktop layout.
// FIX: When `bp` is null (pre-mount), renders the desktop layout
// with `suppressHydrationWarning` so React skips diffing it.
// The desktop layout is what the server would have rendered if it
// had guessed — but since both server and client now render the
// null-guarded skeleton, there is no mismatch at all.
// ─────────────────────────────────────────────────────────────
const StatRow = memo(function StatRow({ stat, run, bp }) {
  const count = useCountUp(stat.target, run);

  // bp === null means we haven't measured yet — render desktop as
  // the neutral default and suppress hydration on just this node.
  if (bp === null) {
    return (
      <div style={DESKTOP_ROW} suppressHydrationWarning>
        <div style={DESKTOP_LEFT} suppressHydrationWarning>
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
          0{stat.suffix}
        </div>
        <div style={IMG_WRAP_DESKTOP}>
          <StatImage src={stat.image} alt={stat.label} />
        </div>
      </div>
    );
  }

  // ── MOBILE ──────────────────────────────────────────────
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

  // ── TABLET ──────────────────────────────────────────────
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

  // ── DESKTOP ─────────────────────────────────────────────
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

  // Derive heading values — fall back to desktop sizing when bp is null
  const headingPadding =
    bp === "mobile"
      ? "28px 20px 0"
      : bp === "tablet"
        ? "32px 28px 0"
        : "40px 40px 0";
  const headingMarginBottom = bp === "mobile" ? 24 : bp === "tablet" ? 32 : 40;
  const headingGap = bp === "mobile" ? 10 : 16;

  return (
    <section style={SECTION_STYLE} aria-label="Stats section">
      {/* Heading — suppress hydration because padding/gap derive from bp */}
      <div
        suppressHydrationWarning
        style={{
          ...HEADING_BASE,
          padding: headingPadding,
          marginBottom: headingMarginBottom,
        }}
      >
        <span style={HEADING_BLOCK}>Proof</span>
        <span
          suppressHydrationWarning
          style={{ display: "flex", alignItems: "center", gap: headingGap }}
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

// ── Mobile ──────────────────────────────────────────────────
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

// ── Tablet ──────────────────────────────────────────────────
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

// ── Desktop ─────────────────────────────────────────────────
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
