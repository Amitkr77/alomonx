"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
import Link from "next/link";
import Head from "next/head";
import { ContactModel } from "./ContactModel";
import { BookOpenText, Hammer, Info, Phone,Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(false);
  const navItemsRef = useRef([]);

  // Scroll handling with debouncing
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 40);
      }, 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 

  // VanillaTilt initialization
  useEffect(() => {
    const tiltElements = navItemsRef.current.filter((el) => el instanceof HTMLElement);
    tiltElements.forEach((el) => {
      try {
        VanillaTilt.init(el, {
          max: 15,
          speed: 400,
          glare: true,
          "max-glare": 0.3,
        });
      } catch (error) {
        console.error("Failed to initialize VanillaTilt:", error);
      }
    });

    return () => {
      tiltElements.forEach((el) => {
        if (el.vanillaTilt) {
          el.vanillaTilt.destroy();
        }
      });
    };
  }, []);

  // Analytics tracking
  const trackEvent = (action, label) => {
    if (typeof window.gtag === "function") {
      window.gtag("event", action, { event_label: label });
    }
  };

  const NavItem = ({ children, href, index }) => (
    <Link href={href} onClick={() => trackEvent("click", `${children} Nav`)}>
      <motion.div
        ref={(el) => (navItemsRef.current[index] = el)}
        className="relative font-medium px-5 py-2 rounded-full transition-all duration-300 text-black"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
        <motion.span
          className="absolute bottom-0 left-1/2 w-0 h-0.5 transform -translate-x-1/2 bg-black"
          whileHover={{ width: "80%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );

  const Dropdown = ({ trigger, children, index, isScrolled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    return (
      <div className="relative" ref={dropdownRef}>
        <motion.button
          ref={(el) => {
            navItemsRef.current[index] = el;
            buttonRef.current = el;
          }}
          className={`flex items-center font-medium px-5 py-2 rounded-full`}
          onClick={() => {
            setIsOpen(!isOpen);
            trackEvent("click", `${trigger} Dropdown`);
          }}
          onKeyDown={handleKeyDown}
          whileHover={{ scale: 1.1 }}
          aria-expanded={isOpen}
          aria-controls={`dropdown-${index}`}
          aria-haspopup="true"
          id={`dropdown-${index}-button`}
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
              id={`dropdown-${index}`}
              className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 rounded-2xl shadow-2xl p-6 z-50 border border-white/10 backdrop-blur-2xl backdrop-saturate-200 ${
                isScrolled ? "bg-black/50 text-white" : "bg-white/50 text-black"
              }`}
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
              role="menu"
              aria-labelledby={`dropdown-${index}-button`}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/logo.png" as="image" />
      </Head>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? ""
            : "bg-transparent"
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
             
            >
              {/* <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg"
               
              >
                
              </motion.div>
              <span
                className={`text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-br ${
                  theme === "dark" ? "from-cyan-300 to-blue-300" : "from-cyan-400 to-blue-400"
                } bg-clip-text text-transparent`}
              >
                Alomonx
              </span> */}
             <div>
              <img src="/alomonx_log.png" alt="Alomonx Logo" className=" h-10  sm:h-14"/>
             </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-8 backdrop-blur-lg rounded-full px-10 py-2 border border-white/10 bg-gradient-to-br from-cyan-400/20 to-blue-400/20"
            role="navigation"
            aria-label="Main navigation"
          >
            <NavItem href="/" index={0}>
              Home
            </NavItem>
            <Dropdown trigger="Services" index={1} isScrolled={isScrolled}>
              <div className="space-y-4">
                <Link
                  href="/services/web-development"
                  className="block px-4 py-2 hover:bg-white/10 rounded-lg"
                  onClick={() => trackEvent("click", "Web Development Dropdown")}
                >
                  Web Development
                </Link>
                <Link
                  href="/services/digital-marketing"
                  className="block px-4 py-2 hover:bg-white/10 rounded-lg"
                  onClick={() => trackEvent("click", "Digital Marketing Dropdown")}
                >
                  Digital Marketing
                </Link>
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

          {/* Desktop CTA and Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <ContactModel />
          </div>

          {/* Mobile Menu Sheet Trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center lg:hidden p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <svg
                  className="h-8 w-8 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <AnimatePresence mode="wait">
                    {open ? (
                      <motion.path
                        key="close"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      />
                    ) : (
                      <motion.path
                        key="open"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </svg>
              </motion.div>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 sm:w-96 max-w-md mx-auto bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-white/10 rounded-l-2xl p-6"
            >
              <SheetHeader className="mb-6 flex justify-between items-center">
                <div>
                  <SheetTitle className="text-gray-300 text-2xl font-semibold font-sans">
                    Menu
                  </SheetTitle>
                  <SheetDescription className="text-gray-300 text-sm font-medium font-sans">
                    Explore our services and connect with us.
                  </SheetDescription>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 absolute top-1 right-1"
                  aria-label="Close menu"
                >
                  <svg
                    className="h-6 w-6 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </SheetHeader>
              <div className="py-8 space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Link
                    href="/services"
                    className="flex items-center text-gray-300 text-lg font-medium font-sans hover:bg-white/10 p-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    onClick={() => {
                      trackEvent("click", "Services Mobile Menu");
                      setOpen(false);
                    }}
                  >
                    <Hammer className="w-6 h-6 mr-3 text-cyan-500" />
                    Services
                  </Link>
                </motion.div>
                <hr className="border-white/10" />
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Link
                    href="/portfolio"
                    className="flex items-center text-gray-300 text-lg font-medium font-sans hover:bg-white/10 p-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    onClick={() => {
                      trackEvent("click", "Portfolio Mobile Menu");
                      setOpen(false);
                    }}
                  >
                    <Menu className="w-6 h-6 mr-3 text-cyan-500" />
                    Portfolio
                  </Link>
                </motion.div>
                <hr className="border-white/10" />
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Link
                    href="/blog"
                    className="flex items-center text-gray-300 text-lg font-medium font-sans hover:bg-white/10 p-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    onClick={() => {
                      trackEvent("click", "Blog Mobile Menu");
                      setOpen(false);
                    }}
                  >
                    <BookOpenText className="w-6 h-6 mr-3 text-cyan-500" />
                    Blog
                  </Link>
                </motion.div>
                <hr className="border-white/10" />
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Link
                    href="/about"
                    className="flex items-center text-gray-300 text-lg font-medium font-sans hover:bg-white/10 p-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    onClick={() => {
                      trackEvent("click", "About Mobile Menu");
                      setOpen(false);
                    }}
                  >
                    <Info className="w-6 h-6 mr-3 text-cyan-500" />
                    About
                  </Link>
                </motion.div>
                <hr className="border-white/10" />
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-center text-white text-lg font-semibold font-sans bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 p-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    onClick={() => {
                      trackEvent("click", "Contact Mobile Menu");
                      setOpen(false);
                    }}
                  >
                    <Phone className="w-6 h-6 mr-3" />
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>
    </>
  );
}