"use client";
import { memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  BookOpenText,
  Hammer,
  Info,
  Mail,
  Cpu,
  Menu,
  MessageCircle,
  Home,
  Sparkles,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// ─── Nav items — icons as elements at module scope ────────────
// Defined here so they are created once, not on every render.
// Using pre-created elements is safe because these icons have no
// dynamic props; they never need to re-render.
const mobileNavItems = [
  { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
  {
    href: "/ai-services",
    label: "Alomonx AI",
    icon: <Sparkles className="w-4 h-4" />,
  },
  { href: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
  {
    href: "/services",
    label: "Services",
    icon: <Hammer className="w-4 h-4" />,
  },
  {
    href: "/industries",
    label: "Industries",
    icon: <Cpu className="w-4 h-4" />,
  },
  { href: "/blog", label: "Blog", icon: <BookOpenText className="w-4 h-4" /> },
  {
    href: "/portfolio",
    label: "Portfolio",
    icon: <Menu className="w-4 h-4" />,
  },
];

// ─── Framer Motion constants — module-level, never recreated ──
const WHILETAP = Object.freeze({ scale: 0.92 });

const PATH_INITIAL = Object.freeze({ opacity: 0 });
const PATH_ANIMATE = Object.freeze({ opacity: 1 });
const PATH_EXIT = Object.freeze({ opacity: 0 });
const PATH_TRANSITION = Object.freeze({ duration: 0.15 });

// Stagger: pre-build one transition object per nav item so the
// delay value isn't computed inside the render on every call.
// Items: 7 nav + 2 contact = 9 total
const ITEM_VARIANTS = mobileNavItems.map((_, i) =>
  Object.freeze({ duration: 0.25, delay: i * 0.06 }),
);
const CONTACT_TRANSITION_0 = Object.freeze({ duration: 0.25, delay: 0.48 });
const CONTACT_TRANSITION_1 = Object.freeze({ duration: 0.25, delay: 0.54 });

const SLIDE_INITIAL = Object.freeze({ opacity: 0, x: 16 });
const SLIDE_ANIMATE = Object.freeze({ opacity: 1, x: 0 });

// ─── Module-level hover handlers (DOM mutation, no re-render) ─
function onNavLinkEnter(e) {
  e.currentTarget.style.color = "#F8FAFC";
  e.currentTarget.style.background = "rgba(248,250,252,0.04)";
}
function onNavLinkLeave(e) {
  e.currentTarget.style.color = "#94A3B8";
  e.currentTarget.style.background = "transparent";
}
function onMailEnter(e) {
  e.currentTarget.style.borderColor = "rgba(34,211,238,0.3)";
  e.currentTarget.style.color = "#22D3EE";
}
function onMailLeave(e) {
  e.currentTarget.style.borderColor = "rgba(248,250,252,0.08)";
  e.currentTarget.style.color = "#94A3B8";
}
function onContactBtnEnter(e) {
  e.currentTarget.style.background = "#22D3EE";
  e.currentTarget.style.color = "#020617";
}
function onContactBtnLeave(e) {
  e.currentTarget.style.background = "#2563FF";
  e.currentTarget.style.color = "#F8FAFC";
}

// ─── NavItem — memoised ───────────────────────────────────────
// Each nav row only re-renders if its own props change.
// The onClick is stable because it only depends on module-level
// data (item) and the two parent callbacks — both wrapped in
// useCallback in the parent (Header.jsx, already optimised).
const NavItem = memo(function NavItem({ item, transition, onClose, onTrack }) {
  const handleClick = useCallback(() => {
    onTrack("click", `${item.label} Mobile Menu`);
    onClose(false);
  }, [item.label, onTrack, onClose]);

  return (
    <motion.div
      initial={SLIDE_INITIAL}
      animate={SLIDE_ANIMATE}
      transition={transition}
    >
      <Link
        href={item.href}
        className="flex items-center gap-3 text-sm sm:text-base font-medium p-2.5 sm:p-3 rounded-xl transition-colors duration-150"
        style={{
          color: "#94A3B8",
          fontFamily: "var(--font-jost,'Jost',sans-serif)",
        }}
        onMouseEnter={onNavLinkEnter}
        onMouseLeave={onNavLinkLeave}
        onClick={handleClick}
      >
        <span
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(37,99,255,0.12)", color: "#2563FF" }}
        >
          {item.icon}
        </span>
        {item.label}
      </Link>
    </motion.div>
  );
});

// ─── MobileMenu ───────────────────────────────────────────────
// memo() prevents re-renders when Header re-renders due to scroll
// or desktop mega-menu hover — the mobile sheet is unrelated.
const MobileMenu = memo(function MobileMenu({
  isOpen,
  onOpenChange,
  onContactOpen,
  onTrackEvent,
}) {
  // Stable contact-button handler — closes sheet then opens modal.
  const handleContactClick = useCallback(() => {
    onOpenChange(false);
    onContactOpen();
  }, [onOpenChange, onContactOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <motion.button
          whileTap={WHILETAP}
          className="flex lg:hidden items-center justify-center p-2 rounded-full transition-colors duration-200 z-10"
          style={{ background: "rgba(248,250,252,0.06)" }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="h-5 w-5"
            style={{ color: "#F8FAFC" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.path
                  key="close"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                  initial={PATH_INITIAL}
                  animate={PATH_ANIMATE}
                  exit={PATH_EXIT}
                  transition={PATH_TRANSITION}
                />
              ) : (
                <motion.path
                  key="open"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                  initial={PATH_INITIAL}
                  animate={PATH_ANIMATE}
                  exit={PATH_EXIT}
                  transition={PATH_TRANSITION}
                />
              )}
            </AnimatePresence>
          </svg>
        </motion.button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="p-0 w-[85vw] max-w-xs sm:max-w-sm md:max-w-md"
        style={{
          background: "#0B1120",
          borderLeft: "1px solid rgba(248,250,252,0.08)",
        }}
      >
        <SheetHeader
          className="px-5 sm:px-6 pt-6 sm:pt-8 pb-4"
          style={{ borderBottom: "1px solid rgba(248,250,252,0.08)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/alomonx_white.png"
              alt="Alomonx"
              className="h-8"
              style={{ maxWidth: "100px" }}
              // Sheet logo is below-the-fold until the drawer opens;
              // lazy + async keeps it off the critical path.
              loading="lazy"
              decoding="async"
            />
          </div>
          <SheetTitle
            className="text-base sm:text-lg font-semibold"
            style={{
              color: "#F8FAFC",
              fontFamily: "var(--font-jost,'Jost',sans-serif)",
            }}
          >
            Menu
          </SheetTitle>
          <SheetDescription
            className="text-xs sm:text-sm"
            style={{
              color: "#94A3B8",
              fontFamily: "var(--font-jost,'Jost',sans-serif)",
            }}
          >
            Explore our services and connect with us.
          </SheetDescription>
        </SheetHeader>

        <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-0.5 overflow-y-auto">
          {mobileNavItems.map((item, i) => (
            <NavItem
              key={item.href}
              item={item}
              transition={ITEM_VARIANTS[i]}
              onClose={onOpenChange}
              onTrack={onTrackEvent}
            />
          ))}

          {/* Divider */}
          <div
            className="my-4"
            style={{ height: "1px", background: "rgba(248,250,252,0.07)" }}
          />

          {/* Contact actions */}
          <div className="space-y-2 sm:space-y-3">
            <motion.div
              initial={SLIDE_INITIAL}
              animate={SLIDE_ANIMATE}
              transition={CONTACT_TRANSITION_0}
            >
              <a
                href="mailto:hello@alomonx.com"
                className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl transition-colors duration-200"
                style={{
                  border: "1px solid rgba(248,250,252,0.08)",
                  color: "#94A3B8",
                  fontFamily: "var(--font-jost,'Jost',sans-serif)",
                  fontSize: "14px",
                }}
                onMouseEnter={onMailEnter}
                onMouseLeave={onMailLeave}
              >
                <Mail
                  className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                  style={{ color: "#22D3EE" }}
                />
                <span className="truncate">hello@alomonx.com</span>
              </a>
            </motion.div>

            <motion.div
              initial={SLIDE_INITIAL}
              animate={SLIDE_ANIMATE}
              transition={CONTACT_TRANSITION_1}
            >
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 p-3 sm:p-3.5 rounded-xl font-semibold transition-colors duration-200"
                style={{
                  background: "#2563FF",
                  color: "#F8FAFC",
                  fontFamily: "var(--font-jost,'Jost',sans-serif)",
                  fontSize: "14px",
                  boxShadow: "0 2px 16px rgba(37,99,255,0.35)",
                }}
                onMouseEnter={onContactBtnEnter}
                onMouseLeave={onContactBtnLeave}
                onClick={handleContactClick}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Contact Us
              </button>
            </motion.div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

export default MobileMenu;
