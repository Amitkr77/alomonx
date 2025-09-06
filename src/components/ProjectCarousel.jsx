import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useAnimation } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Project One',
    image: 'https://images.unsplash.com/photo-1516321318423-4b6a0d41a5c4',
  },
  {
    id: 2,
    title: 'Project Two',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  },
  {
    id: 3,
    title: 'Project Three',
    image: 'https://images.unsplash.com/photo-1516321318423-4b6a0d41a5c4',
  },
  {
    id: 4,
    title: 'Project Four',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  },
  {
    id: 5,
    title: 'Project Five',
    image: 'https://images.unsplash.com/photo-1516321318423-4b6a0d41a5c4',
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
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
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
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
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
        style={{ width: '200%' }}
      >
        {[...projects, ...projects].map((project, index) => (
          <motion.div
            key={`${project.id}-${index}`}
            className="flex-shrink-0 w-[320px] mx-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card className="relative overflow-hidden group border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[220px] object-cover"
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