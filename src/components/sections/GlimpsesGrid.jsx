import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { images } from '../../utils/constants';

const GlimpsesGrid = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <section className="py-12 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[120px] opacity-30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-3 border border-white/10"
          >
            <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse"></div>
            <span className="text-sm font-medium text-white">Visual Tour</span>
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white mb-2">Glimpses of RGPV</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            Explore the diverse facets of our university through this visual journey
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className={`relative rounded-lg overflow-hidden ${
                index === 0 || index === 5 || index === 10 
                  ? "col-span-2 row-span-2 h-[200px] md:h-[240px]" 
                  : "col-span-1 row-span-1 h-[100px] md:h-[120px]"
              } group`}
              variants={item}
              onHoverStart={() => setHoveredItem(image.id)}
              onHoverEnd={() => setHoveredItem(null)}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <Link to={image.link} className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                <img 
                  src={image.src} 
                  alt={image.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Cape_may.jpg/500px-Cape_may.jpg";
                  }}
                />
                
                <motion.div 
                  className="absolute inset-x-0 bottom-0 p-2 z-20"
                  animate={{ 
                    y: hoveredItem === image.id ? -3 : 0,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="bg-white/10 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full text-[9px] inline-block mb-1 border border-white/10 w-fit">
                    {image.category}
                  </div>
                  <h3 className="text-xs font-bold text-white leading-tight">{image.title}</h3>
                </motion.div>
                
                <motion.div 
                  className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-7 h-7 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link 
            to="/campus-life"
            className="bg-white/10 backdrop-blur-sm text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-white/15 transition-all inline-flex items-center"
          >
            <span>View All Campus Photos</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GlimpsesGrid;