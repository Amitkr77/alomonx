"use client";
import React, {
  useState,
  useMemo,
  memo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";

// ─── Full Tech Registry ───────────────────────────────────────
const allTechnologies = [
  // FRONTEND
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    category: ["Frontend"],
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    category: ["Frontend"],
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    category: ["Frontend"],
  },
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
    name: "Vue.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
    category: ["Frontend"],
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    category: ["Frontend"],
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
    category: ["Frontend"],
  },
  {
    name: "React Three Fiber",
    icon: "https://cdn.simpleicons.org/threedotjs/000000",
    category: ["Frontend"],
  },

  // BACKEND
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
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    category: ["Backend", "AI"],
  },
  {
    name: "Django",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
    category: ["Backend"],
    invert: true,
  },
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    category: ["Backend"],
  },
  {
    name: "Laravel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    category: ["Backend"],
  },
  {
    name: ".NET",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg",
    category: ["Backend"],
  },
  {
    name: "Spring Boot",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    category: ["Backend"],
  },
  {
    name: "GraphQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
    category: ["Backend"],
  },
  {
    name: "REST API",
    icon: "https://api.iconify.design/mdi:api.svg",
    category: ["Backend"],
  },

  // MOBILE
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
  {
    name: "Expo",
    icon: "https://api.iconify.design/simple-icons:expo.svg",
    category: ["Mobile"],
    invert: true,
  },

  // AI / ML
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
  {
    name: "OpenAI",
    icon: "https://api.iconify.design/simple-icons:openai.svg",
    category: ["AI"],
    invert: true,
  },
  {
    name: "Generative AI",
    icon: "https://api.iconify.design/mdi:creation.svg",
    category: ["AI"],
  },
  {
    name: "Natural Language Processing",
    icon: "https://api.iconify.design/mdi:text-recognition.svg",
    category: ["AI"],
  },
  {
    name: "Machine Learning",
    icon: "https://api.iconify.design/mdi:brain.svg",
    category: ["AI"],
  },
  {
    name: "WhatsApp Business API",
    icon: "https://api.iconify.design/ic:baseline-whatsapp.svg",
    category: ["AI"],
  },
  {
    name: "Claude",
    icon: "https://api.iconify.design/mdi:robot-outline.svg",
    category: ["AI"],
  },
  {
    name: "LangChain",
    icon: "https://api.iconify.design/mdi:link-variant.svg",
    category: ["AI"],
  },
  {
    name: "Spring AI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    category: ["AI"],
  },
  {
    name: "Gemini",
    icon: "https://api.iconify.design/mdi:star-four-points-outline.svg",
    category: ["AI"],
  },
  {
    name: "RAG",
    icon: "https://api.iconify.design/mdi:database-search.svg",
    category: ["AI"],
  },
  {
    name: "MCP",
    icon: "https://api.iconify.design/mdi:connection.svg",
    category: ["AI"],
  },
  {
    name: "Vector Databases",
    icon: "https://api.iconify.design/mdi:database-search.svg",
    category: ["AI"],
  },
  {
    name: "AI Agents",
    icon: "https://api.iconify.design/mdi:robot.svg",
    category: ["AI"],
  },
  {
    name: "Prompt Engineering",
    icon: "https://api.iconify.design/mdi:message-text-outline.svg",
    category: ["AI"],
  },
  {
    name: "Semantic Search",
    icon: "https://api.iconify.design/mdi:magnify-scan.svg",
    category: ["AI"],
  },
  {
    name: "LLM Fine-Tuning",
    icon: "https://api.iconify.design/mdi:tune-variant.svg",
    category: ["AI"],
  },

  // DEVOPS / CLOUD
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
    name: "Google Cloud Platform",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
    category: ["DevOps"],
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    category: ["DevOps"],
  },
  {
    name: "Kubernetes",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
    category: ["DevOps"],
  },
  {
    name: "CI/CD Pipelines",
    icon: "https://api.iconify.design/carbon:continuous-deployment.svg",
    category: ["DevOps"],
    invert: true,
  },
  {
    name: "Vercel",
    icon: "https://api.iconify.design/simple-icons:vercel.svg",
    category: ["DevOps"],
    invert: true,
  },
  {
    name: "GitHub Actions",
    icon: "https://api.iconify.design/simple-icons:githubactions.svg",
    category: ["DevOps"],
  },
  {
    name: "Fastlane",
    icon: "https://api.iconify.design/simple-icons:fastlane.svg",
    category: ["DevOps"],
  },
  {
    name: "Cloud Infrastructure",
    icon: "https://api.iconify.design/mdi:cloud-outline.svg",
    category: ["DevOps", "AI"],
  },

  // DATABASES
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
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    category: ["Databases"],
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
    category: ["Databases"],
  },
  {
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
    category: ["Databases"],
  },
  {
    name: "SQLite",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
    category: ["Databases"],
  },
  {
    name: "Realm",
    icon: "https://api.iconify.design/simple-icons:realm.svg",
    category: ["Databases"],
  },

  // DESIGN
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

  // CMS
  {
    name: "WordPress",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg",
    category: ["CMS"],
  },
  {
    name: "Headless CMS",
    icon: "https://api.iconify.design/carbon:content-delivery-network.svg",
    category: ["CMS"],
    invert: true,
  },
  {
    name: "Sanity",
    icon: "https://api.iconify.design/simple-icons:sanity.svg",
    category: ["CMS"],
  },
  {
    name: "Contentful",
    icon: "https://api.iconify.design/simple-icons:contentful.svg",
    category: ["CMS"],
  },
  {
    name: "Strapi",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/strapi/strapi-original.svg",
    category: ["CMS"],
  },

  // ECOMMERCE
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

  // PAYMENT
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
    name: "UPI",
    icon: "https://api.iconify.design/mdi:bank-transfer.svg",
    category: ["Payment"],
  },
];

