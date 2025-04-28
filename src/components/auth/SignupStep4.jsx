import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';

const SignupStep4 = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center"
        >
          <FiCheckCircle className="text-green-400" size={40} />
        </motion.div>
      </div>
      
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-bold text-white mb-2"
      >
        Account Created Successfully!
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 mb-6"
      >
        Your profile has been set up and you are now logged in.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-800/60 rounded-lg p-4 mb-6"
      >
        <p className="text-gray-300 text-sm">
          You can now access all features of the platform. Head to your profile to complete any additional information or start exploring the community.
        </p>
      </motion.div>
      
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900"
      >
        Start Exploring
      </motion.button>
    </motion.div>
  );
};

export default SignupStep4;