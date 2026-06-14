"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import ConsultationCard from "@/components/ConsultationCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const ContactFormSection = () => (
  <section className="bg-white py-16 relative z-20  -mt-8 overflow-hidden">
    <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="flex flex-col gap-20"
      >
        {/* Top Section: Contact Form */}
        <motion.div variants={fadeUp} className="w-full">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Send a Message
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you with technical
              insights and a project estimate.
            </p>
          </div>
          <ContactForm />
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center w-full max-w-3xl mx-auto opacity-60"
        >
          <div className="h-px bg-gray-300 w-full"></div>
          <span className="px-6 text-gray-500 font-medium text-sm tracking-widest uppercase">
            Or
          </span>
          <div className="h-px bg-gray-300 w-full"></div>
        </motion.div>

        {/* Bottom Section: Consultation Card */}
        <motion.div variants={fadeUp} className="w-full flex flex-col gap-8">
          <div className="mb-2 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Book a Call
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prefer to speak directly? Schedule a 30-minute discovery call with
              our technical leads.
            </p>
          </div>
          <ConsultationCard />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default ContactFormSection;
