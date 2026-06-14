"use client";
import { memo, useCallback, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Info,
  Mail,
  Cpu,
  Hammer,
  MessageCircle,
  Home,
  Sparkles,
  Briefcase,
  Phone,
  ChevronDown,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import megaMenuData from "@/data/megaMenuData";

// ─── Nav items — exactly mirroring NAV_ITEMS in Header.jsx ───
// Home, Alomonx AI, About, Services, Industries, Portfolio, Contact
const mobileNavItems = [
  { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
  {
    label: "Alomonx AI",
    icon: <Sparkles className="w-4 h-4" />,
    megaKey: "Alomonx AI",
  },
  { href: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
  {
    label: "Services",
    icon: <Hammer className="w-4 h-4" />,
    megaKey: "Services",
  },
  {
    label: "Industries",
    icon: <Cpu className="w-4 h-4" />,
    megaKey: "Industries",
  },
  {
    label: "Portfolio",
    icon: <Briefcase className="w-4 h-4" />,
    megaKey: "Portfolio",
  },
  { href: "/contact", label: "Contact", icon: <Phone className="w-4 h-4" /> },
];

// ─── Framer Motion constants — module-level, never recreated ──
const WHILETAP = Object.freeze({ scale: 0.92 });

const PATH_INITIAL = Object.freeze({ opacity: 0 });
const PATH_ANIMATE = Object.freeze({ opacity: 1 });
const PATH_EXIT = Object.freeze({ opacity: 0 });
const PATH_TRANSITION = Object.freeze({ duration: 0.15 });

const SLIDE_INITIAL = Object.freeze({ opacity: 0, x: 16 });
const SLIDE_ANIMATE = Object.freeze({ opacity: 1, x: 0 });

const ITEM_VARIANTS = mobileNavItems.map((_, i) =>
  Object.freeze({ duration: 0.25, delay: i * 0.06 }),
);
const CONTACT_TRANSITION_0 = Object.freeze({ duration: 0.25, delay: 0.54 });
const CONTACT_TRANSITION_1 = Object.freeze({ duration: 0.25, delay: 0.6 });

const DROPDOWN_TRANSITION = Object.freeze({
  duration: 0.25,
  ease: "easeInOut",
});
const CHEVRON_TRANSITION = Object.freeze({ duration: 0.22 });

// ─── Module-level hover handlers ─────────────────────────────
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
function onSubLinkEnter(e) {
  e.currentTarget.style.color = "#F8FAFC";
  e.currentTarget.style.background = "rgba(248,250,252,0.04)";
}
function onSubLinkLeave(e) {
  e.currentTarget.style.color = "#94A3B8";
  e.currentTarget.style.background = "transparent";
}

// ─── MegaDropdown ─────────────────────────────────────────────
const MegaDropdown = memo(function MegaDropdown({ megaKey, onClose, onTrack }) {
  const data = megaMenuData[megaKey];

  // Flatten all links (supports both columns and flat links)
  const allLinks = useMemo(() => {
    if (!data) return [];
    if (data.links) return data.links;
    if (data.columns) return data.columns.flatMap((col) => col.links);
    return [];
  }, [data]);

  // Build display groups preserving column headings
  const groups = useMemo(() => {
    if (!data) return [];
    if (data.columns) {
      return data.columns.map((col) => ({
        heading: col.heading || null,
        links: col.links,
      }));
    }
    // Flat links (Portfolio) — chunk into groups of 5, no heading
    const chunks = [];
    for (let i = 0; i < allLinks.length; i += 5) {
      chunks.push({ heading: null, links: allLinks.slice(i, i + 5) });
    }
    return chunks;
  }, [data, allLinks]);

  const handleLinkClick = useCallback(
    (label) => {
      onTrack("click", `${label} Mobile Dropdown`);
      onClose(false);
    },
    [onTrack, onClose],
  );

  if (!data || allLinks.length === 0) return null;

  return (
    <div
      className="mt-1 mx-1 rounded-xl overflow-hidden"
      style={{
        background: "rgba(37,99,255,0.04)",
        border: "1px solid rgba(37,99,255,0.12)",
      }}
    >
      {/* Link groups */}
      <div className="py-2">
        {groups.map((group, gi) => (
          <div key={gi}>
            {group.heading && (
              <p
                className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{
                  color: "#64748B",
                  fontFamily: "var(--font-jost,'Jost',sans-serif)",
                }}
              >
                {group.heading}
              </p>
            )}
            {group.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link.label)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg mx-1 transition-colors duration-150"
                style={{
                  color: "#94A3B8",
                  fontSize: "13px",
                  fontFamily: "var(--font-jost,'Jost',sans-serif)",
                }}
                onMouseEnter={onSubLinkEnter}
                onMouseLeave={onSubLinkLeave}
              >
                <span
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: "rgba(34,211,238,0.5)" }}
                />
                <span className="flex-1">{link.label}</span>
                {link.badge && (
                  <span
                    className="text-[9px] font-semibold tracking-wide px-1.5 py-0.5 rounded-full flex-shrink-0"
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
            ))}
            {/* Separator between groups with headings */}
            {gi < groups.length - 1 && group.heading && (
              <div
                className="mx-4 mt-2"
                style={{ height: "1px", background: "rgba(248,250,252,0.06)" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

// ─── NavItem ──────────────────────────────────────────────────
const NavItem = memo(function NavItem({
  item,
  transition,
  onClose,
  onTrack,
  openDropdown,
  onToggleDropdown,
}) {
  const hasMega = !!(item.megaKey && megaMenuData[item.megaKey]);
  const isOpen = openDropdown === item.megaKey;

  const handleLinkClick = useCallback(() => {
    onTrack("click", `${item.label} Mobile Menu`);
    onClose(false);
  }, [item.label, onTrack, onClose]);

  const handleTriggerClick = useCallback(() => {
    onTrack("click", `${item.label} Mobile Dropdown Toggle`);
    onToggleDropdown(item.megaKey);
  }, [item.label, item.megaKey, onTrack, onToggleDropdown]);

  return (
    <motion.div
      initial={SLIDE_INITIAL}
      animate={SLIDE_ANIMATE}
      transition={transition}
    >
      {hasMega ? (
        <div>
          <button
            type="button"
            className="w-full flex items-center gap-3 text-sm sm:text-base font-medium p-2.5 sm:p-3 rounded-xl transition-colors duration-150"
            style={{
              color: isOpen ? "#F8FAFC" : "#94A3B8",
              fontFamily: "var(--font-jost,'Jost',sans-serif)",
              background: isOpen ? "rgba(248,250,252,0.04)" : "transparent",
            }}
            onClick={handleTriggerClick}
            aria-expanded={isOpen}
          >
            <span
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: isOpen
                  ? "rgba(37,99,255,0.2)"
                  : "rgba(37,99,255,0.12)",
                color: isOpen ? "#22D3EE" : "#2563FF",
              }}
            >
              {item.icon}
            </span>
            <span className="flex-1 text-left">{item.label}</span>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={CHEVRON_TRANSITION}
              className="inline-flex flex-shrink-0"
              style={{ color: "#64748B" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={DROPDOWN_TRANSITION}
                style={{ overflow: "hidden" }}
              >
                <MegaDropdown
                  megaKey={item.megaKey}
                  onClose={onClose}
                  onTrack={onTrack}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link
          href={item.href}
          className="flex items-center gap-3 text-sm sm:text-base font-medium p-2.5 sm:p-3 rounded-xl transition-colors duration-150"
          style={{
            color: "#94A3B8",
            fontFamily: "var(--font-jost,'Jost',sans-serif)",
          }}
          onMouseEnter={onNavLinkEnter}
          onMouseLeave={onNavLinkLeave}
          onClick={handleLinkClick}
        >
          <span
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(37,99,255,0.12)", color: "#2563FF" }}
          >
            {item.icon}
          </span>
          {item.label}
        </Link>
      )}
    </motion.div>
  );
});

// ─── MobileMenu ───────────────────────────────────────────────
const MobileMenu = memo(function MobileMenu({
  isOpen,
  onOpenChange,
  onContactOpen,
  onTrackEvent,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggleDropdown = useCallback((key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }, []);

  const handleContactClick = useCallback(() => {
    onOpenChange(false);
    onContactOpen();
  }, [onOpenChange, onContactOpen]);

  // Reset open dropdown when sheet closes
  const handleOpenChange = useCallback(
    (v) => {
      if (!v) setOpenDropdown(null);
      onOpenChange(v);
    },
    [onOpenChange],
  );

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
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
              key={item.href || item.megaKey}
              item={item}
              transition={ITEM_VARIANTS[i]}
              onClose={onOpenChange}
              onTrack={onTrackEvent}
              openDropdown={openDropdown}
              onToggleDropdown={handleToggleDropdown}
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
                href="mailto:info@alomonx.com"
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
                <span className="truncate">info@alomonx.com</span>
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
