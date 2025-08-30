"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronDown, Sparkles } from "lucide-react";

const features = [
  {
    name: "Custom Web Development",
    description:
      "Precision-crafted websites using Next.js and Tailwind for blazing-fast performance and top-tier SEO.",
    alomonx: true,
    agencyA: true,
    agencyB: false,
    color: "bg-blue-50/80",
  },
  {
    name: "AI-Driven Solutions",
    description:
      "Cutting-edge AI integrations for automation, analytics, and personalized user experiences.",
    alomonx: true,
    agencyA: false,
    agencyB: true,
    color: "bg-green-50/80",
  },
  {
    name: "Mobile App Development",
    description:
      "Sleek, high-performance native and cross-platform apps for iOS and Android.",
    alomonx: true,
    agencyA: true,
    agencyB: true,
    color: "bg-purple-50/80",
  },
  {
    name: "Cloud-Native Architecture",
    description:
      "Scalable, secure cloud solutions using AWS, Azure, or GCP for unmatched reliability.",
    alomonx: true,
    agencyA: false,
    agencyB: false,
    color: "bg-indigo-50/80",
  },
  {
    name: "24/7 Concierge Support",
    description:
      "White-glove support with dedicated managers, available around the clock.",
    alomonx: true,
    agencyA: false,
    agencyB: true,
    color: "bg-teal-50/80",
  },
];

const rowVariants = {
  initial: {
    scale: 1,
    opacity: 1,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
  },
  hover: {
    scale: 1.02,
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
    background: "rgba(255, 255, 255, 0.9)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const panelVariants = {
  hidden: { height: 0, opacity: 0, transition: { duration: 0.4 } },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.4 } },
};

export function ComparisonSection() {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-white to-gray-100 text-gray-800 min-h-screen flex items-center">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-gray-700 flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-400" size={32} /> Alomonx: Beyond
            the Ordinary
          </h2>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Click a service to uncover how Alomonx’s innovative solutions
            outshine competitors in a sleek, interactive table.
          </p>
        </motion.div>

        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="p-0">
            <div className="space-y-2">
              {features.map((feature, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    variants={rowVariants}
                    initial="initial"
                    whileHover="hover"
                    className={`rounded-lg p-4 cursor-pointer flex items-center justify-between ${feature.color} backdrop-blur-sm border border-gray-100/50`}
                    onClick={() => toggleRow(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gray-700/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {feature.name}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        {feature.alomonx ? (
                          <CheckCircle2 className="text-green-500" size={20} />
                        ) : (
                          <XCircle className="text-gray-400" size={20} />
                        )}
                      </div>
                      <div className="text-center">
                        {feature.agencyA || feature.agencyB ? (
                          <CheckCircle2 className="text-green-500" size={20} />
                        ) : (
                          <XCircle className="text-gray-400" size={20} />
                        )}
                      </div>
                      <ChevronDown
                        className={`text-gray-500 transform transition-transform duration-300 ${
                          expandedRow === index ? "rotate-180" : ""
                        }`}
                        size={20}
                      />
                    </div>
                  </motion.div>
                  <AnimatePresence>
                    {expandedRow === index && (
                      <motion.div
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={`rounded-lg p-6 ${feature.color} backdrop-blur-sm border border-gray-100/50 mt-2`}
                      >
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                          {feature.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Alomonx
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {feature.alomonx ? "Included" : "Not Available"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Others
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {feature.agencyA || feature.agencyB
                                ? "Partial Support"
                                : "Not Available"}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-500 mb-6 max-w-xl mx-auto">
            Ready to elevate your business with Alomonx’s unmatched solutions?
            Let’s make it happen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-gray-700 text-white hover:bg-gray-800 rounded-full px-8 py-3 text-lg font-medium transition-all duration-300">
              Launch Now
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-medium transition-all duration-300"
            >
              View Portfolio
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
