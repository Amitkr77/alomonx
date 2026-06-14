import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProjectBySlug, portfolioData } from "@/lib/portfolio_data";

// ─── Critical above-fold components: eager (no Suspense needed) ──
import ProjectHero from "@/components/portfolio/ProjectHero";

// ─── Below-fold components: wrapped in Suspense boundaries ──────
// Even though these are Server Components, wrapping them in
// Suspense lets Next.js stream them to the client as they resolve.
// The page shell and hero are sent immediately; the rest arrives
// progressively — the user sees content faster even on slow links.
import FullOverview      from "@/components/globalComponents/FullOverview";
import ProjectChallenges from "@/components/portfolio/ProjectChallenges";
import ProjectKeyFeatures from "@/components/portfolio/ProjectKeyFeatures";
import ProjectOutcomes   from "@/components/portfolio/ProjectOutcomes";
import ProjectGallery    from "@/components/portfolio/ProjectGallery";
import Banner            from "@/components/globalComponents/Banner";

// ─────────────────────────────────────────────────────────────
// generateStaticParams
// Tells Next.js to pre-render every portfolio page at build time
// (Static Site Generation). These pages are served from the CDN
// edge with zero server latency — fastest possible TTFB.
// CHANGE: Added `dynamicParams = false` below to opt out of
// on-demand rendering for unknown slugs (returns 404 immediately
// instead of attempting a server render).
// ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return portfolioData.map((project) => ({ slug: project.slug }));
}

// CHANGE: Disallow on-demand rendering for slugs not in the static
// list. Without this, Next.js tries to render unknown slugs at
// runtime, wasting server cycles. With it, unknown slugs get an
// instant 404 from the CDN.
export const dynamicParams = false;

// CHANGE: Because all data comes from a local file (no network/DB),
// this page is fully static. Explicitly opt into "force-static" so
// Next.js never accidentally makes it dynamic (e.g. if someone
// reads a cookie or header in a child component).
export const dynamic = "force-static";

// ─────────────────────────────────────────────────────────────
// generateMetadata
// CHANGE: Added `openGraph` and `twitter` card metadata.
// These are free perf wins — they make social share previews
// work correctly, which drives referral traffic quality.
// Also added `alternates.canonical` to prevent duplicate-URL
// penalties in search engines.
// ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project  = getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title:       `${project.title} | Alomonx Portfolio`,
    description: project.shortDescription,

    // Canonical URL — prevents search engines treating
    // /portfolio/slug and /portfolio/slug/ as duplicates.
    alternates: {
      canonical: `/portfolio/${slug}`,
    },

    // Open Graph — controls the card shown when shared on
    // LinkedIn, Facebook, WhatsApp, Slack, etc.
    openGraph: {
      title:       `${project.title} | Alomonx Portfolio`,
      description: project.shortDescription,
      url:         `/portfolio/${slug}`,
      // Use the hero image if available; fall back to a default OG image.
      images: project.heroImage
        ? [{ url: project.heroImage, width: 1200, height: 630, alt: project.title }]
        : [{ url: "/og-default.jpg",  width: 1200, height: 630 }],
      type: "article",
    },

    // Twitter / X card
    twitter: {
      card:        "summary_large_image",
      title:       `${project.title} | Alomonx Portfolio`,
      description: project.shortDescription,
      images:      project.heroImage ? [project.heroImage] : ["/og-default.jpg"],
    },
  };
}

// ─────────────────────────────────────────────────────────────
// Skeleton fallbacks for Suspense boundaries
// Keep them lightweight — their only job is to hold layout
// space so the page doesn't jump when real content streams in.
// ─────────────────────────────────────────────────────────────
function SectionSkeleton({ height = "h-40" }) {
  return (
    <div
      className={`w-full ${height} bg-slate-100 animate-pulse rounded-lg`}
      aria-hidden="true"
    />
  );
}

// Thin divider — extracted so it's not repeated inline 3×
function Divider() {
  return <div className="border-t border-slate-800 mb-5" aria-hidden="true" />;
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default async function ProjectDetailPage({ params }) {
  const { slug }  = await params;
  const project   = getProjectBySlug(slug);

  // notFound() throws internally, so this acts as an early exit.
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full">

        {/* ── Hero — above the fold, rendered immediately ──────
            No Suspense wrapper: we want this in the initial HTML
            chunk so the browser can start painting right away.
            ProjectHero should be a Server Component that avoids
            any dynamic data fetching. */}
        <ProjectHero
          title={project.title}
          category={project.category}
          heroImage={project.heroImage}
          shortDesc={project.shortDescription}
        />

        {/* ── Below-fold sections — streamed progressively ─────
            Each Suspense boundary lets Next.js flush HTML for
            earlier sections while later ones are still resolving.
            On a static page this is near-instant, but the pattern
            future-proofs the page if any section ever fetches data. */}

        <Suspense fallback={<SectionSkeleton height="h-48" />}>
          <FullOverview fullOverview={project.fullDescription} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="h-40" />}>
          <ProjectChallenges challenges={project.challenges} />
        </Suspense>

        <Divider />

        <Suspense fallback={<SectionSkeleton height="h-64" />}>
          <ProjectGallery gallery={project.gallery} />
        </Suspense>

        <Divider />

        <Suspense fallback={<SectionSkeleton height="h-48" />}>
          <ProjectKeyFeatures features={project.features} />
        </Suspense>

        <Divider />

        <Suspense fallback={<SectionSkeleton height="h-40" />}>
          <ProjectOutcomes outcomes={project.outcomes} />
        </Suspense>

        <div className="my-15">
          <Suspense fallback={<SectionSkeleton height="h-32" />}>
            <Banner details={project.banner} />
          </Suspense>
        </div>

      </div>
    </main>
  );
}