"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// ─── Carousel images (replace src with real assets) ───────────────────────────
const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=900&q=80",
    alt: "Team collaboration",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
    alt: "Digital product design",
  },
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80",
    alt: "Strategy session",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80",
    alt: "Engineering team",
  },
];

const STATS = [
  { value: "100+", label: "Happy Clients" },
  { value: "250+", label: "Projects Created" },
  { value: "2y", label: "Years in Business" },
  { value: "25", label: "Team Members" },
];

// Country codes for phone prefix
const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+61", flag: "🇦🇺" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+65", flag: "🇸🇬" },
];

// ─── Left Panel – Carousel + Stats ───────────────────────────────────────────
function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    // RESPONSIVE: Adjusted heights so it doesn't take over the whole mobile screen
    <div className="relative w-full h-[400px] sm:h-[450px] lg:h-full lg:min-h-[520px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={SLIDES[current].src}
          alt={SLIDES[current].alt}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050810]/30 to-transparent" />

      {/* Heading overlay */}
      <div className="absolute top-0 left-0 right-0 p-5 md:p-7">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-3"
        >
          <Image
            src="/alomonx_white.png"
            alt="Alomonx Technology"
            width={180}
            height={46}
            className="h-8 md:h-10 w-auto object-contain"
            priority
          />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl font-bold text-white leading-snug"
        >
          Ready to Build Your
          <br />
          <span className="bg-gradient-to-r from-blue-900 to-sky-700 bg-clip-text text-transparent">
            Next Digital Product?
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-xs md:text-sm text-white/60 max-w-xs font-bold"
        >
          Collaborate with a globally recognized, award-winning development
          team.
        </motion.p>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        {/* RESPONSIVE: 2 cols on mobile, 4 on md screens */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center text-center p-2 md:p-2.5 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10"
            >
              <span className="text-base md:text-lg font-bold bg-gradient-to-r from-blue-900 to-sky-700 bg-clip-text text-transparent leading-none">
                {stat.value}
              </span>
              <span className="mt-1 text-[10px] font-medium text-white/55 leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-violet-400" : "w-1.5 bg-white/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={next}
              className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Right Panel – Contact Form ───────────────────────────────────────────────
function ContactFormPanel() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (e) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (
      !values.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    )
      e.email = "Valid email is required";
    if (!values.phone.trim()) e.phone = "Contact number is required";
    if (!values.message.trim()) e.message = "Please describe your project";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/sheet/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: `${values.countryCode} ${values.phone}`,
          message: values.message,
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        setValues({
          name: "",
          email: "",
          countryCode: "+91",
          phone: "",
          message: "",
        });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        const { message } = await response.json();
        setErrors({ api: message || "Failed to send. Please try again." });
      }
    } catch {
      setErrors({ api: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-violet-500/60 focus:bg-white/[0.08] transition-all duration-200";
  const errClass = "border-red-500/60 focus:border-red-500/80";

  return (
    <div className="relative h-full flex flex-col justify-center w-full">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {/* Header */}
            <div className="mb-6 md:mb-7">
              <p className="text-xs font-semibold tracking-[0.18em] text-blue-900 uppercase mb-2">
                Get in Touch
              </p>
              <h3 className="text-xl font-bold text-white">
                Share a few details about your idea
              </h3>
              <p className="mt-1.5 text-sm text-white/45">
                Our team will come back with technical insights, timelines, and
                next steps.
              </p>
            </div>

            {/* Row 1: Name + Email (RESPONSIVE: Stack on small phones, side-by-side on sm+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <input
                  placeholder="Name *"
                  value={values.name}
                  onChange={set("name")}
                  className={`${inputBase} ${errors.name ? errClass : ""}`}
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1 ml-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <input
                  placeholder="Email *"
                  type="email"
                  value={values.email}
                  onChange={set("email")}
                  className={`${inputBase} ${errors.email ? errClass : ""}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1 ml-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Phone */}
            <div className="mb-3">
              <div
                className={`flex rounded-xl border overflow-hidden transition-all duration-200 ${errors.phone ? "border-red-500/60" : "border-white/10 focus-within:border-violet-500/60"}`}
              >
                <select
                  value={values.countryCode}
                  onChange={set("countryCode")}
                  className="bg-white/[0.08] text-white/80 text-sm px-3 py-3 outline-none border-r border-white/10 cursor-pointer w-24 md:w-auto"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option
                      key={c.code}
                      value={c.code}
                      className="bg-[#0d1117] text-white"
                    >
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  placeholder="Contact Number *"
                  type="tel"
                  value={values.phone}
                  onChange={set("phone")}
                  className="flex-1 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none w-full"
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-400 mt-1 ml-1">{errors.phone}</p>
              )}
            </div>

            {/* Describe project */}
            <div className="mb-5">
              <textarea
                placeholder="Describe your project (Help us come back better prepared)"
                value={values.message}
                onChange={set("message")}
                rows={4}
                className={`${inputBase} resize-none ${errors.message ? errClass : ""}`}
              />
              {errors.message && (
                <p className="text-xs text-red-400 mt-1 ml-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* API error */}
            {errors.api && (
              <p className="text-xs text-red-400 mb-3">{errors.api}</p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full relative overflow-hidden rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-60 group cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, #112E81 0%, #112E81 50%, #112E81 100%)",
              }}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                "Submit"
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-12 md:py-16"
          >
            <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="h-8 w-8 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Message Received!
            </h3>
            <p className="text-sm text-white/50 px-4">
              We'll reach out within 2 minutes with technical insights and next
              steps.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────
export default function ContactForm() {
  return (
    <div
      className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[60%_40%] gap-0 rounded-2xl overflow-hidden bg-black"
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.1), 0 32px 80px rgba(0,0,0,0.6)",
      }}
    >
      {/* Left – Carousel */}
      <div className="relative">
        <ImageCarousel />
      </div>

      {/* Right – Form */}
      <div
        // RESPONSIVE: Tailwind borders handle stack vs side-by-side gracefully
        className="relative p-6 sm:p-8 lg:p-12 bg-black border-t lg:border-t-0 lg:border-l border-white/10"
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          }}
        />
        <ContactFormPanel />
      </div>
    </div>
  );
}
