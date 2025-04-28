import React from 'react';
import { motion } from 'framer-motion';

const statusConfig = {
  pending: {
    bgColor: 'bg-yellow-500/20',
    textColor: 'text-yellow-300',
    label: 'Pending Review'
  },
  'in-progress': {
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-300',
    label: 'In Progress'
  },
  approved: {
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-300',
    label: 'Approved'
  },
  implemented: {
    bgColor: 'bg-purple-500/20',
    textColor: 'text-purple-300',
    label: 'Implemented'
  },
  rejected: {
    bgColor: 'bg-red-500/20',
    textColor: 'text-red-300',
    label: 'Rejected'
  }
};

const StatusBadge = ({ status, className = '' }) => {
  const config = statusConfig[status] || statusConfig.pending;
  
  return (
    <motion.span
      className={`px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {config.label}
    </motion.span>
  );
};

export default StatusBadge;