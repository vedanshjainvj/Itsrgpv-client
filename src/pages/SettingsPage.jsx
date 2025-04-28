import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiBell, FiGlobe, FiSave, FiEdit2, FiUpload, FiCheck, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    branch: user?.branch || '',
    year: user?.year || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notificationEmails: true,
    notificationApp: true,
    language: 'english',
    theme: 'dark'
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [profileImage, setProfileImage] = useState(user?.profilePic || '/assets/default-avatar.png');
  const [coverImage, setCoverImage] = useState(user?.coverPic || '/assets/default-cover.jpg');
  const [tempProfileImage, setTempProfileImage] = useState(null);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
      }
    },
    exit: { opacity: 0, y: 20 }
  };

  const tabVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  // Tabs for settings
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser size={18} /> },
    { id: 'password', label: 'Password', icon: <FiLock size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <FiGlobe size={18} /> }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyProfileImage = () => {
    setProfileImage(tempProfileImage);
    setTempProfileImage(null);
  };

  const cancelProfileImageChange = () => {
    setTempProfileImage(null);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleShowPassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Here you would update user data in your app context
      alert('Settings saved successfully!');
    }, 1500);
  };

  // Render different settings sections based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <motion.div 
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            {/* Profile Picture */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-medium text-white">Profile Picture</h3>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700">
                    <img 
                      src={tempProfileImage || profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {!tempProfileImage && (
                    <label className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors cursor-pointer">
                      <FiEdit2 size={14} />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleProfileImageChange}
                      />
                    </label>
                  )}
                </div>
                
                {tempProfileImage && (
                  <div className="flex space-x-2">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={applyProfileImage}
                      className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-full"
                    >
                      <FiCheck size={16} />
                    </motion.button>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={cancelProfileImageChange}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
                    >
                      <FiX size={16} />
                    </motion.button>
                  </div>
                )}
                
                <div className="flex-1">
                  <p className="text-sm text-gray-300">Upload a new profile picture</p>
                  <p className="text-xs text-gray-400 mt-1">JPG or PNG, max 5MB</p>
                </div>
              </div>
            </motion.div>
            
            {/* Cover Image */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-medium text-white">Cover Image</h3>
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-700">
                <img 
                  src={coverImage} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
                <label className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2 rounded-full transition-colors cursor-pointer">
                  <FiUpload size={16} />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleCoverImageChange}
                  />
                </label>
              </div>
            </motion.div>
            
            {/* Personal Information */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-medium text-white">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  disabled
                />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 resize-none"
                  placeholder="Tell others about yourself"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-300 mb-1">Branch</label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 appearance-none"
                  >
                    <option value="">Select a branch</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Chemical">Chemical</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">Year</label>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 appearance-none"
                  >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
        
      case 'password':
        return (
          <motion.div 
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-medium text-white">Change Password</h3>
              
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPassword.current ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white pr-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleToggleShowPassword('current')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                  >
                    {showPassword.current ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                <div className="relative">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword.new ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white pr-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleToggleShowPassword('new')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                  >
                    {showPassword.new ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword.confirm ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white pr-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleToggleShowPassword('confirm')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                  >
                    {showPassword.confirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">Passwords do not match</p>
                )}
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-gray-300 mb-2">Password Requirements:</p>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li className="flex items-center">
                    <span className={`mr-2 ${formData.newPassword.length >= 8 ? 'text-green-400' : 'text-gray-500'}`}>•</span>
                    Minimum 8 characters
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${/[A-Z]/.test(formData.newPassword) ? 'text-green-400' : 'text-gray-500'}`}>•</span>
                    At least one uppercase letter
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${/[0-9]/.test(formData.newPassword) ? 'text-green-400' : 'text-gray-500'}`}>•</span>
                    At least one number
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${/[!@#$%^&*]/.test(formData.newPassword) ? 'text-green-400' : 'text-gray-500'}`}>•</span>
                    At least one special character
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        );
        
      case 'notifications':
        return (
          <motion.div 
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-medium text-white">Notification Settings</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h4 className="text-white font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-400">Receive updates, announcements, and alerts via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="notificationEmails"
                      checked={formData.notificationEmails} 
                      onChange={handleInputChange}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                
                <div className="border-t border-gray-800"></div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h4 className="text-white font-medium">In-App Notifications</h4>
                    <p className="text-sm text-gray-400">Receive notifications within the application</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="notificationApp"
                      checked={formData.notificationApp} 
                      onChange={handleInputChange}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-medium text-white">Notification Types</h3>
              
              <div className="space-y-3">
                {['Comments on your posts', 'Likes on your posts', 'New followers', 'Demand updates', 'Event reminders'].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-gray-300">{item}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        defaultChecked={true} 
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
        
      case 'preferences':
        return (
          <motion.div 
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-medium text-white">App Preferences</h3>
              
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">Language</label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 appearance-none"
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-300 mb-1">Theme</label>
                <select
                  id="theme"
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 appearance-none"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="system">System Default</option>
                </select>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-medium text-white">Privacy Settings</h3>
              
              <div className="space-y-3">
                {[
                  'Show my online status', 
                  'Allow others to see my profile', 
                  'Show my participation in events'
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-gray-300">{item}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        defaultChecked={true} 
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="pt-2">
              <button
                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
              >
                Delete Account
              </button>
            </motion.div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="settings-page pt-24 pb-16 min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar with tabs */}
          <motion.div 
            variants={tabVariants}
            className="md:w-64 shrink-0"
          >
            <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800/70 overflow-hidden shadow-xl p-4">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-purple-500/20 text-white'
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
                    }`}
                  >
                    <span className={`mr-3 ${activeTab === tab.id ? 'text-purple-400' : ''}`}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Content area */}
          <div className="flex-1">
            <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800/70 overflow-hidden shadow-xl p-4 sm:p-6">
              {/* Tab content */}
              {renderTabContent()}
              
              {/* Save button (appears on all tabs) */}
              <motion.div 
                variants={itemVariants}
                className="mt-8 flex justify-end"
              >
                <motion.button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover={isSaving ? "disabled" : "hover"}
                  whileTap={isSaving ? "disabled" : "tap"}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium ${
                    isSaving
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg'
                  } transition-all duration-300`}
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FiSave size={18} />
                      <span>Save Changes</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;