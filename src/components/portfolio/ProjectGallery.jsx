"use client";

import React, { useState, useMemo, useCallback, memo } from "react";
import Image from "next/image";
import { Monitor, Smartphone, Play } from "lucide-react";

// ─── Static constants ─────────────────────────────────────────────────────────
const EMPTY_ARRAY = [];

const PHONE_SHELL_STYLE = {
  padding: "7px",
  boxShadow:
    "0 0 0 1px #3a3a3a, 0 24px 48px -8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
};
const PHONE_SCREEN_STYLE = { aspectRatio: "9/19" };
const PHONE_BTN_L1 = {
  top: "80px",
  width: "3px",
  height: "28px",
  transform: "translateX(-3px)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
};
const PHONE_BTN_L2 = {
  top: "118px",
  width: "3px",
  height: "28px",
  transform: "translateX(-3px)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
};
const PHONE_BTN_R = {
  top: "96px",
  width: "3px",
  height: "40px",
  transform: "translateX(3px)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
};
const HOME_BAR_STYLE = {
  width: "30%",
  height: "4px",
  transform: "translateX(-50%)",
};

// ─── PhoneShell ───────────────────────────────────────────────────────────────
// Shared between mobile screenshots and mobile videos — no more duplication.
const PhoneShell = memo(function PhoneShell({ children }) {
  return (
    <div
      className="relative transition-all duration-500 group-hover:-translate-y-2"
      style={{ width: "100%", maxWidth: "230px" }}
    >
      <div
        className="relative rounded-[2.55rem] bg-[#1b1a1a]"
        style={PHONE_SHELL_STYLE}
      >
        {/* Volume buttons */}
        <div
          className="absolute left-0 rounded-l-sm bg-[#2A2A2A]"
          style={PHONE_BTN_L1}
        />
        <div
          className="absolute left-0 rounded-l-sm bg-[#2A2A2A]"
          style={PHONE_BTN_L2}
        />
        {/* Power button */}
        <div
          className="absolute right-0 rounded-r-sm bg-[#2A2A2A]"
          style={PHONE_BTN_R}
        />
        {/* Screen */}
        <div
          className="relative overflow-hidden rounded-[2.1rem] bg-black"
          style={PHONE_SCREEN_STYLE}
        >
          {children}
          <div
            className="absolute bottom-1.5 left-1/2 z-20 rounded-full bg-white/60 pointer-events-none"
            style={HOME_BAR_STYLE}
          />
        </div>
      </div>
    </div>
  );
});
PhoneShell.displayName = "PhoneShell";

// ─── BrowserShell ─────────────────────────────────────────────────────────────
const BrowserShell = memo(function BrowserShell({
  title,
  url,
  websiteUrl,
  children,
}) {
  const displayUrl = url || websiteUrl || "https://yourwebsite.com";
  return (
    <div className="rounded-xl overflow-hidden border border-neutral-300 shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] group-hover:-translate-y-1">
      {/* Title Bar */}
      <div className="flex items-center gap-0 bg-[#131111] border-b border-neutral-500 px-3 pt-2 pb-0">
        <div className="flex items-center gap-1.5 mr-4 pb-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D4A017]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1DAD2B]" />
        </div>
        <div className="flex items-end gap-0.5 flex-1 overflow-hidden">
          <div className="relative flex items-center gap-2 bg-white rounded-t-lg px-3 py-1.5 min-w-0 max-w-[200px] border border-b-white border-neutral-300 -mb-px z-10">
            <div className="w-3 h-3 rounded-sm bg-neutral-500 flex-shrink-0" />
            <span className="text-[11px] text-neutral-900 truncate font-medium">
              {title}
            </span>
            <span className="ml-auto text-neutral-600 text-[10px] flex-shrink-0">
              ✕
            </span>
          </div>
          <div className="flex items-center gap-2 bg-transparent rounded-t-lg px-3 py-1.5 max-w-[140px]">
            <div className="w-3 h-3 rounded-sm bg-neutral-200 flex-shrink-0" />
            <span className="text-[11px] text-neutral-400 truncate">
              New Tab
            </span>
          </div>
        </div>
      </div>
      {/* Toolbar */}
      <div className="flex items-center gap-2 bg-[#fafafa] border-b border-neutral-300 px-3 py-1.5">
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 flex items-center justify-center text-neutral-600 text-sm rounded hover:bg-neutral-200">
            ‹
          </button>
          <button className="w-6 h-6 flex items-center justify-center text-neutral-600 text-sm rounded hover:bg-neutral-200">
            ›
          </button>
          <button className="w-6 h-6 flex items-center justify-center text-neutral-600 text-xs rounded hover:bg-neutral-200">
            ↻
          </button>
        </div>
        <div className="flex-1 flex items-center gap-1.5 bg-white rounded-full border border-neutral-300 px-3 py-1 min-w-0">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-neutral-600 flex-shrink-0"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[11px] text-neutral-900 truncate">
            {displayUrl}
          </span>
        </div>
        <div className="w-6 h-6 flex items-center justify-center text-neutral-600 text-xs">
          ⋮
        </div>
      </div>
      {children}
    </div>
  );
});
BrowserShell.displayName = "BrowserShell";

