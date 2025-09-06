import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimation } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Hospital",
    image: "./website_2.jpg",
  },
  {
    id: 2,
    title: "School webiste",
    image: "./website_3.jpg",
  },
  {
    id: 3,
    title: "GYM webiste",
    image: "./website_4.jpg",
  },
  {
    id: 4,
    title: "Dashboard",
    image: "./dasboard.jpg",
  },
  {
    id: 5,
    title: "E-commerce website",
    image: "./website_1.jpg",
  },
];

const ProjectCarousel = () => {
  const controls = useAnimation();
  const carouselRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const animateCarousel = async () => {
      const totalWidth = carouselRef.current.scrollWidth / 2;
      await controls.start({
        x: -totalWidth,
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        },
      });
    };
    animateCarousel();
  }, [controls]);

  const handleMouseEnter = () => {
    isPaused.current = true;
    controls.stop();
  };

  const handleMouseLeave = () => {
    if (isPaused.current) {
      isPaused.current = false;
      controls.start({
        x: -carouselRef.current.scrollWidth / 2,
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        },
      });
    }
  };

  return (
    <div className="w-full overflow-hidden py-8">
      <motion.div
        ref={carouselRef}
        className="flex"
        animate={controls}
        style={{ width: "200%" }}
      >
        {[...projects, ...projects].map((project, index) => (
          <motion.div
            key={`${project.id}-${index}`}
            className="flex-shrink-0 w-[320px] mx-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card className="relative overflow-hidden group border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-[200px] py-0">
              <CardContent className="p-0">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover p-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white text-xl font-bold tracking-tight">
                    {project.title}
                  </h3>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectCarousel;
