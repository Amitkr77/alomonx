import React, {
  useState,
  useMemo,
  memo,
  useEffect,
  useRef,
  useCallback,
} from "react";

// ─── Static data — defined once at module scope ───────────────
const categories = [
  {
    id: "ALL",
    label: "ALL",
    icon: "https://api.iconify.design/material-symbols:grid-view-outline.svg",
  },
  {
    id: "Frontend",
    label: "Frontend",
    icon: "https://api.iconify.design/mdi:monitor-dashboard.svg",
  },
  {
    id: "Backend",
    label: "Backend",
    icon: "https://api.iconify.design/mdi:server-network.svg",
  },
  {
    id: "Mobile",
    label: "Mobile App",
    icon: "https://api.iconify.design/mdi:cellphone.svg",
  },
  {
    id: "DevOps",
    label: "Cloud & DevOps",
    icon: "https://api.iconify.design/mdi:cloud-sync.svg",
  },
  {
    id: "Databases",
    label: "Databases",
    icon: "https://api.iconify.design/mdi:database.svg",
  },
  {
    id: "AI",
    label: "AI / Machine Learning",
    icon: "https://api.iconify.design/mdi:brain.svg",
  },
  {
    id: "Design",
    label: "UI/UX & Design",
    icon: "https://api.iconify.design/mdi:palette.svg",
  },
  {
    id: "Ecommerce",
    label: "E-Commerce",
    icon: "https://api.iconify.design/mdi:shopping.svg",
  },
  {
    id: "Payment",
    label: "Payment Integration",
    icon: "https://api.iconify.design/mdi:credit-card-fast.svg",
  },
];

// Lookup map — O(1) vs iterating categories array every render
const activeStyles = {
  ALL: "border-slate-900 text-white bg-slate-600 shadow-[0_0_18px_rgba(15,23,42,0.18)]",
  Frontend:
    "border-blue-600 text-blue-700 bg-blue-50 shadow-[0_0_18px_rgba(37,99,235,0.18)]",
  Backend:
    "border-emerald-600 text-emerald-700 bg-emerald-50 shadow-[0_0_18px_rgba(5,150,105,0.18)]",
  Mobile:
    "border-cyan-600 text-cyan-700 bg-cyan-50 shadow-[0_0_18px_rgba(8,145,178,0.18)]",
  DevOps:
    "border-violet-600 text-violet-700 bg-violet-50 shadow-[0_0_18px_rgba(124,58,237,0.18)]",
  Databases:
    "border-rose-600 text-rose-700 bg-rose-50 shadow-[0_0_18px_rgba(225,29,72,0.18)]",
  AI: "border-indigo-600 text-indigo-700 bg-indigo-50 shadow-[0_0_18px_rgba(79,70,229,0.18)]",
  Design:
    "border-fuchsia-600 text-fuchsia-700 bg-fuchsia-50 shadow-[0_0_18px_rgba(192,38,211,0.18)]",
  Ecommerce:
    "border-amber-600 text-amber-700 bg-amber-50 shadow-[0_0_18px_rgba(217,119,6,0.18)]",
  Payment:
    "border-teal-600 text-teal-700 bg-teal-50 shadow-[0_0_18px_rgba(13,148,136,0.18)]",
};

