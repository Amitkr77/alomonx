import AboutHero from "@/components/about/AboutHero";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactInfoMap from "@/components/contact/ContactInfoMap";
import FAQ from "@/components/globalComponents/FAQ";
import FounderAndValues from "@/components/FounderAndValues";
import MarketingBanner from "@/components/MarketingBanner";

export const metadata = {
  title: "Contact | Alomonx Technology",
  description:
    "Get in touch with Alomonx Technology. Send a message, book a discovery call, or visit our office in Patna, Bihar.",
};

export const heroData = {
  eyebrow: "Available for new projects",
  headline: "Let's build something\n together",
  accentLine: "extraordinary.",
  subtext:
    "Whether you have a specific project in mind or just want to explore possibilities, our team is ready to collaborate.",
  image:
    "https://res.cloudinary.com/dtrhtdngp/image/upload/q_auto/f_auto/v1781412046/ChatGPT_Image_Jun_14_2026_10_09_45_AM_tmuhqx.png",
};

const FAQS = [
  {
    question: "How quickly will I receive a response?",
    answer:
      "We aim to respond to all inquiries within 24-48 hours during business days.",
  },
  {
    question: "Can I schedule a call directly?",
    answer:
      "Yes, use our consultation booking tool to pick a convenient time slot.",
  },
  {
    question: "What types of projects do you handle?",
    answer:
      "We specialize in web development, digital marketing, and custom software solutions.",
  },
];

const ContactPage = () => (
  <div className="bg-black min-h-screen font-sans selection:bg-violet-500/30 selection:text-white mt-4">
    <AboutHero data={heroData} />
    <ContactFormSection />
    <ContactInfoMap />
    <FAQ faqs={FAQS} />
    <FounderAndValues />
    <MarketingBanner />
  </div>
);

export default ContactPage;
