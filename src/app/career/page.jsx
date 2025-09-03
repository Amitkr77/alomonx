"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  ChevronUp,
  Filter,
  AlertCircle,
  CheckCircle,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import Head from "next/head";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    description:
      "Join our team to build cutting-edge web applications using React and Next.js.",
    category: "Engineering",
    location: "Remote",
    type: "Full-Time",
    posted: "August 25, 2025",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    description:
      "Design intuitive and engaging user interfaces for our digital products.",
    category: "Design",
    location: "San Francisco, CA",
    type: "Full-Time",
    posted: "August 20, 2025",
  },
  {
    id: 3,
    title: "Data Analyst",
    description:
      "Analyze data to drive business decisions using Python and SQL.",
    category: "Data",
    location: "Remote",
    type: "Part-Time",
    posted: "August 15, 2025",
  },
  {
    id: 4,
    title: "Backend Developer",
    description:
      "Develop scalable APIs and server-side logic with Node.js and MongoDB.",
    category: "Engineering",
    location: "New York, NY",
    type: "Full-Time",
    posted: "August 10, 2025",
  },
];

const categories = ["All", "Engineering", "Design", "Data"];

const Career = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
    message: "",
  });
  const [formError, setFormError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowCTA(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredJobs = jobs.filter(
    (job) => selectedCategory === "All" || job.category === selectedCategory
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      setFormError("Name and valid email are required");
      return;
    }
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    setFormData({ name: "", email: "", resume: "", message: "" });
    setFormError("");
    setTimeout(() => setFormSubmitted(false), 5000);
  };

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
        <title>Career Opportunities</title>
        <meta name="description" content="Join our team and grow with us." />
      </Head>
      {/* Hero Section */}
      <div
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-coral-600/80 backdrop-blur-sm"></div>
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
            Join Our Team
          </motion.h1>
          <p className="mt-3 text-lg text-white/90 font-serif">
            Explore exciting career opportunities and grow with us.
          </p>
        </motion.div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-teal-600">
            <Home className="h-4 w-4 inline-block mr-1" />
            Home
          </Link>
          <span>/</span>
          <span className="text-teal-600">Careers</span>
        </nav>
      </div>

      {/* Jobs Section */}
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
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "border-teal-600 text-teal-600 hover:bg-teal-50"
              }`}
              onClick={() => setSelectedCategory(category)}
              aria-label={`Filter by ${category}`}
            >
              <Filter className="h-4 w-4 mr-2" />
              {category} (
              {category === "All"
                ? jobs.length
                : jobs.filter((j) => j.category === category).length}
              )
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4 text-teal-600" />
                    <span className="text-sm text-teal-600 font-sans">
                      {job.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-medium font-sans mb-2">
                    {job.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 font-serif mb-3">
                    {job.description}
                  </CardDescription>
                  <div className="text-sm text-gray-500 mb-3 font-sans">
                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p>
                      <strong>Type:</strong> {job.type}
                    </p>
                    <p>
                      <strong>Posted:</strong> {job.posted}
                    </p>
                  </div>
                  <Button
                    className="w-full bg-teal-600 text-white hover:bg-coral-600 transition-colors duration-300 font-sans"
                    onClick={() =>
                      document
                        .getElementById("application-form")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Application Form */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto px-4 py-12"
        id="application-form"
      >
        <h2 className="text-3xl font-semibold font-sans text-teal-600 mb-4">
          Apply Now
        </h2>
        <p className="text-sm text-gray-600 font-serif mb-6">
          Submit your application to join our innovative team.
        </p>
        <AnimatePresence>
          {!formSubmitted ? (
            <motion.form
              key="application-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleFormSubmit}
              className="space-y-4 bg-white rounded-2xl p-6 border border-gray-200"
            >
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm text-gray-600 font-sans"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  className={`mt-1 font-sans ${
                    formError ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm text-gray-600 font-sans"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Your email"
                  className={`mt-1 font-sans ${
                    formError ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div>
                <Label
                  htmlFor="resume"
                  className="text-sm text-gray-600 font-sans"
                >
                  Resume/CV (URL or text)
                </Label>
                <Input
                  id="resume"
                  value={formData.resume}
                  onChange={(e) =>
                    setFormData({ ...formData, resume: e.target.value })
                  }
                  placeholder="Link to your resume or paste text"
                  className="mt-1 font-sans"
                />
              </div>
              <div>
                <Label
                  htmlFor="message"
                  className="text-sm text-gray-600 font-sans"
                >
                  Cover Letter
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Why are you a great fit?"
                  className="mt-1 font-sans"
                  rows={5}
                />
              </div>
              {formError && (
                <p className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {formError}
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-teal-600 text-white hover:bg-coral-600 transition-colors duration-300 font-sans"
              >
                Submit Application
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="form-confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-4 bg-white rounded-2xl p-6 border border-gray-200"
            >
              <CheckCircle className="h-12 w-12 text-teal-600 mx-auto" />
              <p className="text-sm text-gray-600 font-serif">
                Thank you for your application! We'll be in touch soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
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
                Ready to join our team?
              </p>
              <Button
                onClick={() =>
                  document
                    .getElementById("application-form")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="bg-teal-600 text-white hover:bg-coral-600 transition-colors duration-300 font-sans rounded-full px-6"
              >
                Apply Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showCTA ? 1 : 0, scale: showCTA ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={scrollToTop}
          className="bg-teal-600 text-white hover:bg-coral-600 rounded-full p-3"
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  );
};

export default Career;
