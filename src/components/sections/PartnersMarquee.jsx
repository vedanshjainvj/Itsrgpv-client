import React from 'react';
import { motion } from 'framer-motion';
import { PARTNERS } from '../../utils/constants';

const PartnersMarquee = () => {
  // Create two copies of partners for smooth infinite scrolling effect
  const partnersDouble = [...PARTNERS, ...PARTNERS];
  
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Industry Partners</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            We collaborate with top organizations to provide our students with the best opportunities.
          </p>
        </div>
      </div>
      
      <div className="relative mt-12 overflow-hidden">
        <div className="relative w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
          
          <motion.div
            className="flex items-center space-x-12 py-8"
            animate={{ x: "-50%" }}
            transition={{
              x: {
                duration: 40, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop"
              }
            }}
          >
            {partnersDouble.map((partner, index) => (
              <div 
                key={`${partner.id}-${index}`} 
                className="flex-shrink-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl h-24 px-6 flex items-center justify-center group hover:bg-white/10 transition-colors duration-300"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 max-w-[160px] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button className="bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white px-6 py-2 rounded-full text-sm font-medium">
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;