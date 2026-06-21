import AboutHero from "@/components/about/AboutHero";
import AboutMissionStacked from "@/components/about/AboutMission";
import FAQ from "@/components/globalComponents/FAQ";
import KeyBenefits from "@/components/industries/KeyBenefits";
import Banner from "@/components/globalComponents/Banner";
import {
  heroData,
  opportunities,
  internshipBenefits,
  faqs,
  banner,
  contactInfo,
} from "@/lib/career_data";

export default function CareersPage() {
  return (
    <div className="bg-black min-h-screen font-sans selection:bg-violet-500/30 selection:text-white -mt-4 pt-7">
      <AboutHero data={heroData} />
      <AboutMissionStacked
        missionPoints={opportunities}
        header={{
          eyebrow: "Join Our Team",
          title: "Current Opportunities",
          highlight: null,
          description:
            "We're always looking for passionate and talented individuals.",
        }}
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
      <Banner details={banner} contactInfo={contactInfo} />
    </div>
  );
}
