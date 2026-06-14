"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { categoryMeta } from "@/lib/services-data";
import {
  ArrowRight,
  Code2 as Code2Icon,
  Settings2,
  Palette,
  Share2,
  Megaphone,
  Smartphone,
  Layers,
  BarChart3,
  Users,
  GraduationCap,
  HeartPulse,
  Receipt,
  Globe,
  LayoutDashboard,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";

// ─── Icon registry ────────────────────────────────────────────────────────────
const iconMap = {
  Code2: Code2Icon,
  Settings2,
  Palette,
  Share2,
  Megaphone,
  Smartphone,
  Layers,
  BarChart3,
  Users,
  GraduationCap,
  HeartPulse,
  Receipt,
  Globe,
  LayoutDashboard,
  Sparkles,
  Zap,
  ShieldCheck,
};

// ─── Animation variant ───────────────────────────────────────────────────────
export const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ServiceCard({ service }) {
  const Icon = iconMap[service.icon] || Code2Icon;
  const meta = categoryMeta[service.category];

  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-white rounded-3xl border border-gray-200 hover:border-teal-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <Image
          src={service.image}
          alt={service.label}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none" />

        {/* Category badge */}
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${meta?.bgColor} ${meta?.color} border ${meta?.borderColor}`}
        >
          {service.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 lg:p-8">
        {/* Title row */}
        <div className="flex items-center gap-3 mb-4">
          <span className={`p-2 rounded-xl ${meta?.bgColor}`}>
            <Icon className={`w-5 h-5 ${meta?.color}`} />
          </span>

          <h3 className="text-xl font-bold text-slate-900">{service.label}</h3>
        </div>

        {/* Description */}
        <p className="text-slate-600 leading-relaxed mb-8 flex-1">
          {service.description}
        </p>

        {/* CTA */}
        <Link href={service.href}>
          <Button
            variant="outline"
            className={`w-full rounded-xl border-2 ${meta?.borderColor} ${meta?.color} hover:bg-slate-50 font-semibold h-12 transition-all duration-300 group/btn`}
          >
            Explore Service
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
