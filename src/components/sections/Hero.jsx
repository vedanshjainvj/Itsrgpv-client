import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import image1 from '../../assets/img2.jpg'
import image2 from '../../assets/image2.JPG'
import image3 from '../../assets/image3.JPG'
import image4 from '../../assets/image1.jpg'

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const images = [
    {
      id: 1,
      src: "https://i.ibb.co/nBRQgmq/IMG-20221013-204524-526.jpg",
      alt: "Campus main building",
      gridArea: "1 / 1 / 3 / 3",
    },
    {
      id: 2,
      src: image3,
      alt: "Students collaborating",
      gridArea: "1 / 3 / 2 / 4",
    },
    {
      id: 3,
      src: image1,
      alt: "University library",
      gridArea: "1 / 4 / 3 / 5",
    },
    {
      id: 4,
      src: image4,
      alt: "Graduation day",
      gridArea: "2 / 3 / 3 / 4",
    },
    {
      id: 5,
      src: "https://www.rgpv.ac.in/images/slider/new_slide1.jpg",
      alt: "Science laboratory",
      gridArea: "3 / 1 / 4 / 3",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative min-h-screen flex items-center py-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 border border-white/10"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                }}
              >
                <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse"></div>
                <span className="text-sm font-medium text-white">Admissions Open 2025</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl sm:text-6xl font-extrabold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="block text-white leading-tight">It's RGPV</span>
                {/* <span className="block text-white leading-tight">Innovation</span> */}
                <span className="block gradient-text-pink leading-tight mt-1">
                  Meets Excellence
                </span>
              </motion.h1>
              
              <motion.p 
                className="mt-6 text-lg text-gray-300 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Join our vibrant student community that's redefining the future. Access cutting-edge resources, world-class faculty, and endless opportunities.
              </motion.p>
              
              <motion.div 
                className="mt-8 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button variant="pink" size="lg" rounded>
                  Apply Now
                </Button>
                <Button variant="outline" size="lg" rounded>
                  Explore Programs
                </Button>
              </motion.div>
              
              <motion.div 
                className="mt-8 md:mt-10 flex flex-wrap gap-x-12 gap-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {[
                  { number: "20k+", label: "Students" },
                  { number: "500+", label: "Courses" },
                  { number: "95%", label: "Placement" },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-3xl font-bold gradient-text-pink">{stat.number}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div
            className="relative w-full h-[450px] sm:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_5px_30px_-15px_rgba(236,72,153,0.3)]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/10 z-10"></div>
            
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-2 p-2">
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="relative overflow-hidden rounded-lg"
                  style={{ gridArea: image.gridArea }}
                  animate={{ 
                    opacity: index === activeIndex ? 1 : 0.4, 
                    scale: index === activeIndex ? 1 : 0.98 
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {index === activeIndex && (
                    <motion.div
                      className="absolute inset-0 border-2 border-white/40 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent py-6 px-4 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">#CampusLife</h3>
                  <p className="text-sm text-gray-300 mt-1">Experience our vibrant community</p>
                </div>
                
                <div className="flex space-x-3">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeIndex 
                          ? 'bg-white scale-100' 
                          : 'bg-white/30 scale-75 hover:scale-90 hover:bg-white/50'
                      }`}
                      onClick={() => handleDotClick(index)}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;