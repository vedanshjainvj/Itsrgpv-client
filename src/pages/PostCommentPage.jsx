import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiImage, FiLink, FiSmile, FiX, FiTag, FiChevronDown, FiCheck } from 'react-icons/fi';
import { checkUseAuth } from '../context/AuthContext';

const PostCommentPage = () => {
  const { user } = checkUseAuth();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const MAX_CHARS = 500;

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

  const categoryOptions = [
    { id: 'general', label: 'General', color: 'purple' },
    { id: 'academics', label: 'Academics', color: 'blue' },
    { id: 'events', label: 'Events', color: 'green' },
    { id: 'facility', label: 'Facility', color: 'yellow' },
    { id: 'resources', label: 'Resources', color: 'pink' },
  ];

  const getCategoryColor = (categoryId) => {
    const category = categoryOptions.find(cat => cat.id === categoryId);
    switch(category?.color) {
      case 'blue': return 'from-blue-500 to-indigo-600';
      case 'green': return 'from-green-500 to-emerald-600';
      case 'yellow': return 'from-yellow-500 to-amber-600';
      case 'pink': return 'from-pink-500 to-rose-600';
      case 'purple':
      default: return 'from-purple-500 to-indigo-600';
    }
  };

  const getCategoryTextColor = (categoryId) => {
    const category = categoryOptions.find(cat => cat.id === categoryId);
    switch(category?.color) {
      case 'blue': return 'text-blue-400';
      case 'green': return 'text-green-400';
      case 'yellow': return 'text-yellow-400';
      case 'pink': return 'text-pink-400';
      case 'purple':
      default: return 'text-purple-400';
    }
  };

  const getCategoryBgColor = (categoryId) => {
    const category = categoryOptions.find(cat => cat.id === categoryId);
    switch(category?.color) {
      case 'blue': return 'bg-blue-500/10';
      case 'green': return 'bg-green-500/10';
      case 'yellow': return 'bg-yellow-500/10';
      case 'pink': return 'bg-pink-500/10';
      case 'purple':
      default: return 'bg-purple-500/10';
    }
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_CHARS) {
      setContent(newContent);
      setCharacterCount(newContent.length);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setContent('');
      setTitle('');
      setPreviewImage(null);
      setCharacterCount(0);
      
      // Show success toast or notification (implementation depends on your toast/notification system)
      alert('Comment posted successfully!');
    }, 1500);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.7 }
  };

  return (
    <motion.div 
      className="post-comment-page pt-24 pb-16 min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800/70 overflow-hidden shadow-xl">
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Create New Post</h1>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-400">{characterCount}/{MAX_CHARS}</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Title Input */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  required
                />
              </div>
              
              {/* Content Textarea */}
              <div className="mb-4">
                <textarea
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={handleContentChange}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 min-h-[120px] resize-y"
                  required
                />
              </div>
              
              {/* Image Preview */}
              {previewImage && (
                <div className="relative mb-4 rounded-lg overflow-hidden border border-gray-700/50">
                  <img src={previewImage} alt="Preview" className="w-full max-h-60 object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full hover:bg-black transition-colors duration-200"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              )}
              
              {/* Actions Bar */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  {/* Image Upload */}
                  <label className="cursor-pointer text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800/60">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                    <FiImage size={20} />
                  </label>
                  
                  {/* Link */}
                  <button 
                    type="button"
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800/60"
                  >
                    <FiLink size={20} />
                  </button>
                  
                  {/* Emoji */}
                  <button 
                    type="button"
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800/60"
                  >
                    <FiSmile size={20} />
                  </button>
                  
                  {/* Category Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-full ${getCategoryBgColor(selectedCategory)} ${getCategoryTextColor(selectedCategory)} transition-all duration-300`}
                    >
                      <FiTag size={16} />
                      <span>{categoryOptions.find(cat => cat.id === selectedCategory)?.label}</span>
                      <FiChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <motion.div
                      animate={isDropdownOpen ? "visible" : "hidden"}
                      initial="hidden"
                      variants={dropdownVariants}
                      className="absolute left-0 mt-2 w-40 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-10 py-1 overflow-hidden"
                      style={{ display: isDropdownOpen ? 'block' : 'none' }}
                    >
                      {categoryOptions.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`flex items-center w-full px-3 py-2 text-left hover:bg-gray-800 transition-colors ${
                            selectedCategory === category.id ? getCategoryTextColor(category.id) : 'text-gray-300'
                          }`}
                        >
                          {selectedCategory === category.id && (
                            <FiCheck className="mr-2" size={14} />
                          )}
                          <span className={selectedCategory === category.id ? 'ml-0' : 'ml-5'}>
                            {category.label}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={!content.trim() || !title.trim() || isSubmitting}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover={(!content.trim() || !title.trim() || isSubmitting) ? "disabled" : "hover"}
                  whileTap={(!content.trim() || !title.trim() || isSubmitting) ? "disabled" : "tap"}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-white ${
                    !content.trim() || !title.trim() || isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : `bg-gradient-to-r ${getCategoryColor(selectedCategory)} hover:shadow-lg`
                  } transition-all duration-300`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <FiSend size={16} />
                      <span>Post</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Current User Info */}
        <div className="mt-6 bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800/70 overflow-hidden shadow-xl p-4 sm:p-6">
          <div className="flex items-center space-x-4">
            <img 
              src={user?.profilePic || '/assets/default-avatar.png'} 
              alt={user?.firstName || 'User'} 
              className="w-12 h-12 rounded-full object-cover border border-gray-700"
            />
            <div>
              <h2 className="font-medium text-white">{user?.firstName || 'User'} {user?.lastName || ''}</h2>
              <p className="text-sm text-gray-400">Your posts will be visible to all college students</p>
            </div>
          </div>
        </div>
        
        {/* Guidelines */}
        <div className="mt-6 bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800/70 overflow-hidden shadow-xl p-4 sm:p-6">
          <h2 className="font-bold text-white mb-3">Posting Guidelines</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">•</span>
              Be respectful and considerate towards others
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">•</span>
              Keep posts relevant to college activities and academics
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">•</span>
              Avoid sharing personal or sensitive information
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">•</span>
              Use appropriate language and content
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCommentPage;