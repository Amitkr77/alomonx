"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, CheckCircle2, Clock, CalendarDays, User, Building2, Mail, IndianRupee, FileText, Sparkles } from "lucide-react";
import { enGB } from "date-fns/locale"; // <-- Fixes the hydration mismatch

// ── Import dynamic data ────────────────────────────────────────────────────────
import { allServices } from "@/lib/services-data";
import { allAiServices } from "@/lib/ai-services-data";

// ── Generate Project Types dynamically ─────────────────────────────────────────
const PROJECT_TYPES = [
  ...allServices.map((service) => ({
    group: "Development",
    label: service.label,
  })),
  ...allAiServices.map((service) => ({
    group: "AI Services",
    label: service.label,
  })),
  // Retaining standard generic options
  { group: "Other", label: "SEO & Digital Marketing" },
  { group: "Other", label: "UI/UX Design" },
  { group: "Other", label: "Maintenance & Support" },
  { group: "Other", label: "Not Sure Yet" },
];

const TIME_SLOTS = [
  "9:00 AM", "10:30 AM", "12:00 PM",
  "2:00 PM", "3:30 PM", "5:00 PM",
];

const TIME_ZONES = ["IST", "UTC", "EST", "CST", "MST", "PST", "CET"];

const TIMELINES = ["Less than 1 Month", "1–3 Months", "3–6 Months", "6+ Months"];

const BUDGETS = [
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "Above ₹5,00,000",
  "Not Sure",
];

// ── Animation variants ─────────────────────────────────────────────────────────
const slide = {
  hidden: { opacity: 0, x: 18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -14, transition: { duration: 0.2 } },
};

