import React from 'react';
import { motion } from 'framer-motion';
import { RESOURCES } from '../../utils/constants';
import { Link } from 'react-router-dom';

const ResourcesCTA = () => {
  const resourcesArray = Object.values(RESOURCES);
  
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(156,81,161,0.1),rgba(0,0,0,0)_70%)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Access Student Resources</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Everything you need for academic success, all in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resourcesArray.map((resource, index) => (
            <motion.div
              key={Object.keys(RESOURCES)[index]}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="relative rounded-2xl overflow-hidden group h-96"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 z-10"></div>
              <img 
                src={resource.image} 
                alt={resource.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-white px-3 py-1 rounded-full text-xs inline-block mb-2 backdrop-blur-sm border border-white/10 w-fit">
                  {resource.count} {Object.keys(RESOURCES)[index]}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{resource.title}</h3>
                <p className="text-gray-300 mb-6">{resource.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {resource.categories.map((category, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                      {category}
                    </div>
                  ))}
                </div>
                
                <Link 
                  to={`/resources/${Object.keys(RESOURCES)[index]}`}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-colors text-white py-3 px-6 rounded-xl font-medium flex justify-center items-center group"
                >
                  <span>Access {resource.title}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesCTA;