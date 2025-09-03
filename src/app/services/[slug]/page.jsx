"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  PenTool,
  TrendingUp,
  LayoutTemplate,
  ShoppingCart,
  SearchCheck,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Web Development",
    slug: "web-development",
    description:
      "Scalable, high-performance websites and applications tailored to your business.",
    Icon: Code2,
    details: {
      overview:
        "We craft custom websites and applications using cutting-edge technologies like React, Next.js, and Node.js. Our solutions prioritize speed, scalability, and security to drive your business forward.",
      features: [
        "Custom development with modern frameworks",
        "Responsive, cross-device compatibility",
        "API integrations and microservices",
        "Performance optimization and caching",
      ],
      benefits: [
        "Boosted user engagement with fast load times",
        "Scalable solutions for growing businesses",
        "Secure architecture to protect sensitive data",
        "Continuous support and updates",
      ],
      process: [
        {
          title: "Discovery & Planning",
          description: "We analyze your needs and define a roadmap.",
        },
        {
          title: "Prototyping",
          description: "Wireframes and prototypes to visualize the solution.",
        },
        {
          title: "Development",
          description: "Building robust, scalable code with rigorous testing.",
        },
        {
          title: "Launch & Support",
          description: "Deployment with ongoing maintenance.",
        },
      ],
      stats: [
        { label: "Projects Completed", value: "200+" },
        { label: "Client Satisfaction", value: "98%" },
        { label: "Avg. Load Time", value: "<1s" },
      ],
      testimonial: {
        quote:
          "Their expertise in web development transformed our online presence, delivering a site that’s both fast and user-friendly.",
        author: "Alex Carter, CTO of FutureTech",
      },
    },
  },
  {
    id: 2,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Intuitive, user-centered designs that captivate and convert.",
    Icon: PenTool,
    details: {
      overview:
        "Our UI/UX design services create visually stunning and user-friendly interfaces that prioritize usability and engagement, crafted through research and iterative testing.",
      features: [
        "User research and persona creation",
        "Interactive prototypes with Figma",
        "High-fidelity UI designs",
        "Accessibility and usability testing",
      ],
      benefits: [
        "Higher user retention and satisfaction",
        "Consistent brand identity",
        "Optimized conversion funnels",
        "Inclusive, accessible designs",
      ],
      process: [
        {
          title: "Research",
          description: "Understanding users and their needs.",
        },
        {
          title: "Wireframing",
          description: "Creating blueprints for intuitive layouts.",
        },
        {
          title: "Design & Testing",
          description: "Crafting and refining high-fidelity designs.",
        },
        {
          title: "Handoff",
          description: "Delivering assets for seamless development.",
        },
      ],
      stats: [
        { label: "Designs Created", value: "150+" },
        { label: "User Retention Boost", value: "40%" },
        { label: "Avg. Design Time", value: "2wks" },
      ],
      testimonial: {
        quote:
          "The UI/UX team delivered a design that made our app intuitive and visually stunning.",
        author: "Lisa Wong, Product Lead at DesignCo",
      },
    },
  },
  {
    id: 3,
    title: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "Data-driven strategies to amplify your brand’s reach and impact.",
    Icon: TrendingUp,
    details: {
      overview:
        "Our digital marketing services leverage targeted campaigns, SEO, and analytics to boost your brand’s visibility and drive measurable results across platforms.",
      features: [
        "Social media strategy and management",
        "Content creation and marketing",
        "PPC and ad optimization",
        "Analytics and performance tracking",
      ],
      benefits: [
        "Increased brand awareness",
        "Higher ROI on marketing spend",
        "Engaged, loyal audiences",
        "Actionable insights from data",
      ],
      process: [
        {
          title: "Audience Analysis",
          description: "Identifying your target market.",
        },
        {
          title: "Strategy Planning",
          description: "Crafting tailored campaign plans.",
        },
        {
          title: "Execution",
          description: "Launching campaigns across channels.",
        },
        {
          title: "Optimization",
          description: "Refining based on performance data.",
        },
      ],
      stats: [
        { label: "Campaigns Launched", value: "300+" },
        { label: "Avg. ROI Increase", value: "35%" },
        { label: "Engagement Rate", value: "20%" },
      ],
      testimonial: {
        quote:
          "Their marketing strategies tripled our online engagement in just three months!",
        author: "Emma Davis, CMO at BrandBoost",
      },
    },
  },
  {
    id: 4,
    title: "WordPress Development",
    slug: "wordpress-development",
    description: "Custom WordPress solutions for seamless content management.",
    Icon: LayoutTemplate,
    details: {
      overview:
        "We deliver tailored WordPress websites with custom themes and plugins, optimized for performance, security, and ease of use, perfect for businesses and blogs.",
      features: [
        "Custom theme development",
        "Plugin creation and customization",
        "WooCommerce store setup",
        "SEO and speed optimization",
      ],
      benefits: [
        "Easy-to-manage CMS",
        "Scalable for future growth",
        "Secure and reliable websites",
        "SEO-ready structure",
      ],
      process: [
        {
          title: "Planning",
          description: "Defining goals and technical requirements.",
        },
        { title: "Development", description: "Building themes and plugins." },
        {
          title: "Testing",
          description: "Ensuring functionality and performance.",
        },
        { title: "Launch", description: "Deploying with ongoing support." },
      ],
      stats: [
        { label: "Sites Built", value: "180+" },
        { label: "Security Rating", value: "99%" },
        { label: "Avg. Uptime", value: "99.9%" },
      ],
      testimonial: {
        quote:
          "Our WordPress site is now a breeze to manage and performs flawlessly.",
        author: "Tom Harris, Founder of ContentHub",
      },
    },
  },
  {
    id: 5,
    title: "Ecommerce Development",
    slug: "ecommerce-development",
    description: "Robust online stores with secure, user-friendly features.",
    Icon: ShoppingCart,
    details: {
      overview:
        "We build powerful ecommerce platforms with Shopify, WooCommerce, or custom solutions, ensuring seamless shopping experiences and secure transactions.",
      features: [
        "Custom ecommerce platforms",
        "Secure payment gateways",
        "Inventory and order management",
        "Mobile-optimized stores",
      ],
      benefits: [
        "Increased sales conversions",
        "Scalable product catalogs",
        "Secure customer data",
        "Integrated analytics",
      ],
      process: [
        {
          title: "Business Analysis",
          description: "Understanding your ecommerce needs.",
        },
        {
          title: "Design & Build",
          description: "Creating a user-friendly store.",
        },
        { title: "Testing", description: "Ensuring seamless functionality." },
        {
          title: "Launch & Scale",
          description: "Deploying and supporting growth.",
        },
      ],
      stats: [
        { label: "Stores Launched", value: "120+" },
        { label: "Conversion Rate Boost", value: "25%" },
        { label: "Transaction Security", value: "100%" },
      ],
      testimonial: {
        quote:
          "Our ecommerce store now converts better than ever, thanks to their expertise.",
        author: "Rachel Lee, Owner of ShopVibe",
      },
    },
  },
  {
    id: 6,
    title: "SEO Optimization",
    slug: "seo-optimization",
    description: "Boost your website’s ranking and organic traffic.",
    Icon: SearchCheck,
    details: {
      overview:
        "Our SEO services enhance your website’s visibility through on-page, off-page, and technical optimization, driving organic traffic and improving rankings.",
      features: [
        "Keyword research and strategy",
        "On-page and off-page SEO",
        "Technical SEO audits",
        "Link building and content optimization",
      ],
      benefits: [
        "Top search engine rankings",
        "Increased organic traffic",
        "Better user engagement",
        "Sustainable growth",
      ],
      process: [
        {
          title: "SEO Audit",
          description: "Analyzing your site’s performance.",
        },
        { title: "Strategy", description: "Developing a tailored SEO plan." },
        {
          title: "Implementation",
          description: "Optimizing content and technicals.",
        },
        { title: "Reporting", description: "Tracking and refining results." },
      ],
      stats: [
        { label: "Sites Optimized", value: "250+" },
        { label: "Traffic Increase", value: "50%" },
        { label: "First Page Rankings", value: "85%" },
      ],
      testimonial: {
        quote:
          "Our site now ranks on Google’s first page, driving incredible traffic growth.",
        author: "Mark Chen, SEO Manager at RankUp",
      },
    },
  },
  {
    id: 7,
    title: "SEO Mastery",
    slug: "seo-mastery",
    description: "Comprehensive SEO strategies that dominate search rankings.",
    Icon: SearchCheck, // You can customize this if needed
    details: {
      overview:
        "We implement advanced SEO tactics, combining on-page, off-page, and content optimization to achieve long-term visibility and authority in your industry.",
      features: [
        "Advanced keyword mapping",
        "Competitor and market analysis",
        "Structured data and schema markup",
        "Ongoing SEO monitoring and adjustments",
      ],
      benefits: [
        "Sustained growth in organic traffic",
        "Improved domain authority",
        "Enhanced visibility across search engines",
        "Better-qualified leads",
      ],
      process: [
        {
          title: "Audit & Strategy",
          description: "In-depth SEO audit and roadmap creation.",
        },
        {
          title: "Optimization",
          description: "Technical and content updates for better ranking.",
        },
        {
          title: "Authority Building",
          description: "Link-building and trust signals enhancement.",
        },
        {
          title: "Continuous Improvement",
          description: "Ongoing tweaks and tracking.",
        },
      ],
      stats: [
        { label: "Traffic Growth", value: "60%" },
        { label: "Keyword Ranking Improvement", value: "90%" },
        { label: "Bounce Rate Decrease", value: "30%" },
      ],
      testimonial: {
        quote:
          "They took our SEO to the next level. We now rank higher across all major keywords.",
        author: "Derek Moore, Head of Digital at SearchFlow",
      },
    },
  },
  {
    id: 8,
    title: "Ad Campaigns",
    slug: "ad-campaigns",
    description: "ROI-focused advertising across Google, Meta, and more.",
    Icon: TrendingUp,
    details: {
      overview:
        "We design and manage high-performing ad campaigns across platforms like Google Ads, Facebook, Instagram, and LinkedIn to drive targeted traffic and conversions.",
      features: [
        "Google and Meta ad expertise",
        "A/B testing and conversion tracking",
        "Dynamic ad creatives",
        "Budget management and scaling",
      ],
      benefits: [
        "Higher ROI through targeted ads",
        "Improved conversion rates",
        "Real-time performance tracking",
        "Scalable ad strategies",
      ],
      process: [
        {
          title: "Audience Research",
          description: "Identifying the right target segments.",
        },
        {
          title: "Campaign Setup",
          description: "Building creatives, copy, and targeting.",
        },
        {
          title: "Optimization",
          description: "Real-time testing and refinement.",
        },
        {
          title: "Reporting",
          description: "Detailed performance insights and suggestions.",
        },
      ],
      stats: [
        { label: "Ad Spend Managed", value: "$1.2M+" },
        { label: "Avg. ROAS", value: "4.5x" },
        { label: "Conversion Rate Increase", value: "28%" },
      ],
      testimonial: {
        quote:
          "Their ad campaigns brought in more qualified leads than ever before.",
        author: "Sandra Liu, Marketing Director at LeadEdge",
      },
    },
  },
  {
    id: 9,
    title: "Content Strategy",
    slug: "content-strategy",
    description: "Content that connects, converts, and builds authority.",
    Icon: PenTool,
    details: {
      overview:
        "We help brands craft compelling content strategies that engage users and support SEO, social media, and sales funnels.",
      features: [
        "Content calendars and planning",
        "SEO-driven content writing",
        "Blog, video, and email campaigns",
        "Tone and voice development",
      ],
      benefits: [
        "Improved brand storytelling",
        "Better audience engagement",
        "SEO content that ranks",
        "Multi-platform consistency",
      ],
      process: [
        {
          title: "Discovery",
          description: "Understanding brand goals and voice.",
        },
        {
          title: "Planning",
          description: "Building content calendars and asset plans.",
        },
        {
          title: "Creation",
          description: "Writing and producing impactful content.",
        },
        { title: "Distribution", description: "Publishing across platforms." },
      ],
      stats: [
        { label: "Pieces Published", value: "1,000+" },
        { label: "Avg. Engagement Increase", value: "45%" },
        { label: "Lead Generation Boost", value: "30%" },
      ],
      testimonial: {
        quote:
          "Their content strategy elevated our brand voice and drove consistent traffic.",
        author: "Carlos Bennett, CEO at BrandNest",
      },
    },
  },
  {
    id: 10,
    title: "Real-Time Insights",
    slug: "real-time-insights",
    description: "Live analytics to guide smarter business decisions.",
    Icon: LayoutTemplate,
    details: {
      overview:
        "Gain instant access to your business data with real-time dashboards that track performance, user behavior, and KPIs across all platforms.",
      features: [
        "Live dashboards and analytics",
        "Custom event tracking",
        "Cross-platform data aggregation",
        "Alert systems for key metrics",
      ],
      benefits: [
        "Faster, data-driven decisions",
        "Increased operational efficiency",
        "Custom metrics tailored to your goals",
        "Proactive issue resolution",
      ],
      process: [
        {
          title: "Data Mapping",
          description: "Identifying data sources and metrics.",
        },
        {
          title: "Implementation",
          description: "Integrating tools and dashboards.",
        },
        {
          title: "Monitoring",
          description: "Real-time data display and alerts.",
        },
        {
          title: "Iteration",
          description: "Refining metrics and visuals over time.",
        },
      ],
      stats: [
        { label: "Dashboards Delivered", value: "75+" },
        { label: "Response Time Reduction", value: "50%" },
        { label: "Uptime Monitoring", value: "24/7" },
      ],
      testimonial: {
        quote:
          "We now act on data instantly instead of waiting for monthly reports.",
        author: "Ava Thompson, COO at OpsEdge",
      },
    },
  },
  {
    id: 11,
    title: "Data Dashboard",
    slug: "data-dashboard",
    description: "Custom dashboards for data clarity and team alignment.",
    Icon: Code2,
    details: {
      overview:
        "Our data dashboards give your teams a single source of truth, bringing together complex datasets into intuitive visualizations and reports.",
      features: [
        "Interactive data visualizations",
        "Role-based access control",
        "KPI and OKR tracking",
        "Integration with analytics platforms",
      ],
      benefits: [
        "Unified view of business performance",
        "Improved collaboration and focus",
        "Easy data interpretation for all teams",
        "Custom dashboards for every department",
      ],
      process: [
        {
          title: "Requirement Gathering",
          description: "Understanding data needs by team.",
        },
        {
          title: "Design & Build",
          description: "Creating intuitive visual layouts.",
        },
        { title: "Integration", description: "Connecting to data sources." },
        {
          title: "Training",
          description: "Enabling teams to use and adapt dashboards.",
        },
      ],
      stats: [
        { label: "Departments Onboarded", value: "15+" },
        { label: "Reporting Time Saved", value: "70%" },
        { label: "User Adoption Rate", value: "95%" },
      ],
      testimonial: {
        quote:
          "The dashboard transformed our reporting process and made metrics accessible to all.",
        author: "Nina Patel, Analytics Lead at DataDrive",
      },
    },
  },
];

