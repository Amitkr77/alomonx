"use client";
import React from "react";
import {
  Code2,
  PenTool,
  TrendingUp,
  LayoutTemplate,
  ShoppingCart,
  SearchCheck,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
const services = [
  {
    id: 1,
    title: "Web Development",
    description:
      "We create fast, secure, and scalable web applications using modern tools like React, Next.js, and TypeScript. Our solutions are crafted to deliver exceptional performance and seamless user experiences across all devices.",
    badgeColor: "cyan-500",
    slug: "web-development",
    Icon: Code2,
  },
  {
    id: 2,
    title: "UI/UX Design",
    description:
      "Our design team delivers intuitive, human-centered interfaces that blend aesthetics with functionality, ensuring engaging and accessible user experiences that drive retention and conversions.",
    badgeColor: "purple-500",
    slug: "ui-ux-design",
    Icon: PenTool,
  },
  {
    id: 3,
    title: "Digital Marketing",
    description:
      "Amplify your brand with data-driven strategies, including SEO, social media campaigns, and targeted ads, designed to boost visibility and maximize ROI.",
    badgeColor: "emerald-500",
    slug: "digital-marketing",
    Icon: TrendingUp,
  },
  {
    id: 4,
    title: "WordPress Development",
    description:
      "Custom WordPress solutions with tailored themes and plugins, optimized for speed, security, and SEO to empower your content management.",
    badgeColor: "amber-500",
    slug: "wordpress-development",
    Icon: LayoutTemplate,
  },
  {
    id: 5,
    title: "Ecommerce Development",
    description:
      "Build robust online stores with secure payment systems, intuitive navigation, and scalable architecture to elevate your e-commerce success.",
    badgeColor: "rose-500",
    slug: "ecommerce-development",
    Icon: ShoppingCart,
  },
  {
    id: 6,
    title: "SEO Optimization",
    description:
      "Enhance your website’s ranking with comprehensive SEO strategies, including technical audits, keyword optimization, and content enhancements.",
    badgeColor: "indigo-500",
    slug: "seo-optimization",
    Icon: SearchCheck,
  },
];

const ServicesPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-900 font-sans">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="pt-24 pb-16 px-4 sm:px-8 lg:px-12"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-4">
            Transform Your Digital Future
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Unleash your brand’s potential with our innovative, technology-driven services. We blend creativity and precision to deliver solutions that inspire and perform.
          </p>
          <Button
            size="lg"
            className="bg-cyan-500 text-white font-medium px-8 py-3 rounded-full hover:bg-cyan-600 transition shadow-md"
          >
            Start Now
          </Button>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-16 px-4 sm:px-8 lg:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-light text-center mb-12"
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="relative bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative flex items-center mb-4">
                  <service.Icon className={`w-7 h-7 text-${service.badgeColor} mr-3`} />
                  <h3 className="text-lg font-medium">{service.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{service.description}</p>
                <Link href={`/services/${service.slug}`}>
                  <Button
                    variant="outline"
                    className={`w-full border-${service.badgeColor} text-${service.badgeColor} hover:bg-${service.badgeColor} hover:text-white transition rounded-full text-sm py-2`}
                  >
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Us Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="py-16 px-4 sm:px-8 lg:px-12 bg-white"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Expertise", desc: "Industry-leading professionals delivering top-tier solutions." },
              { title: "Innovation", desc: "Cutting-edge technology for forward-thinking results." },
              { title: "Trust", desc: "Proven success with a client-first approach." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                className="p-4"
              >
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="py-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-r from-cyan-50 to-blue-50"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-6">Let’s Build Your Vision</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Partner with us to create impactful, technology-driven solutions tailored to your goals.
          </p>
          <Button
            size="lg"
            className="bg-cyan-500 text-white font-medium px-8 py-3 rounded-full hover:bg-cyan-600 transition shadow-md"
          >
            Contact Us
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default ServicesPage;