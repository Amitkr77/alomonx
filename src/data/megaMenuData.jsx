import { Info, Cpu, Settings2, Palette, Share2, Code2 } from "lucide-react";

import { portfolioData } from "@/lib/portfolio_data";
import { allAiServices } from "@/lib/ai-services-data";
import { allServices } from "@/lib/services-data";
import { allIndustries } from "@/lib/industries-data";

// ── Icon map for Services column headings ─────────────────────
const SERVICE_COLUMN_ICONS = {
  Development: <Code2 className="w-4 h-4" />,
  "Custom Software": <Settings2 className="w-4 h-4" />,
  "UI/UX Design": <Palette className="w-4 h-4" />,
  SharePoint: <Share2 className="w-4 h-4" />,
};

// ── Icon map for Industries column headings ───────────────────
const INDUSTRY_COLUMN_ICONS = {
  "Core Sectors": <Info className="w-4 h-4" />,
  "Consumer & Lifestyle": <Share2 className="w-4 h-4" />,
  "Emerging Tech": <Cpu className="w-4 h-4" />,
};

// ── Generic helper: group an array by item.category ───────────
const groupByCategory = (items) => {
  const map = new Map();
  for (const item of items) {
    if (!map.has(item.category)) map.set(item.category, []);
    map.get(item.category).push(item);
  }
  return map;
};

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

const getAllPortfolioLinks = () => {
  return portfolioData.slice(0, 15).map((project) => ({
    label: project.title,
    href: `/portfolio/${project.slug}`,
    image: project.heroImage,
    description: project.shortDescription,
    ...(project.badge && { badge: project.badge }),
  }));
};

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
    columns: getServiceColumns(),
  },

  Industries: {
    columns: getIndustryColumns(),
  },

  "Alomonx AI": {
    columns: getAiServiceColumns(),
  },

  Portfolio: {
    links: getAllPortfolioLinks(),
  },
};

export default megaMenuData;
