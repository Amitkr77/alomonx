"use client";
import { useState, useMemo } from "react";
import Image from "next/image";

// ─── Master tech registry (icons + category membership) ───────────────────────
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

  //AI

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
    name: "Cloud Infrastructure",
    icon: "https://api.iconify.design/mdi:cloud-outline.svg",
    category: ["AI", "DevOps"],
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
];

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
  CMS: "border-orange-600 text-orange-700 bg-orange-50 shadow-[0_0_18px_rgba(234,88,12,0.18)]",
  Ecommerce:
    "border-amber-600 text-amber-700 bg-amber-50 shadow-[0_0_18px_rgba(217,119,6,0.18)]",
  Payment:
    "border-teal-600 text-teal-700 bg-teal-50 shadow-[0_0_18px_rgba(13,148,136,0.18)]",
};

export default function Technologies({ technologies = [] }) {
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Memoize the filtering logic so it only runs on initial render or if 'technologies' prop changes
  const serviceTechs = useMemo(() => {
    return allTechnologies.filter((t) => technologies.includes(t.name));
  }, [technologies]);

  const visibleCategories = useMemo(() => {
    const presentCategoryIds = new Set(serviceTechs.flatMap((t) => t.category));
    return allCategories.filter(
      (c) => c.id === "ALL" || presentCategoryIds.has(c.id),
    );
  }, [serviceTechs]);

  return (
    <div className="relative overflow-hidden w-full bg-[#ebeff3] py-8 font-sans">
      <div className="relative z-10 space-y-8">
        {/* Heading */}
        <div className="flex flex-col items-center max-w-4xl mx-auto text-center px-4">
          <h2 className="mb-4 text-4xl md:text-5xl font-bold text-foreground">
            Technologies We Use
          </h2>
          <p className="text-lg text-muted-foreground font-bold max-w-2xl">
            Leveraging industry-leading frameworks and tools to build robust,
            scalable solutions for this service.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 mt-8 px-4">
          {/* Sidebar — only categories present in this service */}
          <div className="w-full lg:col-span-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 items-start gap-3 h-max">
            {visibleCategories.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 border
                    ${
                      isActive
                        ? activeStyles[cat.id]
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
                    }`}
                >
                  <div
                    className={`p-1.5 rounded-full transition-colors duration-300 ${isActive ? "bg-white shadow-sm" : "bg-slate-100"}`}
                  >
                    <Image
                      alt={cat.label}
                      src={cat.icon}
                      width={18}
                      height={18}
                      unoptimized // Bypasses Next.js server image optimization for external SVGs
                      className={`object-contain transition-all duration-300 ${isActive ? "opacity-100" : "opacity-60"}`}
                    />
                  </div>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tech grid */}
          <div className="w-full lg:col-span-4">
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pb-5">
              {serviceTechs.map((tech, index) => {
                const isMatch =
                  activeFilter === "ALL" ||
                  tech.category.includes(activeFilter);
                return (
                  <div
                    key={`${tech.name}-${index}`}
                    className={`relative flex items-center gap-3 py-3 px-4 rounded-2xl border transition-all duration-500 ease-out
                      ${
                        isMatch
                          ? "opacity-100 bg-white border-slate-300 shadow-[0_10px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_14px_35px_rgba(37,99,235,0.12)] hover:-translate-y-1.5 hover:border-blue-400 cursor-pointer z-10"
                          : "opacity-100 bg-[#e8ecf0] border-slate-200 pointer-events-none grayscale-[35%] scale-[0.98] z-0"
                      }`}
                  >
                    <div className="w-9 h-9 flex items-center justify-center shrink-0 relative">
                      <Image
                        alt={tech.name}
                        src={tech.icon}
                        width={34}
                        height={34}
                        unoptimized // Bypasses Next.js server image optimization for external SVGs
                        className={`object-contain transition-all duration-500 ${tech.invert ? "dark:invert" : ""}`}
                      />
                    </div>
                    <span
                      className={`text-[13px] font-bold transition-colors duration-500 ${isMatch ? "text-slate-800" : "text-slate-400"}`}
                    >
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
