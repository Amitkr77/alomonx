"use client";
import CarouselCard from "@/components/CarouselCard";
import { ComparisonSection } from "@/components/ComparisonSection";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ProjectCarousel from "@/components/ProjectCarousel";

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

export default function Home() {
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

  return (
    <div className="">
      <div
        className="relative min-h-screen flex items-center justify-center bg-blue-800 overflow-hidden"
        style={{
          backgroundImage: "url('/Component-23.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(135, 206, 250, 0.6)",
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg otimizesystematic.combg-gradient-to-t from-gray-100/80 to-blue-100/30"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Tagline */}
          <p
            className="text-sm md:text-base font-semibold text-blue-700 uppercase tracking-[0.15em] mb-5 animate-rise"
            style={{ animationDelay: "0.1s" }}
          >
            Redefine Your Impact
          </p>

          {/* Main Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 animate-rise"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="block">Transform with</span>
            <span className="block relative">
              Alomonx Technology
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 scale-x-0 animate-grow origin-center"></span>
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-12 animate-rise"
            style={{ animationDelay: "0.5s" }}
          >
            Elevate your brand with powerful digital campaigns and innovative
            software solutions.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-rise"
            style={{ animationDelay: "0.7s" }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-sm hover:shadow-md"
            >
              Begin Your Transformation
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Our Expertise
            </Link>
          </div>
        </div>

        {/* Inline CSS for animations */}
        <style jsx>{`
          @keyframes rise {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes dotPulse {
            0% {
              opacity: 0.5;
            }
            50% {
              opacity: 0.3;
            }
            100% {
              opacity: 0.5;
            }
          }
          @keyframes grow {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }
          .animate-rise {
            animation: rise 0.7s ease-out forwards;
          }
          .animate-dot-pulse {
            animation: dotPulse 10s ease-in-out infinite;
          }
          .animate-grow {
            animation: grow 0.6s ease-out forwards;
            animation-delay: 0.5s;
          }
        `}</style>
      </div>
      {/* <CarouselCard/> */}
      {/* video */}
      {/* <div className="container mx-auto px-4 py-8">
        <div className="relative max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <video className="w-full h-auto" autoPlay muted loop playsInline>
            <source src="./hero_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div> */}

      <ProjectCarousel />
      <Services />
      <ComparisonSection />
      <CarouselCard />
      <section className="py-16 bg-gradient-to-b from-white to-cyan-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Meet Our Visionaries
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
              The leaders behind Alomonx Technology, blending innovation and
              strategy to shape the future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-4">
                  <motion.img
                    loading="lazy"
                    src={founder.image}
                    alt={founder.name}
                    className="rounded-full w-full h-full object-cover border-4 border-cyan-200 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
                    onError={(e) =>
                      (e.target.src = "/founders/placeholder.jpg")
                    }
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Optional social icons or overlay */}
                  <div className="absolute -bottom-2 right-2 bg-white shadow rounded-full p-1">
                    {/* Example: LinkedIn icon */}
                    <svg
                      className="h-5 w-5 text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761...z" />
                    </svg>
                  </div>
                </div>

                <Card className="border-none shadow-none bg-transparent">
                  <CardContent className="p-0">
                    <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                      {founder.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-cyan-600 mb-3">
                      {founder.role}
                    </CardDescription>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                      {founder.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      <Testimonials />
    </div>
  );
}
