import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS } from '../../utils/constants';
import achievementsApi from '../../services/api/achievements';

const AchievementsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch achievements from API
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setIsLoading(true);
        const response = await achievementsApi.getAchievements();
        if (response && response.achievements && response.achievements.length > 0) {
          setAchievements(response.achievements);
        } else {
          // Fallback to static data if API returns empty
          console.log('No data from API, using static data');
          setAchievements(ACHIEVEMENTS);
        }
      } catch (err) {
        console.error('Error fetching achievements:', err);
        // Use static data on error
        setAchievements(ACHIEVEMENTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  useEffect(() => {
    if (!autoplay || achievements.length === 0) return;
    
    const timer = setTimeout(() => {
      setDirection(1);
      setActiveIndex((prevIndex) => (prevIndex + 1) % achievements.length);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, [activeIndex, autoplay, achievements.length]);

  const handleNext = () => {
    setAutoplay(false);
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % achievements.length);
  };

  const handlePrev = () => {
    setAutoplay(false);
    setDirection(-1);
    setActiveIndex((prevIndex) => (prevIndex - 1 + achievements.length) % achievements.length);
  };

  const handleDotClick = (index) => {
    if (index === activeIndex) return;
    setAutoplay(false);
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };


  // Loading state
  if (isLoading) {
    return (
      <section className="py-12 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-center items-center py-16">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-3 text-gray-300">Loading achievements...</p>
          </div>
        </div>
      </section>
    );
  }


  // If no achievements available
  if (achievements.length === 0) {
    return (
      <section className="py-12 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center py-16">
            <p className="text-gray-300">No achievements found.</p>
          </div>
        </div>
      </section>
    );
  }

  const currentAchievement = achievements[activeIndex];


  return (
    <section className="py-12 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-purple-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-blue-500/5 rounded-full blur-[120px] animate-pulse"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-1"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></div>
              <span className="text-sm text-purple-400 font-medium">Pride of RGPV</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Student Achievements</h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="hidden md:flex gap-2"
          >
            {achievements.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-purple-500 w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>
        
        <div className="relative">
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
              className="w-full"
            >
              <div className="bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/10 h-full">
                <div className="grid grid-cols-12 h-full">
                  <div className="col-span-12 md:col-span-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/70 to-transparent z-10 md:hidden"></div>
                    <div className="w-full h-[220px] md:h-[280px] relative">
                      <img 
                        src={currentAchievement.profileImage} 
                        alt={currentAchievement.name} 
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSunset&psig=AOvVaw3fMdmIZj3VdFCIhCd-0Kkh&ust=1748528272740000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIj-tcitxo0DFQAAAAAdAAAAABAE";
                        }}
                      />
                    </div>
                    <div className="absolute bottom-3 left-3 z-20 md:hidden">
                      <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-0.5 rounded-full text-xs">
                        {currentAchievement.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="col-span-12 md:col-span-8 p-4 md:p-6 flex flex-col">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="hidden md:block mb-3">
                          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-0.5 rounded-full text-xs">
                            {currentAchievement.category}
                          </span>
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{currentAchievement.name}</h3>
                        <p className="text-gray-400 text-sm mb-2">{currentAchievement.branch}</p>
                        
                        <h4 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                          {currentAchievement.achievement}
                        </h4>
                        
                        <p className="text-gray-300 text-sm">
                          {currentAchievement.description}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                          <span className="text-white text-sm">{currentAchievement.year}</span>
                        </div>
                        
                        <button className="text-white bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-lg text-sm border border-white/10">
                          Read More
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors border border-white/10 z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors border border-white/10 z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="flex justify-center mt-4 md:hidden">
          <div className="flex space-x-2">
            {achievements.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 w-4' 
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