const technologies = [
  // --- FRONTEND ---
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    category: ["Frontend"],
  },
  {
    name: "React.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    category: ["Frontend"],
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    category: ["Frontend"],
    invert: true,
  },
  {
    name: "Angular",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg",
    category: ["Frontend"],
  },
  {
    name: "React Three Fiber",
    icon: "https://cdn.simpleicons.org/threedotjs/000000",
    category: ["Frontend"],
  },
  // --- BACKEND ---
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    category: ["Backend"],
  },
  {
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    category: ["Backend"],
    invert: true,
  },
  {
    name: "Django",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
    category: ["Backend"],
    invert: true,
  },
  {
    name: "Spring Boot",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    category: ["Backend"],
  },
  {
    name: "Laravel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    category: ["Backend"],
  },
  {
    name: "REST API",
    icon: "https://api.iconify.design/mdi:api.svg",
    category: ["Backend"],
  },
  // --- MOBILE APP ---
  {
    name: "React Native",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    category: ["Mobile"],
  },
  {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    category: ["Mobile"],
  },
  {
    name: "Kotlin",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    category: ["Mobile"],
  },
  {
    name: "Swift",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
    category: ["Mobile"],
  },
  // --- AI / ML ---
  {
    name: "TensorFlow",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
    category: ["AI"],
  },
  {
    name: "PyTorch",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    category: ["AI"],
  },
  {
    name: "Scikit-learn",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
    category: ["AI"],
  },
  {
    name: "Keras",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg",
    category: ["AI"],
  },
  // --- CLOUD & DEVOPS ---
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    category: ["DevOps"],
    invert: true,
  },
  {
    name: "Microsoft Azure",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    category: ["DevOps"],
  },
  {
    name: "Google Cloud",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
    category: ["DevOps"],
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    category: ["DevOps"],
  },
  // --- DATABASES ---
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    category: ["Databases"],
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    category: ["Databases"],
  },
  {
    name: "MS SQL Server",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    category: ["Databases"],
    invert: true,
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    category: ["Databases"],
  },
  {
    name: "Firebase Firestore",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
    category: ["Databases"],
  },
  // --- UI/UX & DESIGN ---
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    category: ["Design"],
  },
  {
    name: "Adobe XD",
    icon: "https://api.iconify.design/logos:adobe-xd.svg",
    category: ["Design"],
  },
  {
    name: "Photoshop",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg",
    category: ["Design"],
  },
  {
    name: "Illustrator",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg",
    category: ["Design"],
  },
  // --- E-COMMERCE ---
  {
    name: "Shopify",
    icon: "https://api.iconify.design/logos:shopify.svg",
    category: ["Ecommerce"],
  },
  {
    name: "WooCommerce",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/woocommerce/woocommerce-original.svg",
    category: ["Ecommerce"],
  },
  // --- PAYMENT ---
  {
    name: "Razorpay",
    icon: "https://api.iconify.design/simple-icons:razorpay.svg",
    category: ["Payment"],
    invert: true,
  },
  {
    name: "Stripe",
    icon: "https://api.iconify.design/logos:stripe.svg",
    category: ["Payment"],
  },
  {
    name: "PayPal",
    icon: "https://api.iconify.design/logos:paypal.svg",
    category: ["Payment"],
  },
  {
    name: "PhonePe",
    icon: "https://api.iconify.design/simple-icons:phonepe.svg",
    category: ["Payment"],
    invert: true,
  },
  {
    name: "UPI Integration",
    icon: "https://api.iconify.design/mdi:bank-transfer.svg",
    category: ["Payment"],
    invert: true,
  },
];

// ─── Pre-build a Set per category for O(1) membership checks ──
// Done once at module load, never recalculated.
const categorySetMap = technologies.reduce((acc, tech) => {
  tech.category.forEach((cat) => {
    if (!acc[cat]) acc[cat] = new Set();
    acc[cat].add(tech.name);
  });
  return acc;
}, {});

// ─── Inject CSS once at module level ─────────────────────────
// Avoids re-processing <style> on every render.
if (
  typeof document !== "undefined" &&
  !document.getElementById("__tech-cap-styles")
) {
  const style = document.createElement("style");
  style.id = "__tech-cap-styles";
  style.textContent = `
    @keyframes circuit-flow {
      0%   { stroke-dashoffset: 1500; }
      100% { stroke-dashoffset: 0; }
    }
    @media (prefers-reduced-motion: no-preference) {
      .animate-flow         { animation: circuit-flow 9s  linear infinite; }
      .animate-flow-slow    { animation: circuit-flow 13s linear infinite; }
      .animate-flow-fast    { animation: circuit-flow 6s  linear infinite; }
      .animate-flow-reverse { animation: circuit-flow 12s linear infinite reverse; }
    }
    .hide-scroll::-webkit-scrollbar { display: none; }
    .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
  `;
  document.head.appendChild(style);
}

