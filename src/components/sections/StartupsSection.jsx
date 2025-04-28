import React from 'react';
import { motion } from 'framer-motion';
import { STARTUPS } from '../../utils/constants';

const StartupsSection = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-blue-500/5 blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-pink-500/5 blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Startup Success Stories</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Meet the innovative startups founded by our alumni that are making waves in the industry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {STARTUPS.map((startup, index) => (
            <motion.div
              key={startup.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-gradient-to-b from-black/70 to-black/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 group"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <img 
                  src={startup.image} 
                  alt={startup.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-white/10 flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img 
                        src={startup.logo} 
                        alt={`${startup.name} logo`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs font-medium text-white">{startup.name}</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {startup.funding}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{startup.name}</h3>
                <p className="text-gray-400 text-sm mb-4">Founded by {startup.founder} ({startup.batch})</p>
                <p className="text-gray-300 mb-6 line-clamp-3">{startup.description}</p>
                <div className="flex justify-between items-center">
                  <a 
                    href={startup.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm flex items-center"
                  >
                    Visit Website
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <div className="flex space-x-1">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < (4 + Math.random()) ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-colors text-white px-8 py-3 rounded-full font-medium">
            Explore All Startups
          </button>
        </div>
      </div>
    </section>
  );
};

export default StartupsSection;