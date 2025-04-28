import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 relative z-50"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-7xl mx-auto px-3 py-2 text-white relative">
            <div className="flex items-center justify-center text-xs md:text-sm">
              <div className="hidden sm:flex items-center mr-3">
                <span className="flex h-2 w-2 relative mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="font-medium">ANNOUNCEMENT</span>
              </div>
              
              <p className="text-center flex-1 truncate">
                Spring festival registration now open! Applications due by May 15th
              </p>
              
              <button 
                className="ml-3 text-white/80 hover:text-white transition-colors"
                onClick={() => setIsVisible(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;