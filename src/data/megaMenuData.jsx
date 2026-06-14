import {
  Info,
  Cpu,
  Settings2,
  Palette,
  Share2,
  Megaphone,
  Code2,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

import { portfolioData } from "@/lib/portfolio_data";
import { allAiServices } from "@/lib/ai-services-data";
import { allServices } from "@/lib/services-data";
import { allIndustries } from "@/lib/industries-data";

// ── Icon map for Services column headings ─────────────────────────────────────
const SERVICE_COLUMN_ICONS = {
  Development: <Code2 className="w-4 h-4" />,
  "Custom Software": <Settings2 className="w-4 h-4" />,
  "UI/UX Design": <Palette className="w-4 h-4" />,
  SharePoint: <Share2 className="w-4 h-4" />,
};

// ── Icon map for Industries column headings ───────────────────────────────────
const INDUSTRY_COLUMN_ICONS = {
  "Core Sectors": <Info className="w-4 h-4" />,
  "Consumer & Lifestyle": <Share2 className="w-4 h-4" />,
  "Emerging Tech": <Cpu className="w-4 h-4" />,
};

// ── Generic helper: group an array by item.category ───────────────────────────
const groupByCategory = (items) => {
  const map = new Map();
  for (const item of items) {
    if (!map.has(item.category)) map.set(item.category, []);
    map.get(item.category).push(item);
  }
  return map;
};

// ── Services columns — grouped by category, icons from map ───────────────────
const getServiceColumns = () => {
  const grouped = groupByCategory(allServices);
  return [...grouped.entries()].map(([category, items]) => ({
    heading: category,
    icon: SERVICE_COLUMN_ICONS[category] ?? null,
    links: items.map((s) => ({
      label: s.label,
      href: s.href,
      image: s.image,
      description: s.details?.overview ?? s.description ?? "",
      ...(s.badge && { badge: s.badge }),
    })),
  }));
};

// ── Industries columns — grouped by category, icons from map ─────────────────
const getIndustryColumns = () => {
  const grouped = groupByCategory(allIndustries);
  return [...grouped.entries()].map(([category, items]) => ({
    heading: category,
    icon: INDUSTRY_COLUMN_ICONS[category] ?? null,
    links: items.map((ind) => ({
      label: ind.label,
      href: ind.href,
      image: ind.image,
      description: ind.description ?? "",
      ...(ind.badge && { badge: ind.badge }),
    })),
  }));
};

// ── Portfolio links ────────────────────────────────────────────────────────────
const getAllPortfolioLinks = () => {
  return portfolioData.slice(0, 15).map((project) => ({
    label: project.title,
    href: `/portfolio/${project.slug}`,
    image: project.heroImage,
    description: project.shortDescription,
    ...(project.badge && { badge: project.badge }),
  }));
};

// ── AI service links — split into 3 columns of 3 ──────────────────────────────
const getAiServiceColumns = () => {
  const links = allAiServices.slice(0, 9).map((service) => ({
    label: service.label,
    href: service.href,
    image: service.image,
    description: service.details?.tagline ?? service.description,
    ...(service.badge && { badge: service.badge }),
  }));

  return [
    { links: links.slice(0, 3) },
    { links: links.slice(3, 6) },
    { links: links.slice(6, 9) },
  ];
};

const megaMenuData = {
  Services: {
    // Dynamically built from allServices — grouped by category field
    columns: getServiceColumns(),
    highlight: {
      icon: <Megaphone className="w-4 h-4" />,
      label: "Digital Marketing Services",
      description: "SEO, PPC, social media, content strategy & more.",
      href: "/services/digital-marketing",
      image:
        "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1200&auto=format&fit=crop",
    },
    cta: {
      text: "Can't find what you need? Let us tailor a solution just for you.",
      buttonLabel: "Schedule Free Consultation",
      href: "/contact",
    },
  },

  Industries: {
    // Dynamically built from allIndustries — grouped by category field
    columns: getIndustryColumns(),
    highlight: {
      icon: <Megaphone className="w-4 h-4" />,
      label: "Don't see your industry?",
      description:
        "We build custom solutions for any sector — let's talk about your specific needs.",
      href: "/contact",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
    cta: {
      text: "Every industry has unique challenges. We've solved them before.",
      buttonLabel: "Explore Our Work",
      href: "/portfolio",
    },
  },

  "Alomonx AI": {
    // Dynamically built from allAiServices — first 9 entries split into 3 columns
    columns: getAiServiceColumns(),
    highlight: {
      icon: <MessageSquareText className="w-4 h-4" />,
      label: "Custom AI Agent Development",
      description:
        "Multi-step autonomous agents that research, decide, and act on your behalf.",
      href: "/ai-services/ai-agents",
      image:
        "https://images.unsplash.com/photo-1675557009875-436f7a7c5f8a?q=80&w=1200&auto=format&fit=crop",
    },
    cta: {
      text: "Not sure where to start? Let's map out the right AI solution for your business.",
      buttonLabel: "Book a Free AI Consultation",
      href: "/contact",
    },
  },

  Portfolio: {
    links: getAllPortfolioLinks(),
    highlight: {
      icon: <Sparkles className="w-4 h-4" />,
      label: "Featured Project: Omni AI",
      description:
        "How we built a custom AI support agent that reduced ticket resolution time by 40%.",
      href: "/portfolio/omni-ai-case-study",
      image:
        "https://images.unsplash.com/photo-1675557009875-436f7a7c5f8a?q=80&w=1200&auto=format&fit=crop",
    },
    cta: {
      text: "See how we've helped businesses scale with custom software.",
      buttonLabel: "View All Projects",
      href: "/portfolio",
    },
  },
};

export default megaMenuData;