// ─── All Categories ───────────────────────────────────────────
const allCategories = [
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
    label: "AI / ML",
    icon: "https://api.iconify.design/mdi:brain.svg",
  },
  {
    id: "Design",
    label: "UI/UX & Design",
    icon: "https://api.iconify.design/mdi:palette.svg",
  },
  {
    id: "CMS",
    label: "CMS",
    icon: "https://api.iconify.design/mdi:file-document-edit.svg",
  },
  {
    id: "Ecommerce",
    label: "E-Commerce",
    icon: "https://api.iconify.design/mdi:shopping.svg",
  },
  {
    id: "Payment",
    label: "Payment",
    icon: "https://api.iconify.design/mdi:credit-card-fast.svg",
  },
];

// ─── Global Styles ────────────────────────────────────────────
if (
  typeof document !== "undefined" &&
  !document.getElementById("__tech-cap-styles-v4")
) {
  const style = document.createElement("style");
  style.id = "__tech-cap-styles-v4";
  style.textContent = `
    .tc-hide-scrollbar::-webkit-scrollbar { display: none; }
    .tc-hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .tc-card {
      background: #ffffff;
      border: 1px solid #e8e8e8;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }
    .tc-card:hover {
      border-color: #c0c8e0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .tc-pill {
      border: 1px solid #e8e8e8;
      border-radius: 999px;
      background: #ffffff;
      color: #555;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .tc-pill:hover {
      border-color: #c0c8e0;
      background: #f5f7ff;
      color: #2563eb;
    }
    .tc-pill.active {
      background: #2563eb;
      border-color: #2563eb;
      color: #ffffff;
    }
    .tc-pill.active img {
      filter: brightness(0) invert(1);
    }
    .tc-pill:not(.active) img {
      filter: grayscale(1) opacity(0.6);
    }
    @keyframes tc-fade-in {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .tc-animate { animation: tc-fade-in 0.25s ease forwards; }
  `;
  document.head.appendChild(style);
}