const AccordionItem = ({ title, description, index, isOpen, toggle }) => (
  <div className="border-b border-gray-200">
    <button
      className="w-full flex justify-between items-center py-4 text-left"
      onClick={() => toggle(index)}
    >
      <span className="text-lg font-medium text-teal-600">
        {index + 1}. {title}
      </span>
      <ChevronDown
        className={`w-5 h-5 text-teal-600 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pb-4 text-gray-600"
        >
          {description}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowCTA(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!service) {
    return (
      <section className="py-12 md:py-20 bg-gray-100 text-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Service Not Found
          </h1>
          <p className="mt-3 text-gray-600">
            The service you’re looking for doesn’t exist.
          </p>
          <Link href="/services">
            <Button className="mt-6 bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-300">
              Back to Services
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  const { title, description, Icon, details } = service;

  return (
    <section className="relative bg-gray-100 text-gray-900 overflow-hidden">
      {/* Hero Section with Parallax Effect */}
      <div
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/service-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-coral-500/80"></div>
        <motion.div
          className="relative text-center z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="w-16 h-16 text-white mx-auto mb-4" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Overview (Spanning 3 columns) */}
          <motion.div
            className="md:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-teal-600">
              Overview
            </h2>
            <p className="text-gray-600 leading-relaxed">{details.overview}</p>
          </motion.div>

          {/* Stats (Spanning 2 columns) */}
          <motion.div
            className="md:col-span-2 bg-gradient-to-br from-teal-50 to-coral-50 rounded-2xl p-8 shadow-sm border border-gray-200"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-coral-600">
              Our Impact
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {details.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                >
                  <p className="text-3xl font-bold text-teal-600">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features (Spanning 2 columns) */}
          <motion.div
            className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-coral-600">
              Key Features
            </h2>
            <ul className="space-y-4">
              {details.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-3 h-3 bg-teal-500 rounded-full mt-2 mr-3" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Benefits (Spanning 3 columns) */}
          <motion.div
            className="md:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-teal-600">
              Benefits
            </h2>
            <ul className="space-y-4">
              {details.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-3 h-3 bg-coral-500 rounded-full mt-2 mr-3" />
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Process (Accordion, Spanning 5 columns) */}
          <motion.div
            className="md:col-span-5 bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-coral-600">
              Our Process
            </h2>
            {details.process.map((step, index) => (
              <AccordionItem
                key={index}
                index={index}
                title={step.title}
                description={step.description}
                isOpen={activeAccordion === index}
                toggle={() =>
                  setActiveAccordion(activeAccordion === index ? null : index)
                }
              />
            ))}
          </motion.div>

          {/* Testimonial (Spanning 5 columns) */}
          <motion.div
            className="md:col-span-5 bg-gradient-to-br from-teal-50 to-coral-50 rounded-2xl p-8 shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-teal-600">
              Client Testimonial
            </h2>
            <blockquote className="text-gray-600 italic text-lg">
              "{details.testimonial.quote}"
            </blockquote>
            <p className="mt-4 text-gray-800 font-medium">
              {details.testimonial.author}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating CTA Bar */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-4 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
              <p className="text-gray-600 font-medium">
                Ready to elevate your {title.toLowerCase()}?
              </p>
              <Link href="/contact">
                <Button className="bg-teal-600 text-white hover:bg-coral-600 transition-colors duration-300 rounded-full px-6">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServiceDetail;
