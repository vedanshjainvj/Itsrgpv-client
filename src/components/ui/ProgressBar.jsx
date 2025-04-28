import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, className = '' }) => {
  const getProgressColor = (value) => {
    if (value < 25) return 'from-red-500 to-orange-500';
    if (value < 50) return 'from-orange-500 to-yellow-500';
    if (value < 75) return 'from-yellow-500 to-green-500';
    return 'from-green-500 to-emerald-500';
  };

  return (
    <div className={`h-2 bg-white/5 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className={`h-full bg-gradient-to-r ${getProgressColor(progress)}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
};

export default ProgressBar;