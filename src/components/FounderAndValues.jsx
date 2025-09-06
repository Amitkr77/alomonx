import React from "react";
import { Card, CardContent, CardTitle, CardDescription } from "./ui/card";
import { Target, Award, Heart, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function FounderAndValues() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const founders = [
    {
      name: "Anand Kishor",
      role: "Founder",
      image: "./founders/anand.jpg",
      desc: "As a founder of Alomonx technology With a deep passion for technology, business strategy, and digital transformation. Helping businesses and individuals harness the power of advanced technologies to drive growth and digital empowerment.",
    },
    {
      name: "Ashish Kumar Singh",
      role: "Co-Founder",
      image: "./founders/ashish.jpg",
      desc: "Tech innovator focused on building scalable solutions and driving digital progress. Passionate about leading agile teams, solving real-world challenges, and empowering businesses to thrive in a rapidly evolving digital landscape.",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Visionary Innovation",
      desc: "We pioneer groundbreaking solutions by leveraging the latest technologies to anticipate and shape the future of digital experiences.",
    },
    {
      icon: Award,
      title: "Uncompromising Excellence",
      desc: "Our commitment to quality ensures every project delivers measurable value, exceeding client expectations with precision and care.",
    },
    {
      icon: Heart,
      title: "Integrity First",
      desc: "We build trust through transparent practices, fostering long-term partnerships grounded in honesty and accountability.",
    },
    {
      icon: Users,
      title: "Collaborative Success",
      desc: "We thrive on teamwork, uniting diverse expertise to create cohesive, impactful solutions that drive collective success.",
    },
  ];
  console.log(founders[0].image);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-gradient-to-b from-white to-cyan-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className=""
      >
        {/* Founders Section */}
        <motion.div variants={containerVariants} className="">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900 mb-8">
            {/* Meet Our Visionaries */}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <motion.img
                  src={founder.image}
                  alt={founder.name}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover mb-4 border-2 border-cyan-200 bg-gray-100"
                  //   onError={(e) => (e.target.src = "/founders/anand.jpg")} // Fallback image
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                />
                <Card className="border-none shadow-none bg-transparent">
                  <CardContent className="p-0">
                    <CardTitle className="text-lg sm:text-xl font-medium text-gray-900">
                      {founder.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 mb-3">
                      {founder.role}
                    </CardDescription>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                      {founder.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div variants={containerVariants} className="">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900 mb-8">
            Our Guiding Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start p-5 bg-gradient-to-r from-white to-cyan-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <value.icon className="h-6 w-6 text-cyan-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