// ─── AnimatedBackground — memoised, never re-renders ─────────
const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Desktop SVG */}
      <div className="hidden md:block absolute inset-0 w-full h-full opacity-75">
        <svg
          viewBox="0 0 1440 1000"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          <g
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-gray-400"
            strokeLinejoin="round"
          >
            <path d="M-100,150 H250 L300,200 H700 L750,150 H1540" />
            <path d="M-100,280 H150 L200,330 H550 L600,280 H900 L950,330 H1540" />
            <path d="M-100,420 H350 L400,370 H850 L900,420 H1540" />
            <path d="M-100,560 H200 L250,610 H650 L700,560 H1540" />
            <path d="M-100,700 H450 L500,650 H1540" />
            <path d="M-100,840 H300 L350,890 H750 L800,840 H1540" />
            <path d="M-100,980 H150 L200,1030 H600 L650,980 H1540" />
            <path d="M-100,1120 H400 L450,1170 H900 L950,1120 H1540" />
            <path d="M-100,1260 H250 L300,1310 H800 L850,1260 H1540" />
            <path d="M250,150 V230 L200,280" />
            <path d="M700,200 V320 L750,370" />
            <path d="M200,560 V470 L250,420" />
            <path d="M500,650 V510 L450,460" />
            <path d="M300,840 V960 L200,1030" />
            <path d="M800,840 V1050 L900,1120" />
            <path d="M400,1120 V1240 L300,1310" />
          </g>
          <g fill="currentColor" className="text-gray-700">
            <circle cx="250" cy="150" r="3.5" />
            <circle cx="700" cy="200" r="3.5" />
            <circle cx="150" cy="280" r="3.5" />
            <circle cx="600" cy="280" r="3.5" />
            <circle cx="350" cy="420" r="3.5" />
            <circle cx="850" cy="370" r="3.5" />
            <circle cx="200" cy="560" r="3.5" />
            <circle cx="700" cy="560" r="3.5" />
            <circle cx="450" cy="700" r="3.5" />
            <circle cx="300" cy="840" r="3.5" />
            <circle cx="800" cy="840" r="3.5" />
            <circle cx="200" cy="1030" r="3.5" />
            <circle cx="600" cy="1030" r="3.5" />
            <circle cx="400" cy="1120" r="3.5" />
            <circle cx="900" cy="1120" r="3.5" />
            <circle cx="300" cy="1310" r="3.5" />
          </g>
          <g
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-700 drop-shadow-[0_0_12px_rgba(29,78,216,0.95)]"
          >
            <path
              d="M-100,150 H250 L300,200 H700 L750,150 H1540"
              className="animate-flow-fast"
              strokeDasharray="100 1400"
            />
            <path
              d="M-100,280 H150 L200,330 H550 L600,280 H900 L950,330 H1540"
              className="animate-flow"
              strokeDasharray="150 1350"
            />
            <path
              d="M-100,420 H350 L400,370 H850 L900,420 H1540"
              className="animate-flow-slow"
              strokeDasharray="80 1420"
            />
            <path
              d="M-100,560 H200 L250,610 H650 L700,560 H1540"
              className="animate-flow-reverse"
              strokeDasharray="120 1380"
            />
            <path
              d="M-100,840 H300 L350,890 H750 L800,840 H1540"
              className="animate-flow"
              strokeDasharray="90 1410"
            />
            <path
              d="M-100,980 H150 L200,1030 H600 L650,980 H1540"
              className="animate-flow-fast"
              strokeDasharray="110 1390"
            />
            <path
              d="M-100,1120 H400 L450,1170 H900 L950,1120 H1540"
              className="animate-flow-slow"
              strokeDasharray="130 1370"
            />
            <path
              d="M-100,1260 H250 L300,1310 H800 L850,1260 H1540"
              className="animate-flow-reverse"
              strokeDasharray="100 1400"
            />
            <path
              d="M250,150 V230 L200,280"
              className="animate-flow-fast"
              strokeDasharray="30 200"
            />
            <path
              d="M700,200 V320 L750,370"
              className="animate-flow"
              strokeDasharray="40 250"
            />
            <path
              d="M300,840 V960 L200,1030"
              className="animate-flow-fast"
              strokeDasharray="35 210"
            />
            <path
              d="M800,840 V1050 L900,1120"
              className="animate-flow-slow"
              strokeDasharray="45 260"
            />
          </g>
        </svg>
      </div>

      {/* Mobile SVG */}
      <div className="block md:hidden absolute inset-0 w-full h-full opacity-60">
        <svg
          viewBox="0 0 400 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          <g
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            className="text-gray-400"
            strokeLinejoin="round"
          >
            <path d="M-50,100 H120 L150,130 H450" />
            <path d="M-50,250 H200 L230,280 H450" />
            <path d="M-50,400 H150 L180,430 H450" />
            <path d="M-50,550 H100 L130,580 H450" />
            <path d="M-50,700 H250 L280,730 H450" />
            <path d="M120,100 V180 L80,220" />
            <path d="M200,250 V330 L250,380" />
            <path d="M150,400 V490 L100,540" />
          </g>
          <g fill="currentColor" className="text-gray-700">
            <circle cx="120" cy="100" r="3" />
            <circle cx="200" cy="250" r="3" />
            <circle cx="150" cy="400" r="3" />
            <circle cx="100" cy="550" r="3" />
            <circle cx="250" cy="700" r="3" />
          </g>
          <g
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-700 drop-shadow-[0_0_8px_rgba(29,78,216,0.9)]"
          >
            <path
              d="M-50,100 H120 L150,130 H450"
              className="animate-flow-fast"
              strokeDasharray="80 800"
            />
            <path
              d="M-50,250 H200 L230,280 H450"
              className="animate-flow"
              strokeDasharray="100 700"
            />
            <path
              d="M-50,400 H150 L180,430 H450"
              className="animate-flow-reverse"
              strokeDasharray="90 750"
            />
            <path
              d="M-50,550 H100 L130,580 H450"
              className="animate-flow-slow"
              strokeDasharray="70 850"
            />
            <path
              d="M-50,700 H250 L280,730 H450"
              className="animate-flow-fast"
              strokeDasharray="120 700"
            />
          </g>
        </svg>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[400px] md:h-[600px] bg-blue-950/10 rounded-[100%] blur-[80px] md:blur-[120px] pointer-events-none" />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-70" />
    </div>
  );
});

