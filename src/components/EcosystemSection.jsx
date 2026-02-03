"use client"; // Required for Framer Motion and interactivity in Next.js

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const EcosystemSection = () => {
  const platforms = [
    {
      name: "Alocodes",
      tagline: "Education & Upskilling",
      description:
        "Empowering the next generation of developers with hands-on coding expertise.",
      link: "https://www.alocodes.in/",
      color: "#2563eb",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
    {
      name: "GroundLens",
      tagline: "Media & Insights",
      description:
        "Delivering precise news and deep-dive analysis into real-world challenges.",
      link: "https://groundlens.com/",
      color: "#111827",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.5 8.5 0 0 1 7.6 10.6z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      name: "Momszyka",
      tagline: "Food Delivery",
      description:
        "Delivering the heartwarming essence of home-cooked meals straight to your doorstep.",
      link: "https://momszyka.in/",
      color: "#f97316",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-4">
            One Brand, <span className="text-blue-600">Multiple Impacts</span>
          </h1>
          <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">
            Integrated Ecosystem Overview
          </p>
        </motion.div>

        {/* The Grid with Moving Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: index === 0 ? -100 : index === 2 ? 100 : 0,
                y: index === 1 ? 50 : 0,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
                stiffness: 50,
              }}
              whileHover={{ y: -12 }}
              className="relative group bg-[#f8fafc] p-10 rounded-[2rem] border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner bg-white transition-transform group-hover:rotate-12"
                style={{ color: item.color }}
              >
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {item.name}
              </h3>
              <p className="text-xs font-black text-blue-500 mb-4 uppercase tracking-tighter italic">
                {item.tagline}
              </p>

              <p className="text-gray-500 leading-relaxed mb-10 flex-grow">
                {item.description}
              </p>

              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-bold text-gray-900 group-hover:text-blue-600 transition-colors"
              >
                Visit Site
                <span className="group-hover:translate-x-2 transition-transform duration-300">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
