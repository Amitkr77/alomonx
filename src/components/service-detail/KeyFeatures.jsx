"use client";
import { useState, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import {
  Code2,
  BarChart3,
  ShieldCheck,
  Plug,
  Layers,
  Zap,
  Clock,
  Globe,
  Settings,
  Users,
  Star,
  TrendingUp,
  Lock,
  Database,
  Cpu,
} from "lucide-react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const ICON_MAP = [
  { keys: ["custom", "develop", "build", "code"], Icon: Code2 },
  { keys: ["analytic", "chart", "report", "insight", "data"], Icon: BarChart3 },
  {
    keys: ["secure", "security", "safe", "protect", "privacy"],
    Icon: ShieldCheck,
  },
  { keys: ["integrat", "api", "connect", "plugin", "plug"], Icon: Plug },
  { keys: ["scale", "architect", "infra", "layer"], Icon: Layers },
  { keys: ["fast", "speed", "perform", "quick", "real-time"], Icon: Zap },
  { keys: ["support", "24", "time", "availab"], Icon: Clock },
  { keys: ["global", "multi", "region", "world"], Icon: Globe },
  { keys: ["config", "setting", "automat", "workflow"], Icon: Settings },
  { keys: ["team", "user", "collab", "role"], Icon: Users },
  { keys: ["trend", "growth", "optim"], Icon: TrendingUp },
  { keys: ["access", "auth", "login", "lock"], Icon: Lock },
  { keys: ["database", "storage", "backup"], Icon: Database },
  { keys: ["ai", "ml", "smart", "intellig", "cpu"], Icon: Cpu },
];

function getIcon(featureName = "") {
  const lower = featureName.toLowerCase();
  const match = ICON_MAP.find(({ keys }) =>
    keys.some((k) => lower.includes(k)),
  );
  return match ? match.Icon : Star;
}

// Desktop bento sizing — only used on md+
const SIZE_PATTERN = [
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-2",
];

const FeatureCard = memo(function FeatureCard({ data, isMobile }) {
  const [isHovered, setIsHovered] = useState(false);
  const { feature, Icon, desc, sizeClass, isWide, isTall, index } = data;

  // On mobile every card is flat row layout — no tall/wide bento logic
  const showDesc = isMobile ? true : isTall || isWide || isHovered;
  const flexDir = isMobile
    ? "flex-row items-center gap-4"
    : isTall
      ? "flex-col justify-between"
      : "flex-row items-center gap-5";
  const minH = isMobile ? "auto" : isTall ? "220px" : "100px";

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl cursor-default group ${isMobile ? "col-span-1" : sizeClass}`}
      style={{
        background: isHovered
          ? "linear-gradient(135deg, #0f1829 0%, #111c35 100%)"
          : "rgba(255,255,255,0.09)",
        border: isHovered
          ? "1px solid rgba(59,130,246,0.18)"
          : "1px solid rgba(255,255,255,0.08)",
        minHeight: minH,
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: "easeOut" }}
    >
      {/* Watermark number */}
      <span
        className="absolute right-4 top-2 text-[5rem] font-black leading-none pointer-events-none select-none transition-all duration-500"
        style={{
          color: isHovered ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.09)",
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Blue glow on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background:
              "radial-gradient(ellipse at 0% 100%, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Card content */}
      <div className={`relative z-10 flex h-full ${flexDir} p-4 md:p-5`}>
        {/* Icon + title group */}
        <div
          className={`flex ${isTall && !isMobile ? "flex-col gap-4" : "flex-row items-center gap-3 md:gap-4"} flex-1 min-w-0`}
        >
          {/* Icon box */}
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              backgroundColor: isHovered
                ? "rgba(59,130,246,0.18)"
                : "rgba(255,255,255,0.05)",
            }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center"
          >
            <Icon
              strokeWidth={1.8}
              className="w-4 h-4 md:w-5 md:h-5 transition-colors duration-300"
              style={{
                color: isHovered ? "#60a5fa" : "rgba(255,255,255,0.35)",
              }}
            />
          </motion.div>

          {/* Title + description */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-bold leading-tight transition-colors duration-300"
              style={{
                fontSize: isMobile
                  ? "0.95rem"
                  : isTall || isWide
                    ? "1.15rem"
                    : "1.05rem",
                color: isHovered ? "#ffffff" : "rgba(255,255,255,0.65)",
              }}
            >
              {feature}
            </h3>

            {desc && showDesc && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-white/45 text-xs md:text-sm leading-relaxed mt-1.5"
                style={{ maxWidth: "36ch" }}
              >
                {desc}
              </motion.p>
            )}
          </div>
        </div>

        {/* Arrow — tall cards only, desktop only */}
        {isTall && !isMobile && (
          <motion.div
            animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center self-end"
            style={{
              borderColor: isHovered ? "rgba(59,130,246,0.5)" : undefined,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 6h7M6.5 3l3 3-3 3"
                stroke={isHovered ? "#60a5fa" : "rgba(255,255,255,0.4)"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-blue-500 rounded-full"
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </motion.div>
  );
});

export default function KeyFeatures({
  features = [],
  featureDescriptions = [],
}) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect breakpoint — md = 768px
  useState(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  });

  const processedFeatures = useMemo(() => {
    return features.map((feature, i) => {
      const sizeClass = SIZE_PATTERN[i % SIZE_PATTERN.length];
      return {
        feature,
        Icon: getIcon(feature),
        desc: featureDescriptions?.[i] ?? "",
        sizeClass,
        isWide: sizeClass.includes("col-span-2"),
        isTall: sizeClass.includes("row-span-2"),
        index: i,
      };
    });
  }, [features, featureDescriptions]);

  if (!features.length) return null;

  return (
    <div
      className={`w-full max-w-7xl mx-auto py-10 px-4 md:px-0 ${dmSans.className}`}
    >
      {/* Section Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight ${dmSerif.className}`}
          >
            Key Features
            <span className="text-blue-900"> ...</span>
          </h2>
        </div>
        <p className="text-white/80 text-sm font-semibold max-w-xs leading-relaxed">
          Built to solve real problems — every feature is purpose-driven and
          production-ready.
        </p>
      </div>

      {/* Mobile grid — 1 col, flat cards */}
      <div className="grid grid-cols-1 gap-[7px] md:hidden">
        {processedFeatures.map((data) => (
          <FeatureCard key={data.index} data={data} isMobile={true} />
        ))}
      </div>

      {/* Tablet grid — 2 cols, no bento */}
      <div
        className="hidden md:grid lg:hidden gap-[7px]"
        style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
      >
        {processedFeatures.map((data) => (
          <FeatureCard
            key={data.index}
            data={{
              ...data,
              sizeClass: "col-span-1",
              isWide: false,
              isTall: false,
            }}
            isMobile={false}
          />
        ))}
      </div>

      {/* Desktop bento grid — 3 cols with size pattern */}
      <div
        className="hidden lg:grid gap-[7px]"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {processedFeatures.map((data) => (
          <FeatureCard key={data.index} data={data} isMobile={false} />
        ))}
      </div>
    </div>
  );
}
