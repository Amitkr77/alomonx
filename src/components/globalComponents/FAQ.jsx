"use client";
import { useState } from "react";
import { DM_Sans } from "next/font/google";

// Optimally load the font at build-time (Zero Layout Shift)
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const defaultFaqs = [
  {
    question: "What services does your agency offer?",
    answer:
      "We offer end-to-end digital solutions including Website & Mobile App Development, Custom Software (CRM, ERP, Billing, HR & Hospital Management), UI/UX Design, SharePoint solutions, and Digital Marketing.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope. A standard website takes 4–6 weeks, a mobile app 8–14 weeks, and custom enterprise software 3–6 months. We'll provide a detailed timeline after our initial consultation.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes. We provide flexible support plans covering bug fixes, performance monitoring, security updates, and feature enhancements. Our team is available to ensure your product stays healthy after launch.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely. We specialize in redesigning outdated websites with modern UI/UX principles. We audit your current site, understand your goals, and craft a fresh, conversion-focused design.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "We work with React, Next.js, Node.js, .NET, Laravel, Flutter, React Native, SharePoint, Power Apps, and more — choosing the best stack based on your project's needs and scalability requirements.",
  },
  {
    question: "How do I get started with a project?",
    answer:
      "Simply schedule a free consultation through our contact page. We'll discuss your requirements, goals, and budget, then propose a tailored roadmap and transparent pricing before any work begins.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          padding: "26px 0",
          cursor: "pointer",
          width: "100%",
          background: "none",
          border: "none",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: dmSans.style.fontFamily,
            fontSize: "clamp(15px, 2vw, 18px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.4,
            letterSpacing: "-0.02em",
          }}
        >
          {faq.question}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isOpen ? "26px" : "22px",
            fontWeight: 300,
            color: "#ffffff",
            lineHeight: 1,
            fontFamily: "sans-serif",
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>

      {/* Pure CSS Animation using CSS Grid - No JS measurements required */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              paddingBottom: "26px",
              fontFamily: dmSans.style.fontFamily,
              fontSize: "14px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.8,
              maxWidth: "900px",
            }}
          >
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ faqs = defaultFaqs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!faqs.length) return null;

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      style={{
        padding: "60px 24px",
        background: "#0a0a0a",
      }}
    >
      {/* Header */}
      <h2
        style={{
          fontFamily: dmSans.style.fontFamily,
          fontSize: "clamp(28px, 4vw, 46px)",
          fontWeight: 700,
          color: "#ffffff",
          textAlign: "center",
          marginBottom: "60px",
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
        }}
      >
        Frequently Asked Questions
      </h2>

      {/* Single-column FAQ list */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            faq={faq}
            isOpen={activeIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </section>
  );
}
