import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CTABanner({ details }) {
  if (!details?.cta) return null;

  const { title, description, buttonText, footer } = details.cta;

  return (
    <section
      className="w-full py-20 px-4 md:px-8"
      style={{ background: "#0a0f1e" }}
    >
      <div
        className="relative overflow-hidden mx-auto max-w-7xl"
        style={{
          background: "#111827",
          border: "1px solid rgba(136,146,176,0.12)",
          borderRadius: "32px",
          padding: "clamp(28px, 5vw, 60px) clamp(20px, 5vw, 64px)",
        }}
      >
        {/* Background glows */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "rgba(29,158,117,0.07)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "rgba(99,115,170,0.06)",
            pointerEvents: "none",
          }}
        />

        {/* Two-column grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — Image */}
          <div className="order-2 md:order-1">
            <div
              className="relative w-full"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(136,146,176,0.1)",
                aspectRatio: "4/3",
              }}
            >
              <Image
                src="/consulting.jpeg"
                alt="CTA Visual"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover block"
              />
            </div>
          </div>

          {/* Right — Content */}
          <div className="order-1 md:order-2 flex flex-col items-start">
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#5dcaa5",
                background: "rgba(29,158,117,0.1)",
                border: "1px solid rgba(29,158,117,0.2)",
                borderRadius: "100px",
                padding: "5px 14px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#1d9e75",
                  flexShrink: 0,
                }}
              />
              Free Consultation
            </div>

            {/* Accent divider */}
            <div
              style={{
                width: "32px",
                height: "1px",
                background: "rgba(29,158,117,0.4)",
                marginBottom: "24px",
              }}
            />

            {/* Title */}
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 4vw, 38px)",
                fontWeight: 500,
                color: "#e8eaf0",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              }}
            >
              {title}
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "clamp(13px, 2vw, 15px)",
                color: "#6b7394",
                lineHeight: 1.8,
                fontWeight: 300,
                marginBottom: "28px",
              }}
            >
              {description}
            </p>

            {/* CTA Button */}
            <Link href="/contact">
              <button className="inline-flex items-center gap-[10px] bg-[#1d9e75] hover:bg-[#0f6e56] text-[#e8f7f2] text-[14px] font-medium px-[24px] py-[13px] md:px-[28px] md:py-[14px] rounded-[100px] border-none cursor-pointer transition-all duration-200 hover:-translate-y-[1px]">
                {buttonText}
                <ArrowRight size={16} style={{ opacity: 0.85 }} />
              </button>
            </Link>

            {/* Footer note */}
            {footer && (
              <p
                style={{
                  marginTop: "16px",
                  fontSize: "12px",
                  color: "rgba(136,146,176,0.5)",
                  fontWeight: 300,
                  letterSpacing: "0.01em",
                }}
              >
                {footer}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
