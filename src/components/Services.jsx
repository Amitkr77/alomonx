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
    title: "WordPress Development",
    description: "Custom themes, plugins, and full WP solutions.",
    badgeNumber: "04",
        slug: "wordpress-development",

    badgeColor: "yellow-500",
    Icon: LayoutTemplate,
  },
  {
    id: 5,
    title: "Ecommerce Development",
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
    <section className=" p-10 md:p-16  text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Header Section */}
        <div className="col-span-1 md:col-span-3 flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left mb-6">
          <div>
            <h1 className="text-5xl font-bold uppercase mb-4">Services</h1>
            <p className="text-lg  max-w-xl">
              Explore our wide range of services designed to help your business
              grow in the digital world.
            </p>
          </div>

          {/* <div className="mt-6 md:mt-0">
            <Button size="lg" className=" text-blue-700 bg-blue-100 font-semibold transition hover:bg-blue-200">
              Get Free Consultation
            </Button>
          </div> */}
        </div>

        {/* Service Cards */}
        {services.map((service) => (
          <div key={service.id} className="flex justify-center">
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <ServiceCard {...service} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
