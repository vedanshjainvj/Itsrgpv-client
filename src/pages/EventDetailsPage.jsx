import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUsers, FiArrowLeft, FiClock, FiMail, FiPhone, FiTag, FiChevronRight, FiCheck, FiExternalLink } from 'react-icons/fi';
import eventsApi from '../services/api/events';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  
  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const eventData = await eventsApi.getEventById(id);
        setEvent(eventData);
        // If we have a schedule, set the active day to the first day
        if (eventData.schedule && eventData.schedule.length > 0) {
          setActiveDay(0);
        }
        
        // Fetch all events to find related ones
        const eventsResponse = await eventsApi.getEvents();
        if (eventsResponse && eventsResponse.events) {
          const related = eventsResponse.events
            .filter(e => e.category === eventData.category && e.id !== eventData.id)
            .slice(0, 3);
          setRelatedEvents(related);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl text-white font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/events"
            className="inline-flex items-center text-purple-400 hover:text-purple-300"
          >
            <FiArrowLeft className="mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }
  
  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
  
  // Get category color classes
  const getCategoryColor = (category) => {
    const categoryColors = {
      technical: 'from-blue-500 to-cyan-400',
      cultural: 'from-pink-500 to-purple-400',
      sports: 'from-green-500 to-emerald-400',
      management: 'from-purple-500 to-indigo-400',
      academic: 'from-yellow-500 to-amber-400',
      alumni: 'from-orange-500 to-red-400'
    };
    
    return categoryColors[category] || 'from-gray-500 to-slate-400';
  };
  
  // Open/close photo lightbox
  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-black py-24 px-4 sm:px-6 relative">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <Link 
          to="/events"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </Link>
        
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-10">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
          
          <img 
            src={event.coverImage} 
            alt={event.title}
            className="w-full h-80 object-cover"
          />
          
          <div className="absolute bottom-0 left-0 z-20 p-6 sm:p-10 w-full">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </span>
              
              {daysRemaining > 0 ? (
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  <FiClock className="mr-1" size={12} />
                  {daysRemaining} days remaining
                </span>
              ) : (
                <span className="bg-gradient-to-r from-gray-500 to-slate-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  Passed
                </span>
              )}
              
              {event.featured && (
                <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  <FiStar className="mr-1" size={12} />
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-300">
              <div className="flex items-center">
                <FiCalendar className="mr-2 text-purple-400" size={18} />
                <div>
                  <div className="text-white font-medium">{formatDate(event.date)}</div>
                  {event.endDate && (
                    <div className="text-sm">To: {formatDate(event.endDate)}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <FiMapPin className="mr-2 text-pink-400" size={18} />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center">
                <FiUsers className="mr-2 text-blue-400" size={18} />
                <div>
                  <div className="text-white font-medium">{event.attendees}/{event.maxAttendees} Attendees</div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                    <motion.div 
                      className={`h-full rounded-full bg-gradient-to-r ${getCategoryColor(event.category)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{event.description}</p>
              
              {event.tags && event.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-white/5 text-gray-400 px-3 py-1 rounded-full text-xs flex items-center"
                    >
                      <FiTag className="mr-1" size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Schedule */}
            {event.schedule && event.schedule.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Event Schedule</h2>
                
                <div className="flex overflow-x-auto space-x-2 mb-6 pb-2 scrollbar-hide">
                  {event.schedule.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveDay(index)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors ${
                        activeDay === index 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-medium">Day {day.day}</div>
                      <div className="text-xs">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </button>
                  ))}
                </div>
                
                <div className="space-y-4">
                  {event.schedule[activeDay].events.map((scheduleEvent, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-medium">{scheduleEvent.title}</h3>
                        <span className="text-purple-400 text-sm">{scheduleEvent.time}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-400 text-sm">
                        <FiMapPin className="mr-1" size={14} />
                        <span>{scheduleEvent.venue}</span>
                      </div>
                      
                      {scheduleEvent.speaker && (
                        <div className="mt-2 text-blue-400 text-sm">{scheduleEvent.speaker}</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Photo Gallery */}
            {event.photos && event.photos.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Photo Gallery</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.photos.map((photo, index) => (
                    <motion.div
                      key={index}
                      className={`relative rounded-lg overflow-hidden cursor-pointer ${
                        index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                      }`}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => openLightbox(photo)}
                    >
                      <img 
                        src={photo.url} 
                        alt={photo.caption || `Event photo ${index + 1}`}
                        className="w-full h-full object-cover aspect-square"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-3 text-white text-sm">{photo.caption}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Registration & Info */}
          <div>
            {/* Registration Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden mb-8 sticky top-24">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-white/10 p-5">
                <h3 className="text-xl font-bold text-white mb-1">Registration</h3>
                <p className="text-gray-300 text-sm">Secure your spot for this event</p>
              </div>
              
              <div className="p-5">
                <div className="mb-4">
                  <div className="text-gray-400 text-sm mb-1">Registration Fee</div>
                  <div className="text-white font-bold text-lg">{event.registrationFee || 'Free'}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-400 text-sm mb-1">Registration Deadline</div>
                  <div className="text-white">{formatDate(event.registrationDeadline)}</div>
                </div>
                
                {event.maxAttendees && (
                  <div className="mb-5">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-gray-400">Available Spots</span>
                      <span className="text-white font-medium">{event.maxAttendees - event.attendees} left</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <motion.div 
                        className={`h-full rounded-full bg-gradient-to-r ${getCategoryColor(event.category)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                )}
                
                {event.registrationLink && (
                  <a 
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 text-center text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all mb-3 flex items-center justify-center"
                  >
                    Register Now
                    <FiExternalLink className="ml-2" size={16} />
                  </a>
                )}
                
                <div className="text-gray-400 text-sm text-center">
                  Registration closes on {formatDate(event.registrationDeadline)}
                </div>
              </div>
            </div>
            
            {/* Event Info Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-b border-white/10 p-5">
                <h3 className="text-xl font-bold text-white mb-1">Event Info</h3>
                <p className="text-gray-300 text-sm">Additional details</p>
              </div>
              
              <div className="p-5">
                <div className="mb-4">
                  <div className="text-gray-400 text-sm mb-1">Organized By</div>
                  <div className="text-white">{event.organizer}</div>
                </div>
                
                {event.prizes && (
                  <div className="mb-4">
                    <div className="text-gray-400 text-sm mb-1">Prizes</div>
                    <div className="text-white">{event.prizes}</div>
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="text-gray-400 text-sm mb-1">Contact Information</div>
                  <div className="flex items-center text-white mb-2">
                    <FiMail className="mr-2 text-blue-400" size={16} />
                    <a href={`mailto:${event.contactEmail}`} className="hover:text-blue-400 transition-colors">
                      {event.contactEmail}
                    </a>
                  </div>
                  <div className="flex items-center text-white">
                    <FiPhone className="mr-2 text-green-400" size={16} />
                    <a href={`tel:${event.contactPhone}`} className="hover:text-green-400 transition-colors">
                      {event.contactPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Similar Events</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map(relatedEvent => (
                <Link 
                  key={relatedEvent.id} 
                  to={`/events/${relatedEvent.id}`}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="h-40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
                    <img 
                      src={relatedEvent.coverImage} 
                      alt={relatedEvent.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all">
                      {relatedEvent.title}
                    </h3>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-400 text-xs">
                        <FiCalendar className="mr-1" size={14} />
                        <span>{new Date(relatedEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      
                      <span className="text-purple-400 group-hover:translate-x-1 transition-transform flex items-center">
                        View
                        <FiChevronRight className="ml-1" size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Photo Lightbox */}
      {selectedPhoto && (
        <motion.div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <motion.div
            className="relative max-w-5xl max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <FiX size={24} />
            </button>
            
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.caption || "Event photo"} 
              className="max-w-full max-h-[80vh] object-contain"
            />
            
            {selectedPhoto.caption && (
              <div className="text-white text-center mt-4">{selectedPhoto.caption}</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EventDetailsPage;