// ─── VideoPlayer ──────────────────────────────────────────────────────────────
// Extracted so it's not recreated inline on every render.
const VideoPlayer = memo(function VideoPlayer({ item, className = "" }) {
  if (item.type === "youtube" || item.type === "vimeo") {
    const src =
      item.type === "youtube"
        ? `https://www.youtube.com/embed/${item.video_id}?rel=0&modestbranding=1`
        : `https://player.vimeo.com/video/${item.video_id}`;
    return (
      <iframe
        src={src}
        title={item.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`absolute inset-0 w-full h-full ${className}`}
      />
    );
  }
  return (
    <video
      src={item.url}
      poster={item.poster}
      controls
      preload="metadata"
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
    />
  );
});
VideoPlayer.displayName = "VideoPlayer";

// ─── DesktopCard ──────────────────────────────────────────────────────────────
const DesktopCard = memo(function DesktopCard({ item, websiteUrl }) {
  return (
    <div className="group flex flex-col">
      <BrowserShell title={item.title} url={item.url} websiteUrl={websiteUrl}>
        <div className="relative w-full aspect-video overflow-hidden bg-neutral-100">
          <Image
            src={item.image}
            alt={item.title}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      </BrowserShell>
      <div className="px-1 pt-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-neutral-900">
          {item.title}
        </h3>
        <Monitor size={16} className="text-neutral-600" />
      </div>
    </div>
  );
});
DesktopCard.displayName = "DesktopCard";

// ─── MobileCard ───────────────────────────────────────────────────────────────
const MobileCard = memo(function MobileCard({ item }) {
  return (
    <div className="group flex flex-col items-center">
      <PhoneShell>
        <Image
          src={item.image}
          alt={item.title}
          fill
          loading="lazy"
          sizes="230px"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </PhoneShell>
      <h3 className="mt-5 text-sm font-semibold text-neutral-900 text-center">
        {item.title}
      </h3>
    </div>
  );
});
MobileCard.displayName = "MobileCard";