// ─── Tech Card ────────────────────────────────────────────────
const TechCard = memo(function TechCard({ tech }) {
  return (
    <div className="tc-card">
      <div
        style={{
          width: "28px",
          height: "28px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={tech.icon}
          alt={tech.name}
          width={28}
          height={28}
          unoptimized
          className={`object-contain w-full h-full${tech.invert ? " dark:invert" : ""}`}
        />
      </div>
      <span
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#374151",
          lineHeight: 1.2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {tech.name}
      </span>
    </div>
  );
});

// ─── Category Pill ────────────────────────────────────────────
const CategoryPill = memo(function CategoryPill({ cat, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`tc-pill flex items-center gap-2 px-4 py-2${isActive ? " active" : ""}`}
    >
      <Image
        src={cat.icon}
        alt={cat.label}
        width={14}
        height={14}
        unoptimized
        style={{ display: "block", flexShrink: 0 }}
      />
      {cat.label}
    </button>
  );
});

// ─── Main Component ───────────────────────────────────────────
// Props:
//   technologies?: string[]  — list of tech names to show (service page).
//                              Omit or pass undefined to show all (home page).
//   title?: string           — section heading override
//   subtitle?: string        — section subheading override
export default function TechCapabilities({
  technologies: techFilter,
  title = "Our Technology Ecosystem",
  subtitle = "Powering scalable, high-performance solutions with modern frameworks and robust infrastructure.",
}) {
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Resolve which techs to display
  const displayTechs = useMemo(() => {
    if (!techFilter || techFilter.length === 0) return allTechnologies;
    return allTechnologies.filter((t) => techFilter.includes(t.name));
  }, [techFilter]);

  // Only show category tabs that have at least one tech in displayTechs
  const visibleCategories = useMemo(() => {
    const presentIds = new Set(displayTechs.flatMap((t) => t.category));
    return allCategories.filter((c) => c.id === "ALL" || presentIds.has(c.id));
  }, [displayTechs]);

  // Filter displayed techs by active category
  const filteredTechs = useMemo(() => {
    if (activeFilter === "ALL") return displayTechs;
    return displayTechs.filter((t) => t.category.includes(activeFilter));
  }, [displayTechs, activeFilter]);

  const handleFilterClick = useCallback((id) => {
    setActiveFilter(id);
  }, []);

  // Reset filter if active category disappears after prop change
  useEffect(() => {
    const ids = new Set(visibleCategories.map((c) => c.id));
    if (!ids.has(activeFilter)) setActiveFilter("ALL");
  }, [visibleCategories, activeFilter]);

  return (
    <section
      className="relative w-full min-h-screen py-16"
      style={{ background: "#f9fafb" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.2,
              marginBottom: "12px",
            }}
          >
            {title}
          </h2>
          <p style={{ fontSize: "16px", color: "#64748b", lineHeight: 1.7 }}>
            {subtitle}
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "52px",
            height: "3px",
            background: "#2563eb",
            borderRadius: "2px",
            margin: "0 auto 40px",
          }}
        />

        {/* Filter Pills */}
        <div
          className="tc-hide-scrollbar"
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "4px",
            marginBottom: "32px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {visibleCategories.map((cat) => (
            <CategoryPill
              key={cat.id}
              cat={cat}
              isActive={activeFilter === cat.id}
              onClick={() => handleFilterClick(cat.id)}
            />
          ))}
        </div>

        {/* Tech Grid */}
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
          style={{
            gap: "8px",
            minHeight: "360px",
            alignContent: "start",
          }}
        >
          {filteredTechs.map((tech, i) => (
            <div
              key={tech.name}
              className="tc-animate"
              style={{ animationDelay: `${Math.min(i * 15, 180)}ms` }}
            >
              <TechCard tech={tech} />
            </div>
          ))}
        </div>

        {/* Footer count */}
        <p
          style={{
            textAlign: "center",
            marginTop: "32px",
            fontSize: "13px",
            color: "#94a3b8",
          }}
        >
          Showing {filteredTechs.length} technolog
          {filteredTechs.length === 1 ? "y" : "ies"}
        </p>
      </div>
    </section>
  );
}
