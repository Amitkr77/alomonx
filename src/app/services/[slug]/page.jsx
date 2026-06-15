import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Server Components (Above the fold)
import HeroSection from "@/components/service-detail/HeroSection";
import DetailOverview from "@/components/service-detail/DetailOverview";
import KeyFeatures from "@/components/service-detail/KeyFeatures";
import TechCapabilities from "@/components/TechCapabilities";
import EngineerFuture from "@/components/EngineerFuture";
import PresentationSection from "@/components/PresentationSection";
import WhyChooseUs from "@/components/globalComponents/WhyChooseUs";
import CTABanner from "@/components/globalComponents/CTABanner";

// Local data fetcher
import {
  getServiceBySlug,
  categoryMeta,
  allServices,
} from "@/lib/services-data";

// Client Components (Below the fold - Lazy Loaded)
const PortfolioCarousel = dynamic(
  () => import("@/components/PortfolioCarousel"),
);
const FAQ = dynamic(() => import("@/components/globalComponents/FAQ"));
const Benefits = dynamic(() => import("@/components/service-detail/Benefits"));

// 1. Pre-render all service pages at build time (SSG)
export async function generateStaticParams() {
  // ✅ FIXED: Using 'allServices' here instead of 'services'
  return allServices.map((service) => ({
    slug: service.slug,
  }));
}

// 2. Next.js passes `params` directly to page components; no need for useParams()
export default async function ServiceDetailPage({ params }) {
  // In Next.js 15+, params should be awaited if they are promises, though accessing synchronously might work depending on your exact setup.
  // We'll safely destructure it.
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Service Not Found
        </h1>
        <Link href="/services">
          <Button className="bg-teal-600 text-white hover:bg-teal-700 rounded-full h-12 px-8">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Services
          </Button>
        </Link>
      </div>
    );
  }

  const { label, image, details } = service;
  const meta = categoryMeta[service.category];

  const gridPositions = [
    "col-start-1 col-end-5 md:col-start-1 md:col-end-6 mt-10",
    "col-start-1 col-end-5 md:col-start-7 md:col-end-12 mt-32",
    "col-start-1 col-end-5 md:col-start-2 md:col-end-7 mt-32",
    "col-start-1 col-end-5 md:col-start-8 md:col-end-13 mt-32",
    "col-start-1 col-end-5 md:col-start-1 md:col-end-6 mt-32",
    "col-start-1 col-end-5 md:col-start-6 md:col-end-11 mt-32",
    "col-start-1 col-end-5 md:col-start-2 md:col-end-7 mt-32",
  ];

  const formattedProcessData = details.process.map((item, index) => ({
    id: `0${index + 1}`,
    title: item.title,
    subtitle: "SYSTEM PROCESS",
    desc: item.description,
    position: gridPositions[index] || "col-start-1 col-end-5 mt-32",
  }));

  return (
    <div className="min-h-screen bg-[#010716] text-slate-800 pb-20">
      <HeroSection image={image} label={label} details={details} />
      <DetailOverview fullOverview={details.fullOverview} />
      <KeyFeatures
        features={details.features}
        featureDescriptions={details.featureDescriptions}
      />
      <TechCapabilities technologies={details.technologies} />
      <PresentationSection />
      <EngineerFuture steps={formattedProcessData} />

      {/* Lazy-loaded components down here */}
      <PortfolioCarousel />
      <WhyChooseUs items={details.whyChooseUs} />
      <Benefits benefits={details.benefits} />

      <FAQ faqs={details.faqs} />
      <CTABanner details={details} />
    </div>
  );
}
