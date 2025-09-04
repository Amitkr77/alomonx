"use client";
import React from "react";
import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-gradient-to-b from-cyan-50 to-white text-gray-700">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center items-start"
      >
        {/* Logo & Description */}
        <motion.div
          variants={itemVariants}
          className="col-span-2 lg:col-span-1 lg:text-left text-center"
        >
          <h2 className="text-2xl font-medium tracking-tight text-gray-900">
            Alomonx <span className="text-cyan-500">Technology</span>
          </h2>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            At Alomonx Technology, we deliver innovative digital marketing,
            software development, and strategic solutions to shape your future.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants}>
          <h3 className="font-medium text-lg mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {[
              { href: "/service", label: "Services" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/career", label: "Career" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-cyan-500 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div variants={itemVariants}>
          <h3 className="font-medium text-lg mb-4">Services</h3>
          <ul className="space-y-3 text-sm">
            {[
              { href: "/services/web-development", label: "Web Development" },
              {
                href: "/services/digital-marketing",
                label: "Digital Marketing",
              },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-cyan-500 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact & Social */}
        <motion.div
          variants={itemVariants}
          className="col-span-2 lg:col-span-1 flex flex-col items-center "
        >
          <div className="flex space-x-4 text-gray-600 text-lg mb-6">
            {[
              {
                href: "https://www.facebook.com/share/19funaxch4/?mibextid=wwXIfr",
                Icon: FaFacebook,
                color: "hover:text-blue-600",
              },
              {
                href: "https://www.instagram.com/alomonx?igsh=MW1ndW03c2R0aHBvNw==",
                Icon: FaInstagram,
                color: "hover:text-pink-500",
              },
              {
                href: "https://www.linkedin.com/company/alomonx-technology/",
                Icon: FaLinkedin,
                color: "hover:text-blue-500",
              },
            ].map(({ href, Icon, color }, index) => (
              <Link key={index} href={href} className={color}>
                <Icon className="w-5 h-5 transition-colors duration-200" />
              </Link>
            ))}
          </div>
          <div className="text-sm">
            <p className="font-medium">Kurji, Digha, Patna, Bihar</p>
            <p className="mt-2 text-gray-600">
              Monday – Saturday <br /> 10:00 AM – 6:00 PM
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-t from-cyan-50 py-6 px-4 sm:px-6 lg:px-8 "
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-sm">
          <p className="font-medium">Need Help?</p>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-cyan-500" />
            <a href="tel:+919234625064" className="hover:text-cyan-500">
              +91 92346 25064
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaWhatsapp size={16} className="text-green-500" />
            <a
              href="https://wa.me/919234625064?text=Hi%20there%2C%20I%27m%20interested%20in%20learning%20more%20about%20your%20services."
              className="hover:text-cyan-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              +91 92346 25064
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={16} className="text-cyan-500" />
            <a href="mailto:info@alomonx.com" className="hover:text-cyan-500">
              info@alomonx.com
            </a>
          </div>
        </div>
      </motion.div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center text-xs py-4 border-t border-gray-200 bg-white"
      >
        <p>
          © 2025 Alomonx Technology. All rights reserved. Designed by{" "}
          <span className="text-cyan-500">Amit Kumar</span>
        </p>
      </motion.div>
    </footer>
  );
}
