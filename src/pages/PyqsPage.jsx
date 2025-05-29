import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiSearch, FiFilter, FiX, FiClock, FiCalendar, FiBookOpen, FiCode, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { SAMPLE_PYQS } from '../utils/constants';
import pyqsApi from '../services/api/pyqs';


const YEARS = ['2023', '2022', '2021', '2020'];
const BRANCHES = ['CSE', 'ECE', 'ME', 'CE', 'EE'];
const PAPER_TYPES = ['end-sem', 'mid-sem', 'assignment', 'back-paper'];

const PyqsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    years: [],
    branches: [],
    types: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [pyqs, setPyqs] = useState([]);
  const [filteredPyqs, setFilteredPyqs] = useState([]);
  const [downloadingId, setDownloadingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch PYQs with pagination
  const fetchPyqs = async (page = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Convert frontend filter format to backend format
      const apiFilters = {};
      
      if (activeFilters.years.length > 0) {
        apiFilters.year = activeFilters.years[0]; // Use first selected year
      }
      
      if (activeFilters.branches.length > 0) {
        apiFilters.branch = activeFilters.branches[0]; // Use first selected branch
      }
      
      if (activeFilters.types.length > 0) {
        // Convert frontend format to backend format
        const typeMapping = {
          'end-sem': 'endsem',
          'mid-sem': 'midsem',
          'assignment': 'assignment',
          'back-paper': 'back'
        };
        apiFilters.type = typeMapping[activeFilters.types[0]]; // Use first selected type
      }
      
      const limit = 6; // Define items per page
      console.log(`Fetching PYQs from API for page ${page}...`);
      let response;

      // If search query exists, use search endpoint
      if (searchQuery.trim()) {
        response = await pyqsApi.searchPyqs(searchQuery, page, limit);
      } else {
        // Otherwise use filter endpoint
        response = await pyqsApi.getPyqs(apiFilters, page, limit);
      }
      
      if (response && response.pyqs) {
        // Handle case where we've gone past available data
        if (response.pyqs.length === 0 && page > 1) {
          console.log('No PYQs found for this page, likely past the end');
          setHasMore(false);
          // Go back to the last valid page if we went too far
          fetchPyqs(page - 1);
          return;
        }
        
        setPyqs(response.pyqs);
        
        // Update pagination state
        setCurrentPage(response.pagination.currentPage);
        setTotalPages(response.pagination.totalPages || 1);
        setHasMore(response.pagination.hasMore || false);
        
        // Log pagination state for debugging
        console.log(`Page ${response.pagination.currentPage}: Got ${response.pyqs.length} items of ${limit} requested`);
        console.log(`Total pages: ${response.pagination.totalPages}, Has more: ${response.pagination.hasMore}`);
      } else {
        // Fallback to static data
        console.log('No data from API, using static data');
        setPyqs(SAMPLE_PYQS);
        
        // Reset pagination state
        setCurrentPage(1);
        setTotalPages(1);
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching PYQs:', err);
      setError('Failed to load question papers. Please try again later.');
      // Use static data on error
      setPyqs(SAMPLE_PYQS);
      
      // Reset pagination state
      setCurrentPage(1);
      setTotalPages(1);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Navigate to previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      fetchPyqs(currentPage - 1);
    }
  };
  
  // Navigate to next page
  const goToNextPage = () => {
    if (hasMore) {
      fetchPyqs(currentPage + 1);
    }
  };

  // Initial fetch and when filters/search change
  useEffect(() => {
    // Reset to first page when filters or search query changes
    fetchPyqs(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, activeFilters]);

  useEffect(() => {
    // Filter PyQs based on search query and active filters
    const filtered = pyqs.filter(pyq => {
      // Search query filter (only if not already filtered by API)
      const searchMatch = !searchQuery || 
        pyq.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pyq.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pyq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Year filter
      const yearMatch = activeFilters.years.length === 0 || activeFilters.years.includes(pyq.year);
      
      // Branch filter
      const branchMatch = activeFilters.branches.length === 0 || activeFilters.branches.includes(pyq.branch);
      
      // Type filter
      const typeMatch = activeFilters.types.length === 0 || activeFilters.types.includes(pyq.type);
      
      return searchMatch && yearMatch && branchMatch && typeMatch;
    });
    
    setFilteredPyqs(filtered);
  }, [pyqs, searchQuery, activeFilters]);

  const handleFilterToggle = (filterType, value) => {
    setActiveFilters(prev => {
      const currentFilters = [...prev[filterType]];
      
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [filterType]: currentFilters.filter(filter => filter !== value)
        };
      } else {
        return {
          ...prev,
          [filterType]: [...currentFilters, value]
        };
      }
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      years: [],
      branches: [],
      types: []
    });
    setSearchQuery('');
  };

  const handleDownload = async (id) => {
    setDownloadingId(id);
    
    try {
      await pyqsApi.downloadPyq(id);
      console.log(`Downloaded PYQ ID: ${id}`);
      setTimeout(() => {
        setDownloadingId(null);
      }, 1500);
    } catch (err) {
      console.error('Error downloading PYQ:', err);
      setDownloadingId(null);
      alert('Failed to download the question paper. Please try again.');
    }
  };

  // Get the count of active filters
  const activeFilterCount = 
    activeFilters.years.length + 
    activeFilters.branches.length + 
    activeFilters.types.length;

  return (
    <div className="min-h-screen bg-black py-24 px-4 sm:px-6 relative overflow-x-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Previous Year Question Papers
          </motion.h1>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"
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
            Access previous year question papers, assignments, and test papers for all departments and courses.
          </motion.p>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-black/80 p-8 rounded-xl border border-white/10 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white">Loading question papers...</p>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && !isLoading && (
          <motion.div 
            className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-300">{error}</p>
          </motion.div>
        )}
        
        <motion.div 
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by subject name, code or tags..."
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
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-3 px-6 text-white flex items-center justify-center hover:bg-white/10 transition-all relative"
          >
            <FiFilter className="mr-2" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </motion.div>
        
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-medium">Filter Question Papers</h3>
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-gray-300 mb-3 text-sm font-medium">Year</h4>
                  <div className="flex flex-wrap gap-2">
                    {YEARS.map(year => (
                      <button
                        key={year}
                        onClick={() => handleFilterToggle('years', year)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          activeFilters.years.includes(year)
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-gray-300 mb-3 text-sm font-medium">Branch</h4>
                  <div className="flex flex-wrap gap-2">
                    {BRANCHES.map(branch => (
                      <button
                        key={branch}
                        onClick={() => handleFilterToggle('branches', branch)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          activeFilters.branches.includes(branch)
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {branch}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-gray-300 mb-3 text-sm font-medium">Paper Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {PAPER_TYPES.map(type => (
                      <button
                        key={type}
                        onClick={() => handleFilterToggle('types', type)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          activeFilters.types.includes(type)
                            ? 'bg-pink-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {type.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isLoading && filteredPyqs.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
              <FiSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white text-xl font-medium mb-2">No results found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria to find what you're looking for.</p>
              <button 
                onClick={clearFilters}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPyqs.map((pyq, index) => (
                <motion.div
                  key={pyq.id}
                  className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      delay: index * 0.05
                    }
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-purple-400 transition-colors">
                          {pyq.subjectName}
                        </h3>
                        <p className="text-gray-400 text-sm">{pyq.subjectCode}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs ${
                        pyq.type === 'end-sem' ? 'bg-blue-500/20 text-blue-300' :
                        pyq.type === 'mid-sem' ? 'bg-purple-500/20 text-purple-300' :
                        'bg-pink-500/20 text-pink-300'
                      }`}>
                        {pyq.type.replace('-', ' ')}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <FiCalendar className="mr-1" />
                        <span>{pyq.year}</span>
                      </div>
                      <div className="flex items-center">
                        <FiCode className="mr-1" />
                        <span>{pyq.branch}</span>
                      </div>
                      <div className="flex items-center">
                        <FiBookOpen className="mr-1" />
                        <span>Sem {pyq.semester}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {pyq.tags && pyq.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-0.5 bg-white/5 text-gray-400 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-white/5 p-4 flex justify-between items-center">
                    <div className="flex items-center text-gray-400 text-sm">
                      <FiClock className="mr-1" />
                      <span>PDF • {pyq.fileSize || '2.3 MB'}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleDownload(pyq.id)}
                      disabled={downloadingId === pyq.id}
                      className={`relative flex items-center justify-center ${
                        downloadingId === pyq.id 
                          ? 'bg-green-500 text-white px-6' 
                          : 'bg-purple-500 hover:bg-purple-600 text-white px-4'
                      } py-2 rounded-lg transition-all overflow-hidden`}
                    >
                      {downloadingId === pyq.id ? (
                        <>
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ x: 60 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            Downloaded
                          </motion.div>
                          <motion.div 
                            className="flex items-center"
                            initial={{ x: 0 }}
                            animate={{ x: -60 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FiDownload className="mr-1" />
                            <span>Download</span>
                          </motion.div>
                        </>
                      ) : (
                        <>
                          <FiDownload className="mr-1" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-10 mb-12 space-x-4">
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
                className="text-center mb-12 text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="inline-block bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
                  You've reached the last page of question papers
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PyqsPage;
