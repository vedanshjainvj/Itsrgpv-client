import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PARTNERS } from '../../utils/constants';

const PartnersMarquee = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const topRowPartners = [...PARTNERS, ...PARTNERS];
  const bottomRowPartners = [...PARTNERS.reverse(), ...PARTNERS.reverse()];
  
  return (
    <section className="py-12 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-blue-500/5 rounded-full blur-[120px] opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-purple-500/5 rounded-full blur-[120px] opacity-70"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 border border-white/10"
          >
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-sm font-medium text-white">Our Connections</span>
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white mb-3">Club Partners</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Collaborating with top organizations to provide students with the best opportunities.
          </p>
        </motion.div>
      </div>
      
      <div className="relative mt-8 overflow-hidden py-4">
        <div className="relative w-full overflow-hidden mb-6">
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10"></div>
          
          <motion.div
            className="flex items-center space-x-10 py-4"
            animate={{ x: "-50%" }}
            transition={{
              x: {
                duration: 60, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop"
              }
            }}
          >
            {topRowPartners.map((partner, index) => (
              <motion.div 
                key={`top-${partner.id}-${index}`}
                className="relative flex-shrink-0 bg-white/5 backdrop-blur-sm rounded-xl h-20 w-40 sm:h-20 sm:w-48 flex items-center justify-center group overflow-hidden"
                onHoverStart={() => setHoveredIndex(`top-${index}`)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 15px 30px -10px rgba(59, 130, 246, 0.3)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                  initial={{ x: "-100%" }}
                  animate={hoveredIndex === `top-${index}` ? { x: "200%" } : { x: "-100%" }}
                  transition={hoveredIndex === `top-${index}` ? { 
                    duration: 0.8,
                    ease: "easeOut"
                  } : { duration: 0 }}
                />
                
                <motion.div 
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ 
                    background: `linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%)`,
                    backgroundSize: '200% 100%',
                    padding: '1px'
                  }}
                  initial={{ opacity: 0, backgroundPosition: '0% 0%' }}
                  animate={hoveredIndex === `top-${index}` ? { 
                    opacity: 1,
                    backgroundPosition: ['0% 0%', '100% 0%']
                  } : { opacity: 0 }}
                  transition={hoveredIndex === `top-${index}` ? { 
                    backgroundPosition: {
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    },
                    opacity: { duration: 0.2 }
                  } : { opacity: { duration: 0.2 } }}
                >
                  <div className="bg-black/80 w-full h-full rounded-xl"></div>
                </motion.div>
                
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-10 max-w-[120px] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 z-10 relative"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;