"use client";

import AboutHero from "@/components/about/AboutHero";
import FAQ from "@/components/globalComponents/FAQ";
import KeyBenefits from "@/components/industries/KeyBenefits";
import CareerApply from "@/components/careers/CareerApply";
import Banner from "@/components/globalComponents/Banner";
import {
  heroData,
  opportunities,
  internshipBenefits,
  faqs,
  banner,
  contactInfo,
} from "@/lib/career_data";

const scrollToApply = () => {
  document
    .getElementById("career-apply")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function CareersPage() {
  return (
    <div className="bg-black min-h-screen font-sans selection:bg-violet-500/30 selection:text-white -mt-4 pt-7">
      <AboutHero data={heroData} onCtaClick={scrollToApply} />
      <CareerApply
        opportunities={opportunities}
        banner={banner}
        contactInfo={contactInfo}
      />
      <KeyBenefits
        benefits={internshipBenefits}
        header={{
          eyebrow: "Internship Program",
          title: "What You'll Get",
          description:
            "Kickstart your career with hands-on industry experience.",
        }}
      />
      <FAQ faqs={faqs} />
      <Banner
        details={banner}
        buttonText="Apply Now"
        onCtaClick={() =>
          document
            .getElementById("career-apply")
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      />
    </div>
  );
}
