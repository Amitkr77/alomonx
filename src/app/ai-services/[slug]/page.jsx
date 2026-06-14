import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import {
  getAiServiceBySlug,
  allAiServices,
  categoryMeta,
} from "@/lib/ai-services-data";

import HeroSection from "@/components/ai-services/HeroSection";
import FullOverview from "@/components/globalComponents/FullOverview";
import BusinessChallenges from "@/components/ai-services/BusinessChallenges";
import Solutions from "@/components/ai-services/Solutions";
import KeyFeatures from "@/components/ai-services/KeyFeatures";
import BusinessOutcomes from "@/components/ai-services/BusinessOutcomes";
import Technologies from "@/components/globalComponents/Technologies";
import UseCases from "@/components/ai-services/UseCases";

// Lazy-loaded — split into separate chunks, fetched after critical content
const EngineerFuture = dynamic(() => import("@/components/EngineerFuture"));
const WhyChooseUs = dynamic(
  () => import("@/components/globalComponents/WhyChooseUs"),
);
const FAQ = dynamic(() => import("@/components/globalComponents/FAQ"));
const CTABanner = dynamic(
  () => import("@/components/globalComponents/CTABanner"),
);
const Banner = dynamic(() => import("@/components/globalComponents/Banner"));

const GRID_POSITIONS = [
  "col-start-1 col-end-5 md:col-start-1 md:col-end-6 mt-10",
  "col-start-1 col-end-5 md:col-start-7 md:col-end-12 mt-32",
  "col-start-1 col-end-5 md:col-start-2 md:col-end-7 mt-32",
  "col-start-1 col-end-5 md:col-start-8 md:col-end-13 mt-32",
  "col-start-1 col-end-5 md:col-start-1 md:col-end-6 mt-32",
  "col-start-1 col-end-5 md:col-start-6 md:col-end-11 mt-32",
  "col-start-1 col-end-5 md:col-start-2 md:col-end-7 mt-32",
];

const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
);

export async function generateStaticParams() {
  return allAiServices.map((service) => ({ slug: service.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getAiServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.label,
    description: service.details?.fullOverview?.summary ?? "",
    openGraph: {
      title: service.label,
      images: service.image ? [{ url: service.image }] : [],
    },
  };
}

export default async function AiServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getAiServiceBySlug(slug);
  if (!service) notFound();

  const { details, category, icon, label, image, href, badge } = service;
  const meta = categoryMeta[category];

  const plainService = { label, image, slug, href, icon, category, badge };

  const formattedProcessData = details.implementationProcess.map(
    (item, index) => ({
      id: `0${index + 1}`,
      title: item.title,
      subtitle: "SYSTEM PROCESS",
      desc: item.description,
      position: GRID_POSITIONS[index] ?? "col-start-1 col-end-5 mt-32",
    }),
  );

  return (
    <div className="min-h-screen bg-[#050810] text-white">
      <HeroSection service={plainService} details={details} meta={meta} />

      <FullOverview fullOverview={details.fullOverview} meta={meta} />

      <Divider />
      <BusinessChallenges
        businessChallenges={details.businessChallenges}
        meta={meta}
      />

      <Divider />
      <Solutions solutions={details.solutions} meta={meta} />

      <Divider />
      <KeyFeatures keyFeatures={details.keyFeatures} meta={meta} />

      <Divider />
      <BusinessOutcomes benefits={details.benefits} meta={meta} />

      <Divider />
      <Technologies technologies={details.technologyStack} meta={meta} />

      <Divider />
      <UseCases useCases={details.useCases} meta={meta} />

      <Divider />
      <EngineerFuture steps={formattedProcessData} />

      <div className="my-20">
        <Banner details={details.banner} />
      </div>

      <Divider />
      <WhyChooseUs items={details.whyChooseUs} />

      <Divider />
      <FAQ faqs={details.faqs} />

      <CTABanner details={details} />
    </div>
  );
}
