import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUsers, FiArrowRight, FiFilter, FiSearch, FiX } from 'react-icons/fi';
import festsApi from '../services/api/fests';
import { FESTS } from '../utils/constants'; // Keep for fallback

const FestsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [festsData, setFestsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);

  // Fetch fests data from API
  useEffect(() => {
    const fetchFests = async () => {
      try {
        setIsLoading(true);
        const response = await festsApi.getFests();
        if (response && response.fests && response.fests.length > 0) {
          setFestsData(response.fests);
        } else {
          // Fallback to static data if API returns empty
          console.log('No data from API, using static data');
          setFestsData(FESTS);
        }
      } catch (err) {
        console.error('Error fetching fests:', err);
        // Use static data on error
        setFestsData(FESTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFests();
  }, []);

  // Filter fests based on search and filter
  const filteredFests = festsData.filter(fest => {
    // Search query filter
    const searchMatch = searchQuery === '' || 
      fest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fest.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fest.events?.some(event => event.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const categoryMatch = activeFilter === 'all' || fest.id?.includes(activeFilter);
    
    return searchMatch && categoryMatch;
  });

  // Use the same data for upcoming section too
  const upcomingFests = festsData.length > 0 ? festsData : FESTS;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-pink-500/10 rounded-full blur-[120px]"></div>
      </div>
      
      {/* Animated dots background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
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
      
      {/* Hero Section */}
      <motion.div 
        className="relative pt-32 pb-20 px-4 sm:px-6 text-center overflow-hidden"
        style={{ opacity: headerOpacity, y: headerTranslateY }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold mb-4 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Festivals</span>
        </motion.h1>
        <motion.div 
          className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 96, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        ></motion.div>
        <motion.p 
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Experience the vibrant celebrations that define our campus culture
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            to="#upcoming"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            Upcoming Events
          </Link>
          <Link 
            to="#gallery"
            className="bg-black border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/5 transition-all"
          >
            View Gallery
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        <motion.div 
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search festivals, events..."
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
          
          <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                activeFilter === 'all' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveFilter('tech')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                activeFilter === 'tech' 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white' 
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              Tech
            </button>
            <button 
              onClick={() => setActiveFilter('cult')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                activeFilter === 'cult' 
                  ? 'bg-gradient-to-r from-pink-500 to-red-400 text-white' 
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              Cultural
            </button>
            <button 
              onClick={() => setActiveFilter('sports')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                activeFilter === 'sports' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white' 
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              Sports
            </button>
          </div>
        </motion.div>
        
        {filteredFests.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
              <FiSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white text-xl font-medium mb-2">No festivals found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear filters
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredFests.map((fest, index) => (
              <motion.div
                key={fest.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
                  <motion.img 
                    src={fest.image} 
                    alt={fest.name} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1 }}
                  />
                  
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                      {new Date(fest.date.split('-')[0], fest.date.split('-')[1] - 1, fest.date.split('-')[2]).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                    <h2 className="text-white text-2xl font-bold mb-1">{fest.name}</h2>
                    <p className="text-gray-300 italic">{fest.tagline}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1.5" />
                      <span>{fest.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FiUsers className="mr-1.5" />
                      <span>{fest.previousYearAttendance}</span>
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="mr-1.5" />
                      <span>Campus</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 line-clamp-2">{fest.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-white font-medium mb-3">Featured Events</h3>
                    <div className="flex flex-wrap gap-2">
                      {fest.events.slice(0, 3).map((event, i) => (
                        <span 
                          key={i}
                          className="bg-white/5 text-gray-300 px-2 py-1 rounded text-xs"
                        >
                          {event}
                        </span>
                      ))}
                      {fest.events.length > 3 && (
                        <span className="bg-white/5 text-gray-300 px-2 py-1 rounded text-xs">
                          +{fest.events.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/fests/${fest.id}`} 
                    className="flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium transition-all hover:shadow-lg hover:shadow-purple-500/20 group"
                  >
                    <span>View Details</span>
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Upcoming Events Section */}
      <div id="upcoming" className="py-20 relative z-10 bg-gradient-to-b from-black to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Upcoming Festivals</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Mark your calendars for these exciting upcoming events
            </p>
          </motion.div>
          
          <div className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide">
            {upcomingFests.map((fest, index) => (
              <motion.div
                key={fest.id}
                className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden flex-shrink-0 w-80"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={fest.image} 
                    alt={fest.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="flex justify-between items-end">
                      <h3 className="text-white font-bold text-xl">{fest.name}</h3>
                      <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                        {fest.date.split('-')[0]}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3 text-xs text-gray-400">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1" />
                      <span>{fest.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="mr-1" />
                      <span>Campus</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{fest.description}</p>
                  
                  <Link 
                    to={`/fests/${fest.id}`} 
                    className="flex items-center justify-center w-full py-2 px-4 bg-white/5 rounded-lg text-white text-sm hover:bg-white/10 transition-colors"
                  >
                    <span>Details</span>
                    <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Glimpse of Past Celebrations */}
      <div id="gallery" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Glimpses of Past Celebrations</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Relive the memories of our previous festivals
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
              >
                <img 
                  src={`https://source.unsplash.com/random/600x600/?festival,event,concert&sig=${index}`} 
                  alt={`Festival moment ${index}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4">
                    <h3 className="text-white font-bold">Festival Moment</h3>
                    <p className="text-gray-300 text-sm">Previous celebrations</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/gallery" 
              className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              <span>View Full Gallery</span>
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <motion.div 
        className="py-20 relative z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1600x800/?concert,crowd')] bg-cover bg-center opacity-20"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Ready to Join the Celebration?
              </motion.h2>
              <motion.p 
                className="text-gray-300 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Participate in our upcoming festivals and create memories that will last a lifetime. 
                Register now to stay updated with all the events and activities.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                  Register for Events
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FestsPage;
