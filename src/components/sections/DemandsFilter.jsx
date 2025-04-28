import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX } from 'react-icons/fi';
import { DEMAND_CATEGORIES, DEMAND_STATUSES } from '../../utils/constants';

const DemandsFilter = ({ 
  showFilters, 
  setShowFilters, 
  activeCategory, 
  setActiveCategory,
  activeStatus,
  setActiveStatus,
  clearFilters
}) => {
  const getCategoryColor = (id, isActive) => {
    if (id === 'all') return isActive ? 'bg-white text-black' : 'bg-white/10 text-white';
    
    const colorMap = {
      academic: isActive ? 'bg-blue-500 text-white' : 'bg-blue-500/20 text-blue-300',
      infrastructure: isActive ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-300',
      environment: isActive ? 'bg-green-500 text-white' : 'bg-green-500/20 text-green-300',
      welfare: isActive ? 'bg-pink-500 text-white' : 'bg-pink-500/20 text-pink-300',
      sports: isActive ? 'bg-orange-500 text-white' : 'bg-orange-500/20 text-orange-300'
    };
    
    return colorMap[id] || (isActive ? 'bg-gray-500 text-white' : 'bg-gray-500/20 text-gray-300');
  };
  
  const getStatusColor = (id, isActive) => {
    if (id === 'all') return isActive ? 'bg-white text-black' : 'bg-white/10 text-white';
    
    const colorMap = {
      pending: isActive ? 'bg-yellow-500 text-white' : 'bg-yellow-500/20 text-yellow-300',
      'in-progress': isActive ? 'bg-blue-500 text-white' : 'bg-blue-500/20 text-blue-300',
      approved: isActive ? 'bg-green-500 text-white' : 'bg-green-500/20 text-green-300',
      implemented: isActive ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-300',
      rejected: isActive ? 'bg-red-500 text-white' : 'bg-red-500/20 text-red-300'
    };
    
    return colorMap[id] || (isActive ? 'bg-gray-500 text-white' : 'bg-gray-500/20 text-gray-300');
  };

  const activeFilterCount = (activeCategory !== 'all' ? 1 : 0) + (activeStatus !== 'all' ? 1 : 0);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-2 px-4 text-white flex items-center justify-center hover:bg-white/10 transition-all relative"
        >
          <FiFilter className="mr-2" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
        
        {activeFilterCount > 0 && (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-gray-300 mb-3 text-sm font-medium">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {DEMAND_CATEGORIES.map((category) => (
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
              
              <div>
                <h4 className="text-gray-300 mb-3 text-sm font-medium">Status</h4>
                <div className="flex flex-wrap gap-2">
                  {DEMAND_STATUSES.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => setActiveStatus(status.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${getStatusColor(status.id, activeStatus === status.id)}`}
                    >
                      {status.label}
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

export default DemandsFilter;   