// ─── Lazy icon image — only fetches when it enters the viewport ─
const LazyIcon = memo(function LazyIcon({ src, alt, className }) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [actualSrc, setActualSrc] = useState(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    // Native lazy loading path (all modern browsers)
    if ("loading" in HTMLImageElement.prototype) {
      setActualSrc(src);
      return;
    }

    // IntersectionObserver fallback
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActualSrc(src);
          obs.disconnect();
        }
      },
      { rootMargin: "150px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={
        actualSrc ||
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      }
      loading="lazy"
      decoding="async"
      alt={alt}
      width={40}
      height={40}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-300 ${loaded || !actualSrc ? "opacity-100" : "opacity-0"}`}
    />
  );
});

// ─── Category button — memoised, only re-renders when its own
//     active state flips (not when a sibling button is clicked) ─
const CategoryButton = memo(function CategoryButton({
  cat,
  isActive,
  onClick,
}) {
  const theme = activeStyles[cat.id];

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 md:gap-3 rounded-xl px-4 py-2.5 md:px-5 md:py-3.5 text-xs md:text-md font-semibold transition-all duration-300 border whitespace-nowrap shrink-0 lg:shrink w-auto lg:w-full
        ${
          isActive
            ? theme
            : "bg-card/100 backdrop-blur-md text-card-foreground border-border hover:bg-accent hover:border-accent-foreground/30 shadow-sm"
        }`}
    >
      <div
        className={`p-1.5 md:p-2 rounded-full transition-colors duration-300 ${isActive ? "bg-background shadow-sm" : "bg-secondary"}`}
      >
        <LazyIcon
          src={cat.icon}
          alt={cat.label}
          className={`object-contain w-3.5 h-3.5 md:w-5 md:h-5 dark:invert transition-all duration-300 ${isActive ? "opacity-100" : "opacity-60"}`}
        />
      </div>
      <span>{cat.label}</span>
    </button>
  );
});

