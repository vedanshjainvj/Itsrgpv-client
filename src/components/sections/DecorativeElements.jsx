import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundDecoration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 right-0 text-purple-500/10 opacity-60 transform translate-x-1/2 -translate-y-1/4"
      >
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <circle cx="300" cy="300" r="200" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 8" />
          <circle cx="300" cy="300" r="250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="12 12" />
          <circle cx="300" cy="300" r="300" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
        </motion.g>
      </svg>

      <svg
        width="800"
        height="800"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 text-blue-500/10 opacity-70 transform -translate-x-1/2 translate-y-1/4"
      >
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        >
          <path
            d="M400 0L494.5 288.6H800L552.7 467.2L647.2 755.8L400 577.1L152.8 755.8L247.3 467.2L0 288.6H305.5L400 0Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            fill="none"
          />
        </motion.g>
      </svg>

      <svg
        width="1000"
        height="1000"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-1/2 text-red-500/10 opacity-30 transform -translate-x-1/2 -translate-y-1/2"
      >
        <motion.g
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
        >
          <rect
            x="200"
            y="200"
            width="600"
            height="600"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="10 10"
            transform="rotate(45 500 500)"
          />
          <rect
            x="250"
            y="250"
            width="500"
            height="500"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="10 10"
            transform="rotate(45 500 500)"
          />
        </motion.g>
      </svg>

      <div className="absolute inset-0">
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.2 + 0.1,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const NssBadge = () => {
  return (
    <div className="absolute -left-3 top-4 transform -rotate-12 h-16 overflow-visible">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          delay: 0.8
        }}
        className="bg-blue-600 text-white px-3 py-1 rounded-lg shadow-lg flex items-center gap-2"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 2V4M12 2V4M6 2V4" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 8H20" stroke="white" strokeWidth="2" />
          <rect x="2" y="4" width="20" height="18" rx="2" stroke="white" strokeWidth="2" />
          <circle cx="12" cy="14" r="4" stroke="white" strokeWidth="2" />
          <path d="M12 12V14H14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="font-bold text-sm">Est. 1969</span>
      </motion.div>
    </div>
  );
};

export const NccBadge = () => {
  return (
    <div className="absolute -right-3 top-4 transform rotate-12 h-16 overflow-visible">
      <motion.div
        initial={{ scale: 0, rotate: 20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          delay: 1
        }}
        className="bg-red-600 text-white px-3 py-1 rounded-lg shadow-lg flex items-center gap-2"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 22V4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V22L12 19L4 22Z" stroke="white" strokeWidth="2" />
          <path d="M9 10L11 12L15 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-bold text-sm">Est. 1948</span>
      </motion.div>
    </div>
  );
};