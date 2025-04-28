import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiMapPin, FiCode, FiBook } from 'react-icons/fi';

const AchievementCard = ({ achievement, onViewDetails }) => {
  const getCategoryColor = (category) => {
    const categoryColors = {
      academic: 'from-blue-500 to-cyan-400 shadow-blue-500/20',
      research: 'from-purple-500 to-violet-400 shadow-purple-500/20',
      competition: 'from-green-500 to-emerald-400 shadow-green-500/20',
      innovation: 'from-yellow-500 to-amber-400 shadow-yellow-500/20',
      sports: 'from-red-500 to-rose-400 shadow-red-500/20',
      cultural: 'from-pink-500 to-fuchsia-400 shadow-pink-500/20',
      social: 'from-orange-500 to-amber-400 shadow-orange-500/20'
    };
    
    return categoryColors[category] || 'from-gray-500 to-slate-400 shadow-gray-500/20';
  };
  
  return (
    <motion.div 
      className="group h-full rounded-2xl overflow-hidden bg-black/50 backdrop-blur-sm border border-white/10 hover:shadow-lg transition-all relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className={`bg-gradient-to-r ${getCategoryColor(achievement.category)} text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg`}>
          {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
        </div>
      </div>
      
      {/* Profile Section */}
      <div className="relative p-5 flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 p-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
            <img 
              src={achievement.profileImage} 
              alt={achievement.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold">{achievement.name}</h3>
            <div className="flex items-center space-x-3 text-sm">
              <span className="text-gray-300 flex items-center">
                <FiCode className="mr-1" size={14} />
                {achievement.branch}
              </span>
              <span className="text-gray-300 flex items-center">
                <FiBook className="mr-1" size={14} />
                {achievement.year}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-5 pt-0">
        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all">
          {achievement.headline}
        </h4>
        
        <p className="text-gray-300 mb-6 line-clamp-3">
          {achievement.description}
        </p>
        
        <div className="flex flex-col space-y-3 mb-6">
          <div className="flex items-center text-gray-400 text-sm">
            <FiAward className="mr-2 text-purple-400" size={16} />
            <span>{achievement.achievement}</span>
          </div>
          
          {achievement.date && (
            <div className="flex items-center text-gray-400 text-sm">
              <FiCalendar className="mr-2 text-blue-400" size={16} />
              <span>{achievement.date}</span>
            </div>
          )}
          
          {achievement.location && (
            <div className="flex items-center text-gray-400 text-sm">
              <FiMapPin className="mr-2 text-pink-400" size={16} />
              <span>{achievement.location}</span>
            </div>
          )}
        </div>
        
        {/* Skills/Tags */}
        {achievement.skills && achievement.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {achievement.skills.slice(0, 3).map((skill, index) => (
              <motion.span
                key={index}
                className="bg-white/5 text-gray-300 px-2 py-0.5 rounded text-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                {skill}
              </motion.span>
            ))}
            {achievement.skills.length > 3 && (
              <motion.span
                className="bg-white/5 text-gray-300 px-2 py-0.5 rounded text-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                +{achievement.skills.length - 3} more
              </motion.span>
            )}
          </div>
        )}
        
        {/* View Details Button */}
        <button 
          onClick={() => onViewDetails(achievement)}
          className={`w-full py-2.5 text-center text-white rounded-lg text-sm font-medium transition-all bg-gradient-to-r ${getCategoryColor(achievement.category)} hover:shadow-lg`}
        >
          View Details
        </button>
      </div>
      
      {/* Bottom Border Animation */}
      <motion.div 
        className={`h-0.5 bg-gradient-to-r ${getCategoryColor(achievement.category)} w-0 group-hover:w-full transition-all duration-300`}
      />
    </motion.div>
  );
};

export default AchievementCard;