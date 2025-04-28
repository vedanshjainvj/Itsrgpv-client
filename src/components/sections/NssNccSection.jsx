import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiUsers, FiCalendar, FiFlag, FiHeart, FiTarget, FiShield } from 'react-icons/fi';
import Button from '../ui/Button';
import nccimg from '../../assets/nccimg.jpg';
import nssimg from '../../assets/nssimg2.jpg';

const NssNccSection = () => {
  const programs = [
    {
      id: "nss",
      name: "National Service Scheme",
      tagline: "Not Me But You",
      description: "Develop personality through community service, fostering social responsibility and leadership.",
      color: "blue",
      icon: <FiUsers className="text-blue-400 text-xl" />,
      image: nssimg,
      stats: [
        { icon: <FiUsers />, value: "250+", label: "Volunteers" },
        { icon: <FiCalendar />, value: "15+", label: "Events" },
        { icon: <FiHeart />, value: "5000+", label: "Service Hours" }
      ]
    },
    {
      id: "ncc",
      name: "National Cadet Corps",
      tagline: "Unity and Discipline",
      description: "Build discipline, leadership, and patriotism through military training and adventure activities.",
      color: "pink",
      icon: <FiFlag className="text-pink-400 text-xl" />,
      image: nccimg,
      stats: [
        { icon: <FiShield />, value: "100+", label: "Cadets" },
        { icon: <FiTarget />, value: "12+", label: "Medals" },
        { icon: <FiCalendar />, value: "10+", label: "Camps" }
      ]
    }
  ];

  return (
    <section className="py-10 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-blue-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-pink-500/5 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-pink-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-3 border border-white/10"
          >
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-sm font-medium text-white">Student Organizations</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-3"
          >
            Develop <span className="gradient-text-blue">Leadership</span> & <span className="gradient-text-pink">Character</span>
          </motion.h2>
        </motion.div>

        <div className="space-y-6">
          {programs.map((program, index) => (
            <ProgramCard 
              key={program.id} 
              program={program} 
              index={index}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {[
            { text: "Career Advantage", color: "blue" },
            { text: "Personal Growth", color: "purple" },
            { text: "Social Impact", color: "pink" },
            { text: "Leadership", color: "green" },
          ].map((tag, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ y: -3, scale: 1.03 }}
              className={`bg-gradient-to-r from-${tag.color}-500/10 to-${tag.color}-500/5 backdrop-blur-sm border border-${tag.color}-500/20 rounded-full px-3 py-1.5 text-white text-xs sm:text-sm flex items-center gap-2`}
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-${tag.color}-500`}></span>
              {tag.text}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProgramCard = ({ program, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="w-full rounded-xl overflow-hidden"
    >
      <div className={`relative bg-gradient-to-br from-${program.color}-500/10 to-${program.color === 'blue' ? 'indigo' : 'purple'}-500/10 backdrop-blur-md p-[1px] rounded-xl`}>
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-20 -right-20 w-[200px] h-[200px] bg-${program.color}-500/10 rounded-full blur-[60px]`}></div>
            <div className={`absolute -bottom-20 -left-20 w-[200px] h-[200px] bg-${program.color === 'blue' ? 'indigo' : 'purple'}-500/10 rounded-full blur-[60px]`}></div>
          </div>
          
          <div className="relative z-10 p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-7 flex flex-col sm:flex-row sm:items-center gap-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1
                  }}
                  whileHover={{ scale: 1.1 }}
                  className={`w-12 h-12 bg-${program.color}-500/20 rounded-xl flex items-center justify-center relative group`}
                >
                  <motion.div 
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                    className="z-10"
                  >
                    {program.icon}
                  </motion.div>
                  <div className={`absolute inset-0 bg-${program.color}-500/20 rounded-xl blur-md group-hover:blur-xl transition-all duration-300`}></div>
                </motion.div>
                
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-xl font-bold text-white mb-1"
                  >
                    {program.name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className={`text-${program.color}-400 text-sm`}
                  >
                    {program.tagline}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="text-gray-300 text-sm mt-2 hidden sm:block"
                  >
                    {program.description}
                  </motion.p>
                </div>
              </div>
              
              <div className="sm:col-span-3 order-3 sm:order-2">
                <div className="grid grid-cols-3 gap-2">
                  {program.stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                      className="text-center"
                    >
                      <div className={`text-${program.color}-400 flex justify-center mb-1`}>
                        {stat.icon}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="sm:col-span-2 flex justify-center sm:justify-end order-2 sm:order-3"
              >
                <Button 
                  variant={program.color}
                  size="sm"
                  rounded
                >
                  Join {program.id.toUpperCase()}
                  <FiExternalLink className="ml-1.5" size={14} />
                </Button>
              </motion.div>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-gray-300 text-sm mt-3 block sm:hidden"
            >
              {program.description}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NssNccSection;