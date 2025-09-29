"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonialsData = [
    {
      name: "Hemnarayan Singh",
      role: "BJP state leader",
      quote: " Alomonx Technology played a crucial role in managing and executing our digital campaign. Their team was proactive, creative, and deeply committed to our vision. From social media strategy to ground-level voter engagement through digital channels, their work helped amplify our message effectively. A reliable and impactful partner for political campaigns! ",
      date: "September 2025",
    },
    {
      name: "Tech Altum MD",
      role: " Tech Altum Institute",  
      quote: " Alomonx Technology has helped us improve our online presence and generate more student inquiries through smart digital marketing. Their team is professional, creative, and result-oriented. We’re happy with the outcome! ",
      date: "August 2025",
    },
    {
      name: "sahal Khan",
      role: "Royal Darbar",
      quote: " The digital marketing services provided by Alomonx Technology have been exceptional. Their team organized our Google My Business profile and manages post creation, which has significantly improved our online presence and helped us reach more customers. Highly recommended for anyone looking for reliable digital marketing support. ",
      date: "July 2025",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-cyan-50 text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-800">
            Voices of Success
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hear from our clients who have transformed their businesses with our innovative solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03, rotateX: 2, rotateY: 2 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              role="article"
              aria-labelledby={`testimonial-${index}-name`}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Quote className="h-8 w-8 text-cyan-500" aria-hidden="true" />
              </div>
              <blockquote className="text-center mt-6">
                <p className="text-base text-gray-600 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
              </blockquote>
              <div className="text-center">
                <h3
                  id={`testimonial-${index}-name`}
                  className="text-lg font-medium text-gray-800"
                >
                  {testimonial.name}
                </h3>
                <p className="text-sm text-cyan-600">{testimonial.role}</p>
                <p className="text-xs text-gray-500 mt-1">{testimonial.date}</p>
              </div>
              {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-500 rounded-full" /> */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;