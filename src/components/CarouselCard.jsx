// components/ProcessJourney.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const phases = [
  {
    title: "Discover",
    subtitle: "Uncover Your Vision",
    description:
      "We dive deep into your business, goals, and audience. Through research and stakeholder collaboration, we craft strategies that resonate, setting a strong foundation for success.",
    icon: "🔍",
    color: "from-blue-100 to-blue-200",
  },
  {
    title: "Design",
    subtitle: "Shape the Experience",
    description:
      "Transforming insights into intuitive, visually captivating interfaces. Our meticulous design process ensures every detail aligns with your brand and user needs.",
    icon: "🎨",
    color: "from-green-100 to-green-200",
  },
  {
    title: "Deliver",
    subtitle: "Execute with Precision",
    description:
      "We build with rigor, from clean code to thorough testing, ensuring your project is robust, scalable, and ready to outperform expectations.",
    icon: "🚀",
    color: "from-purple-100 to-purple-200",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const textVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
};

export default function ProcessJourney() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 py-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          style={{ opacity, scale }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-gray-700">
            Your Journey with Alomonx
          </h2>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Experience a process crafted with precision, transparency, and creativity. Let’s build something extraordinary together.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 h-full"></div>

          {phases.map((phase, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={`flex items-center justify-center mb-16 relative ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="w-full md:w-1/2 relative z-10">
                <Card className={`border-none shadow-lg bg-white rounded-2xl p-6 max-w-md mx-auto md:mx-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-r ${phase.color}`}>
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-4xl">{phase.icon}</span>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-800">{phase.title}</h3>
                        <p className="text-sm text-gray-500">{phase.subtitle}</p>
                      </div>
                    </div>
                    <motion.p
                      variants={textVariants}
                      className="text-base text-gray-600 leading-relaxed mb-6"
                    >
                      {phase.description}
                    </motion.p>
                    <Button
                      variant="ghost"
                      className="text-gray-700 hover:text-gray-900 flex items-center space-x-2 rounded-full transition-all duration-300"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="hidden md:block w-1/2"></div>
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-400 rounded-full z-20"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-lg text-gray-500 mb-6 max-w-xl mx-auto">
            Ready to embark on a journey of precision and creativity? Let’s transform your vision into reality.
          </p>
          <Button
            className="bg-gray-700 text-white hover:bg-gray-800 rounded-full px-8 py-3 text-lg font-medium transition-all duration-300 flex items-center mx-auto space-x-2"
          >
            <span>Start Now</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}