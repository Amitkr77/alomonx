"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, Briefcase, ChevronDown } from "lucide-react";

// ─── module-level stable objects ───────────────────────────────────────────
const FIELD_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: "easeOut" },
  }),
};

const IMG_VARIANTS = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── sub-components ────────────────────────────────────────────────────────
function InputField({
  icon: Icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  index,
}) {
  return (
    <motion.div
      custom={index}
      variants={FIELD_VARIANTS}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-1.5"
    >
      <label className="text-xs font-semibold tracking-widest uppercase text-gray-400">
        {label}
      </label>
      <div className="relative group">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-400 transition-colors duration-200">
          <Icon size={15} />
        </span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full bg-[#111111] border border-[#222222] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-900 transition-all duration-200"
        />
      </div>
    </motion.div>
  );
}

function SelectField({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  index,
}) {
  return (
    <motion.div
      custom={index}
      variants={FIELD_VARIANTS}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-1.5"
    >
      <label className="text-xs font-semibold tracking-widest uppercase text-gray-400">
        {label}
      </label>
      <div className="relative group">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-400 transition-colors duration-200 pointer-events-none">
          <Icon size={15} />
        </span>
        <select
          name={name}
          value={value}
          onChange={onChange}
          required
          className="w-full appearance-none bg-[#111111] border border-[#222222] rounded-xl pl-10 pr-10 py-3 text-sm text-white focus:outline-none focus:border-blue-900 transition-all duration-200 cursor-pointer [&>option]:bg-[#111111] [&>option]:text-white"
        >
          <option value="" disabled className="text-gray-600">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
          <ChevronDown size={14} />
        </span>
      </div>
    </motion.div>
  );
}

// ─── main component ─────────────────────────────────────────────────────────
export default function CareerApply({ opportunities, banner, contactInfo }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    role: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Job Application – ${form.role} (${form.type})`,
    );
    const body = encodeURIComponent(
      `Hi Alomonx Team,\n\nI would like to apply for the following position:\n\nName       : ${form.name}\nEmail      : ${form.email}\nPhone      : ${form.phone}\nPosition   : ${form.role}\nType       : ${form.type}\n\nLooking forward to hearing from you.\n\nBest regards,\n${form.name}`,
    );

    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      id="career-apply"
      className="w-full bg-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-10 sm:mb-12 lg:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#222222] bg-[#111111] text-gray-400 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Careers at Alomonx
          </span>
        </motion.div>

        {/* ── split layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* LEFT — banner */}
          <motion.div
            variants={IMG_VARIANTS}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4 sm:gap-6 lg:sticky lg:top-24"
          >
            {/* image — tighter aspect on mobile */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[4/3] border border-[#1a1a1a]">
              <img
                src={banner.bannerImage}
                alt="Join Alomonx"
                className="w-full h-full object-cover object-right"
              />
              {/* dark overlay */}
              <div className="absolute inset-0 bg-black/25" />
              {/* bottom text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 border-t border-white/10">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug">
                  {banner.title}
                </h1>
              </div>
            </div>

            {/* description card */}
            <div className="rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-4 sm:p-6">
              <p className="text-gray-400 text-sm leading-relaxed">
                {banner.description}
              </p>

              {/* roles preview */}
              <div className="mt-3 sm:mt-5 flex flex-wrap gap-2">
                {opportunities.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 rounded-full bg-[#111111] border border-[#222222] text-white text-[8px] md:text-sm font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <div className="rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-5 sm:p-6 lg:p-8">
            {!submitted ? (
              <>
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                    Submit Your Application
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Fill in the details — we'll receive it directly in our
                    inbox.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 sm:gap-5"
                >
                  <InputField
                    icon={User}
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    index={0}
                  />

                  <InputField
                    icon={Mail}
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    index={1}
                  />

                  <InputField
                    icon={Phone}
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    index={2}
                  />

                  {/* Employment Type + Role — side by side on tablet+ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <SelectField
                      icon={Briefcase}
                      label="Employment Type"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      options={["Full-time Job", "Internship"]}
                      placeholder="Select type"
                      index={3}
                    />

                    <SelectField
                      icon={Briefcase}
                      label="Role Applying For"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      options={opportunities}
                      placeholder="Select a role"
                      index={4}
                    />
                  </div>

                  <div className="h-px bg-[#1a1a1a] my-1" />

                  {/* submit button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-xl py-3.5 px-6 font-semibold text-sm text-white bg-blue-950 hover:bg-blue-900 border border-blue-900 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    {contactInfo.buttonText}
                  </motion.button>

                  <p className="text-center text-gray-400 text-xs">
                    Opens your email client to{" "}
                    <span className="text-gray-500 break-all">
                      {contactInfo.email}
                    </span>
                  </p>
                </form>
              </>
            ) : (
              /* success state */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center justify-center py-12 sm:py-16 gap-5 text-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center">
                  <Send size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    Application Ready!
                  </h3>
                  <p className="text-gray-600 text-sm max-w-xs">
                    Your email client has been opened. Send it and we'll get
                    back to you shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      type: "",
                      role: "",
                    });
                  }}
                  className="text-gray-500 text-sm underline underline-offset-4 hover:text-gray-300 transition-colors cursor-pointer"
                >
                  Submit another application
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
