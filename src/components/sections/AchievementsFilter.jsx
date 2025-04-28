import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX } from 'react-icons/fi';
import { ACHIEVEMENT_CATEGORIES, BRANCH_OPTIONS, YEAR_OPTIONS } from '../../utils/constants';

const AchievementsFilter = ({ 
  showFilters,
  setShowFilters,
  activeCategory,
  setActiveCategory,
  activeBranch,
  setActiveBranch,
  activeYear,
  setActiveYear,
  clearFilters,
  filterCount
}) => {
  const getCategoryColor = (id, isActive) => {
    if (id === 'all') return isActive ? 'bg-white text-black' : 'bg-white/10 text-white';
    
    const category = ACHIEVEMENT_CATEGORIES.find(cat => cat.id === id);
    if (!category) return isActive ? 'bg-gray-500 text-white' : 'bg-gray-500/20 text-gray-300';
    
    const colorMap = {
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-500/20 text-blue-300',
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-300',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-500/20 text-green-300',
      yellow: isActive ? 'bg-yellow-500 text-white' : 'bg-yellow-500/20 text-yellow-300',
      red: isActive ? 'bg-red-500 text-white' : 'bg-red-500/20 text-red-300',
      pink: isActive ? 'bg-pink-500 text-white' : 'bg-pink-500/20 text-pink-300',
      orange: isActive ? 'bg-orange-500 text-white' : 'bg-orange-500/20 text-orange-300'
    };
    
    return colorMap[category.color];
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
                  Achievement Type
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ACHIEVEMENT_CATEGORIES.map((category) => (
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
              
              {/* Branch Filter */}
              <div>
                <h4 className="text-gray-300 mb-3 text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-2"></span>
                  Branch
                </h4>
                <div className="flex flex-wrap gap-2">
                  {BRANCH_OPTIONS.map((branch) => (
                    <button
                      key={branch.id}
                      onClick={() => setActiveBranch(branch.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        activeBranch === branch.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {branch.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Year Filter */}
              <div>
                <h4 className="text-gray-300 mb-3 text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2"></span>
                  Year
                </h4>
                <div className="flex flex-wrap gap-2">
                  {YEAR_OPTIONS.map((year) => (
                    <button
                      key={year.id}
                      onClick={() => setActiveYear(year.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        activeYear === year.id
                          ? 'bg-green-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {year.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementsFilter;