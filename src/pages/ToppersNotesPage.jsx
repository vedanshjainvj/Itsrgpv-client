import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiFilter, FiX, FiSearch, FiStar, FiUser, FiBook, FiTag, FiFileText, FiEye, FiThumbsUp } from 'react-icons/fi';
import { NOTES_DATA } from '../utils/constants';

const BRANCHES = ['CSE', 'ECE', 'ME', 'CE', 'EE'];

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

const ToppersNotesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    branches: [],
    semesters: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState(NOTES_DATA);
  const [selectedNote, setSelectedNote] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'downloads', 'date', 'likes'

  useEffect(() => {
    // Filter notes based on search query and active filters
    let filtered = NOTES_DATA.filter(note => {
      // Search query filter
      const searchMatch = searchQuery === '' || 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Branch filter
      const branchMatch = activeFilters.branches.length === 0 || activeFilters.branches.includes(note.branch);
      
      // Semester filter
      const semesterMatch = activeFilters.semesters.length === 0 || activeFilters.semesters.includes(note.semester);
      
      return searchMatch && branchMatch && semesterMatch;
    });
    
    // Sort filtered notes
    filtered = filtered.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'downloads') {
        return b.downloads - a.downloads;
      } else if (sortBy === 'date') {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      } else if (sortBy === 'likes') {
        return b.likes - a.likes;
      }
      return 0;
    });
    
    setFilteredNotes(filtered);
  }, [searchQuery, activeFilters, sortBy]);

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
      branches: [],
      semesters: []
    });
    setSearchQuery('');
  };

  const handleDownload = (id) => {
    setDownloadingId(id);
    
    // Simulate download delay
    setTimeout(() => {
      setDownloadingId(null);
      // In a real app, you would trigger the actual download here
      console.log(`Downloading Notes ID: ${id}`);
    }, 1500);
  };

  const viewNoteDetails = (note) => {
    setSelectedNote(note);
  };

  const closeNoteDetails = () => {
    setSelectedNote(null);
  };

  // Get the count of active filters
  const activeFilterCount = 
    activeFilters.branches.length + 
    activeFilters.semesters.length;

  return (
    <div className="min-h-screen bg-black py-24 px-4 sm:px-6 relative overflow-x-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-pink-500/5 rounded-full blur-[100px]"></div>
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
            Toppers' Notes
          </motion.h1>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6"
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
            Access high-quality notes from top performers to excel in your studies.
          </motion.p>
        </div>
        
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
              placeholder="Search by subject, author, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all"
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
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-3 px-4 text-white appearance-none hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500/50"
          >
            <option value="rating">Top Rated</option>
            <option value="downloads">Most Downloaded</option>
            <option value="date">Newest First</option>
            <option value="likes">Most Liked</option>
          </select>
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
                <h3 className="text-white font-medium">Filter Notes</h3>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-pink-400 hover:text-pink-300 transition-colors flex items-center"
                  >
                    <FiX className="mr-1" />
                    <span>Clear all filters</span>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-gray-300 mb-3 text-sm font-medium">Branch</h4>
                  <div className="flex flex-wrap gap-2">
                    {BRANCHES.map(branch => (
                      <button
                        key={branch}
                        onClick={() => handleFilterToggle('branches', branch)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          activeFilters.branches.includes(branch)
                            ? 'bg-pink-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {branch}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-gray-300 mb-3 text-sm font-medium">Semester</h4>
                  <div className="flex flex-wrap gap-2">
                    {SEMESTERS.map(semester => (
                      <button
                        key={semester}
                        onClick={() => handleFilterToggle('semesters', semester)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          activeFilters.semesters.includes(semester)
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        Sem {semester}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {filteredNotes.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
              <FiSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white text-xl font-medium mb-2">No notes found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria to find what you're looking for.</p>
              <button 
                onClick={clearFilters}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-pink-500/10 transition-all group"
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
                <div className="relative h-40 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                  <img 
                    src={note.coverImage} 
                    alt={note.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 z-20">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                      <FiStar className="text-yellow-400" />
                      <span className="text-white text-sm font-medium">{note.rating}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 z-20">
                    <div className="bg-pink-500/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {note.branch} • Sem {note.semester}
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-1 line-clamp-2 group-hover:text-pink-400 transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 flex items-center">
                    <FiUser className="mr-1" />
                    <span>{note.author}</span>
                    <span className="mx-1">•</span>
                    <span className="text-xs">{note.authorBatch}</span>
                  </p>
                  <p className="text-gray-300 text-sm line-clamp-2 mb-4">{note.description}</p>
                  
                  <div className="flex justify-between items-center mb-4 text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center">
                        <FiEye className="mr-1" />
                        {note.views}
                      </span>
                      <span className="flex items-center">
                        <FiDownload className="mr-1" />
                        {note.downloads}
                      </span>
                      <span className="flex items-center">
                        <FiThumbsUp className="mr-1" />
                        {note.likes}
                      </span>
                    </div>
                    <span className="flex items-center">
                      <FiFileText className="mr-1" />
                      {note.pages} pages
                    </span>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    {note.tags.slice(0, 3).map((tag, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-0.5 bg-white/5 text-gray-400 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                    {note.tags.length > 3 && (
                      <span className="text-xs px-2 py-0.5 bg-white/5 text-gray-400 rounded">
                        +{note.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => viewNoteDetails(note)}
                      className="flex-1 bg-white/10 hover:bg-white/20 transition-colors text-white py-2 rounded-lg text-sm"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleDownload(note.id)}
                      disabled={downloadingId === note.id}
                      className={`flex-1 ${
                        downloadingId === note.id 
                          ? 'bg-green-500 text-white' 
                          : 'bg-pink-500 hover:bg-pink-600 text-white'
                      } py-2 rounded-lg text-sm transition-all flex items-center justify-center`}
                    >
                      {downloadingId === note.id ? (
                        <>
                          <span className="animate-pulse">Downloading...</span>
                        </>
                      ) : (
                        <>
                          <FiDownload className="mr-1" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
      
      {/* Note Details Modal */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeNoteDetails}
          >
            <motion.div 
              className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-52 sm:h-64 md:h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
                <img 
                  src={selectedNote.coverImage} 
                  alt={selectedNote.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={closeNoteDetails}
                  className="absolute top-4 right-4 z-20 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                >
                  <FiX />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="bg-pink-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {selectedNote.branch}
                    </div>
                    <div className="bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Semester {selectedNote.semester}
                    </div>
                    <div className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {selectedNote.subjectCode}
                    </div>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">{selectedNote.title}</h1>
                  <p className="text-gray-300 mt-2">{selectedNote.subject}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 mr-3">
                      <FiUser />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{selectedNote.author}</h3>
                      <p className="text-gray-400 text-sm">{selectedNote.authorBatch}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-sm">
                      <FiStar className="mr-1" />
                      <span>{selectedNote.rating}</span>
                    </div>
                    <div className="flex items-center bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-sm">
                      <FiEye className="mr-1" />
                      <span>{selectedNote.views}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-3">Description</h3>
                  <p className="text-gray-300">{selectedNote.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Document Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pages:</span>
                        <span className="text-white">{selectedNote.pages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">File Size:</span>
                        <span className="text-white">{selectedNote.fileSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date Added:</span>
                        <span className="text-white">{new Date(selectedNote.dateAdded).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Downloads:</span>
                        <span className="text-white">{selectedNote.downloads}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedNote.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-white/5 hover:bg-white/10 text-gray-300 rounded-full text-sm transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleDownload(selectedNote.id)}
                    disabled={downloadingId === selectedNote.id}
                    className={`flex-1 ${
                      downloadingId === selectedNote.id 
                        ? 'bg-green-500 text-white' 
                        : 'bg-pink-500 hover:bg-pink-600 text-white'
                    } py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center`}
                  >
                    {downloadingId === selectedNote.id ? (
                      <span className="animate-pulse">Downloading...</span>
                    ) : (
                      <>
                        <FiDownload className="mr-2" />
                        <span>Download Notes</span>
                      </>
                    )}
                  </button>
                  <button 
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <FiThumbsUp className="mr-2" />
                    <span>Like ({selectedNote.likes})</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToppersNotesPage;