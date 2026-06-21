"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { allServices } from "@/lib/services-data";

// ─── Static data — defined once at module level, never recreated ─────────────
const services = allServices.slice(0, 5);

// Computed once at module load — never changes for the lifetime of the page
const COPYRIGHT_YEAR = new Date().getFullYear();

const socialLinks = [
  {
    href: "https://www.facebook.com/share/19funaxch4/?mibextid=wwXIfr",
    label: "Facebook",
    Icon: FaFacebook,
  },
  {
    href: "https://www.instagram.com/alomonx?igsh=MW1ndW03c2R0aHBvNw==",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.linkedin.com/company/alomonx-technology/",
    label: "LinkedIn",
    Icon: FaLinkedin,
  },
  {
    href: "https://wa.me/919234625064?text=Hi%20there%2C%20I%27m%20interested%20in%20learning%20more%20about%20your%20services.",
    label: "WhatsApp",
    Icon: FaWhatsapp,
  },
];

// ─── Digital Clock ────────────────────────────────────────────────────────────
const DigitalClock = memo(function DigitalClock() {
  const [clockState, setClockState] = useState({
    mounted: false,
    time: null,
    is24Hour: false,
  });

  useEffect(() => {
    setClockState((prev) => ({ ...prev, mounted: true, time: new Date() }));

    const timer = setInterval(() => {
      setClockState((prev) => ({ ...prev, time: new Date() }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const set12h = useCallback(
    () => setClockState((prev) => ({ ...prev, is24Hour: false })),
    [],
  );
  const set24h = useCallback(
    () => setClockState((prev) => ({ ...prev, is24Hour: true })),
    [],
  );

  if (!clockState.mounted || !clockState.time) return null;

  const { time, is24Hour } = clockState;

  const timeString = time.toLocaleTimeString("en-US", {
    hour12: !is24Hour,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [timePart, ampm] = timeString.split(" ");
  const day = time.toLocaleDateString("en-US", { weekday: "long" });
  const date = time.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const isDaytime = time.getHours() >= 6 && time.getHours() < 18;

  return (
    <div className="relative w-full sm:max-w-[450px] min-h-[160px] sm:min-h-0 aspect-auto sm:aspect-[2/1] px-0 sm:px-6 py-5 flex flex-col justify-between tabular-nums z-0">
      <div className="flex justify-between items-start">
        <span className="text-sm font-semibold tracking-wide text-[#A3A3A3]">
          Current
        </span>
        <div className="flex flex-col text-xs text-[#A3A3A3] gap-1 text-right">
          <div className="flex items-center justify-end gap-1 font-medium text-white/80">
            {isDaytime ? "Day ☀️ : 06:00 - 18:00" : "Night 🌙 : 18:00 - 06:00"}
          </div>
          <div>
            {day}, {date}
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center my-4 sm:my-0">
        <div className="text-[3.2rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-tighter tabular-nums leading-none flex items-baseline">
          {timePart}
          {!is24Hour && ampm && (
            <span className="text-lg sm:text-2xl lg:text-3xl ml-1 sm:ml-2 text-[#A3A3A3] font-medium tracking-normal">
              {ampm}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 text-xs font-semibold">
        <button
          onClick={set12h}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            !is24Hour
              ? "bg-white text-black"
              : "bg-[#222] text-white/50 hover:bg-[#333]"
          }`}
        >
          12h
        </button>
        <button
          onClick={set24h}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            is24Hour
              ? "bg-white text-black"
              : "bg-[#222] text-white/50 hover:bg-[#333]"
          }`}
        >
          24h
        </button>
      </div>
    </div>
  );
});

// ─── Static sub-sections — memo'd so they never re-render ────────────────────
const QuickLinks = memo(function QuickLinks() {
  return (
    <div className="flex flex-col w-full">
      <h4 className="font-semibold mb-3 text-white text-sm tracking-wide">
        Quick Links
      </h4>
      <ul className="space-y-2 text-[#A3A3A3] text-sm font-medium">
        {[
          { href: "/", label: "Home" },
          { href: "/#services", label: "Service" },
          { href: "/about", label: "About" },
          { href: "/#portfolio", label: "Portfolio" },
          { href: "/contact", label: "Contact us" },
          { href: "/careers", label: "Careers" },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="hover:text-white transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

const ServiceLinks = memo(function ServiceLinks() {
  return (
    <div className="flex flex-col w-full">
      <h4 className="font-semibold mb-3 text-white text-sm tracking-wide">
        Services
      </h4>
      <ul className="space-y-2 text-[#A3A3A3] text-sm font-medium">
        {services.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="hover:text-white transition-colors block truncate"
            >
              {label}
            </Link>
          </li>
        ))}
        <li className="pt-2">
          <Link
            href="/#services"
            className="inline-flex items-center text-white font-medium hover:text-gray-300 transition-colors group"
          >
            View all services
            <ChevronRight
              size={16}
              className="ml-1 transform group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
});

const ContactColumn = memo(function ContactColumn() {
  return (
    <div className="flex flex-col w-full sm:col-span-2 lg:col-span-1">
      <h4 className="font-semibold mb-3 text-white text-sm tracking-wide">
        Contact Us
      </h4>
      <ul className="space-y-2 text-[#A3A3A3] text-sm font-medium">
        <li>Kurji, Digha, Patna, Bihar</li>
        <li>Mon – Sat 10:00 AM – 6:00 PM</li>
        <li>
          <a
            href="mailto:info@alomonx.com"
            className="hover:text-white transition-colors break-all"
          >
            info@alomonx.com
          </a>
        </li>
        <li>
          <a
            href="tel:+919234625064"
            className="hover:text-white transition-colors"
          >
            +91 92346 25064
          </a>
        </li>
      </ul>

      <div className="flex gap-4 mt-4 text-[#A3A3A3] flex-wrap">
        {socialLinks.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="hover:text-white transition-colors p-1 first:-ml-1"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
    </div>
  );
});

// ─── Newsletter form — memo'd, no clock dependency ───────────────────────────
const NewsletterForm = memo(function NewsletterForm() {
  return (
    <div className="w-full md:w-auto flex flex-col md:mb-2">
      <p className="text-[#A3A3A3] mb-3 md:mb-2 text-sm md:text-base">
        Stay up to date with our{" "}
        <span className="text-white font-semibold">Newsletter</span>
      </p>
      <div className="relative flex items-center w-full md:w-[350px]">
        <input
          type="email"
          placeholder="Your email address"
          className="w-full py-3.5 pl-5 pr-14 rounded-2xl bg-white text-gray-900 focus:outline-none placeholder:text-gray-500 font-medium text-sm"
        />
        <button
          aria-label="Subscribe"
          className="absolute right-1.5 bg-black p-2 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
});

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-6 sm:pt-7 overflow-hidden font-sans flex flex-col items-center">
      <div className="max-w-8xl mx-auto px-4 md:px-12 relative z-10 w-full">
        {/* Top: title + newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 md:gap-0">
          <div className="w-full md:w-auto">
            <h2 className="text-4xl sm:text-5xl md:text-[5.0rem] font-bold tracking-tight leading-[1.1] md:leading-[1.05] break-words">
              Alomonx Technology
            </h2>
          </div>
          <NewsletterForm />
        </div>

        <div className="border-t border-[#222222] mb-7 w-full border-dotted" />

        {/* Bottom */}
        <div className="flex flex-col justify-between min-h-[250px]">
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 w-full">
            {/* Link columns */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:flex lg:flex-nowrap gap-7 lg:gap-24 w-full lg:w-[65%]">
              <QuickLinks />
              <ServiceLinks />
              <ContactColumn />
            </div>

            {/* Clock — only this subtree re-renders every second */}
            <div className="w-full lg:w-[35%] flex justify-center sm:justify-start lg:justify-end items-start mt-4 sm:mt-12 lg:mt-0 border-t border-[#222222] lg:border-none pt-7 lg:pt-0">
              <DigitalClock />
            </div>
          </div>

          {/* Copyright — static, computed once */}
          <div className="mt-4 sm:mt-16 pb-6 text-xs text-[#555555] font-light text-center sm:text-left">
            <p>
              © {COPYRIGHT_YEAR} Alomonx Technology. All rights reserved.
              Crafted with ❤️ by Alomonx Technology.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
