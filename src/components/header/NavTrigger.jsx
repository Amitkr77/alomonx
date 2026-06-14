"use client";
import { memo, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import megaMenuData from "@/data/megaMenuData";

// ─── Module-level Framer Motion constants ─────────────────────
// Inline objects passed to `animate` / `transition` are new
// references every render → Framer deep-compares them every time.
// Hoisting them here makes them permanently stable.
const CHEVRON_TRANSITION = { duration: 0.22 };
const ROTATE_OPEN = { rotate: 180 };
const ROTATE_CLOSED = { rotate: 0 };

// ─── Module-level base style template ─────────────────────────
// Only the `color` key differs between active/inactive states,
// so we build two frozen objects once and pick between them.
const BASE_STYLE_INACTIVE = Object.freeze({
  color: "#94A3B8",
  fontFamily: "var(--font-jost,'Jost',sans-serif)",
  fontSize: "clamp(13px, 1vw, 15px)",
  fontWeight: 500,
  transition: "color 0.2s",
  whiteSpace: "nowrap",
  padding: "4px 0",
  background: "none",
  border: "none",
  cursor: "pointer",
});

const BASE_STYLE_ACTIVE = Object.freeze({
  ...BASE_STYLE_INACTIVE,
  color: "#F8FAFC",
});

// Underline width values — avoids two string literals inline
const UNDERLINE_ACTIVE = Object.freeze({
  background: "#22D3EE",
  width: "100%",
});
const UNDERLINE_INACTIVE = Object.freeze({
  background: "#22D3EE",
  width: "0%",
});

// ─── Shared hover handlers — stable references, no closures ───
// Direct DOM mutation for hover colour is the right call here:
// it avoids a React state update + re-render just for a colour
// change, keeping the interaction at 0 JS overhead.
function handleMouseEnterColor(e) {
  e.currentTarget.style.color = "#F8FAFC";
}
function handleMouseLeaveColor(e) {
  e.currentTarget.style.color = "#94A3B8";
}

// ─── NavTrigger ───────────────────────────────────────────────
// memo() prevents re-renders when the parent nav updates for
// reasons unrelated to this item (hover on a sibling, scroll, etc.)
const NavTrigger = memo(function NavTrigger({
  name,
  href,
  activeMenu,
  onNavEnter,
  onNavLeave,
  onToggleMenu,
  onTrackEvent,
}) {
  // `name` is a prop that never changes for a given nav item,
  // so hasMega is effectively a constant — but useMemo makes
  // that contract explicit and guards against accidental recompute.
  const hasMega = useMemo(() => !!megaMenuData[name], [name]);
  const isActive = activeMenu === name;
  const baseStyle = isActive ? BASE_STYLE_ACTIVE : BASE_STYLE_INACTIVE;

  // Per-instance stable callbacks.
  // These only change if `name` / the parent callbacks change —
  // not on every render — so the Link / button never sees a new
  // function reference unless something actually changed.
  const handleEnter = useCallback(
    (e) => {
      handleMouseEnterColor(e);
      onNavEnter(name);
    },
    [name, onNavEnter],
  );

  const handleLeave = useCallback(
    (e) => {
      handleMouseLeaveColor(e);
      onNavLeave();
    },
    [onNavLeave],
  );

  const handleLinkClick = useCallback(
    () => onTrackEvent("click", `${name} Nav`),
    [name, onTrackEvent],
  );

  const handleButtonClick = useCallback(
    () => onToggleMenu(name),
    [name, onToggleMenu],
  );

  // `inner` only changes when `isActive` or `hasMega` changes.
  // Previously it was rebuilt (including the motion.span) on every
  // render, even for unrelated parent updates.
  const inner = useMemo(
    () => (
      <span className="relative flex items-center gap-1">
        <span>{name}</span>
        {hasMega && (
          <motion.span
            animate={isActive ? ROTATE_OPEN : ROTATE_CLOSED}
            transition={CHEVRON_TRANSITION}
            className="inline-flex"
          >
            <ChevronDown
              className="w-3 h-3 xl:w-3.5 xl:h-3.5"
              style={{ color: "#94A3B8" }}
            />
          </motion.span>
        )}
        <span
          className="absolute -bottom-1 left-0 h-[1.5px] transition-all duration-300"
          style={isActive ? UNDERLINE_ACTIVE : UNDERLINE_INACTIVE}
        />
      </span>
    ),
    [name, hasMega, isActive],
  );

  if (href && !hasMega) {
    return (
      <Link
        href={href}
        style={baseStyle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleLinkClick}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      style={baseStyle}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleButtonClick}
      aria-expanded={isActive}
    >
      {inner}
    </button>
  );
});

export default NavTrigger;
