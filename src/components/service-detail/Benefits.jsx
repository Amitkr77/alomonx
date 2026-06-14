import React from "react";
import Image from "next/image";

export default function Benefits({
  benefits = [],
  heading = "Built to drive real results",
  eyebrow = "Business Benefits",
  imageSrc = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  imageAlt = "Business Growth and Benefits",
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-gray-200/30 shadow-sm min-h-[350px] mb-12">
      {/* LEFT — Image + Heading */}
      <div className="relative flex flex-col justify-end p-6 min-h-[250px] md:min-h-full overflow-hidden bg-black/80">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw" // Optimized bandwidth for grid layout
          className="object-cover opacity-50 -z-0"
        />
        <div className="relative z-10">
          <p className="text-[11px] uppercase tracking-widest text-[#FDFBE2]/70 font-semibold mb-3">
            {eyebrow}
          </p>
          <h2 className="font-serif text-[34px] leading-[1.15] text-[#FDFBE2] font-bold mb-3">
            {heading}
          </h2>
          <p className="text-[11px] text-[#FDFBE2]/30 tracking-wide">
            {benefits.length} key advantages
          </p>
        </div>
      </div>

      {/* RIGHT — Numbered Benefit Rows */}
      <div className="bg-white flex flex-col justify-center divide-y divide-gray-100">
        {benefits.map((benefit, i) => (
          <div
            key={i}
            className="flex items-start gap-4 px-7 py-[10px] group hover:bg-gray-100 transition-colors duration-200 font-semibold"
          >
            <span className="font-serif italic text-teal-700 text-[15px] min-w-[28px] pt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-slate-900 text-sm leading-relaxed">
              {benefit}
            </span>
            <span className="ml-auto text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pt-0.5">
              →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
