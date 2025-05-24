import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers, FiArrowLeft, FiExternalLink, FiAward } from 'react-icons/fi';
import festsApi from '../services/api/fests';
import { FESTS } from '../utils/constants'; // Keep for fallback

const FestDetailPage = () => {
  const { id } = useParams();
  const [festData, setFestData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFestDetails = async () => {
      try {
        setIsLoading(true);
        const data = await festsApi.getFestById(id);
        setFestData(data);
      } catch (err) {
        console.error('Error fetching fest details:', err);
        setError('Failed to load festival details. Please try again later.');
        
        // Try to find a fallback from static data
        const fallbackFest = FESTS.find(fest => fest.id === id);
        if (fallbackFest) {
          setFestData(fallbackFest);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFestDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-pink-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading festival details...</p>
        </div>
      </div>
    );
  }

  if (error && !festData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <FiAward className="text-red-500 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <Link 
            to="/fests" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all inline-flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Back to Festivals
          </Link>
        </div>
      </div>
    );
  }

  if (!festData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-4">
            <FiAward className="text-yellow-500 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Festival Not Found</h2>
          <p className="text-gray-300 mb-6">The festival you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/fests" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all inline-flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Back to Festivals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-pink-500/10 rounded-full blur-[120px]"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10"></div>
        <img 
          src={festData.image} 
          alt={festData.name} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex flex-col justify-end z-20 p-6 md:p-12">
          <div className="max-w-7xl mx-auto w-full">
            <Link 
              to="/fests"
              className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Festivals
            </Link>
            
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs inline-block mb-3">
              {festData.prizes}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{festData.name}</h1>
            <p className="text-xl text-gray-300">{festData.tagline}</p>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center text-gray-300">
                <FiCalendar className="mr-2" />
                {festData.date}
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center text-gray-300">
                <FiMapPin className="mr-2" />
                RGPV Campus
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center text-gray-300">
                <FiUsers className="mr-2" />
                {festData.previousYearAttendance} Previous Attendance
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Description */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">About the Festival</h2>
          <p className="text-gray-300">{festData.description}</p>
          
          {festData.organizedBy && (
            <div className="mt-6 bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Organized By</h3>
              <p className="text-gray-300">{festData.organizedBy}</p>
            </div>
          )}
        </div>
        
        {/* Events and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-8 h-full">
              <h2 className="text-2xl font-bold text-white mb-4">Featured Events</h2>
              
              {festData.events && festData.events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {festData.events.map((event, index) => (
                    <div 
                      key={index}
                      className="bg-white/5 rounded-lg p-4"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mr-3">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{event}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Event details will be announced soon. Stay tuned!</p>
              )}
            </div>
          </div>
          
          {/* Details Card */}
          <div>
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-8 h-full">
              <h2 className="text-2xl font-bold text-white mb-4">Festival Details</h2>
              
              <div className="space-y-6">
                {festData.website && festData.website !== '#' && (
                  <a 
                    href={festData.website}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all w-full block text-center"
                  >
                    <span className="flex items-center justify-center">
                      <FiExternalLink className="mr-2" />
                      Visit Official Website
                    </span>
                  </a>
                )}
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Date & Time</h3>
                  <p className="text-gray-300">{festData.date}</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Prizes</h3>
                  <p className="text-gray-300">{festData.prizes}</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Previous Attendance</h3>
                  <p className="text-gray-300">{festData.previousYearAttendance}</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Organized By</h3>
                  <p className="text-gray-300">{festData.organizedBy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestDetailPage;
