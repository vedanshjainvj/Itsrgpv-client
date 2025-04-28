import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageCarousel = ({ 
  images, 
  interval = 5000, 
  aspectRatio = "16/9", 
  height = "h-64", 
  overlayColor, 
  label,
  mobileHeight = "h-48" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, interval);
    };

    startAutoPlay();

    if (isHovered) {
      clearInterval(autoPlayRef.current);
    } else {
      startAutoPlay();
    }

    return () => {
      clearInterval(autoPlayRef.current);
    };
  }, [images.length, interval, isHovered]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <div className="flex justify-center w-full">
      <div 
        className={`relative rounded-xl overflow-hidden ${height} md:${height} ${mobileHeight} sm:${mobileHeight} w-full max-w-full mx-auto`}
        style={{ aspectRatio }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`absolute inset-0 ${overlayColor || "bg-gradient-to-br from-blue-600/30 to-transparent"} z-10 mix-blend-overlay`}></div>
        
        {label && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/40 backdrop-blur-sm text-white text-xs py-1 px-2 sm:px-3 rounded-full z-20">
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-1 sm:mr-2 animate-pulse"></span>
              <span className="text-xs">{label}</span>
            </span>
          </div>
        )}

        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={currentIndex}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt || "Carousel image"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = images[currentIndex].fallback || "https://149842033.v2.pressablecdn.com/wp-content/uploads/2019/09/css-card-flip-1000x750.jpg";
              }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1.5 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-white w-3 sm:w-4" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;