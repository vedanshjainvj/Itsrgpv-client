import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMessageSquare, FiPlusCircle, FiSettings, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const ProfileDropdown = ({ user, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle navigation to profile-related pages
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.2, 
        ease: "easeOut" 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      } 
    }
  };

  const linkVariants = {
    hover: { x: 5, transition: { duration: 0.2 } }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center ${isMobile ? 'space-x-1' : 'space-x-2'} focus:outline-none`}
      >
        <div className={`${isMobile ? 'w-9 h-9' : 'w-8 h-8'} rounded-full overflow-hidden border-2 border-transparent hover:border-purple-500/50 transition-all duration-300`}>
          <img
            src={user?.profilePic || 'https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg'}
            alt={user?.firstName || 'User'}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {!isMobile && (
          <>
            <span className="text-white text-sm font-medium">{user?.firstName}</span>
            <FiChevronDown
              className={`text-gray-400 hover:text-white transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
              size={16}
            />
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute ${isMobile ? 'right-0 mt-2 w-48' : 'right-0 mt-2 w-56'} bg-black backdrop-blur-xl border border-gray-800/80 rounded-xl shadow-xl overflow-hidden z-50`}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-3 border-b border-gray-800/80">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700/50">
                  <img
                    src={user?.profilePic || 'https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg'}
                    alt={user?.firstName || 'User'}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="text-white font-medium">
                    {user?.firstName || 'Hello User'} {user?.lastName}
                  </div>
                  <div className="text-gray-400 text-xs truncate max-w-[140px]">{user?.email || 'user@example.com'}</div>
                </div>
              </div>
            </div>

            <div className="py-1">
              <motion.button
                onClick={() => handleNavigation('/profile')}
                className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800/80 hover:text-white transition-colors text-left"
                variants={linkVariants}
                whileHover="hover"
              >
                <FiUser className="mr-3 text-purple-400" size={16} />
                <span>View Profile</span>
              </motion.button>
              
              <motion.button
                onClick={() => handleNavigation('/post-comment')}
                className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800/80 hover:text-white transition-colors text-left"
                variants={linkVariants}
                whileHover="hover"
              >
                <FiMessageSquare className="mr-3 text-blue-400" size={16} />
                <span>Post Comment</span>
              </motion.button>
              
              <motion.button
                onClick={() => handleNavigation('/raise-demand')}
                className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800/80 hover:text-white transition-colors text-left"
                variants={linkVariants}
                whileHover="hover"
              >
                <FiPlusCircle className="mr-3 text-green-400" size={16} />
                <span>Raise Demand</span>
              </motion.button>
              
              <motion.button
                onClick={() => handleNavigation('/settings')}
                className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800/80 hover:text-white transition-colors text-left"
                variants={linkVariants}
                whileHover="hover"
              >
                <FiSettings className="mr-3 text-orange-400" size={16} />
                <span>Settings</span>
              </motion.button>
            </div>

            <div className="border-t border-gray-800/80 py-1">
              <motion.button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-400 hover:bg-gray-800/80 hover:text-red-300 w-full text-left transition-colors"
                variants={linkVariants}
                whileHover="hover"
              >
                <FiLogOut className="mr-3" size={16} />
                <span>Logout</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;