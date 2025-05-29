import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiGrid, FiList, FiFilter, FiSearch } from 'react-icons/fi';
import { GALLERY_ITEMS } from '../utils/constants';
import photogalleryApi from '../services/api/photogallery';

const CATEGORIES = [
  { id: 'all', name: 'All Photos' },
  { id: 'events', name: 'Events' },
  { id: 'academics', name: 'Academics' },
  { id: 'campus', name: 'Campus' },
  { id: 'sports', name: 'Sports' }
];

const GalleryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filteredItems, setFilteredItems] = useState(GALLERY_ITEMS);
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allItems, setAllItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Fetch gallery images from the API
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await photogalleryApi.getPhotogalleries(currentPage, 12);
        console.log("Fetched gallery items from the gallaryPage:", response);
        
        if (response && response.images) {
          setAllItems(prevItems => 
            currentPage === 1 ? response.images : [...prevItems, ...response.images]
          );
          setTotalPages(response.pagination.totalPages || 1);
          setHasMore(currentPage < response.pagination.totalPages);
        } else {
          // Fallback to dummy data if API returns no images
          setAllItems(GALLERY_ITEMS);
          setHasMore(false);
        }
      } catch (err) {
        console.error("Failed to fetch gallery items:", err);
        setError("Failed to load gallery items.");
        // Use dummy data as fallback
        if (currentPage === 1) {
          setAllItems(GALLERY_ITEMS);
        }
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryItems();
  }, [currentPage]);

  // Filter gallery items based on search query and category
  useEffect(() => {
    const filtered = allItems.filter(item => {
      const searchMatch = searchQuery === '' || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
      
      return searchMatch && categoryMatch;
    });
    
    setFilteredItems(filtered);
  }, [searchQuery, activeCategory, allItems]);

  const openLightbox = (item) => {
    setSelectedImage(item);
    const index = filteredItems.findIndex(i => i.id === item.id);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(nextIndex);
    setSelectedImage(filteredItems[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxIndex(prevIndex);
    setSelectedImage(filteredItems[prevIndex]);
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, lightboxIndex, filteredItems]);

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
            Photo Gallery
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
            Browse through our collection of moments from various college events, activities and campus life.
          </motion.p>
        </div>
        
        {filteredItems.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            
          </motion.div>
        ) : viewMode === 'grid' ? (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {filteredItems.map((item, index) => {
              // Calculate aspect ratio class
              const aspectRatio = item.height / item.width;
              const spanClass = aspectRatio > 1.2 ? 'row-span-2' : '';
              
              return (
                <motion.div
                  key={item.id}
                  className={`relative overflow-hidden rounded-xl cursor-pointer group ${spanClass}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      duration: 0.5,
                      delay: index * 0.03
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openLightbox(item)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <h3 className="text-white font-medium text-sm md:text-base truncate">{item.title}</h3>
                    <p className="text-gray-300 text-xs truncate">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden flex flex-col sm:flex-row cursor-pointer hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.5,
                    delay: index * 0.05
                  }
                }}
                onClick={() => openLightbox(item)}
              >
                <div className="sm:w-48 md:w-64 h-48 overflow-hidden flex-shrink-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                    <div className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                      {CATEGORIES.find(cat => cat.id === item.category)?.name || item.category}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-3 flex items-center text-gray-400 text-sm">
                    <FiCalendar className="mr-1" />
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
          {filteredItems.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              {error ? 'Showing offline gallery data' : `Showing ${filteredItems.length} photos`}
            </p>
            
            {hasMore && !error && (
              <button 
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={isLoading}
                className="bg-white/5 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors inline-flex items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Load More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            )}
            
            {error && (
              <button 
                onClick={() => window.location.reload()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center"
              >
                <span>Retry</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
              onClick={closeLightbox}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FiX className="w-5 h-5" />
            </motion.button>
            
            {filteredItems.length > 1 && (
              <>
                <motion.button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
                  onClick={prevImage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FiChevronLeft className="w-5 h-5" />
                </motion.button>
                
                <motion.button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
                  onClick={nextImage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FiChevronRight className="w-5 h-5" />
                </motion.button>
              </>
            )}
            
            <div className="max-w-5xl max-h-[80vh] relative">
              <motion.img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.title} 
                className="max-w-full max-h-[80vh] object-contain"
                key={selectedImage.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div 
                className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-white text-lg font-medium">{selectedImage.title}</h3>
                <p className="text-gray-300 text-sm">{selectedImage.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-400 text-xs">{new Date(selectedImage.timestamp).toLocaleDateString()}</span>
                  <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                    {CATEGORIES.find(cat => cat.id === selectedImage.category)?.name || selectedImage.category}
                  </span>
                </div>
              </motion.div>
            </div>
            
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              <motion.div 
                className="flex space-x-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {filteredItems.length > 10 ? (
                  <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                    {lightboxIndex + 1} / {filteredItems.length}
                  </div>
                ) : (
                  filteredItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setLightboxIndex(index);
                        setSelectedImage(filteredItems[index]);
                      }}
                      className={`w-2 h-2 rounded-full ${
                        index === lightboxIndex ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;