// ─── Tech card — memoised per item, only re-renders when its
//     own match state changes, not on every filter switch ────────
const TechCard = memo(function TechCard({ tech, isMatch }) {
  return (
    <div
      className={`relative flex items-center gap-3 md:gap-4 py-2.5 px-3 md:py-4 md:px-5 rounded-xl md:rounded-2xl border transition-all duration-500 ease-out
        ${
          isMatch
            ? "opacity-100 bg-white border-slate-300 shadow-[0_10px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_14px_35px_rgba(37,99,235,0.12)] hover:-translate-y-1.5 hover:border-blue-400 z-10 cursor-pointer"
            : "opacity-100 bg-[#e8ecf0] border-slate-200 pointer-events-none grayscale-[35%] scale-[0.98] z-0"
        }`}
    >
      <div className="w-7 h-7 md:w-11 md:h-11 flex items-center justify-center shrink-0">
        <LazyIcon
          src={tech.icon}
          alt={tech.name}
          className={`object-contain w-full h-full transition-all duration-500 ${tech.invert ? "dark:invert" : ""}`}
        />
      </div>
      <span
        className={`text-[12px] md:text-[15px] font-semibold font-poppins transition-colors duration-500 ${isMatch ? "text-slate-800" : "text-slate-400"}`}
      >
        {tech.name}
      </span>
    </div>
  );
});

// ─── Main export ──────────────────────────────────────────────
export default function TechCapabilities() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Stable handler — doesn't change on re-render so CategoryButton
  // callbacks are always the same reference per button.
  const makeClickHandler = useCallback((id) => () => setActiveFilter(id), []);

  // Pre-compute the match Set for the current filter once, not
  // inside every TechCard render. O(1) lookup per card.
  const matchSet = useMemo(
    () =>
      activeFilter === "ALL"
        ? null
        : (categorySetMap[activeFilter] ?? new Set()),
    [activeFilter],
  );

  return (
    <div className="relative overflow-hidden w-full m-auto bg-[#eef2f7] py-8 md:py-12 font-sans">
      {/* Background never re-renders */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10 space-y-6 md:space-y-8">
        <div className="flex flex-col items-center max-w-4xl mx-auto text-center px-4">
          <h2 className="mb-4 md:mb-6 text-2xl md:text-4xl font-extrabold text-foreground pb-1">
            Tech Capabilities Driving Digital Transformation
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl">
            Gain invaluable predictive analytics and actionable insights,
            empowering your team to make data-driven decisions.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10 mt-6 md:mt-12 px-4 md:px-6">
          {/* Sidebar Navigation */}
          <div className="w-full lg:col-span-1 flex flex-row lg:flex-col lg:grid lg:grid-cols-1 items-start justify-start gap-2.5 md:gap-5 h-max mt-2 md:mt-5 overflow-x-auto lg:overflow-visible hide-scroll pb-2 lg:pb-0">
            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                cat={cat}
                isActive={activeFilter === cat.id}
                onClick={makeClickHandler(cat.id)}
              />
            ))}
          </div>

          {/* Technology Grid */}
          <div className="w-full lg:col-span-4 mx-auto group/grid perspective-[2000px]">
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 pb-6">
              {technologies.map((tech) => (
                <TechCard
                  key={tech.name}
                  tech={tech}
                  // null matchSet means ALL — always matched
                  isMatch={matchSet === null || matchSet.has(tech.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
