import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS } from '../../utils/constants';

const AchievementsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % ACHIEVEMENTS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prevIndex) => (prevIndex - 1 + ACHIEVEMENTS.length) % ACHIEVEMENTS.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-[80px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-[80px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Achievements</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Our students consistently achieve excellence in academics, research, competitions, and more.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
            >
              <div className="bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-[0_5px_30px_-15px_rgba(139,92,246,0.3)] border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0">
                  <div className="md:col-span-2 relative h-60 md:h-auto">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/70 to-transparent z-10 md:hidden"></div>
                    <img 
                      src={ACHIEVEMENTS[activeIndex].image} 
                      alt={ACHIEVEMENTS[activeIndex].student} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden z-20">
                      <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs">
                        {ACHIEVEMENTS[activeIndex].category}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-2">{ACHIEVEMENTS[activeIndex].student}</h3>
                      <p className="text-white/80 text-sm">{ACHIEVEMENTS[activeIndex].department}</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 p-6 md:p-8">
                    <div className="hidden md:block">
                      <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs">
                        {ACHIEVEMENTS[activeIndex].category}
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-3">{ACHIEVEMENTS[activeIndex].student}</h3>
                      <p className="text-white/80">{ACHIEVEMENTS[activeIndex].department}</p>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                        {ACHIEVEMENTS[activeIndex].achievement}
                      </h4>
                      <p className="text-gray-300 mb-6">
                        {ACHIEVEMENTS[activeIndex].description}
                      </p>
                      <div className="flex justify-between items-center mt-8">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                          <span className="text-white">{ACHIEVEMENTS[activeIndex].year}</span>
                        </div>
                        <button className="text-white bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg border border-white/10">
                          Read Story
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors border border-white/10 z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors border border-white/10 z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {ACHIEVEMENTS.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsCarousel;
