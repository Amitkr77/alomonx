"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  ChevronUp,
  Filter,
  Github,
  ExternalLink,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Head from "next/head";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A fully responsive e-commerce site with Next.js and Stripe integration.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop",
    category: "Web Development",
    tags: ["Next.js", "Stripe", "Tailwind"],
    links: { github: "https://github.com", live: "https://example.com" },
  },
  {
    id: 2,
    title: "AI-Powered Dashboard",
    description:
      "A data visualization dashboard using React and D3.js for real-time analytics.",
    image:
      "https://images.unsplash.com/photo-1551288049-b1f3a00051ed?q=80&w=1200&auto=format&fit=crop",
    category: "Data Visualization",
    tags: ["React", "D3.js", "Node.js"],
    links: { github: "https://github.com", live: "https://example.com" },
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description:
      "A cross-platform fitness app built with React Native and Firebase.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    category: "Mobile Development",
    tags: ["React Native", "Firebase", "TypeScript"],
    links: { github: "https://github.com", live: "https://example.com" },
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "A sleek portfolio site showcasing creative work with Next.js and Framer Motion.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    category: "Web Development",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    links: { github: "https://github.com", live: "https://example.com" },
  },
];

const categories = [
  "All",
  "Web Development",
  "Data Visualization",
  "Mobile Development",
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCTA, setShowCTA] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowCTA(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "All" || project.category === selectedCategory
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="relative bg-gray-100 text-gray-900 font-sans">
      <Head>
        <title>Our Portfolio</title>
        <meta name="description" content="Explore our innovative projects." />
      </Head>
      {/* Hero Section */}
      <div
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-coral-600/80 backdrop-blur-sm"></div>
        <motion.div
          className="relative text-center z-10 max-w-4xl px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold font-sans text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Work
          </motion.h1>
          <p className="mt-3 text-lg text-white/90 font-serif">
            Discover our latest projects showcasing innovation and creativity.
          </p>
        </motion.div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            <Home className="h-4 w-4 inline-block mr-1" />
            Home
          </Link>
          <span>/</span>
          <span className="text-blue-600">Portfolio</span>
        </nav>
      </div>

      {/* Filters */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 py-12"
      >
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`text-sm font-sans ${
                selectedCategory === category
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setSelectedCategory(category)}
              aria-label={`Filter by ${category}`}
            >
              <Filter className="h-4 w-4 mr-2" />
              {category} (
              {category === "All"
                ? projects.length
                : projects.filter((p) => p.category === category).length}
              )
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
                <CardContent className="p-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-600 font-sans">
                        {project.category}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-medium font-sans mb-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 font-serif mb-3">
                      {project.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-blue-600 border-blue-600 font-sans"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 font-sans"
                        asChild
                      >
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 font-sans"
                        asChild
                      >
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Sticky CTA Bar */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-4 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
              <p className="text-gray-600 font-medium font-sans">
                Interested in collaborating on a project?
              </p>
              <Link href="/contact">
                <Button className="bg-blue-600 text-white hover:bg-coral-600 transition-colors duration-300 font-sans rounded-full px-6">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      {/* <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showCTA ? 1 : 0, scale: showCTA ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={scrollToTop}
          className="bg-blue-600 text-white hover:bg-coral-600 rounded-full p-3"
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      </motion.div> */}
    </section>
  );
};

export default Portfolio;
