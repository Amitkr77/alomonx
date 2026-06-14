import { Suspense, lazy } from "react";

// ─── Above-the-fold components — loaded eagerly (affect LCP) ─────────────────
import AboutHero from "@/components/about/AboutHero";

// ─── Below-the-fold components — code-split and lazy loaded ──────────────────
const StatsSection = lazy(() => import("@/components/StatsSection"));
const AboutMission = lazy(() => import("@/components/about/AboutMission"));
const AboutValues = lazy(() => import("@/components/about/AboutValues"));
const AboutCapabilities = lazy(
  () => import("@/components/about/AboutCapabilities"),
);
const FounderAndValues = lazy(
  () => import("../../components/FounderAndValues"),
);
const FAQ = lazy(() => import("@/components/globalComponents/FAQ"));
const Banner = lazy(() => import("@/components/globalComponents/Banner"));

import {
  heroData,
  missionPoints,
  coreValues,
  founders,
  services,
  faqs,
  banner,
} from "@/lib/about_data";

export const metadata = {
  title: "About — Alomonx Technology",
  description:
    "We don't follow the future. We build it. Learn about Alomonx Technology — our story, values, founders, and the services we deliver.",
};

// Lightweight skeleton shown while a lazy section loads.
// Keeps layout stable (no CLS) without shipping a spinner library.
function SectionSkeleton({ height = "h-screen" }) {
  return (
    <div
      className={`w-full ${height} animate-pulse bg-white/[0.02] rounded-xl`}
      aria-hidden="true"
    />
  );
}

// GPU layer style applied to each ambient blob.
// translateZ(0) promotes the element to its own compositor layer so the
// large blur() filter doesn't trigger a full-page repaint on every scroll.
const blobLayerStyle = { transform: "translateZ(0)", willChange: "transform" };

export default function AboutPage() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background:
          "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)",
      }}
    >
      {/* Ambient background blobs — fixed, shared across all sections */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]"
          style={blobLayerStyle}
        />
        <div
          className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-sky-500/8 blur-[120px]"
          style={blobLayerStyle}
        />
        <div
          className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-emerald-500/6 blur-[100px]"
          style={blobLayerStyle}
        />
      </div>

      {/* Above the fold — no Suspense, must render immediately for LCP */}
      <AboutHero data={heroData} />

      {/* Below-the-fold sections — each is an independent Suspense boundary.
          If one chunk loads slowly it doesn't block the ones below it. */}
      <Suspense fallback={<SectionSkeleton height="h-64" />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-screen" />}>
        <AboutMission missionPoints={missionPoints} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-screen" />}>
        <AboutValues coreValues={coreValues} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-screen" />}>
        <AboutCapabilities services={services} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-screen" />}>
        <FounderAndValues />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-96" />}>
        <FAQ faqs={faqs} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-64" />}>
        <Banner details={banner} />
      </Suspense>
    </div>
  );
}
