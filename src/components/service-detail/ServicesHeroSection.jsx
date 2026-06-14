"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesHeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* ── Full-screen background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2400&q=80"
          alt="Services hero background"
          fill
          priority // CRITICAL: Preloads this image for the fastest LCP
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />
        {/* Optimized single-layer overlay instead of 5 separate divs */}
        <div className="absolute inset-0 bg-[#010716]/60 [mask-image:radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
        >
          Everything Your{" "}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
              Business Needs
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
              className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-teal-400 to-cyan-300 origin-left"
            />
          </span>
          <br />
          to Grow Online
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
          className="max-w-2xl text-lg sm:text-xl text-gray-300 leading-relaxed"
        >
          From custom software and mobile apps to UI/UX design, SharePoint
          solutions, and digital marketing — we build end-to-end digital
          experiences that scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          <Link href="/contact">
            <button className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm tracking-wide transition-all duration-300">
              Schedule Free Consultation
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
          <button
            onClick={() =>
              document
                .querySelector("#services-grid")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-sm tracking-wide transition-all duration-300"
          >
            Browse Services
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] text-gray-500 uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
