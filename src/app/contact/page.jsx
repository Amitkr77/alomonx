"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Prevent SSR for map
const DynamicMap = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ConsultationCard from "@/components/ConsultationCard";

const Contact = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
    newsletter: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const faqs = [
    {
      question: "How quickly will I receive a response?",
      answer:
        "We aim to respond to all inquiries within 24-48 hours during business days.",
    },
    {
      question: "Can I schedule a call directly?",
      answer:
        "Yes, use our consultation booking tool to pick a convenient time slot.",
    },
    {
      question: "What types of projects do you handle?",
      answer:
        "We specialize in web development, digital marketing, and custom software solutions.",
    },
  ];

  const validateForm = (formType) => {
    const newErrors = {};
    if (formType === "contact") {
      if (!formValues.name.trim()) newErrors.name = "Name is required";
      if (
        !formValues.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)
      )
        newErrors.email = "Valid email is required";
      if (!formValues.message.trim()) newErrors.message = "Message is required";
    } else if (formType === "newsletter") {
      if (
        !formValues.newsletter.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.newsletter)
      )
        newErrors.newsletter = "Valid email is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (validateForm("contact")) {
      console.log("Contact form submitted:", formValues);
      setSubmitted(true);
      setFormValues({ ...formValues, name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
    try {
      const response = await fetch("/api/sheet/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
        }),
      });

      if (response.ok) {
        setStep(4);
        setErrors(null);
      } else {
        const { message } = await response.json();
        setErrors(message || "Failed to save data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors("An error occurred while saving your data");
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (validateForm("newsletter")) {
      console.log("Newsletter subscription:", formValues.newsletter);
      setNewsletterSubmitted(true);
      setFormValues({ ...formValues, newsletter: "" });
      setTimeout(() => setNewsletterSubmitted(false), 5000);
    }
    try {
      const response = await fetch("/api/sheet/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formValues.newsletter,
        }),
      });

      if (response.ok) {
        setErrors(null);
      } else {
        const { message } = await response.json();
        setErrors(message || "Failed to save data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors("An error occurred while saving your data");
    }
  };

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const chatVariants = {
    hidden: { opacity: 0, scale: 0, originX: 1, originY: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-fixed h-[60vh]"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6 h-full flex items-center justify-center relative z-10"
        >
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-light text-gray-100 mb-4 leading-tight">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-100">
              We're here to answer your questions and explore how we can bring
              your ideas to life.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Contact & Consultation Section */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Contact Form & Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border border-gray-100 shadow-md rounded-xl ">
              <CardContent className="p-6">
                <AnimatePresence>
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleContactSubmit}
                      className="space-y-5"
                    >
                      <h2 className="text-lg font-medium text-gray-900 mb-4">
                        Send Us a Message
                      </h2>
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700"
                        >
                          Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          value={formValues.name}
                          onChange={handleInputChange}
                          required
                          className={`mt-1 rounded-lg border-gray-200 focus:ring-indigo-300 ${
                            errors.name ? "border-red-500" : ""
                          }`}
                          aria-invalid={!!errors.name}
                          aria-describedby={
                            errors.name ? "name-error" : undefined
                          }
                        />
                        {errors.name && (
                          <p
                            id="name-error"
                            className="text-xs text-red-500 mt-1 flex items-center"
                          >
                            <AlertCircle className="h-4 w-4 mr-1" />{" "}
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700"
                        >
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          value={formValues.email}
                          onChange={handleInputChange}
                          required
                          className={`mt-1 rounded-lg border-gray-200 focus:ring-indigo-300 ${
                            errors.email ? "border-red-500" : ""
                          }`}
                          aria-invalid={!!errors.email}
                          aria-describedby={
                            errors.email ? "email-error" : undefined
                          }
                        />
                        {errors.email && (
                          <p
                            id="email-error"
                            className="text-xs text-red-500 mt-1 flex items-center"
                          >
                            <AlertCircle className="h-4 w-4 mr-1" />{" "}
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="message"
                          className="text-sm font-medium text-gray-700"
                        >
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your Message"
                          value={formValues.message}
                          onChange={handleInputChange}
                          required
                          className={`mt-1 rounded-lg border-gray-200 focus:ring-indigo-300 ${
                            errors.message ? "border-red-500" : ""
                          }`}
                          rows={4}
                          aria-invalid={!!errors.message}
                          aria-describedby={
                            errors.message ? "message-error" : undefined
                          }
                        />
                        {errors.message && (
                          <p
                            id="message-error"
                            className="text-xs text-red-500 mt-1 flex items-center"
                          >
                            <AlertCircle className="h-4 w-4 mr-1" />{" "}
                            {errors.message}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-indigo-600 text-white hover:bg-indigo-700 text-sm rounded-lg"
                        aria-label="Submit contact form"
                      >
                        Send Message
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="confirmation"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-center space-y-4"
                    >
                      <CheckCircle className="h-12 w-12 text-indigo-600 mx-auto" />
                      <h3 className="text-lg font-medium text-gray-900">
                        Message Sent!
                      </h3>
                      <p className="text-sm text-gray-600">
                        Thank you for reaching out. We'll respond within 24-48
                        hours.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
            <div className="border p-4 rounded-2xl shadow mt-2">
              <div className=" gap-4 text-gray-600 text-sm flex items-center justify-center">
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-indigo-600" />
                  <a
                    href="mailto:info@company.com"
                    className="hover:text-indigo-600"
                  >
                    info@company.com
                  </a>
                </p>
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-indigo-600" />
                  <a href="tel:+15551234567" className="hover:text-indigo-600">
                    +1 (555) 123-4567
                  </a>
                </p>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                  123 Innovation St, Tech City
                </p>
              </div>
              <div className="mt-6 flex gap-4 justify-center items-center">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Consultation Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <ConsultationCard />
          </motion.div>
        </motion.div>
      </section>

      {/* Map Placeholder */}
      <section className="">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-6"
        >
          <h2 className="text-3xl font-light text-gray-900 mb-6 text-center">
            Our Location
          </h2>
          <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardContent className="p-6">
              <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center">
                <DynamicMap />{" "}
              </div>
              <p className="text-center font-medium text-sm text-gray-600 mt-4">
                Alomonx, Kurji, Digha, Patna Bihar
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border border-gray-100 shadow-sm rounded-lg">
                    <CardContent className="p-4">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-900"
                        aria-expanded={faqOpen === index}
                        aria-controls={`faq-answer-${index}`}
                      >
                        {faq.question}
                        {faqOpen === index ? (
                          <ChevronUp className="h-5 w-5 text-indigo-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-indigo-600" />
                        )}
                      </button>
                      <AnimatePresence>
                        {faqOpen === index && (
                          <motion.div
                            id={`faq-answer-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 text-sm text-gray-600"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-lg mx-auto text-center"
        >
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Subscribe to our newsletter for the latest updates and insights.
          </p>
          <AnimatePresence>
            {!newsletterSubmitted ? (
              <motion.form
                key="newsletter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleNewsletterSubmit}
                className="space-y-4"
              >
                <div>
                  <div className="flex ">
                    <Input
                      id="newsletter"
                      name="newsletter"
                      type="email"
                      placeholder="Enter your email"
                      value={formValues.newsletter}
                      onChange={handleInputChange}
                      required
                      className={`rounded-r-none rounded-lg border-gray-200 focus:ring-indigo-300 ${
                        errors.newsletter ? "border-red-500" : ""
                      }`}
                      aria-invalid={!!errors.newsletter}
                      aria-describedby={
                        errors.newsletter ? "newsletter-error" : undefined
                      }
                    />
                    <button className="bg-blue-500 text-white px-6 rounded-r-full hover:bg-blue-600">
                      Subscribe
                    </button>
                  </div>
                  {errors.newsletter && (
                    <p
                      id="newsletter-error"
                      className="text-xs text-red-500 mt-1 flex items-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />{" "}
                      {errors.newsletter}
                    </p>
                  )}
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="newsletter-confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <CheckCircle className="h-12 w-12 text-indigo-600 mx-auto" />
                <p className="text-sm text-gray-600">
                  Thank you for subscribing! You'll receive our updates soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Live Chat Toggle */}
      <motion.div
        className="fixed bottom-6 right-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setShowChat(!showChat)}
          className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-full p-3 shadow-lg"
          aria-label={showChat ? "Close live chat" : "Open live chat"}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <AnimatePresence>
          {showChat && (
            <motion.div
              variants={chatVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute bottom-16 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-4"
            >
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Live Chat
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Chat with our team (Placeholder for live chat integration)
              </p>
              <Input
                placeholder="Type your message..."
                className="rounded-lg border-gray-200 text-sm"
                aria-label="Live chat input"
              />
              <Button
                className="w-full mt-3 bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
                aria-label="Send chat message"
              >
                Send
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Contact;
