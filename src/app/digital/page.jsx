import dynamic from "next/dynamic";
import digital_marketing_data from "@/lib/digital_marketing_data";

// ─── Critical above-the-fold components — eagerly loaded ─────────────────────
// These are visible immediately on page load, so they must NOT be lazy.
import HeroSection from "@/components/ai-services/HeroSection";
import FullOverview from "@/components/globalComponents/FullOverview";

// ─── Below-the-fold components — lazy loaded ─────────────────────────────────
// Next.js dynamic() splits each into its own JS chunk, downloaded only when
// the browser is idle / the component is about to enter the viewport.
// `ssr: true` (default) keeps server-rendering so HTML is still present for
// SEO and First Contentful Paint — only the JS hydration is deferred.
const Solutions = dynamic(() => import("@/components/industries/Solutions"));
const EngineerFuture = dynamic(() => import("@/components/EngineerFuture"));
const UseCases = dynamic(() => import("@/components/ai-services/UseCases"));
const PoliticalCampaigns = dynamic(
  () => import("@/components/digital-marketing/PoliticalCampaign"),
);
const CampaignPackages = dynamic(
  () => import("@/components/digital-marketing/Campaign"),
);
const BusinessOutcomes = dynamic(
  () => import("@/components/ai-services/BusinessOutcomes"),
);
const WhyChooseUs = dynamic(
  () => import("@/components/globalComponents/WhyChooseUs"),
);
const Banner = dynamic(() => import("@/components/globalComponents/Banner"));
const FAQ = dynamic(() => import("@/components/globalComponents/FAQ"));
const CTABanner = dynamic(
  () => import("@/components/globalComponents/CTABanner"),
);

// ─── Meta (module-level constant — never re-created across navigations) ───────
const meta = {
  color: "text-violet-600",
  bgColor: "bg-violet-50",
  borderColor: "border-violet-200",
  gradient: "from-violet-600 to-violet-800",
};

// ─── Grid positions (module-level — same reason as meta) ─────────────────────
// Previously defined inside the component body, so a new array was allocated
// on every render (including re-renders from parent hot-updates in dev).
const GRID_POSITIONS = [
  "col-start-1 col-end-5 md:col-start-1 md:col-end-6 mt-10",
  "col-start-1 col-end-5 md:col-start-7 md:col-end-12 mt-32",
  "col-start-1 col-end-5 md:col-start-2 md:col-end-7 mt-32",
  "col-start-1 col-end-5 md:col-start-8 md:col-end-13 mt-32",
  "col-start-1 col-end-5 md:col-start-1 md:col-end-6 mt-32",
  "col-start-1 col-end-5 md:col-start-6 md:col-end-11 mt-32",
  "col-start-1 col-end-5 md:col-start-2 md:col-end-7 mt-32",
];

// ─── Data transformation (module-level) ──────────────────────────────────────
// This is a pure derivation of static imported data — it never changes at
// runtime. Running it at module level means it executes exactly once per
// cold start instead of once per request.
const {
  details,
  category,
  icon,
  label,
  image,
  services,
  industries,
  whyChooseUs,
  process,
  faqs,
  cta_data,
  achievements,
  politicalCampaignServices,
  campaignPackages,
  banner,
} = digital_marketing_data;

const plainService = { label, image, icon, category };

const formattedProcessData = process.map((item, index) => ({
  id: `0${index + 1}`,
  title: item.title,
  subtitle: "SYSTEM PROCESS",
  desc: item.description,
  position: GRID_POSITIONS[index] ?? "col-start-1 col-end-5 mt-32",
}));

// ─── Page component ───────────────────────────────────────────────────────────
export default function DigitalMarketingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* ── Critical: loaded eagerly ── */}
      <HeroSection service={plainService} details={details} meta={meta} />
      <FullOverview fullOverview={details.fullOverview} meta={meta} />

      {/* ── Deferred: JS chunks downloaded after LCP ── */}
      <Solutions
        solutions={services}
        label="Digital Marketing Services"
        meta={meta}
      />
      <EngineerFuture steps={formattedProcessData} />
      <UseCases useCases={industries} meta={meta} />
      <PoliticalCampaigns data={politicalCampaignServices} />
      <CampaignPackages data={campaignPackages} />
      <BusinessOutcomes benefits={achievements} meta={meta} />
      <WhyChooseUs items={whyChooseUs} />
      <div className="my-20">
        <Banner details={banner} />
      </div>
      <FAQ faqs={faqs} />
      <CTABanner details={cta_data} />
    </div>
  );
}
