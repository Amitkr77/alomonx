"use client";
import CarouselCard from "@/components/CarouselCard";
import { ComparisonSection } from "@/components/ComparisonSection";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";

export default function Home() {
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
              href=""
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
      <Services />
      <ComparisonSection />
      <CarouselCard />
      <Testimonials/>
    </div>
  );
}
