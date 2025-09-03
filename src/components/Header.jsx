"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
import Link from "next/link";
import { ContactModel } from "./ContactModel";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navItemsRef = useRef([]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    navItemsRef.current.forEach((el) => {
      if (el) {
        VanillaTilt.init(el, {
          max: 15,
          speed: 400,
          glare: true,
          "max-glare": 0.3,
        });
      }
    });
  }, []);

  const NavItem = ({ children, href, index }) => (
    <Link href={href}>
      <motion.div
        ref={(el) => (navItemsRef.current[index] = el)}
        className={`relative  font-medium px-5 py-2 rounded-full transition-all duration-300 text-black`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
        <motion.span
          className="absolute bottom-0 left-1/2 w-0 h-0.5  transform -translate-x-1/2"
          whileHover={{ width: "80%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );

  const Dropdown = ({ trigger, children, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navItemsRef = useRef([]); // if used elsewhere, otherwise remove
    const isScrolled = false; // replace with your logic or prop

    // Close dropdown on outside click
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="relative" ref={dropdownRef}>
        <motion.button
          ref={(el) => (navItemsRef.current[index] = el)}
          className={`flex items-center font-medium px-5 py-2 rounded-full ${
            isScrolled ? "text-white" : "text-black"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
        >
          {trigger}
          <motion.svg
            className="ml-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 rounded-2xl shadow-2xl p-6 z-50 border border-white/10 backdrop-blur-2xl backdrop-saturate-200 bg-black/50"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto p-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-white font-extrabold text-2xl">A</span>
            </motion.div>
            <span
              className={`text-3xl font-bold  tracking-tight bg-gradient-to-br from-cyan-400 to-blue-400  bg-clip-text text-transparent`}
            >
              Alomonx
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={`hidden lg:flex items-center space-x-8  backdrop-blur-lg rounded-full px-10 py-2 border border-white/10 
          bg-gradient-to-br from-cyan-400/20 to-blue-400/20 `}
        >
          <Dropdown trigger="Services" index={0}>
            {/* Dropdown Content */}
            <div className="space-y-4">
              <div className="flex items-center text-white font-semibold">
                <svg
                  className="mr-2 h-6 w-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Digital Growth
              </div>
              <a
                href="#"
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg"
              >
                SEO Mastery
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg"
              >
                Content Strategy
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg"
              >
                Ad Campaigns
              </a>
            </div>
          </Dropdown>

          <Dropdown trigger="Solutions" index={1}>
            <div className="space-y-4">
              <div className="flex items-center text-white font-semibold">
                <svg
                  className="mr-2 h-6 w-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Analytics
              </div>
              <a
                href="#"
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg"
              >
                Real-Time Insights
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg"
              >
                Data Dashboards
              </a>
            </div>
          </Dropdown>

          <NavItem href="/blog" index={2}>
            Blog
          </NavItem>
          <NavItem href="/about" index={3}>
            About
          </NavItem>
          <NavItem href="/contact" index={4}>
            Contact
          </NavItem>
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <ContactModel />
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden p-3 rounded-full bg-white/10"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-gradient-to-b from-gray-900/95 to-blue-900/95 px-6 py-8 space-y-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <a href="#" className="block text-white text-lg">
              Services
            </a>
            <a href="#" className="block text-white text-lg">
              Solutions
            </a>
            <a href="#" className="block text-white text-lg">
              Blog
            </a>
            <a href="#" className="block text-white text-lg">
              About
            </a>
            <a href="#" className="block text-white text-lg">
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
