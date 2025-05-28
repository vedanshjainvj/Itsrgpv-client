import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLogOut, FiSettings, FiMessageSquare, FiPlusCircle, FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { checkUseAuth } from '../../context/AuthContext';
import AuthModal from './AuthModal';

const AuthButton = () => {
  const { user, isAuthenticated, logout } = checkUseAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('login');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const openModal = (mode) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  return (
    <div className="relative">
      {isAuthenticated ? (
        <div>
          <button
            className="flex items-center space-x-2 group"
            onClick={toggleProfileMenu}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-purple-500 transition-colors">
              <img
                src={user.profilePic || '/default-avatar.png'}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <span className="text-white text-sm font-medium">{user.firstName}</span>
            </div>
            <FiChevronDown 
              className={`text-gray-400 group-hover:text-white transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}
              size={16}
            />
          </button>
          
          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <motion.div
              className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-3 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={user.profilePic || '/default-avatar.png'}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-medium">{user.firstName} {user.lastName}</div>
                    <div className="text-gray-400 text-xs">{user.email}</div>
                  </div>
                </div>
              </div>
              
              <div className="py-1">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <FiUser className="mr-3" size={16} />
                  <span>View Profile</span>
                </Link>
                <Link
                  to="/comments"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <FiMessageSquare className="mr-3" size={16} />
                  <span>Post Comment</span>
                </Link>
                <Link
                  to="/demands/new"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <FiPlusCircle className="mr-3" size={16} />
                  <span>Raise Demand</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <FiSettings className="mr-3" size={16} />
                  <span>Settings</span>
                </Link>
              </div>
              
              <div className="border-t border-gray-800 py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300 w-full text-left"
                >
                  <FiLogOut className="mr-3" size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={() => openModal('login')}
            className="py-2 px-3 text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => openModal('signup')}
            className="py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            Sign Up
          </button>
        </div>
      )}
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialMode={modalMode}
      />
    </div>
  );
};

export default AuthButton;