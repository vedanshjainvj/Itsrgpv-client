import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiUsers, FiTarget, FiClock } from 'react-icons/fi';
import StatusBadge from '../ui/StatusBadge';
import ProgressBar from '../ui/ProgressBar';

const DemandModal = ({ demand, isOpen, onClose }) => {
  if (!demand) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] relative z-10"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
          >
            <div className="absolute top-4 right-4 z-20">
              <button 
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto max-h-[90vh]">
              <div className="flex items-center gap-3 mb-4">
                <StatusBadge status={demand.status} />
                <div className="flex-1" />
                <span className="text-gray-400 text-sm flex items-center">
                  <FiCalendar className="mr-1" />
                  Submitted: {formatDate(demand.dateSubmitted)}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{demand.title}</h2>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 text-sm">Progress</span>
                  <span className="text-gray-300 text-sm font-semibold">{demand.progress}%</span>
                </div>
                <ProgressBar progress={demand.progress} className="mb-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4 flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">Supporters</span>
                  <div className="flex items-center text-white text-xl font-bold">
                    <FiUsers className="mr-2 text-purple-400" />
                    {demand.supporters}
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">Target Date</span>
                  <div className="flex items-center text-white text-xl font-bold">
                    <FiTarget className="mr-2 text-blue-400" />
                    {formatDate(demand.targetDate)}
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">Submitted By</span>
                  <div className="flex items-center text-white text-xl font-bold">
                    <FiClock className="mr-2 text-pink-400" />
                    {demand.submittedBy}
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-white text-xl font-semibold mb-4">Description</h3>
                <p className="text-gray-300 leading-relaxed">{demand.description}</p>
              </div>
              
              {demand.adminResponse && (
                <div className="mb-8 bg-purple-500/10 border border-purple-500/20 rounded-xl p-5">
                  <h3 className="text-white text-xl font-semibold mb-2">Administration Response</h3>
                  <p className="text-gray-300 leading-relaxed">{demand.adminResponse}</p>
                </div>
              )}
              
              {demand.updates && demand.updates.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-white text-xl font-semibold mb-4">Updates</h3>
                  <div className="space-y-4">
                    {demand.updates.map((update, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/5 rounded-xl p-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="text-gray-400 text-sm mb-1">{formatDate(update.date)}</div>
                        <div className="text-white">{update.content}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {demand.tags && demand.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {demand.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="bg-white/5 text-gray-300 px-3 py-1 rounded-full text-xs"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemandModal;