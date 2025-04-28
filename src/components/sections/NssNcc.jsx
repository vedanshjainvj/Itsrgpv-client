import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiUsers, FiAward, FiCalendar, FiFlag } from 'react-icons/fi';
import nccimg from '../../assets/nccimg.jpg'
import nssimg from '../../assets/nssimg2.jpg'

const NssNccSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Image hover animation
  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text"
          >
            Student Programs &amp; Initiatives
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-300 max-w-3xl mx-auto text-lg"
          >
            Developing leadership, discipline, and social responsibility through structured programs
          </motion.p>
        </motion.div>

        {/* NSS Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 items-center"
        >
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm p-1 rounded-xl">
              <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <FiUsers className="text-blue-400 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">National Service Scheme</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  The National Service Scheme (NSS) is a public service program conducted by the Ministry of Youth Affairs and Sports. 
                  NSS volunteers work to ensure that everyone who is needy gets help to enhance their standard of living and lead a life of dignity.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <FiAward className="text-blue-400 mt-1 mr-3" />
                    <p className="text-gray-300">Developing leadership skills and democratic attitudes</p>
                  </div>
                  <div className="flex items-start">
                    <FiUsers className="text-blue-400 mt-1 mr-3" />
                    <p className="text-gray-300">Community service and social awareness campaigns</p>
                  </div>
                  <div className="flex items-start">
                    <FiCalendar className="text-blue-400 mt-1 mr-3" />
                    <p className="text-gray-300">Regular activities including special camps in adopted villages</p>
                  </div>
                </div>

                <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  <span>Learn more about NSS</span>
                  <FiExternalLink />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="order-1 lg:order-2"
          >
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={imageHoverVariants}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden aspect-video shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 mix-blend-overlay z-10"></div>
                <img 
                  src="/assets/nss-volunteers.jpg" 
                  alt="NSS Volunteers in action" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://149842033.v2.pressablecdn.com/wp-content/uploads/2019/09/css-card-flip-1000x750.jpg";
                  }}
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Not Me But You
              </div>
              <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Active Programs
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* NCC Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={imageHoverVariants}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden aspect-video shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-orange-600/20 mix-blend-overlay z-10"></div>
                <img 
                  src="/assets/ncc-cadets.jpg" 
                  alt="NCC Cadets in formation" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://149842033.v2.pressablecdn.com/wp-content/uploads/2019/09/css-card-flip-1000x750.jpg";
                  }}
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -bottom-3 -left-3 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Unity and Discipline
              </div>
              <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  Enroll Now
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm p-1 rounded-xl">
              <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mr-4">
                    <FiFlag className="text-red-400 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">National Cadet Corps</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  The National Cadet Corps (NCC) aims at developing character, comradeship, discipline, a secular outlook, 
                  spirit of adventure and ideals of selfless service amongst young citizens of India.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <FiAward className="text-red-400 mt-1 mr-3" />
                    <p className="text-gray-300">Military training, adventure activities and career opportunities</p>
                  </div>
                  <div className="flex items-start">
                    <FiFlag className="text-red-400 mt-1 mr-3" />
                    <p className="text-gray-300">Instilling values of patriotism and national pride</p>
                  </div>
                  <div className="flex items-start">
                    <FiCalendar className="text-red-400 mt-1 mr-3" />
                    <p className="text-gray-300">Annual training camps and national integration camps</p>
                  </div>
                </div>

                <button className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors font-medium">
                  <span>Learn more about NCC</span>
                  <FiExternalLink />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to action */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 text-center"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-1 rounded-xl"
          >
            <div className="bg-black/60 backdrop-blur-sm rounded-xl px-8 py-6 max-w-3xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Join NSS or NCC Today</h3>
              <p className="text-gray-300 mb-5">Enrich your college experience with discipline, service, and leadership opportunities</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                  Apply for NSS
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/20">
                  Apply for NCC
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NssNccSection;