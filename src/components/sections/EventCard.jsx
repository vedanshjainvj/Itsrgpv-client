import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUsers, FiClock } from 'react-icons/fi';

const EventCard = ({ event }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate days remaining
  const getDaysRemaining = () => {
    const today = new Date();
    const eventDate = new Date(event.date);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining();
  
  // Determine category color
  const getCategoryColor = (category) => {
    const categoryColors = {
      technical: 'from-blue-500 to-cyan-400 shadow-blue-500/20',
      cultural: 'from-pink-500 to-purple-400 shadow-pink-500/20',
      sports: 'from-green-500 to-emerald-400 shadow-green-500/20',
      management: 'from-purple-500 to-indigo-400 shadow-purple-500/20',
      academic: 'from-yellow-500 to-amber-400 shadow-yellow-500/20',
      alumni: 'from-orange-500 to-red-400 shadow-orange-500/20'
    };
    
    return categoryColors[category] || 'from-gray-500 to-slate-400 shadow-gray-500/20';
  };

  return (
    <motion.div 
      className="group h-full rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:shadow-lg transition-all relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Featured Tag */}
      {event.featured && (
        <div className="absolute top-4 left-4 z-20">
          <div className={`bg-gradient-to-r ${getCategoryColor(event.category)} text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg`}>
            Featured
          </div>
        </div>
      )}
      
      {/* Days Remaining Tag */}
      {daysRemaining > 0 && daysRemaining <= 14 && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center">
            <FiClock className="mr-1" size={12} />
            {daysRemaining} days left
          </div>
        </div>
      )}
      
      {/* Event Image */}
      <div className="h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
        <motion.img 
          src={event.coverImage} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
      </div>
      
      {/* Event Content */}
      <div className="p-5">
        <div className="flex items-center space-x-2 mb-2">
          <span className={`inline-block h-2 w-2 rounded-full bg-gradient-to-r ${getCategoryColor(event.category)}`}></span>
          <span className="text-gray-300 text-sm">{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all">
          {event.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {event.shortDescription}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="flex items-center text-gray-400 text-xs">
            <FiCalendar className="mr-1" size={14} />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-gray-400 text-xs">
            <FiMapPin className="mr-1" size={14} />
            <span className="truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-400 text-xs">
            <FiUsers className="mr-1" size={14} />
            <span>{event.attendees}/{event.maxAttendees}</span>
          </div>
          
          <div className="flex items-center text-gray-400 text-xs">
            <span className="truncate">{event.organizer}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
            <motion.div 
              className={`h-full rounded-full bg-gradient-to-r ${getCategoryColor(event.category)}`}
              initial={{ width: 0 }}
              animate={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">{Math.round((event.attendees / event.maxAttendees) * 100)}% full</span>
            {event.attendees >= event.maxAttendees ? (
              <span className="text-red-400">Sold Out</span>
            ) : (
              <span className="text-green-400">{event.maxAttendees - event.attendees} spots left</span>
            )}
          </div>
        </div>
        
        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="bg-white/5 text-gray-400 px-2 py-0.5 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="bg-white/5 text-gray-400 px-2 py-0.5 rounded text-xs">
                +{event.tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* View Button */}
        <Link 
          to={`/events/${event.id}`}
          className={`block w-full py-2 px-4 text-center text-white bg-gradient-to-r ${getCategoryColor(event.category)} rounded-lg text-sm font-medium hover:shadow-lg transition-all`}
        >
          View Details
        </Link>
      </div>
      
      {/* Bottom Border Animation */}
      <motion.div 
        className={`h-0.5 bg-gradient-to-r ${getCategoryColor(event.category)} w-0 group-hover:w-full transition-all duration-300`}
      />
    </motion.div>
  );
};

export default EventCard;