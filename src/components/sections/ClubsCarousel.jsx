import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CLUBS } from '../../utils/constants';

const ClubsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % CLUBS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + CLUBS.length) % CLUBS.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const club = CLUBS[currentIndex];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-pink-500/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Clubs & Societies</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Discover the vibrant student community that makes our campus life exciting through various clubs and societies.
          </p>
        </div>
        
        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative rounded-2xl overflow-hidden h-80 lg:h-96">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20 z-10"></div>
                  <img 
                    src={club.coverImage} 
                    alt={club.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 z-20 flex items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white p-1 bg-black/30 backdrop-blur-sm">
                      <img 
                        src={club.logo} 
                        alt={`${club.name} logo`} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-300 mb-1">Established {club.established}</p>
                        <p className="text-white text-sm">{club.members} Active Members</p>
                      </div>
                      <div className="flex space-x-3">
                        {Object.entries(club.socialLinks).map(([platform, url]) => (
                          <a 
                            key={platform} 
                            href={url}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                          >
                            <span className="text-white text-sm">{platform.charAt(0).toUpperCase()}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 inline-block px-4 py-1 rounded-full text-sm mb-4">
                      {club.events.join(' • ')}
                    </div>
                    <h3 className="text-3xl font-bold mb-2 text-white">{club.name}</h3>
                    <p className="text-xl text-gray-300 mb-6 font-light italic">"{club.tagline}"</p>
                    <p className="text-gray-300 mb-8">{club.description}</p>
                    
                    <h4 className="text-white font-semibold mb-4">Featured Events:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {club.events.map((event, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                          <p className="text-white text-center">{event}</p>
                        </div>
                      ))}
                    </div>
                    
                    <button className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3 text-white hover:bg-white/20 transition-colors">
                      Learn More About {club.name}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-3">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex space-x-2">
                {CLUBS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubsCarousel;