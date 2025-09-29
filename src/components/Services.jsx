"use client";
import React from "react";
import { ServiceCard } from "./ServiceCard";
import { Button } from "./ui/button";
import {
  Code2,
  PenTool,
  TrendingUp,
  LayoutTemplate,
  ShoppingCart,
  SearchCheck,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "We build scalable and performant websites and apps.",
    badgeNumber: "01",
    badgeColor: "blue-500",
    slug: "web-development",
    Icon: Code2,
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Creative and user-friendly design solutions.",
    badgeNumber: "02",
    badgeColor: "violet-500",
    slug: "ui-ux-design",
    Icon: PenTool,
  },
  {
    id: 3,
    title: "Digital Marketing",
    description: "Boost your brand with targeted strategies.",
    badgeNumber: "03",
    badgeColor: "green-500",
    slug: "digital-marketing",
    Icon: TrendingUp,
  },
  {
    id: 4,
    title: "WP Development",
    description: "Custom themes, plugins, and full WP solutions.",
    badgeNumber: "04",
    slug: "wordpress-development",
    badgeColor: "yellow-500",
    Icon: LayoutTemplate,
  },
  {
    id: 5,
    title: "Ecom Development",
    description: "Powerful ecommerce stores with secure features.",
    badgeNumber: "05",
    badgeColor: "red-500",
    slug: "ecommerce-development",
    Icon: ShoppingCart,
  },
  {
    id: 6,
    title: "SEO Optimization",
    slug: "seo-optimization",
    description: "Enhance your website’s visibility and ranking.",
    badgeNumber: "06",
    badgeColor: "indigo-500",
    Icon: SearchCheck,
  },
];

const Services = () => {
  return (
    <section
      className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white text-black"
      aria-label="Our Services Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center  mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-gray-700 flex items-center justify-center gap-2 ">
           <SettingsIcon className="text-blue-400" size={36}/>
            Our Services
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed ">
            Discover our comprehensive suite of digital solutions designed to
            elevate your business. From cutting-edge web development to
            strategic marketing, we empower your brand to thrive in the digital
            landscape.
          </p>
          <p className="mt-2 text-sm text-blue-500 italic ">
            Your success is our mission.
          </p>
          <div className="mt-6">
            <Link href="/services">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-transform duration-300 ease-custom hover:scale-105"
                aria-label="Explore all services"
              >
                Explore All Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="flex justify-center">
              <Link
                href={`/services/${service.slug}`}
                className="group/link block transition-transform duration-300 ease-custom hover:scale-102"
                aria-label={`Learn more about ${service.title}`}
              >
                <ServiceCard {...service} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
