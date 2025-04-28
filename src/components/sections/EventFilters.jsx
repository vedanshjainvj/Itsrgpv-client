import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiCalendar, FiClock, FiStar } from 'react-icons/fi';
import { EVENT_CATEGORIES } from '../../utils/constants';

const EventsFilter = ({ 
  showFilters,
  setShowFilters,
  activeCategory,
  setActiveCategory,
  timeFilter,
  setTimeFilter,
  showFeaturedOnly,
  setShowFeaturedOnly,
  clearFilters,
  filterCount
}) => {
  const getCategoryColor = (id, isActive) => {
    if (id === 'all') return isActive ? 'bg-white text-black' : 'bg-white/10 text-white';
    
    const category = EVENT_CATEGORIES.find(cat => cat.id === id);
    if (!category) return isActive ? 'bg-gray-500 text-white' : 'bg-gray-500/20 text-gray-300';
    
    const colorMap = {
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-500/20 text-blue-300',
      pink: isActive ? 'bg-pink-500 text-white' : 'bg-pink-500/20 text-pink-300',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-500/20 text-green-300',
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-300',
      yellow: isActive ? 'bg-yellow-500 text-white' : 'bg-yellow-500/20 text-yellow-300',
      orange: isActive ? 'bg-orange-500 text-white' : 'bg-orange-500/20 text-orange-300'
    };
    
    return colorMap[category.color];
  };
  
  const getTimeFilterColor = (id, isActive) => {
    const colorMap = {
      'all': isActive ? 'bg-white text-black' : 'bg-white/10 text-white',
      'upcoming': isActive ? 'bg-blue-500 text-white' : 'bg-blue-500/20 text-blue-300',
      'this-month': isActive ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-300',
      'this-week': isActive ? 'bg-pink-500 text-white' : 'bg-pink-500/20 text-pink-300',
      'past': isActive ? 'bg-gray-500 text-white' : 'bg-gray-500/20 text-gray-300'
    };
    
    return colorMap[id] || (isActive ? 'bg-gray-500 text-white' : 'bg-gray-500/20 text-gray-300');
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-2 px-4 text-white flex items-center justify-center hover:bg-white/10 transition-all relative"
        >
          <FiFilter className="mr-2" />
          <span>Filters</span>
          {filterCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {filterCount}
            </span>
          )}
        </button>
        
        {filterCount > 0 && (
          <button 
            onClick={clearFilters}
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center"
          >
            <FiX className="mr-1" />
            <span>Clear all filters</span>
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            className="mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <h4 className="text-gray-300 mb-3 text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-2"></span>
                  Event Category
                </h4>
                <div className="flex flex-wrap gap-2">
                  {EVENT_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${getCategoryColor(category.id, activeCategory === category.id)}`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Time Filter */}
              <div>
                <h4 className="text-gray-300 mb-3 text-sm font-medium flex items-center">
                  <FiCalendar className="mr-2 text-purple-400" size={14} />
                  Time Frame
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'All Time' },
                    { id: 'upcoming', label: 'Upcoming' },
                    { id: 'this-month', label: 'This Month' },
                    { id: 'this-week', label: 'This Week' },
                    { id: 'past', label: 'Past Events' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setTimeFilter(option.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${getTimeFilterColor(option.id, timeFilter === option.id)}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Featured Filter */}
              <div>
                <h4 className="text-gray-300 mb-3 text-sm font-medium flex items-center">
                  <FiStar className="mr-2 text-yellow-400" size={14} />
                  Featured
                </h4>
                <button
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    showFeaturedOnly 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {showFeaturedOnly ? 'Featured Only' : 'Show All'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsFilter;