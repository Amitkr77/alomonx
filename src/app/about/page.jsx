"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Target, Award, Heart, Users, Mail, Phone, MapPin } from "lucide-react";
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
const About = () => {
  const heroRef = useRef(null);
  const founderRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(
      "Form submission is disabled in this environment. Please process the form data manually."
    );
  };

  // useEffect(() => {
  //   // Ensure elements are mounted before animating
  //   if (heroRef.current) {
  //     heroRef.current.children.forEach((child, i) => {
  //       motion(child, {
  //         initial: { opacity: 0, y: 30 },
  //         animate: { opacity: 1, y: 0 },
  //         transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
  //       });
  //     });
  //   }
  // }, []);
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
      role: "Founder ",
      image: "./founders/anand.jpg",
       desc: "As a founder of Alomonx technology With a deep passion for technology, business strategy, and digital transformation. Helping businesses and individuals harness the power of advanced technologies to drive growth and digital empowerment.",
    },
    {
      name: "Ashish Kumar singh",
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

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-fixed h-[70vh]"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1169&auto=format&fit=crop")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 backdrop-blur-sm" />
        <div
          ref={heroRef}
          className="container mx-auto px-6 h-full flex items-center justify-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
              Shaping the Future
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              We transform visionary ideas into reality with clarity and
              purpose.
            </p>
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg px-8 py-3">
              Explore Our Story
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Founder & Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-gradient-to-b from-white to-cyan-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-10"
        >
          {/* Founders Section */}
          <motion.div variants={containerVariants} className="">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900 mb-8">
              Meet Our Visionaries
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

      {/* Team Section */}
      {/* <section className="bg-gray-50 py-20   ">
        <div className="container  px-6 max-w-7xl mx-auto ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Experts united by a shared passion for excellence.
            </p>
          </motion.div>
          <motion.div
            ref={teamRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {[
              {
                name: "John Smith",
                role: "CTO",
                img: "./Avatar-Photoroom.png",
              },
              {
                name: "Emily Brown",
                role: "Lead Designer",
                img: "./Avatar-Photoroom.png",
              },
              {
                name: "Michael Lee",
                role: "Marketing Head",
                img: "./Avatar-Photoroom.png",
              },
              {
                name: "Sarah Davis",
                role: "Project Manager",
                img: "./Avatar-Photoroom.png",
              },
            ].map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-5 text-center">
                    <motion.img
                      src={member.img}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto mb-3"
                      whileHover={{ scale: 1.05 }}
                    />
                    <CardTitle className="text-base font-medium text-gray-900">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-gray-500 text-sm">
                      {member.role}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section className="container mx-auto px-6 py-20 max-w-7xl ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Connect With Us
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Let's collaborate to bring your ideas to life.
          </p>
        </motion.div>
        <div
          ref={contactRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="pt-5">
              <h1 className="text-center text-xl">Request A Quote</h1>
              <p className="text-center text-sm text-gray-500">
                Complete the form below, and we’ll get back within one business
                day.
              </p>
            </div>
            <form
              onSubmit={handleContactSubmit}
              className="space-y-5 max-w-lg mx-auto mt-7"
            >
              <div className="">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  required
                  className="mt-1 rounded-lg border-gray-200 focus:ring-indigo-300"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  className="mt-1 rounded-lg border-gray-200 focus:ring-indigo-300"
                />
              </div>
              <div>
                <Label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={10}
                  placeholder="Your Message"
                  required
                  className="mt-1 rounded-lg border-gray-200 focus:ring-indigo-300"
                />
              </div>
              <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg">
                Send Message
              </Button>
            </form>
            {/* <div className="mt-6 space-y-3 text-gray-600 text-sm">
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-indigo-600" />
                info@company.com
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-indigo-600" />
                +1 (555) 123-4567
              </p>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                123 Innovation St, Tech City
              </p>
            </div> */}
          </motion.div>

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ConsultationCard />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