// ── Sub-components ─────────────────────────────────────────────────────────────
function GlassInput({ icon: Icon, error, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
      )}
      <input
        {...props}
        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:bg-white/8
          ${Icon ? "pl-10" : ""}
          ${error
            ? "border-red-500/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/30"
            : "border-white/10 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20"
          }`}
      />
      {error && <p className="text-xs text-red-400 mt-1.5 ml-1">{error}</p>}
    </div>
  );
}

function GlassSelect({ icon: Icon, error, placeholder, children, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
      )}
      <select
        {...props}
        className={`w-full appearance-none bg-white/5 border rounded-xl px-4 py-3 text-sm outline-none transition-all cursor-pointer
          ${Icon ? "pl-10" : ""}
          ${props.value ? "text-white" : "text-slate-500"}
          ${error
            ? "border-red-500/60 focus:border-red-400"
            : "border-white/10 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20"
          }`}
      >
        {placeholder && (
          <option value="" disabled className="bg-[#0d1117] text-slate-400">
            {placeholder}
          </option>
        )}
        {children}
      </select>
      {error && <p className="text-xs text-red-400 mt-1.5 ml-1">{error}</p>}
    </div>
  );
}

function StepDots({ current, total = 3 }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i + 1 === current ? 24 : 6,
            opacity: i + 1 <= current ? 1 : 0.25,
            backgroundColor: i + 1 < current ? "#7c3aed" : i + 1 === current ? "#a78bfa" : "#475569",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-1.5 rounded-full"
        />
      ))}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-3">
      {children}
    </p>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
const ConsultationCard = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState("IST");
  const [form, setForm] = useState({
    name: "", email: "", company: "",
    projectType: "", timeline: "", budget: "", notes: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.company.trim()) e.company = "Required";
    if (!form.projectType) e.projectType = "Select a project type";
    if (!form.timeline) e.timeline = "Select a timeline";
    if (!form.budget) e.budget = "Select a budget range";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await fetch("/api/sheet/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: date?.toLocaleDateString("en-GB"), // Standardize submission format
          time: selectedTime,
          timeZone: selectedTimeZone,
          ...form,
        }),
      });
      if (res.ok) {
        setStep(4);
        setErrors({});
      } else {
        const { message } = await res.json();
        setErrors({ submit: message || "Submission failed. Please try again." });
      }
    } catch {
      setErrors({ submit: "Network error. Please try again." });
    }
  };

  const reset = () => {
    setStep(1); setDate(null); setSelectedTime(null); setSelectedTimeZone("IST");
    setForm({ name: "", email: "", company: "", projectType: "", timeline: "", budget: "", notes: "" });
    setErrors({});
  };

  // Group project types for the select
  const groups = [...new Set(PROJECT_TYPES.map((p) => p.group))];

  return (
    <div className="w-full h-[580px] flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-[#080c14]/90 backdrop-blur-xl shadow-2xl shadow-black/40 text-white">

      {/* ── Header ── */}
      <div className="shrink-0 px-6 pt-5 pb-4 border-b border-white/8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">
              Book a Consultation
            </span>
          </div>
          <StepDots current={Math.min(step, 3)} />
        </div>

        {/* Step label */}
        <AnimatePresence mode="wait">
          {step < 4 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs text-slate-500">
                {step === 1 && "Step 1 of 3 — Pick a date"}
                {step === 2 && "Step 2 of 3 — Choose a time slot"}
                {step === 3 && "Step 3 of 3 — Tell us about your project"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto px-6 py-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        <AnimatePresence mode="wait">

          {/* ─── Step 1: Calendar ─── */}
          {step === 1 && (
            <motion.div key="s1" variants={slide} initial="hidden" animate="visible" exit="exit"
              className="flex flex-col items-center gap-4">
              
              {/* Wrapped in 'dark' to force Shadcn theme, added strict CSS overrides */}
              <div className="dark rounded-xl border border-white/10 bg-[#080c14] p-3 w-fit shadow-inner shadow-black/20">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { setDate(d); if (d) setStep(2); }}
                  disabled={{ before: new Date() }}
                  locale={enGB} // <-- Enforces consistent DD/MM/YYYY formatting
                  className="rounded-lg bg-transparent p-0 
                    [&_.rdp-caption_label]:text-white 
                    [&_.rdp-head_cell]:text-slate-400 
                    [&_button.rdp-day]:text-white 
                    [&_button.rdp-day:hover]:bg-violet-500/20 
                    [&_button[aria-selected='true']]:!bg-violet-600 
                    [&_button[aria-selected='true']]:!text-white 
                    [&_button[aria-selected='true']:hover]:!bg-violet-500
                    [&_.rdp-day_disabled]:!text-white/20 
                    [&_.rdp-day_disabled]:!bg-transparent
                    [&_.rdp-day_outside]:text-white/30"
                />
              </div>
              
              <p className="text-xs text-slate-500 text-center">
                Select a date to view available slots
              </p>
            </motion.div>
          )}

          {/* ─── Step 2: Time ─── */}
          {step === 2 && (
            <motion.div key="s2" variants={slide} initial="hidden" animate="visible" exit="exit"
              className="space-y-5">

              {/* Selected date chip */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-[10px] text-violet-400/70 font-semibold uppercase tracking-widest">Selected date</p>
                  <p className="text-sm font-semibold text-white">
                    {date?.toLocaleDateString("en-GB", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>

              {/* Timezone */}
              <div>
                <SectionLabel>Time Zone</SectionLabel>
                <GlassSelect
                  value={selectedTimeZone}
                  onChange={(e) => setSelectedTimeZone(e.target.value)}
                >
                  {TIME_ZONES.map((z) => (
                    <option key={z} value={z} className="bg-[#0d1117]">{z}</option>
                  ))}
                </GlassSelect>
              </div>

              {/* Time grid */}
              <div>
                <SectionLabel>Available Slots</SectionLabel>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const active = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`relative py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5
                          ${active
                            ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/25"
                            : "bg-white/4 border-white/8 text-slate-400 hover:border-white/20 hover:text-white hover:bg-white/8"
                          }`}
                      >
                        <Clock className={`w-3 h-3 ${active ? "text-violet-200" : "text-slate-600"}`} />
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nav */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => { setStep(1); setSelectedTime(null); }}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 text-sm hover:text-white hover:border-white/20 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  disabled={!selectedTime}
                  onClick={() => setStep(3)}
                  className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-violet-500/20"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── Step 3: Form ─── */}
          {step === 3 && (
            <motion.form key="s3" variants={slide} initial="hidden" animate="visible" exit="exit"
              onSubmit={handleSubmit} className="space-y-4">

              {/* Booking summary */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/4 border border-white/8 text-xs">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-violet-400" />
                  <span className="text-slate-400">{date?.toLocaleDateString("en-GB")}</span>
                </div>
                <div className="w-px h-3 bg-white/15" />
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-slate-400">{selectedTime}</span>
                </div>
                <div className="w-px h-3 bg-white/15" />
                <span className="text-emerald-400 font-semibold">{selectedTimeZone}</span>
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <SectionLabel>Contact Details</SectionLabel>
                <GlassInput icon={User} name="name" placeholder="Full Name *"
                  value={form.name} onChange={handleChange} error={errors.name} />
                <GlassInput icon={Mail} name="email" type="email" placeholder="Email Address *"
                  value={form.email} onChange={handleChange} error={errors.email} />
                <GlassInput icon={Building2} name="company" placeholder="Company / Organisation *"
                  value={form.company} onChange={handleChange} error={errors.company} />
              </div>

              {/* Project info */}
              <div className="space-y-3">
                <SectionLabel>Project Details</SectionLabel>

                <GlassSelect
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  error={errors.projectType}
                  placeholder="Select Project Type *"
                  icon={FileText}
                >
                  {groups.map((group) => (
                    <optgroup key={group} label={group} className="bg-[#0d1117] text-slate-400 text-xs">
                      {PROJECT_TYPES.filter((p) => p.group === group).map((p) => (
                        <option key={p.label} value={p.label} className="bg-[#0d1117] text-white">
                          {p.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </GlassSelect>

                <div className="grid grid-cols-2 gap-3">
                  <GlassSelect
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    error={errors.timeline}
                    placeholder="Timeline *"
                  >
                    {TIMELINES.map((t) => (
                      <option key={t} value={t} className="bg-[#0d1117] text-white">{t}</option>
                    ))}
                  </GlassSelect>

                  <GlassSelect
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    error={errors.budget}
                    placeholder="Budget *"
                    icon={IndianRupee}
                  >
                    {BUDGETS.map((b) => (
                      <option key={b} value={b} className="bg-[#0d1117] text-white">{b}</option>
                    ))}
                  </GlassSelect>
                </div>

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Additional notes (optional)"
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 resize-none"
                />
              </div>

              {errors.submit && (
                <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-center">
                  {errors.submit}
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 text-sm hover:text-white hover:border-white/20 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all shadow-lg shadow-violet-500/20"
                >
                  Confirm Booking
                </button>
              </div>
            </motion.form>
          )}

          {/* ─── Step 4: Confirmed ─── */}
          {step === 4 && (
            <motion.div key="s4" variants={slide} initial="hidden" animate="visible" exit="exit"
              className="flex flex-col items-center justify-center text-center h-full py-8 gap-6">

              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-400" strokeWidth={1.5} />
              </motion.div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">You're booked!</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Your consultation is confirmed for
                </p>
                <div className="inline-flex items-center gap-2 mt-1 px-4 py-2 rounded-xl bg-violet-500/12 border border-violet-500/20">
                  <CalendarDays className="w-4 h-4 text-violet-400" />
                  <span className="text-sm font-semibold text-violet-300">
                    {date?.toLocaleDateString("en-GB", { weekday: "short", month: "short", day: "numeric" })} at {selectedTime} {selectedTimeZone}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 bg-white/4 border border-white/8 rounded-xl px-5 py-3 max-w-[240px] leading-relaxed">
                A confirmation has been sent to <span className="text-slate-300">{form.email}</span>
              </p>

              <button
                onClick={reset}
                className="mt-2 px-6 py-2.5 rounded-xl border border-white/12 text-sm text-slate-400 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all"
              >
                Book another call
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-track-transparent::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thumb-white\\/10::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 8px; }
      ` }} />
    </div>
  );
};

export default ConsultationCard;