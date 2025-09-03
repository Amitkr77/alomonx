import React, { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {

  const testimonialsData = [
    {
      name: "Alice Johnson",
      role: "Marketing Director",
      quote:
        "Their innovative solutions transformed our business, boosting engagement by 40%!",
      date: "August 2025",
    },
    {
      name: "Mark Thompson",
      role: "Startup Founder",
      quote:
        "Exceptional service and quality. The team delivered beyond our expectations.",
      date: "July 2025",
    },
    {
      name: "Sophie Lee",
      role: "E-commerce Manager",
      quote:
        "Professional, reliable, and creative. Our website now stands out in the market!",
      date: "June 2025",
    },
        {
      name: "Sophie Lee",
      role: "E-commerce Manager",
      quote:
        "Professional, reliable, and creative. Our website now stands out in the market!",
      date: "June 2025",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light tracking-wide text-gray-800">
            Our Clients’ Stories
          </h2>
          <p className="mt-3 text-lg text-gray-500 font-light max-w-md mx-auto">
            Moments that define our journey, shared by those we’ve worked with.
          </p>
        </div>
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="flex space-x-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide justify-center items-center p-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {testimonialsData.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 snap-center relative group "
                role="article"
                aria-labelledby={`testimonial-${index}-name`}
              >
                <div className="relative border border-gray-100 rounded-xl p-6 shadow-sm group-hover:shadow-md transition-shadow duration-300 h-64 flex flex-col justify-between ">
                  <div>
                    <div className="flex justify-center mb-4">
                      <MessageCircle
                        className="h-6 w-6 text-teal-400"
                        aria-hidden="true"
                      />
                    </div>
                    <blockquote className="text-center">
                      <p className="text-base text-gray-600 font-light leading-relaxed mb-4">
                        "{testimonial.quote}"
                      </p>
                    </blockquote>
                  </div>
                  <div className="text-center">
                    <h3
                      id={`testimonial-${index}-name`}
                      className="text-lg font-medium text-gray-800"
                    >
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-teal-500 font-light">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {testimonial.date}
                    </p>
                  </div>
                  {/* Timeline Dot */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-teal-400 rounded-full group-hover:scale-125 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
