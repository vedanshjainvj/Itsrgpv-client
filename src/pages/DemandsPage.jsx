import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiSearch, FiX, FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { STUDENT_DEMANDS } from '../utils/constants';
import DemandCard from '../components/sections/DemandCard';
import DemandModal from '../components/sections/DemandModal';
import DemandsFilter from '../components/sections/DemandsFilter';
import demandsApi from '../services/api/demands';

const DemandsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [demands, setDemands] = useState([]);
  const [filteredDemands, setFilteredDemands] = useState([]);
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
  
  // Fetch demands from API with pagination
  const fetchDemands = async (page = 1) => {
    try {
      setLoading(true);
      const limit = 3; // Define items per page
      console.log(`Fetching demands from API for page ${page}...`);
      const result = await demandsApi.getDemands(page, limit);
      
      if (result && result.demands) {
        // Handle case where we've gone past available data
        if (result.demands.length === 0 && page > 1) {
          console.log('No demands found for this page, likely past the end');
          setHasMore(false);
          // Go back to the last valid page if we went too far
          fetchDemands(page - 1);
          return;
        }
        
        setDemands(result.demands);
        setFilteredDemands(result.demands);
        
        // Update pagination state
        setCurrentPage(result.pagination.currentPage);
        setTotalPages(result.pagination.totalPages || 1);
        setHasMore(result.pagination.hasMore || false);
        
        // Log pagination state for debugging
        console.log(`Page ${result.pagination.currentPage}: Got ${result.demands.length} items of ${limit} requested`);
        console.log(`Total pages: ${result.pagination.totalPages}, Has more: ${result.pagination.hasMore}`);
        
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching demands:', err);
      setError('Failed to load demands. Using sample data instead.');
      setDemands(STUDENT_DEMANDS);
      setFilteredDemands(STUDENT_DEMANDS);
      
      // Reset pagination state on error
      setCurrentPage(1);
      setTotalPages(1);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchDemands(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Navigate to previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      fetchDemands(currentPage - 1);
    }
  };
  
  // Navigate to next page
  const goToNextPage = () => {
    if (hasMore) {
      fetchDemands(currentPage + 1);
    }
  };

  // Filter demands based on search query and active filters
  useEffect(() => {
    if (!demands.length) return;
    
    const filtered = demands.filter(demand => {
      // Search query filter
      const searchMatch = searchQuery === '' || 
        demand.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demand.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (demand.description && demand.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Category filter
      const categoryMatch = activeCategory === 'all' || demand.category === activeCategory;
      
      // Status filter
      const statusMatch = activeStatus === 'all' || demand.status === activeStatus;
      
      return searchMatch && categoryMatch && statusMatch;
    });
    
    setFilteredDemands(filtered);
  }, [searchQuery, activeCategory, activeStatus, demands]);

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
        {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white ml-4">Loading demands...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto relative z-10">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8">
              <p className="text-red-200">{error}</p>
            </div>
          )}
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
              <p className="text-gray-400 mb-6">
                {searchQuery || activeCategory !== 'all' || activeStatus !== 'all' ? 
                  'Try adjusting your search or filter criteria.' : 
                  'There are no demands in the system yet.'}
              </p>
              {(searchQuery || activeCategory !== 'all' || activeStatus !== 'all') && (
                <button 
                  onClick={clearFilters}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        ) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredDemands.map((demand) => (
              <DemandCard 
                key={demand.id} 
                demand={demand} 
                onClick={handleOpenModal}
              />
            ))}
          </div>
        )}
          {/* Pagination Controls */}
        {filteredDemands.length > 0 && (
          <div className="mb-12">
            <div className="flex justify-center items-center mt-10 space-x-4">
              <button 
                onClick={goToPrevPage}
                disabled={currentPage <= 1}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentPage <= 1 
                    ? 'bg-gray-700/30 cursor-not-allowed' 
                    : 'bg-purple-500/20 hover:bg-purple-500/30'
                } transition-colors`}
              >
                <FiChevronLeft className={`${currentPage <= 1 ? 'text-gray-600' : 'text-white'}`} />
              </button>
              
              <div className="text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                Page {currentPage}
              </div>
              
              <button 
                onClick={goToNextPage}
                disabled={!hasMore}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  !hasMore 
                    ? 'bg-gray-700/30 cursor-not-allowed' 
                    : 'bg-purple-500/20 hover:bg-purple-500/30'
                } transition-colors`}
              >
                <FiChevronRight className={`${!hasMore ? 'text-gray-600' : 'text-white'}`} />
              </button>
            </div>
            
            {/* Last Page Message */}
            {!hasMore && (
              <motion.div 
                className="text-center mt-4 text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="inline-block bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
                  You've reached the last page of demands
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
      )}
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