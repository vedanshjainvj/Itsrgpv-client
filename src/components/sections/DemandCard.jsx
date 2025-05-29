import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUsers, FiArrowRight } from 'react-icons/fi';
import StatusBadge from '../ui/StatusBadge';
import ProgressBar from '../ui/ProgressBar';

const DemandCard = ({ demand, onClick }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      academic: 'bg-blue-500/10 border-blue-500/20',
      infrastructure: 'bg-purple-500/10 border-purple-500/20',
      environment: 'bg-green-500/10 border-green-500/20',
      welfare: 'bg-pink-500/10 border-pink-500/20',
      sports: 'bg-orange-500/10 border-orange-500/20'
    };
    
    return categoryColors[category] || 'bg-gray-500/10 border-gray-500/20';
  };

  return (
    <motion.div
      className={`${getCategoryColor(demand.category)} backdrop-blur-sm border rounded-xl overflow-hidden hover:shadow-lg transition-all`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <StatusBadge status={demand.status} />
          <motion.div 
            className="bg-white/10 text-white rounded-full px-2 py-1 text-xs flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FiUsers className="mr-1" size={12} />
            438 supporters
          </motion.div>
        </div>
        
        <h3 className="text-white text-xl font-bold mb-2">{demand.title}</h3>
        <p className="text-gray-300 mb-4 line-clamp-2">{demand.shortDescription}</p>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-400 text-xs">Progress</span>
            <span className="text-gray-400 text-xs">{demand.progress}%</span>
          </div>
          <ProgressBar progress={demand.progress} />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-gray-400 text-sm flex items-center">
            <FiCalendar size={14} className="mr-1" />
            {formatDate(demand.dateSubmitted)}
          </div>
          
          <motion.button
            onClick={() => onClick(demand)}
            className="flex items-center text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
            <FiArrowRight className="ml-1" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DemandCard;
