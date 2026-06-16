"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const MarketingBanner = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      {/* ─────────────────────────────────────────────
          MOBILE ONLY LAYOUT (< 640px)
      ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:hidden mx-4 rounded-3xl overflow-hidden bg-white relative z-10 -mb-[1px]">
        <img
          src="/marketing_logo.jpeg"
          alt="Marketing Banner"
          className="w-full h-auto object-contain"
        />

        <div className="px-4 py-2 flex flex-col items-start w-full">
          <h1
            className="text-2xl font-extrabold leading-[1.10] text-gray-900 mb-4 mt-2"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Make Noise.
            <span className="text-[#0057B8]"> Build Trust.</span> <br />
            Grow Faster.
          </h1>

          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Boost your online presence, generate quality leads, and scale your
            business with data-driven digital marketing strategies tailored for
            modern brands.
          </p>

          <button
            className="group relative inline-flex justify-center items-center gap-2 bg-[#0057B8] hover:bg-[#0046A0] text-white font-semibold text-sm px-8 py-3 rounded-full shadow-md shadow-blue-200/60 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/60 active:scale-[0.97] w-full mb-3"
            onClick={() => setIsContactOpen(true)}
          >
            Grow Your Brand
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          TABLET ONLY LAYOUT (640px – 1023px)
          Same stacked pattern as mobile, scaled up
      ───────────────────────────────────────────── */}
      <div className="hidden sm:flex lg:hidden flex-col mx-6 rounded-3xl overflow-hidden bg-white relative z-10 -mb-[1px]">
        <img
          src="/marketing_logo.jpeg"
          alt="Marketing Banner"
          className="w-full h-auto object-contain"
        />

        <div className="px-6 py-4 flex flex-col items-start w-full">
          <h1
            className="text-3xl md:text-4xl font-extrabold leading-[1.10] text-gray-900 mb-5 mt-3"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Make Noise.
            <span className="text-[#0057B8]"> Build Trust.</span> <br />
            Grow Faster.
          </h1>

          <p className="text-base text-gray-600 leading-relaxed mb-5 max-w-lg">
            Boost your online presence, generate quality leads, and scale your
            business with data-driven digital marketing strategies tailored for
            modern brands.
          </p>

          <button
            className="group relative inline-flex justify-center items-center gap-2 bg-[#0057B8] hover:bg-[#0046A0] text-white font-semibold text-base px-10 py-3.5 rounded-full shadow-md shadow-blue-200/60 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/60 active:scale-[0.97] w-full mb-4"
            onClick={() => setIsContactOpen(true)}
          >
            Grow Your Brand
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          PC ONLY LAYOUT (1024px+)
      ───────────────────────────────────────────── */}
      <section
        className="hidden lg:block relative rounded-3xl mx-10 overflow-hidden px-7"
        style={{
          backgroundImage: "url('/marketing.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Added 'items-start' to force everything to align perfectly to the left edge */}
        <div className="relative z-10 flex flex-col justify-center items-start h-full px-12 lg:px-12 max-w-[50%] py-5 pt-6">
          {/* Kept the reduced top spacer for smaller height */}
          <div className="h-[12%] min-h-[46px]" />

          {/* Added 'self-start' to lock the logo to the far left edge */}
          <img
            src="/alomonx.png"
            alt="Brand Logo"
            className="h-14 w-auto object-contain mb-3 self-start"
          />

          <h1
            className="text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-gray-900 mb-4"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Make Noise. <span className="text-[#0057B8]">Build Trust.</span>{" "}
            Grow Faster.
          </h1>

          <p className="text-base text-gray-600 leading-relaxed max-w-md mb-6">
            Boost your online presence, generate quality leads, and scale your
            business with data-driven digital marketing strategies tailored for
            modern brands.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              className="group relative inline-flex items-center gap-2 bg-[#0057B8] hover:bg-[#0046A0] text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-md shadow-blue-200/60 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/60 active:scale-[0.97]"
              onClick={() => setIsContactOpen(true)}
            >
              Grow Your Brand
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          <div className="h-[4%] min-h-[16px]" />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          Modal Overlay for Contact Form
      ───────────────────────────────────────────── */}
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
};

export default MarketingBanner;
