import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiSearch, FiX, FiCalendar, FiMapPin } from 'react-icons/fi';
import { EVENTS } from '../utils/constants';
import EventCard from '../components/sections/EventCard';
import EventsFilter from '../components/sections/EventFilters';

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(EVENTS);
  
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);

  // Calculate filter count
  const filterCount = 
    (activeCategory !== 'all' ? 1 : 0) + 
    (timeFilter !== 'all' ? 1 : 0) + 
    (showFeaturedOnly ? 1 : 0);

  useEffect(() => {
    // Get current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Get start of current week (Sunday)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Filter events based on search query and active filters
    const filtered = EVENTS.filter(event => {
      // Search query filter
      const searchMatch = searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Category filter
      const categoryMatch = activeCategory === 'all' || event.category === activeCategory;
      
      // Featured filter
      const featuredMatch = !showFeaturedOnly || event.featured;
      
      // Time filter
      const eventDate = new Date(event.date);
      let timeMatch = true;
      
      if (timeFilter === 'upcoming') {
        timeMatch = eventDate >= currentDate;
      } else if (timeFilter === 'this-month') {
        timeMatch = eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
      } else if (timeFilter === 'this-week') {
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        timeMatch = eventDate >= startOfWeek && eventDate <= endOfWeek;
      } else if (timeFilter === 'past') {
        timeMatch = eventDate < currentDate;
      }
      
      return searchMatch && categoryMatch && featuredMatch && timeMatch;
    });
    
    setFilteredEvents(filtered);
  }, [searchQuery, activeCategory, timeFilter, showFeaturedOnly]);

  const clearFilters = () => {
    setActiveCategory('all');
    setTimeFilter('all');
    setShowFeaturedOnly(false);
    setSearchQuery('');
  };

  // Get featured events
  const featuredEvents = EVENTS.filter(event => event.featured);

  // Get upcoming events
  const upcomingEvents = EVENTS.filter(event => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return eventDate >= currentDate;
  }).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 4);

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
            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">Events</span>
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
            Discover and participate in exciting events happening across campus
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
            placeholder="Search events by title, description, tags..."
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
        <EventsFilter 
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          showFeaturedOnly={showFeaturedOnly}
          setShowFeaturedOnly={setShowFeaturedOnly}
          clearFilters={clearFilters}
          filterCount={filterCount}
        />
        
        {/* Featured Events Section (visible when no search or filters) */}
        {searchQuery === '' && activeCategory === 'all' && timeFilter === 'all' && !showFeaturedOnly && (
          <>
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-white">Featured Events</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-block h-2 w-2 rounded-full ${
                        event.category === 'technical' ? 'bg-blue-500' :
                        event.category === 'cultural' ? 'bg-pink-500' :
                        event.category === 'sports' ? 'bg-green-500' :
                        event.category === 'management' ? 'bg-purple-500' :
                        event.category === 'academic' ? 'bg-yellow-500' :
                        'bg-orange-500'
                      }`}></span>
                      <span className="text-gray-400 text-xs">{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
                    </div>
                    
                    <h3 className="text-white font-bold mb-2 truncate">{event.title}</h3>
                    
                    <div className="flex items-center text-gray-400 text-xs mb-2">
                      <FiCalendar className="mr-1" size={14} />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 text-xs mb-3">
                      <FiMapPin className="mr-1" size={14} />
                      <span className="truncate">{event.location}</span>
                    </div>
                    
                    <motion.div 
                      className="text-center text-sm px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Register Now
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
        
        {/* Main Event Grid */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Title & Result Count */}
          {(searchQuery !== '' || activeCategory !== 'all' || timeFilter !== 'all' || showFeaturedOnly) && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-white">
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
                </h2>
              </div>
            </div>
          )}
          
          {filteredEvents.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
                <FiSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white text-xl font-medium mb-2">No events found</h3>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EventsPage;