"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function Banner({ details }) {
  const [isContactOpen, setIsContactOpen] = useState(false); // Modal state added

  // Safety check: Don't render if data hasn't loaded yet
  if (!details) return null;

  return (
    <>
      <div className="p-9">
        <header
          className="relative flex w-full min-h-[420px] items-center justify-start bg-cover bg-center bg-no-repeat px-4 md:px-[3%] rounded-3xl overflow-hidden"
          style={{ backgroundImage: `url('${details.bannerImage}')` }}
        >
          {/* Text Container 
          - Mobile: Centered, blurred dark background for readability 
          - Desktop: Left-aligned, transparent background, max-width to avoid covering the doctor
        */}
          <div className="z-10 w-full max-w-full rounded-2xl p-4 backdrop-blur-md md:max-w-[65%] md:bg-transparent md:p-0 md:text-left md:backdrop-blur-none lg:max-w-[45%]">
            <h1 className="mb-2 text-2xl font-bold leading-tight text-white drop-shadow-md md:text-3xl lg:text-[2.25rem]">
              {details.title}
            </h1>

            {/* Added mb-6 here to create a gap before the button */}
            <p className="mb-6 text-base leading-relaxed text-[#ffffff] md:text-lg lg:text-[1.0rem]">
              {details.description}
            </p>

            <button
              onClick={() => setIsContactOpen(true)}
              className="inline-block rounded-full bg-white px-8 py-4 text-base font-semibold text-blue-900 shadow-md transition-all duration-300 hover:bg-blue-50 hover:-translate-y-1 hover:shadow-lg md:text-lg"
            >
              Start a conversation
            </button>
          </div>
        </header>
      </div>

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
