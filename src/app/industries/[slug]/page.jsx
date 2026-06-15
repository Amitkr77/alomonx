import React from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Activity,
  GraduationCap,
  Landmark,
  Vote,
  ShoppingCart,
  Utensils,
  Ticket,
  MessageSquare,
  Zap,
  Sprout,
  Building2,
  Share2,
  Cpu,
} from "lucide-react";
import {
  getIndustryBySlug,
  allIndustries,
  categoryMeta,
} from "@/lib/industries-data";

// 1. Static Imports: Load "Above the Fold" components instantly
import HeroSection from "@/components/industries/HeroSection";
import IndustryChallenges from "@/components/industries/IndustryChallenges";

// 2. Dynamic Imports: Lazy load "Below the Fold" components
const FullOverview = dynamic(
  () => import("@/components/globalComponents/FullOverview"),
);
const Solutions = dynamic(() => import("@/components/industries/Solutions"));
const TechCapabilities = dynamic(() => import("@/components/TechCapabilities"));
const KeyBenefits = dynamic(
  () => import("@/components/industries/KeyBenefits"),
);
const UseCases = dynamic(() => import("@/components/industries/UseCases"));
const WhyChooseUs = dynamic(
  () => import("@/components/globalComponents/WhyChooseUs"),
);
const FAQ = dynamic(() => import("@/components/globalComponents/FAQ"));
const PresentationSection = dynamic(
  () => import("@/components/PresentationSection"),
);
const CTABanner = dynamic(
  () => import("@/components/globalComponents/CTABanner"),
);
const Banner = dynamic(() => import("@/components/globalComponents/Banner"));

const PortfolioCarousel = dynamic(
  () => import("@/components/PortfolioCarousel"),
);

const iconMap = {
  Activity,
  GraduationCap,
  Landmark,
  Vote,
  ShoppingCart,
  Utensils,
  Ticket,
  MessageSquare,
  Zap,
  Sprout,
  Building2,
  Share2,
  Cpu,
};

function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
  );
}

// 3. Convert to an async Server Component
export default async function IndustryDetailPage({ params }) {
  // 4. Await params directly on the server instead of client-side use()
  const { slug } = await params;

  const industry = getIndustryBySlug(slug);

  if (!industry) notFound();

  const { details, category, label } = industry;
  const Icon = iconMap[industry.icon] ?? Building2;

  const meta = categoryMeta[category];

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Hero */}
      {/* Just pass the string, e.g., "Building2" */}
      <HeroSection industry={industry} meta={meta} iconName={industry.icon} />

      {/* Full Overview */}
      {details.fullOverview && (
        <FullOverview
          fullOverview={details.fullOverview}
          meta={{ ...meta, eyebrow: "What We Do" }}
        />
      )}

      {/* Industry Challenges */}
      <IndustryChallenges
        challenges={details.industryChallenges}
        label={label}
        meta={meta}
      />

      <Divider />

      {/* Solutions */}
      <Solutions solutions={details.solutions} label={label} meta={meta} />

      {details.technologies?.length > 0 && (
        <>
          <Divider />
          <TechCapabilities technologies={details.technologies} />
          <Divider />
        </>
      )}

      <KeyBenefits benefits={details.benefits} meta={meta} />
      <UseCases useCases={details.useCases} meta={meta} />

      <Divider />

      {/* Why Choose Us */}
      <WhyChooseUs items={details.whyChooseUs} />

      <PortfolioCarousel />

      <Banner details={details.banner} />

      <PresentationSection />

      <Divider />

      {/* FAQ */}
      <FAQ faqs={details.faqs} />

      {/* CTA */}
      <CTABanner details={details} />
    </div>
  );
}
