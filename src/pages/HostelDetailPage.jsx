import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiUsers, FiDollarSign, FiMapPin, FiCalendar, FiUser, 
  FiMail, FiPhone, FiStar, FiArrowLeft, FiClock, FiCheck, 
  FiShield, FiMaximize, FiChevronLeft, FiChevronRight, FiX 
} from 'react-icons/fi';
import { HOSTELS } from '../utils/hostelConstants';

const HostelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [imageCategory, setImageCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  useEffect(() => {
    // Find the hostel by id
    const fetchedHostel = HOSTELS.find(h => h.id === id);
    
    if (fetchedHostel) {
      setHostel(fetchedHostel);
      setLoading(false);
    } else {
      // Hostel not found, redirect to hostels page
      navigate('/hostels');
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading hostel information...</p>
        </div>
      </div>
    );
  }
  
  const filteredImages = imageCategory === 'all' 
    ? hostel.images 
    : hostel.images.filter(img => img.category === imageCategory);
  
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  const nextImage = () => {
    setLightboxIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };
  
  const prevImage = () => {
    setLightboxIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length);
  };
  
  // Calculate average rating
  const avgRating = hostel.reviews.reduce((acc, review) => acc + review.rating, 0) / hostel.reviews.length;
  
  return (
    <div className="min-h-screen bg-black pt-20 pb-12 relative overflow-x-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-pink-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link 
            to="/hostels"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            <span>Back to All Hostels</span>
          </Link>
        </motion.div>
        
        <div className="relative rounded-2xl overflow-hidden h-[50vh] md:h-[60vh] mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
          <motion.img
            src={hostel.mainImage}
            alt={hostel.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div 
                className={`inline-block ${
                  hostel.type === 'male' 
                    ? 'bg-blue-500' 
                    : 'bg-pink-500'
                } text-white px-3 py-1 rounded-lg text-sm font-medium mb-3`}
              >
                {hostel.type === 'male' ? 'Boys Hostel' : 'Girls Hostel'}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{hostel.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex gap-1 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`${
                        i < Math.floor(avgRating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-400'
                      } w-5 h-5`} 
                    />
                  ))}
                </div>
                <span className="text-white">{avgRating.toFixed(1)}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-300">{hostel.reviews.length} reviews</span>
              </div>
              <p className="text-gray-300 max-w-3xl">{hostel.shortDescription}</p>
            </motion.div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-8"
            >
              <div className="flex overflow-x-auto scrollbar-hide">
                {['overview', 'facilities', 'rooms', 'rules', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-4 font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab 
                        ? 'text-white border-b-2 border-blue-500' 
                        : 'text-gray-400 hover:text-white border-b-2 border-transparent'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="p-6">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">About {hostel.name}</h2>
                    <p className="text-gray-300 mb-6">{hostel.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-xl p-4 flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mr-4">
                          <FiHome className="text-blue-400 w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Total Rooms</p>
                          <p className="text-white font-medium text-lg">{hostel.totalRooms}</p>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mr-4">
                          <FiUsers className="text-pink-400 w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Total Capacity</p>
                          <p className="text-white font-medium text-lg">{hostel.totalCapacity} Students</p>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mr-4">
                          <FiMaximize className="text-purple-400 w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Toilets</p>
                          <p className="text-white font-medium text-lg">{hostel.totalToilets}</p>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mr-4">
                          <FiDollarSign className="text-green-400 w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Annual Fee</p>
                          <p className="text-white font-medium text-lg">{hostel.fees.annual}</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">Location</h3>
                    <div className="bg-white/5 rounded-xl p-4 mb-6">
                      <div className="flex items-start">
                        <FiMapPin className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-white mb-2">{hostel.location.address}</p>
                          <h4 className="text-gray-400 text-sm mb-2">Nearby Places:</h4>
                          <ul className="space-y-1">
                            {hostel.location.nearbyPlaces.map((place, index) => (
                              <li key={index} className="text-gray-300 text-sm flex items-center">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                                {place}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">Application Process</h3>
                    <p className="text-gray-300 mb-4">{hostel.applicationProcess}</p>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20">
                      Apply Now
                    </button>
                  </motion.div>
                )}
                
                {activeTab === 'facilities' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">Hostel Facilities</h2>
                    <p className="text-gray-300 mb-6">Explore the range of facilities available to residents of {hostel.name}.</p>
                    
                    <div className="space-y-4 mb-6">
                      {hostel.facilities.map((facility, index) => (
                        <div 
                          key={index}
                          className="bg-white/5 rounded-xl p-4 transition-all hover:bg-white/10"
                        >
                          <h3 className="text-lg font-medium text-white mb-2">{facility.name}</h3>
                          <p className="text-gray-300 mb-2">{facility.description}</p>
                          <div className="flex items-center text-sm text-gray-400">
                            <FiClock className="mr-2" />
                            <span>{facility.timing}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 border border-yellow-500/20 bg-yellow-500/5 rounded-xl">
                      <h3 className="text-lg font-medium text-yellow-400 mb-2">Note</h3>
                      <p className="text-gray-300">
                        All facilities are maintained regularly to ensure the best experience for our residents. 
                        If you encounter any issues with any facility, please report to the hostel staff immediately.
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'rooms' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">Room Types</h2>
                    <p className="text-gray-300 mb-6">{hostel.name} offers different types of rooms to cater to various preferences and needs.</p>
                    
                    <div className="space-y-6 mb-6">
                      {hostel.roomTypes.map((room, index) => (
                        <div key={index} className="border border-white/10 rounded-xl overflow-hidden">
                          <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-medium text-white">{room.type}</h3>
                              <span className="text-gray-300">{room.count} rooms</span>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-300 mb-4">{room.description}</p>
                            <h4 className="text-white font-medium mb-2">Amenities:</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {room.amenities.map((amenity, i) => (
                                <div key={i} className="flex items-center">
                                  <FiCheck className="text-green-400 mr-2" />
                                  <span className="text-gray-300">{amenity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">Room Allocation</h3>
                    <p className="text-gray-300 mb-4">
                      Room allocation is done at the beginning of the academic year. Students can submit their room preference, 
                      but final allocation is subject to availability and discretion of the hostel administration.
                    </p>
                  </motion.div>
                )}
                
                {activeTab === 'rules' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">Hostel Rules</h2>
                    <p className="text-gray-300 mb-6">All residents must adhere to the following rules and regulations:</p>
                    
                    <div className="space-y-3 mb-6">
                      {hostel.rules.map((rule, index) => (
                        <div 
                          key={index}
                          className="flex items-start p-3 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mr-3 mt-0.5">
                            <FiShield className="text-red-400" />
                          </div>
                          <span className="text-gray-300">{rule}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="text-lg font-medium text-white mb-3">Disciplinary Actions</h3>
                      <p className="text-gray-300 mb-2">
                        Violation of hostel rules may result in one or more of the following disciplinary actions:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-300">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                          Verbal or written warning
                        </li>
                        <li className="flex items-center text-gray-300">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                          Fine or penalty
                        </li>
                        <li className="flex items-center text-gray-300">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                          Suspension from hostel
                        </li>
                        <li className="flex items-center text-gray-300">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                          Expulsion from hostel
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'reviews' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white">Student Reviews</h2>
                      <div className="flex items-center">
                        <div className="flex gap-1 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              className={`${
                                i < Math.floor(avgRating) 
                                  ? 'text-yellow-400' 
                                  : 'text-gray-400'
                              } w-5 h-5`} 
                            />
                          ))}
                        </div>
                        <span className="text-white font-medium">{avgRating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      {hostel.reviews.map((review, index) => (
                        <div 
                          key={index}
                          className="bg-white/5 rounded-xl p-4 transition-all hover:bg-white/10"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                                <span className="text-white font-medium">{review.student.charAt(0)}</span>
                              </div>
                              <div>
                                <h4 className="text-white font-medium">{review.student}</h4>
                                <p className="text-gray-400 text-sm">{new Date(review.date).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="flex items-center bg-white/10 px-2 py-1 rounded">
                              <FiStar className="text-yellow-400 mr-1" />
                              <span className="text-white">{review.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <p className="text-gray-300">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full py-2 px-4 bg-white/5 hover:bg-white/10 transition-colors text-white rounded-lg">
                      Write a Review
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-8"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Photo Gallery</h2>
                <div className="flex overflow-x-auto pb-2 mb-4 space-x-2 scrollbar-hide">
                  <button
                    onClick={() => setImageCategory('all')}
                    className={`px-3 py-1 text-sm whitespace-nowrap rounded-full transition-colors ${
                      imageCategory === 'all' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    All Photos
                  </button>
                  {['room', 'mess', 'facility', 'building'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setImageCategory(category)}
                      className={`px-3 py-1 text-sm whitespace-nowrap rounded-full transition-colors ${
                        imageCategory === category 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {filteredImages.map((image, index) => (
                    <div 
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openLightbox(index)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.alt} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <FiMaximize className="text-white w-6 h-6" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-8 sticky top-24"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                      <FiMail className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a href={`mailto:${hostel.contactEmail}`} className="text-white hover:text-blue-400 transition-colors">
                        {hostel.contactEmail}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center mr-3">
                      <FiPhone className="text-pink-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <a href={`tel:${hostel.contactPhone}`} className="text-white hover:text-pink-400 transition-colors">
                        {hostel.contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3">Hostel Staff</h3>
                <div className="space-y-4 mb-6">
                  {hostel.staff.map((person, index) => (
                    <div key={index} className="flex items-center p-3 bg-white/5 rounded-xl">
                      <img 
                        src={person.image} 
                        alt={person.name} 
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h4 className="text-white font-medium">{person.name}</h4>
                        <p className="text-gray-400 text-sm">{person.position}</p>
                        <a href={`mailto:${person.contact}`} className="text-blue-400 text-xs hover:underline">
                          {person.contact}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3">Fee Structure</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-300">Annual Fee</span>
                    <span className="text-white font-medium">{hostel.fees.annual}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-300">Semester Fee</span>
                    <span className="text-white font-medium">{hostel.fees.semester}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Security Deposit</span>
                    <span className="text-white font-medium">{hostel.fees.security}</span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20">
                  Apply for Hostel
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button 
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
              onClick={closeLightbox}
            >
              <FiX />
            </button>
            
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
              onClick={prevImage}
            >
              <FiChevronLeft />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
              onClick={nextImage}
            >
              <FiChevronRight />
            </button>
            
            <motion.img 
              key={lightboxIndex}
              src={filteredImages[lightboxIndex].url} 
              alt={filteredImages[lightboxIndex].alt} 
              className="max-w-full max-h-[80vh] object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            />
            
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                {lightboxIndex + 1} / {filteredImages.length} - {filteredImages[lightboxIndex].alt}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HostelDetailPage;