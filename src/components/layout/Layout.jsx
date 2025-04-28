import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBanner from './AnnouncementBanner';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <div className="layout-component min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;