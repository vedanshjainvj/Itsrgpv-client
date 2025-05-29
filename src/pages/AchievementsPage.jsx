import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiSearch, FiX, FiAward, FiArrowRight, FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { STUDENT_ACHIEVEMENTS } from '../utils/constants';
import AchievementCard from '../components/sections/AchievementCard';
import AchievementModal from '../components/sections/AchievementModal';
import AchievementsFilter from '../components/sections/AchievementsFilter';
import achievementsApi from '../services/api/achievements';

const AchievementsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeBranch, setActiveBranch] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [filteredAchievements, setFilteredAchievements] = useState([]);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
  // Calculate filter count
  const filterCount = 
    (activeCategory !== 'all' ? 1 : 0) + 
    (activeBranch !== 'all' ? 1 : 0) + 
    (activeYear !== 'all' ? 1 : 0);  // Fetch achievements from API with pagination
  const fetchAchievements = async (page = 1) => {
    try {
      setLoading(true);
      const limit = 2; // Define items per page
      console.log(`Fetching achievements from API for page ${page}...`);
      const result = await achievementsApi.getAchievements(page, limit); // Getting 3 achievements per page
      
      if (result && result.achievements) {
        // Handle case where we've gone past available data
        if (result.achievements.length === 0 && page > 1) {
          console.log('No achievements found for this page, likely past the end');
          setHasMore(false);
          // Go back to the last valid page if we went too far
          fetchAchievements(page - 1);
          return;
        }
        
        setAchievements(result.achievements);
        setFilteredAchievements(result.achievements);
          // Update pagination state
        setCurrentPage(result.pagination.currentPage);
        setTotalPages(result.pagination.totalPages || 1);
        setHasMore(result.pagination.hasMore || false);
        
        // Log pagination state for debugging
        console.log(`Page ${result.pagination.currentPage}: Got ${result.achievements.length} items of ${limit} requested`);
        console.log(`Total pages: ${result.pagination.totalPages}, Has more: ${result.pagination.hasMore}`);
        
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching achievements:', err);
      setError('Failed to load achievements. Using sample data instead.');
      setAchievements(STUDENT_ACHIEVEMENTS);
      setFilteredAchievements(STUDENT_ACHIEVEMENTS);
      
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
    fetchAchievements(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Navigate to previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      fetchAchievements(currentPage - 1);
    }
  };
  
  // Navigate to next page
  const goToNextPage = () => {
    if (hasMore) {
      fetchAchievements(currentPage + 1);
    }
  };

  // Filter achievements based on search query and active filters
  useEffect(() => {
    if (!achievements.length) return;
    
    const filtered = achievements.filter(achievement => {
      // Search query filter
      const searchMatch = searchQuery === '' || 
        achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.achievement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (achievement.headline && achievement.headline.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (achievement.description && achievement.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (achievement.skills && achievement.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())));
      
      // Category filter
      const categoryMatch = activeCategory === 'all' || achievement.category === activeCategory;
      
      // Branch filter
      const branchMatch = activeBranch === 'all' || achievement.branch === activeBranch;
      
      // Year filter
      const yearMatch = activeYear === 'all' || 
        (achievement.year && achievement.year.toString() === activeYear);
      
      return searchMatch && categoryMatch && branchMatch && yearMatch;
    });
    
    setFilteredAchievements(filtered);
  }, [searchQuery, activeCategory, activeBranch, activeYear, achievements]);

  const handleViewDetails = (achievement) => {
    setSelectedAchievement(achievement);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAchievement(null), 300); // Clear after animation completes
  };
  
  const clearFilters = () => {
    setActiveCategory('all');
    setActiveBranch('all');
    setActiveYear('all');
    setSearchQuery('');
  };
  // Get categories with counts
  const getCategoryCounts = () => {
    const counts = {};
    achievements.forEach(achievement => {
      counts[achievement.category] = (counts[achievement.category] || 0) + 1;
    });
    return counts;
  };
  
  const categoryCounts = getCategoryCounts();
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
            Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">Achievements</span>
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
            Celebrating excellence and outstanding accomplishments of our students
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
            placeholder="Search achievements by name, title, description..."
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
        <AchievementsFilter 
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeBranch={activeBranch}
          setActiveBranch={setActiveBranch}
          activeYear={activeYear}
          setActiveYear={setActiveYear}
          clearFilters={clearFilters}
          filterCount={filterCount}
        />
        
        {/* Categories Section (visible when no search or filters) */}
        {searchQuery === '' && activeCategory === 'all' && activeBranch === 'all' && activeYear === 'all' && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
              <h2 className="text-2xl font-bold text-white">Achievement Categories</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">              {Object.entries(categoryCounts).map(([category, count], index) => {
                const colorMap = {
                  academic: 'from-blue-500 to-cyan-400',
                  research: 'from-purple-500 to-violet-400',
                  competition: 'from-green-500 to-emerald-400',
                  innovation: 'from-yellow-500 to-amber-400',
                  sports: 'from-red-500 to-rose-400',
                  cultural: 'from-pink-500 to-fuchsia-400',
                  social: 'from-orange-500 to-amber-400'
                };
                
                return (
                  <motion.button
                    key={category}
                    className={`relative p-6 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:shadow-lg transition-all group flex flex-col items-start`}
                    onClick={() => setActiveCategory(category)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-r ${colorMap[category]} mb-3`}>
                      <FiAward className="text-white" size={18} />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-1">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                    
                    <div className="text-gray-400 text-sm mb-2">{count} achievements</div>
                    
                    <div className="mt-auto flex items-center text-sm text-purple-400 pt-2 group-hover:translate-x-1 transition-transform">
                      View All
                      <FiArrowRight className="ml-1" size={14} />
                    </div>
                    
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${colorMap[category]} w-0 group-hover:w-full transition-all duration-300`}></div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
        
        {/* Main Achievement Grid */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Title & Result Count */}
          {(searchQuery !== '' || activeCategory !== 'all' || activeBranch !== 'all' || activeYear !== 'all') && (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-white">
                  {filteredAchievements.length} {filteredAchievements.length === 1 ? 'Achievement' : 'Achievements'} Found
                </h2>
              </div>
            </div>
          )}
          
          {filteredAchievements.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
                <FiSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white text-xl font-medium mb-2">No achievements found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria.</p>
                <button 
                  onClick={clearFilters}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </motion.div>          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAchievements.map((achievement) => (
                  <AchievementCard 
                    key={achievement.id} 
                    achievement={achievement} 
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
              
              {/* Pagination Controls */}
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
                    You've reached the last page of achievements
                  </p>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
        
        {/* Submit Your Achievement Section */}
        <motion.div 
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-white/10 p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-pink-500/10 rounded-full blur-[80px]"></div>
            <div className="w-96 h-96 bg-purple-500/10 rounded-full blur-[80px] -ml-20"></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Have an achievement to share?</h3>
              <p className="text-gray-300 max-w-xl">
                We want to celebrate your success! Submit your achievement and inspire others in our community.
              </p>
            </div>
            
            <motion.button 
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Achievement
            </motion.button>
          </div>
        </motion.div>
      </div>
      )}
      {/* Achievement Modal */}
      <AchievementModal 
        achievement={selectedAchievement} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default AchievementsPage;