import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit3, FiCamera, FiBookmark, FiCalendar, FiEdit, FiHeart, FiMessageSquare, FiShare2 } from 'react-icons/fi';
import { checkUseAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user ,userData} = checkUseAuth();
  const [activeTab, setActiveTab] = useState('posts');

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
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      y: -5,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  // Tabs for profile content
  const tabs = [
    { id: 'posts', label: 'Posts' },
    { id: 'comments', label: 'Comments' },
    { id: 'demands', label: 'Demands' },
    { id: 'saved', label: 'Saved' }
  ];

  // Mock data for user profile
  // const mockUser = {
  //   ...user,
  //   firstName: userData?.firstName || 'John',
  //   lastName: userData?.lastName || 'Doe',
  //   email: userData?.email || 'john.doe@example.com',
  //   branch: 'Computer Science',
  //   year: '3rd Year',
  //   bio: 'Passionate student interested in web development, machine learning, and creating innovative solutions.',
  //   profilePic: user?.profilePic || '/assets/default-avatar.png',
  //   coverPic: '/assets/profile-cover.jpg',
  //   joinDate: 'June 2022',
  //   posts: 24,
  //   demands: 5,
  //   comments: 42,
  //   followers: 128,
  //   following: 87
  // };

  const mockUser = {
  firstName: userData?.firstName || 'John',
  lastName: userData?.lastName || 'Doe',
  email: userData?.email || 'john.doe@example.com',
  branch: userData?.branch || 'Computer Science',
  year: userData?.year || '3rd Year',
  bio: userData?.aboutUs || 'Passionate student interested in web development, machine learning, and creating innovative solutions.',
  profilePic: userData?.profilePic || '/assets/default-avatar.png',
  coverPic: userData?.coverPic || '/assets/profile-cover.jpg',
  joinDate: userData?.createdAt || 'June 2022',
  posts: userData?.posts ?? 24,
  demands: userData?.demands ?? 5,
  comments: userData?.comments ?? 42,
  followers: userData?.followers ?? 128,
  following: userData?.following ?? 87
};


  // Mock posts data
  const mockPosts = [
    {
      id: 1,
      title: 'New Library Resources',
      content: 'Just discovered amazing new resources in our college library section B. They have added the latest tech books!',
      date: '2 days ago',
      likes: 24,
      comments: 5,
      type: 'post',
      tag: 'resources'
    },
    {
      id: 2,
      title: 'Hostel WiFi Improvement',
      content: 'Finally the WiFi in our hostel has been upgraded. The speed has improved significantly.',
      date: '1 week ago',
      likes: 46,
      comments: 12,
      type: 'demand',
      tag: 'facility'
    },
    {
      id: 3,
      title: 'Upcoming Hackathon',
      content: 'Anyone interested in forming a team for the upcoming annual hackathon? I\'m looking for designers and backend developers.',
      date: '3 days ago',
      likes: 18,
      comments: 8,
      type: 'post',
      tag: 'event'
    }
  ];

  // Function to render content based on the active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'posts':
        return (
          <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 gap-6"
          >
            {mockPosts.filter(post => post.type === 'post').map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </motion.div>
        );
      case 'demands':
        return (
          <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 gap-6"
          >
            {mockPosts.filter(post => post.type === 'demand').map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </motion.div>
        );
      case 'comments':
        return (
          <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 gap-6"
          >
            <div className="text-center text-gray-400 py-8">Your comments will appear here</div>
          </motion.div>
        );
      case 'saved':
        return (
          <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 gap-6"
          >
            <div className="text-center text-gray-400 py-8">Your saved items will appear here</div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  // Post Card Component
  const PostCard = ({ post }) => {
    return (
      <motion.div 
        variants={cardVariants}
        whileHover="hover"
        className="relative bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden"
      >
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
                alt={mockUser.firstName} 
                className="w-10 h-10 rounded-full object-cover border border-gray-700"
              />
              <div>
                <h3 className="font-medium text-white">{mockUser.firstName} {mockUser.lastName}</h3>
                <p className="text-xs text-gray-400 flex items-center">
                  <FiCalendar size={12} className="mr-1" />
                  {post.date}
                </p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${post.tag === 'resources' ? 'bg-blue-500/20 text-blue-400' : post.tag === 'facility' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
              {post.tag}
            </span>
          </div>
          
          <div className="mt-3">
            <h2 className="text-lg font-semibold text-white mb-2">{post.title}</h2>
            <p className="text-gray-300">{post.content}</p>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-700/50 flex items-center justify-between">
            <div className="flex space-x-4">
              <button className="flex items-center text-gray-400 hover:text-pink-500 transition-colors">
                <FiHeart size={18} className="mr-1" />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center text-gray-400 hover:text-blue-500 transition-colors">
                <FiMessageSquare size={18} className="mr-1" />
                <span className="text-sm">{post.comments}</span>
              </button>
            </div>
            <div>
              <button className="text-gray-400 hover:text-purple-500 transition-colors">
                <FiShare2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      className="profile-page pt-20 pb-12 min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="w-full h-56 md:h-64 lg:h-80 overflow-hidden">
          <img 
            src="https://marketplace.canva.com/EAE1oe3H6Sc/1/0/1600w/canva-black-elegant-minimalist-profile-linkedin-banner-nc0eALdRvKU.jpg"
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60"></div>
          <button className="absolute right-4 bottom-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300">
            <FiCamera size={20} />
          </button>
        </div>
        
        {/* Profile Info */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row items-start md:items-end gap-4"
          >
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-black bg-black overflow-hidden">
                <img 
                  src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
                  alt={mockUser.firstName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-all duration-300">
                <FiEdit3 size={16} />
              </button>
            </div>
            
            {/* User Info */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">{mockUser.firstName} {mockUser.lastName}</h1>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="md:ml-4 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-medium hover:opacity-90 transition-all duration-300 flex items-center space-x-1"
                >
                  <FiEdit size={14} />
                  <span>Edit Profile</span>
                </motion.button>
              </div>
              
              <p className="text-gray-300 max-w-2xl">{mockUser.bio}</p>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm pt-1">
                <span className="text-gray-400"><strong className="text-white">{mockUser.branch}</strong> • {mockUser.year}</span>
                <span className="text-gray-400 flex items-center"><FiCalendar className="mr-1" /> Joined {mockUser.joinDate}</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="text-center">
                  <span className="block text-white font-semibold">{mockUser.posts}</span>
                  <span className="text-xs text-gray-400">Posts</span>
                </div>
                <div className="text-center">
                  <span className="block text-white font-semibold">{mockUser.demands}</span>
                  <span className="text-xs text-gray-400">Demands</span>
                </div>
                <div className="text-center">
                  <span className="block text-white font-semibold">{mockUser.comments}</span>
                  <span className="text-xs text-gray-400">Comments</span>
                </div>
                <div className="text-center">
                  <span className="block text-white font-semibold">{mockUser.followers}</span>
                  <span className="text-xs text-gray-400">Followers</span>
                </div>
                <div className="text-center">
                  <span className="block text-white font-semibold">{mockUser.following}</span>
                  <span className="text-xs text-gray-400">Following</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Content Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <motion.div 
          variants={itemVariants}
          className="flex overflow-x-auto scrollbar-hide space-x-2 border-b border-gray-800"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>
        
        {/* Tab Content */}
        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;