import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiSearch, FiX, FiPlus } from 'react-icons/fi';
import { STUDENT_DEMANDS } from '../utils/constants';
import DemandCard from '../components/sections/DemandCard';
import DemandModal from '../components/sections/DemandModal';
import DemandsFilter from '../components/sections/DemandsFilter';

const DemandsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredDemands, setFilteredDemands] = useState(STUDENT_DEMANDS);
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);

  useEffect(() => {
    // Filter demands based on search query and active filters
    const filtered = STUDENT_DEMANDS.filter(demand => {
      // Search query filter
      const searchMatch = searchQuery === '' || 
        demand.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demand.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demand.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const categoryMatch = activeCategory === 'all' || demand.category === activeCategory;
      
      // Status filter
      const statusMatch = activeStatus === 'all' || demand.status === activeStatus;
      
      return searchMatch && categoryMatch && statusMatch;
    });
    
    setFilteredDemands(filtered);
  }, [searchQuery, activeCategory, activeStatus]);

  const handleOpenModal = (demand) => {
    setSelectedDemand(demand);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDemand(null), 300); // Clear after animation completes
  };
  
  const clearFilters = () => {
    setActiveCategory('all');
    setActiveStatus('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-black py-24 px-4 sm:px-6 relative overflow-x-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>
      
      {/* Animated dots background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          style={{ opacity: headerOpacity, y: headerTranslateY }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">Demands</span>
          </motion.h1>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Track the status of student demands, proposals, and initiatives submitted to the administration.
          </motion.p>
        </motion.div>
        
        {/* Search Bar */}
        <motion.div 
          className="relative flex-grow mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search demands by title, description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <FiX />
            </button>
          )}
        </motion.div>
        
        {/* Filters */}
        <DemandsFilter 
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeStatus={activeStatus}
          setActiveStatus={setActiveStatus}
          clearFilters={clearFilters}
        />
        
        {/* Submit New Demand Button */}
        <motion.div 
          className="flex justify-end mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center">
            <FiPlus className="mr-2" />
            Submit New Demand
          </button>
        </motion.div>
        
        {/* Demand Cards */}
        {filteredDemands.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
              <FiSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white text-xl font-medium mb-2">No demands found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria.</p>
              <button 
                onClick={clearFilters}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredDemands.map((demand, index) => (
              <DemandCard 
                key={demand.id} 
                demand={demand} 
                onClick={handleOpenModal}
              />
            ))}
          </div>
        )}
        
        {/* Load More Button */}
        {filteredDemands.length > 0 && (
          <div className="flex justify-center mb-12">
            <button className="bg-white/5 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
              Load More
            </button>
          </div>
        )}
      </div>
      
      {/* Modal */}
      <DemandModal 
        demand={selectedDemand} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default DemandsPage;