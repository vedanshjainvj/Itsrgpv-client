import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FESTS } from '../../utils/constants';
import festsApi from '../../services/api/fests';

const FestsSection = () => {
  const [activeFestIndex, setActiveFestIndex] = useState(0);
  const [festsData, setFestsData] = useState(FESTS);
  
  // Fetch fests from API
  useEffect(() => {
    const fetchFests = async () => {
      try {
        const response = await festsApi.getFests();
        if (response && response.fests && response.fests.length > 0) {
          setFestsData(response.fests);
        }
      } catch (err) {
        console.error('Error fetching fests:', err);
        // Keep the default FESTS data on error
      }
    };
    
    fetchFests();
  }, []);
  
  const activeFest = festsData[activeFestIndex];
  
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-pink-500/5 blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Annual College Festivals</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Experience the vibrance and excitement of our annual festivals that showcase talent, innovation, and team spirit.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            {festsData.map((fest, index) => (
              <motion.div
                key={fest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                  index === activeFestIndex 
                    ? 'bg-gradient-to-r from-black/50 to-black/30 border-l-4 border-l-pink-500 shadow-[0_5px_20px_-5px_rgba(236,72,153,0.3)]' 
                    : 'bg-black/20 hover:bg-black/30'
                }`}
                onClick={() => setActiveFestIndex(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-2 h-12 rounded-full ${index === activeFestIndex ? 'bg-gradient-to-b from-pink-500 to-purple-500' : 'bg-white/20'}`}></div>
                  <div>
                    <h3 className={`font-bold text-xl ${index === activeFestIndex ? 'text-white' : 'text-gray-300'}`}>{fest.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{fest.tagline}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {fest.date}
                      </span>
                      <span className="w-1 h-1 bg-gray-600 rounded-full mx-2"></span>
                      <span>{fest.organizedBy}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFestIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
              >
                <div className="relative h-64 md:h-80">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                  <img 
                    src={activeFest.image} 
                    alt={activeFest.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-0 bottom-0 p-6 z-20">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs inline-block mb-3">
                      {activeFest.prizes}
                    </div>
                    <h3 className="text-3xl font-bold text-white">{activeFest.name}</h3>
                    <p className="text-gray-300">{activeFest.tagline}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-300 mb-6">{activeFest.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Featured Events</h4>
                      <ul className="space-y-2">
                        {activeFest.events.map((event, index) => (
                          <li key={index} className="flex items-center text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-2"></span>
                            {event}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Festival Details</h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Date</p>
                            <p className="text-gray-300">{activeFest.date}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Attendance</p>
                            <p className="text-gray-300">{activeFest.previousYearAttendance}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Website</p>
                            <a href={activeFest.website} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors">
                              {activeFest.website}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/fests/${activeFest.id}`}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                    >
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center text-sm">
                      View Gallery
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FestsSection;