// ─── VideoCard ────────────────────────────────────────────────────────────────
const VideoCard = memo(function VideoCard({ item, isSingle }) {
  const isMobile = item.dimension === "mobile";

  if (isMobile) {
    return (
      <div
        className={`group flex flex-col items-center ${isSingle ? "w-full max-w-[280px]" : ""}`}
      >
        <PhoneShell>
          <VideoPlayer item={item} />
        </PhoneShell>
        <div className="mt-5 flex flex-col items-center gap-0.5 text-center">
          <h3 className="text-sm font-semibold text-neutral-900">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-xs text-neutral-500 leading-snug max-w-[180px]">
              {item.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group flex flex-col ${isSingle ? "w-full max-w-2xl" : ""}`}
    >
      <div className="rounded-xl overflow-hidden border border-neutral-300 shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] group-hover:-translate-y-1">
        <div className="flex items-center gap-2 bg-[#131111] px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D4A017]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1DAD2B]" />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-[11px] text-neutral-400 font-medium truncate max-w-[200px]">
              {item.title}
            </span>
          </div>
        </div>
        <div className="relative w-full aspect-video bg-black">
          <VideoPlayer item={item} />
        </div>
      </div>
      <div className="px-1 pt-4 flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-semibold text-neutral-900 leading-tight">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-sm text-neutral-500 leading-snug">
              {item.description}
            </p>
          )}
        </div>
        <Play size={16} className="text-neutral-600 flex-shrink-0 mt-0.5" />
      </div>
    </div>
  );
});
VideoCard.displayName = "VideoCard";

// ─── VideoGrid ────────────────────────────────────────────────────────────────
// Previously an IIFE inside render — now a proper memoized component.
const VideoGrid = memo(function VideoGrid({ videos }) {
  const hasDesktopVideos = useMemo(
    () => videos.some((v) => v.dimension !== "mobile"),
    [videos],
  );
  const isSingle = videos.length === 1;

  const gridClass = isSingle
    ? "flex justify-center"
    : hasDesktopVideos
      ? "grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
      : "grid grid-cols-2 lg:grid-cols-3 gap-8";

  return (
    <div
      className={`animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out ${gridClass}`}
    >
      {videos.map((item, index) => (
        <VideoCard key={item.title ?? index} item={item} isSingle={isSingle} />
      ))}
    </div>
  );
});
VideoGrid.displayName = "VideoGrid";

// ─── Tab button config — built once, never recreated ─────────────────────────
const TAB_CONFIG = [
  { id: "mobile", label: "Mobile", Icon: Smartphone },
  { id: "desktop", label: "Desktop", Icon: Monitor },
  { id: "video", label: "Video", Icon: Play },
];

// ─── ProjectGallery ───────────────────────────────────────────────────────────
export default function ProjectGallery({ gallery }) {
  const desktopScreens = gallery?.desktop ?? EMPTY_ARRAY;
  const mobileScreens = gallery?.mobile ?? EMPTY_ARRAY;
  const videos = gallery?.videos ?? EMPTY_ARRAY;
  const websiteUrl = gallery?.website_url;

  const hasDesktop = desktopScreens.length > 0;
  const hasMobile = mobileScreens.length > 0;
  const hasVideos = videos.length > 0;

  // ✅ Stable default — computed once, not inline
  const defaultTab = hasMobile ? "mobile" : hasDesktop ? "desktop" : "video";
  const [activeTab, setActiveTab] = useState(defaultTab);

  // ✅ Tabs array memoized — not rebuilt every render
  const tabs = useMemo(
    () =>
      TAB_CONFIG.filter(
        ({ id }) =>
          (id === "mobile" && hasMobile) ||
          (id === "desktop" && hasDesktop) ||
          (id === "video" && hasVideos),
      ),
    [hasMobile, hasDesktop, hasVideos],
  );

  // ✅ Stable handler reference
  const handleTabChange = useCallback((id) => setActiveTab(id), []);

  if (!gallery) return null;

  return (
    <section className="py-12 w-full selection:bg-neutral-900 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase text-neutral-600 mb-4">
            <span className="h-px w-6 bg-neutral-500" />
            Platform Gallery
            <span className="h-px w-6 bg-neutral-500" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-4">
            Explore the Interface
          </h2>

          {websiteUrl && (
            <a
              href={
                websiteUrl.startsWith("http")
                  ? websiteUrl
                  : `https://${websiteUrl}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-6 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-black hover:shadow-md hover:-translate-y-0.5"
            >
              <span>View Project</span>

              {/* Arrow Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          )}

          {tabs.length > 1 && (
            <div className="inline-flex p-1 bg-neutral-300 rounded-full border border-neutral-200 shadow-inner">
              {tabs.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => handleTabChange(id)}
                  className={`relative flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
                    activeTab === id
                      ? "bg-white text-neutral-900 shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <Icon size={18} strokeWidth={activeTab === id ? 2.5 : 2} />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Grid */}
        {activeTab === "desktop" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            {desktopScreens.map((item, index) => (
              <DesktopCard
                key={item.title ?? index}
                item={item}
                websiteUrl={websiteUrl}
              />
            ))}
          </div>
        )}

        {/* Mobile Grid */}
        {activeTab === "mobile" && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            {mobileScreens.map((item, index) => (
              <MobileCard key={item.title ?? index} item={item} />
            ))}
          </div>
        )}

        {/* Video Grid */}
        {activeTab === "video" && <VideoGrid videos={videos} />}
      </div>
    </section>
  );
}
