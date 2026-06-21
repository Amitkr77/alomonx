"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MessageCircle } from "lucide-react";

import megaMenuData from "@/data/megaMenuData";
import MegaMenuPanel from "@/components/header/MegaMenuPanel";
import NavTrigger from "@/components/header/NavTrigger";
import MobileMenu from "@/components/header/MobileMenu";
import ContactModal from "@/components/header/ContactModal";

// ─── Framer Motion constants — module-level, never recreated ──
const HEADER_INITIAL = Object.freeze({ y: -80, opacity: 0 });
const HEADER_ANIMATE = Object.freeze({ y: 0, opacity: 1 });
const HEADER_TRANSITION = Object.freeze({
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
});

// ─── Pre-built header style objects ───────────────────────────
const STYLE_OPAQUE = Object.freeze({
  background: "rgba(0,0,0,1)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderBottom: "1px solid rgba(248,250,252,0.08)",
});
const STYLE_TRANSPARENT = Object.freeze({ background: "transparent" });

// ─── Module-level hover handlers (DOM mutation, no re-render) ─
function onMailEnter(e) {
  e.currentTarget.style.color = "#22D3EE";
}
function onMailLeave(e) {
  e.currentTarget.style.color = "#94A3B8";
}

// ─── Nav item definitions — stable, defined once ──────────────
const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Alomonx Digital", href: "/digital" },
  { name: "Alomonx AI" },
  { name: "About", href: "/about" },
  { name: "Services" },
  { name: "Industries" },
  { name: "Portfolio" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

// ─── Header ───────────────────────────────────────────────────
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const pathname = usePathname();
  const isHomePage = useMemo(() => pathname === "/", [pathname]);

  const closeTimerRef = useRef(null);
  const headerRef = useRef(null);

  const headerStyle = useMemo(
    () =>
      !isHomePage || isScrolled || activeMenu
        ? STYLE_OPAQUE
        : STYLE_TRANSPARENT,
    [isHomePage, isScrolled, activeMenu],
  );

  // ── Scroll — throttled via requestAnimationFrame ──────────────
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled((prev) => {
          const next = window.scrollY > 40;
          return next !== prev ? next : prev;
        });
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Outside-click closes mega menu ───────────────────────────
  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ── Clean up the close timer on unmount ───────────────────────
  useEffect(() => {
    return () => clearTimeout(closeTimerRef.current);
  }, []);

  // ── Listen for "View All Services" button from Services section ──
  // Services.jsx dispatches this event after scrolling to the top,
  // so the header is fully visible before the mega menu opens.
  useEffect(() => {
    const handler = () => setActiveMenu("Services");
    window.addEventListener("open-services-menu", handler);
    return () => window.removeEventListener("open-services-menu", handler);
  }, []);

  // ── Open "Alomonx AI" mega menu from external trigger ────────
  useEffect(() => {
    const handler = () => setActiveMenu("Alomonx AI");
    window.addEventListener("open-alomonx-ai-menu", handler);
    return () => window.removeEventListener("open-alomonx-ai-menu", handler);
  }, []);

  const trackEvent = useCallback((action, label) => {
    if (typeof window.gtag === "function") {
      window.gtag("event", action, { event_label: label });
    }
  }, []);

  const handleNavEnter = useCallback((name) => {
    clearTimeout(closeTimerRef.current);
    setActiveMenu(megaMenuData[name] ? name : null);
  }, []);

  const handleNavLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 120);
  }, []);

  const handleMenuEnter = useCallback(() => {
    clearTimeout(closeTimerRef.current);
  }, []);

  const handleMenuLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 120);
  }, []);

  const handleToggleMenu = useCallback(
    (name) => setActiveMenu((prev) => (prev === name ? null : name)),
    [],
  );

  const openContact = useCallback(() => setIsContactOpen(true), []);
  const closeContact = useCallback(() => setIsContactOpen(false), []);
  const closeMenu = useCallback(() => setActiveMenu(null), []);
  const setMobileOpenCb = useCallback((v) => setMobileOpen(v), []);

  return (
    <>
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50"
        initial={HEADER_INITIAL}
        animate={HEADER_ANIMATE}
        transition={HEADER_TRANSITION}
      >
        <div
          className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 py-3 md:py-3 transition-all duration-200"
          style={headerStyle}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 z-10">
            <img
              src="/alomonx_white.png"
              alt="Alomonx Logo"
              className="h-8 sm:h-9 md:h-10 lg:h-11 w-auto"
              style={{ maxWidth: "120px" }}
              decoding="async"
            />
          </Link>

          {/* Desktop nav — lg and above */}
          <nav
            className="hidden lg:flex items-center gap-4 xl:gap-5"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <NavTrigger
                key={item.name}
                name={item.name}
                href={item.href}
                activeMenu={activeMenu}
                onNavEnter={handleNavEnter}
                onNavLeave={handleNavLeave}
                onToggleMenu={handleToggleMenu}
                onTrackEvent={trackEvent}
              />
            ))}

            <span
              className="h-5 w-px"
              style={{ background: "rgba(248,250,252,0.12)" }}
            />

            <a
              href="mailto:info@alomonx.com"
              className="flex items-center gap-2 transition-colors duration-200"
              style={{
                color: "#94A3B8",
                fontFamily: "var(--font-jost,'Jost',sans-serif)",
                fontSize: "14px",
              }}
              onMouseEnter={onMailEnter}
              onMouseLeave={onMailLeave}
            >
              <Mail className="w-4 h-4" />
              <span className="hidden xl:inline">info@alomonx.com</span>
            </a>

            <button
              type="button"
              onClick={openContact}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer"
              style={{
                background: "#2563FF",
                color: "#F8FAFC",
                fontFamily: "var(--font-jost,'Jost',sans-serif)",
                boxShadow: "0 2px 16px rgba(37,99,255,0.4)",
              }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Contact Us
            </button>
          </nav>

          {/* Tablet actions (md only) */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            <a
              href="mailto:info@alomonx.com"
              className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200"
              style={{
                color: "#94A3B8",
                background: "rgba(248,250,252,0.06)",
              }}
              onMouseEnter={onMailEnter}
              onMouseLeave={onMailLeave}
              aria-label="Email us"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={openContact}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200"
              style={{
                background: "#2563FF",
                color: "#F8FAFC",
                fontFamily: "var(--font-jost,'Jost',sans-serif)",
                boxShadow: "0 2px 12px rgba(37,99,255,0.4)",
              }}
            >
              <MessageCircle className="w-3 h-3" />
              Contact
            </button>
          </div>

          {/* Mobile/Tablet hamburger */}
          <MobileMenu
            isOpen={mobileOpen}
            onOpenChange={setMobileOpenCb}
            onContactOpen={openContact}
            onTrackEvent={trackEvent}
          />
        </div>

        {/* Mega menu — desktop only */}
        <div
          className="hidden lg:block"
          onMouseEnter={handleMenuEnter}
          onMouseLeave={handleMenuLeave}
        >
          <AnimatePresence>
            {activeMenu && megaMenuData[activeMenu] && (
              <MegaMenuPanel
                key={activeMenu}
                data={megaMenuData[activeMenu]}
                onClose={closeMenu}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <ContactModal isOpen={isContactOpen} onClose={closeContact} />
    </>
  );
}
