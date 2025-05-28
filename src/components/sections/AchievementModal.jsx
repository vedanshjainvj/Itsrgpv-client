import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAward, FiCalendar, FiMapPin, FiUser, FiCode, FiBook, FiTarget, FiExternalLink, FiLinkedin, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

const AchievementModal = ({ achievement, isOpen, onClose }) => {
  if (!achievement) return null;

  const getCategoryColor = (category) => {
    const categoryColors = {
      academic: 'from-blue-500 to-cyan-400',
      research: 'from-purple-500 to-violet-400',
      competition: 'from-green-500 to-emerald-400',
      innovation: 'from-yellow-500 to-amber-400',
      sports: 'from-red-500 to-rose-400',
      cultural: 'from-pink-500 to-fuchsia-400',
      social: 'from-orange-500 to-amber-400'
    };
    
    return categoryColors[category] || 'from-gray-500 to-slate-400';
  };
  
  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'linkedin':
        return <FiLinkedin />;
      case 'github':
        return <FiGithub />;
      case 'twitter':
        return <FiTwitter />;
      case 'instagram':
        return <FiInstagram />;
      default:
        return <FiExternalLink />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors"
            >
              <FiX size={20} />
            </button>
            
            {/* Header */}
            <div className="relative">
              <div className={`h-32 bg-gradient-to-r ${getCategoryColor(achievement.category)} opacity-20`}></div>
              
              <div className="absolute top-0 left-0 w-full h-full flex items-center p-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 p-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30">
                    <img 
                      src={achievement.profileImage} 
                      alt={achievement.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  
                  <div>
                    <div className="text-white font-bold text-2xl mb-1">{achievement.name}</div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-300 flex items-center">
                        <FiCode className="mr-1" size={14} />
                        {achievement.branch}
                      </span>
                      <span className="text-gray-300 flex items-center">
                        <FiBook className="mr-1" size={14} />
                        {achievement.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Achievement Title */}
              <div className="mb-6">
                <div className="flex space-x-2 mb-2">
                  <span className={`bg-gradient-to-r ${getCategoryColor(achievement.category)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                    {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                  </span>
                  
                  {achievement.date && (
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <FiCalendar className="mr-1" size={12} />
                      {achievement.date}
                    </span>
                  )}
                </div>
                
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {achievement.achievement}
                </h2>
                {/* <h3 className="text-xl text-white mt-2">{achievement.headline}</h3> */}
              </div>
              
              {/* Main Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <div className="bg-white/5 rounded-xl p-5 mb-6">
                    <h4 className="text-lg font-bold text-white mb-3">About This Achievement</h4>
                    <div className="text-gray-300 whitespace-pre-line">
                      {achievement.longDescription || achievement.description}
                    </div>
                  </div>
                  
                  {/* Media */}
                  {achievement.media && achievement.media.length > 0 && (
                    <div className="bg-white/5 rounded-xl p-5 mb-6">
                      <h4 className="text-lg font-bold text-white mb-3">Media Gallery</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {achievement.media.map((item, index) => (
                          <motion.div
                            key={index}
                            className="relative rounded-lg overflow-hidden aspect-video"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            {item.type === 'image' && (
                              <img 
                                src={item.url} 
                                alt={item.caption || `Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            )}
                            {item.caption && (
                              <div className="absolute inset-x-0 bottom-0 bg-black/70 p-2 text-white text-sm">
                                {item.caption}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Publications */}
                  {achievement.publications && achievement.publications.length > 0 && (
                    <div className="bg-white/5 rounded-xl p-5 mb-6">
                      <h4 className="text-lg font-bold text-white mb-3">Publications</h4>
                      <ul className="space-y-2">
                        {achievement.publications.map((publication, index) => (
                          <li 
                            key={index}
                            className="text-gray-300 pl-4 border-l-2 border-purple-500"
                          >
                            {publication}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Patents */}
                  {achievement.patents && achievement.patents.length > 0 && (
                    <div className="bg-white/5 rounded-xl p-5 mb-6">
                      <h4 className="text-lg font-bold text-white mb-3">Patents</h4>
                      <ul className="space-y-2">
                        {achievement.patents.map((patent, index) => (
                          <li 
                            key={index}
                            className="text-gray-300 pl-4 border-l-2 border-blue-500"
                          >
                            {patent}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Testimonials */}
                  {achievement.testimonials && achievement.testimonials.length > 0 && (
                    <div className="bg-white/5 rounded-xl p-5">
                      <h4 className="text-lg font-bold text-white mb-3">Testimonials</h4>
                      <div className="space-y-4">
                        {achievement.testimonials.map((testimonial, index) => (
                          <motion.div
                            key={index}
                            className="bg-white/5 rounded-lg p-4 border-l-4 border-purple-500"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <p className="text-gray-300 italic mb-2">"{testimonial.quote}"</p>
                            <p className="text-white text-sm">— {testimonial.author}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Sidebar */}
                <div>
                  {/* Quick Details */}
                  <div className="bg-white/5 rounded-xl p-5 mb-6">
                    <h4 className="text-lg font-bold text-white mb-3">Details</h4>
                    <div className="space-y-4">
                      {achievement.location && (
                        <div className="flex items-start">
                          <FiMapPin className="text-pink-400 mt-1 mr-3 flex-shrink-0" size={18} />
                          <div>
                            <div className="text-gray-400 text-sm">Location</div>
                            <div className="text-white">{achievement.location}</div>
                          </div>
                        </div>
                      )}
                      
                      {achievement.recognizedBy && (
                        <div className="flex items-start">
                          <FiAward className="text-purple-400 mt-1 mr-3 flex-shrink-0" size={18} />
                          <div>
                            <div className="text-gray-400 text-sm">Recognized By</div>
                            <div className="text-white">{achievement.recognizedBy}</div>
                          </div>
                        </div>
                      )}
                      
                      {/* {achievement.impact && (
                        <div className="flex items-start">
                          <FiTarget className="text-green-400 mt-1 mr-3 flex-shrink-0" size={18} />
                          <div>
                            <div className="text-gray-400 text-sm">Impact</div>
                            <div className="text-white">{achievement.impact}</div>
                          </div>
                        </div>
                      )} */}
                    </div>
                  </div>
                  
                  {/* Skills */}
                  {achievement.skills && achievement.skills.length > 0 && (
                    <div className="bg-white/5 rounded-xl p-5 mb-6">
                      <h4 className="text-lg font-bold text-white mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {achievement.skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            className={`bg-gradient-to-r ${getCategoryColor(achievement.category)} bg-opacity-20 text-white px-3 py-1 rounded-full text-xs`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Mentors */}
                  {/* {achievement.mentors == "NA" && achievement.mentors.length > 0 && (
                    <div className="bg-white/5 rounded-xl p-5 mb-6">
                      <h4 className="text-lg font-bold text-white mb-3">Mentors</h4>
                      <ul className="space-y-2">
                        {achievement.mentors.map((mentor, index) => (
                          <li 
                            key={index}
                            className="flex items-center text-gray-300"
                          >
                            <FiUser className="text-blue-400 mr-2" size={16} />
                            {mentor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )} */}
                  
                  {/* Team Members */}
                  {achievement.team && achievement.team.length > 0 && (
                    <div className="bg-white/5 rounded-xl p-5 mb-6">
                      <h4 className="text-lg font-bold text-white mb-3">Team Members</h4>
                      <ul className="space-y-2">
                        {achievement.team.map((member, index) => (
                          <li 
                            key={index}
                            className="flex items-center text-gray-300"
                          >
                            <FiUser className="text-green-400 mr-2" size={16} />
                            {member}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Social Links */}
                  {achievement.socialLinks && Object.keys(achievement.socialLinks).length > 0 && (
                    <div className="bg-white/5 rounded-xl p-5">
                      <h4 className="text-lg font-bold text-white mb-3">Connect</h4>
                      <div className="flex flex-wrap gap-3">
                        {Object.entries(achievement.socialLinks).map(([platform, url], index) => (
                          <a 
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors`}
                            title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                          >
                            {getSocialIcon(platform)}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementModal;