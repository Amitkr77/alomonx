"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "@/components/ContactForm";

// Icons moved outside component to prevent re-creation on re-renders
const IconAutomation = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-3.5 h-3.5 md:w-4 md:h-4 text-white"
  >
    <path
      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeDasharray="4 4"
    />
    <path
      d="M12 8V16M8 12H16"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const IconGenAI = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-4 h-4 md:w-5 md:h-5 text-white"
  >
    <path
      d="M4 19L10 13L14 17L20 11M20 11V15M20 11H16"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCustomAI = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-3.5 h-3.5 md:w-4 md:h-4 text-white"
  >
    <path
      d="M4 7C4 8.65685 7.58172 10 12 10C16.4183 10 20 8.65685 20 7M4 7C4 5.34315 7.58172 4 12 4C16.4183 4 20 5.34315 20 7M4 7V17C4 18.6569 7.58172 20 12 20C16.4183 20 20 18.6569 20 17V7M4 12C4 13.6569 7.58172 15 12 15C16.4183 15 20 13.6569 20 12"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const cardsData = [
  {
    title: "AI Automation & Intelligent Agents",
    icon: <IconAutomation />,
    items: [
      "AI Chatbots & Virtual Assistants",
      "Business Process Automation",
      "Custom AI Agents & Voice Assistants",
    ],
  },
  {
    title: "Generative AI & Business Intelligence",
    icon: <IconGenAI />,
    items: [
      "Generative AI Applications",
      "Knowledge & Search Systems",
      "Predictive Business Intelligence",
    ],
  },
  {
    title: "Custom AI & Machine Learning Solutions",
    icon: <IconCustomAI />,
    items: [
      "Custom ML Models & Predictive Intelligence",
      "Computer Vision & NLP Solutions",
      "Industry-Specific AI Products",
    ],
  },
];

// ─── Fires custom event → Header opens "Alomonx AI" mega menu ────────────────
function openAlomonxAIMenu() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent("open-alomonx-ai-menu"));
  }, 400);
}

export default function AlomonxAISection() {
  const [isContactOpen, setIsContactOpen] = useState(false); // Added state for modal

  return (
    <>
      <section className="py-10 md:py-16 px-4 md:px-10 lg:px-16 w-full border-y border-white/[0.04]">
        <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-stretch">
          {/* Left Section - Video */}
          <div className="w-full lg:w-1/2 relative flex flex-col min-h-[250px] md:min-h-[400px] lg:min-h-0">
            <div className="relative w-full h-full flex-grow rounded-2xl md:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.08] shadow-2xl">
              <video
                src="/ai_section_clip_5.mp4"
                poster="/images/hero_2.jpeg"
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8 py-2 md:py-3">
            <div className="flex flex-col gap-3 md:gap-4">
              <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight m-0">
                Meet The AI Workforce <br className="hidden md:block" />
                <span className="text-[#888888]">Behind Modern Business</span>
              </h2>
              <p className="text-[#a1a1aa] text-base md:text-xl font-normal leading-relaxed max-w-xl">
                Deploy intelligent systems that automate operations, accelerate
                decisions, and unlock growth at scale.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {cardsData.map((card, index) => (
                <div
                  key={index}
                  className="group flex flex-col gap-2 md:gap-4 bg-[#0f0f11] p-4 rounded-xl md:rounded-2xl border border-white/[0.06] hover:border-white/[0.15] transition-all duration-300"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 flex justify-center items-center rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-white text-sm md:text-base font-medium tracking-wide mb-2">
                      {card.title}
                    </h3>
                    <ul className="text-[#888888] text-xs md:text-sm space-y-1">
                      {card.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 mt-auto">
              {/* Added onClick handler to open modal */}
              <button
                onClick={() => setIsContactOpen(true)}
                className="bg-white text-black px-8 py-3 rounded-full font-medium text-sm md:text-base hover:bg-gray-200 transition-colors"
              >
                Book Advisory Session
              </button>
              {/* Opens the "Alomonx AI" mega menu in the navbar */}
              <button
                type="button"
                onClick={openAlomonxAIMenu}
                className="group flex items-center justify-center gap-2 border border-white/[0.15] text-white px-8 py-3 rounded-full font-medium text-sm md:text-base hover:bg-white/[0.05] transition-colors"
              >
                Discover Alomonx AI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Overlay for Contact Form */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto custom-scrollbar rounded-2xl shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-white transition-colors"
                aria-label="Close Contact Form"
              >
                <X className="w-5 h-5" />
              </button>

              <ContactForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}