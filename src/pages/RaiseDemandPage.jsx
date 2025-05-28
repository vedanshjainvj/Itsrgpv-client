import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiImage, FiFile, FiX, FiInfo, FiChevronDown, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { checkUseAuth } from '../context/AuthContext';

const RaiseDemandPage = () => {
  const { user } = checkUseAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('facility');
  const [priority, setPriority] = useState('medium');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const MAX_CHARS = 1000;

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
    tap: { scale: 0.95 },
    disabled: { opacity: 0.7 }
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

  // Category options
  const categoryOptions = [
    { id: 'facility', label: 'Facility Improvement', color: 'green' },
    { id: 'academic', label: 'Academic Resources', color: 'blue' },
    { id: 'hostel', label: 'Hostel Issues', color: 'yellow' },
    { id: 'events', label: 'Event Requests', color: 'purple' },
    { id: 'other', label: 'Other', color: 'gray' }
  ];

  // Priority options
  const priorityOptions = [
    { id: 'high', label: 'High Priority', color: 'red' },
    { id: 'medium', label: 'Medium Priority', color: 'yellow' },
    { id: 'low', label: 'Low Priority', color: 'green' }
  ];

  const getCategoryColor = (categoryId) => {
    const category = categoryOptions.find(cat => cat.id === categoryId);
    switch(category?.color) {
      case 'blue': return 'from-blue-500 to-indigo-600';
      case 'green': return 'from-green-500 to-emerald-600';
      case 'yellow': return 'from-yellow-500 to-amber-600';
      case 'gray': return 'from-gray-500 to-gray-600';
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
      case 'gray': return 'text-gray-400';
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
      case 'gray': return 'bg-gray-500/10';
      case 'purple':
      default: return 'bg-purple-500/10';
    }
  };

  const getPriorityColor = (priorityId) => {
    const priority = priorityOptions.find(p => p.id === priorityId);
    switch(priority?.color) {
      case 'red': return 'from-red-500 to-rose-600';
      case 'yellow': return 'from-yellow-500 to-amber-600';
      case 'green': return 'from-green-500 to-emerald-600';
      default: return 'from-yellow-500 to-amber-600';
    }
  };

  const getPriorityTextColor = (priorityId) => {
    const priority = priorityOptions.find(p => p.id === priorityId);
    switch(priority?.color) {
      case 'red': return 'text-red-400';
      case 'yellow': return 'text-yellow-400';
      case 'green': return 'text-green-400';
      default: return 'text-yellow-400';
    }
  };

  const getPriorityBgColor = (priorityId) => {
    const priority = priorityOptions.find(p => p.id === priorityId);
    switch(priority?.color) {
      case 'red': return 'bg-red-500/10';
      case 'yellow': return 'bg-yellow-500/10';
      case 'green': return 'bg-green-500/10';
      default: return 'bg-yellow-500/10';
    }
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    if (newDescription.length <= MAX_CHARS) {
      setDescription(newDescription);
      setCharacterCount(newDescription.length);
    }
  };

  const handleAttachmentUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0 && attachments.length < 3) {
      const newAttachments = files.slice(0, 3 - attachments.length).map(file => ({
        id: Date.now() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
        file
      }));
      
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('facility');
      setPriority('medium');
      setAttachments([]);
      setCharacterCount(0);
      
      // Show success notification
      alert('Demand raised successfully!');
    }, 1500);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <motion.div 
      className="raise-demand-page pt-24 pb-16 min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800/70 overflow-hidden shadow-xl">
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <motion.h1 
                className="text-xl sm:text-2xl font-bold text-white"
                variants={itemVariants}
              >
                Raise a New Demand
              </motion.h1>
              <motion.div 
                className="flex items-center space-x-1"
                variants={itemVariants}
              >
                <span className="text-xs text-gray-400">{characterCount}/{MAX_CHARS}</span>
              </motion.div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input */}
              <motion.div variants={itemVariants}>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Demand Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter a clear, concise title for your demand"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  required
                />
              </motion.div>
              
              {/* Description Textarea */}
              <motion.div variants={itemVariants}>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  id="description"
                  placeholder="Describe your demand in detail. Include what, why, and how it would benefit the college community."
                  value={description}
                  onChange={handleDescriptionChange}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 min-h-[150px] resize-y"
                  required
                />
              </motion.div>
              
              {/* Category & Priority Selection */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Category Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                        setIsPriorityDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg ${getCategoryBgColor(category)} ${getCategoryTextColor(category)} border border-gray-700/50 transition-all duration-300`}
                    >
                      <span>{categoryOptions.find(cat => cat.id === category)?.label}</span>
                      <FiChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <motion.div
                      animate={isDropdownOpen ? "visible" : "hidden"}
                      initial="hidden"
                      variants={dropdownVariants}
                      className="absolute left-0 right-0 mt-1 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-10 py-1 overflow-hidden"
                      style={{ display: isDropdownOpen ? 'block' : 'none' }}
                    >
                      {categoryOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => {
                            setCategory(option.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${
                            category === option.id ? getCategoryTextColor(option.id) : 'text-gray-300'
                          }`}
                        >
                          {category === option.id && (
                            <FiCheck className="mr-2" size={16} />
                          )}
                          <span className={category === option.id ? 'ml-0' : 'ml-5'}>
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  </div>
                </div>
                
                {/* Priority Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPriorityDropdownOpen(!isPriorityDropdownOpen);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg ${getPriorityBgColor(priority)} ${getPriorityTextColor(priority)} border border-gray-700/50 transition-all duration-300`}
                    >
                      <span>{priorityOptions.find(p => p.id === priority)?.label}</span>
                      <FiChevronDown size={16} className={`transition-transform duration-300 ${isPriorityDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <motion.div
                      animate={isPriorityDropdownOpen ? "visible" : "hidden"}
                      initial="hidden"
                      variants={dropdownVariants}
                      className="absolute left-0 right-0 mt-1 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-10 py-1 overflow-hidden"
                      style={{ display: isPriorityDropdownOpen ? 'block' : 'none' }}
                    >
                      {priorityOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => {
                            setPriority(option.id);
                            setIsPriorityDropdownOpen(false);
                          }}
                          className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${
                            priority === option.id ? getPriorityTextColor(option.id) : 'text-gray-300'
                          }`}
                        >
                          {priority === option.id && (
                            <FiCheck className="mr-2" size={16} />
                          )}
                          <span className={priority === option.id ? 'ml-0' : 'ml-5'}>
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Attachments */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Attachments (Optional)
                  <span className="text-xs text-gray-400 ml-2">
                    Max 3 files
                  </span>
                </label>
                
                {/* Attachment List */}
                {attachments.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {attachments.map((attachment) => (
                      <div 
                        key={attachment.id}
                        className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-700/50"
                      >
                        <div className="flex items-center space-x-3">
                          {attachment.preview ? (
                            <div className="w-10 h-10 rounded overflow-hidden bg-gray-700/50">
                              <img 
                                src={attachment.preview} 
                                alt={attachment.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded bg-gray-700/50 flex items-center justify-center">
                              <FiFile size={18} className="text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{attachment.name}</p>
                            <p className="text-xs text-gray-400">{formatFileSize(attachment.size)}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(attachment.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors p-1"
                        >
                          <FiX size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Upload Button */}
                {attachments.length < 3 && (
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-purple-500/50 transition-colors">
                      <FiImage className="mx-auto text-gray-400 mb-2" size={24} />
                      <p className="text-sm text-gray-300">Click to upload files or images</p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF up to 5MB</p>
                      <input 
                        type="file" 
                        className="hidden" 
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleAttachmentUpload}
                      />
                    </div>
                  </label>
                )}
              </motion.div>
              
              {/* Notice */}
              <motion.div 
                variants={itemVariants}
                className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start space-x-3"
              >
                <FiInfo className="text-blue-400 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <p className="text-sm text-blue-300">Your demand will be reviewed by the student council before being published. You'll be notified once it's approved.</p>
                </div>
              </motion.div>
              
              {/* Submit Button */}
              <motion.div 
                variants={itemVariants}
                className="flex justify-end"
              >
                <motion.button
                  type="submit"
                  disabled={!description.trim() || !title.trim() || isSubmitting}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover={(!description.trim() || !title.trim() || isSubmitting) ? "disabled" : "hover"}
                  whileTap={(!description.trim() || !title.trim() || isSubmitting) ? "disabled" : "tap"}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium ${
                    !description.trim() || !title.trim() || isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : `bg-gradient-to-r ${getCategoryColor(category)} hover:shadow-lg`
                  } transition-all duration-300`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FiSend size={18} />
                      <span>Submit Demand</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </div>
        
        {/* Tips */}
        <motion.div 
          variants={itemVariants}
          className="mt-6 bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800/70 overflow-hidden shadow-xl p-4 sm:p-6"
        >
          <h2 className="font-bold text-white mb-4 flex items-center">
            <FiAlertCircle className="mr-2 text-purple-400" size={18} />
            Tips for an Effective Demand
          </h2>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start">
              <span className="mr-2 text-purple-500">1.</span>
              <span>Be specific about what you're requesting and why it's important</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-500">2.</span>
              <span>Provide evidence or examples to support your demand when possible</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-500">3.</span>
              <span>Suggest practical solutions or implementations</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-500">4.</span>
              <span>Consider the feasibility and timeline for implementation</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-500">5.</span>
              <span>Use a constructive tone rather than a complaining one</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RaiseDemandPage;