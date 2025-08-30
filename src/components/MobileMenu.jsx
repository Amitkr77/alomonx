import React, { useEffect, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // adjust path as needed
import { ChevronDown, Briefcase, Code, BarChart, Globe, X } from "lucide-react";
import gsap from "gsap";

export default function MobileMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { y: "-100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`fixed inset-0 z-50 bg-white lg:hidden transition-opacity duration-300 ${
        isOpen ? 'flex' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Close Button */}
      <div className="absolute top-4 right-4">
        <button onClick={onClose} aria-label="Close menu">
          <X className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Centered Content */}
      <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center space-y-8 text-gray-800">
        {/* Services Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center text-lg font-semibold text-gray-700 hover:text-indigo-600">
              Services <ChevronDown className="ml-2 h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white shadow-lg rounded-md p-3 text-left">
            <DropdownMenuLabel className="text-sm font-bold text-gray-500">
              <Briefcase className="inline mr-2 h-4 w-4" />
              Digital Marketing
            </DropdownMenuLabel>
            <DropdownMenuItem>SEO Optimization</DropdownMenuItem>
            <DropdownMenuItem>Content Marketing</DropdownMenuItem>
            <DropdownMenuItem>Social Media Ads</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-sm font-bold text-gray-500">
              <Code className="inline mr-2 h-4 w-4" />
              Web Development
            </DropdownMenuLabel>
            <DropdownMenuItem>Custom Websites</DropdownMenuItem>
            <DropdownMenuItem>E-commerce Solutions</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Solutions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center text-lg font-semibold text-gray-700 hover:text-indigo-600">
              Solutions <ChevronDown className="ml-2 h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white shadow-lg rounded-md p-3 text-left">
            <DropdownMenuLabel className="text-sm font-bold text-gray-500">
              <BarChart className="inline mr-2 h-4 w-4" />
              Business Analytics
            </DropdownMenuLabel>
            <DropdownMenuItem>Data Insights</DropdownMenuItem>
            <DropdownMenuItem>Reporting Tools</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-sm font-bold text-gray-500">
              <Globe className="inline mr-2 h-4 w-4" />
              Global Reach
            </DropdownMenuLabel>
            <DropdownMenuItem>Localization</DropdownMenuItem>
            <DropdownMenuItem>Multilingual Support</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2 text-lg font-medium">
          <a href="#" className="hover:text-indigo-600">Blogs</a>
          <a href="#" className="hover:text-indigo-600">Contact Us</a>
          <a href="#" className="hover:text-indigo-600">About Us</a>
        </div>

        {/* CTA Button */}
        <button className="mt-4 px-8 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200">
          Request a Quote
        </button>
      </div>
    </div>
  );
}
