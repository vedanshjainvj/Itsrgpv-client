import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiDatabase, FiTruck, FiDroplet, FiHome, FiTool, FiZap, FiRadio, FiServer, FiBriefcase, FiAward, FiChevronRight } from 'react-icons/fi';

// Department data with all departments
const DEPARTMENTS = [
  {
    id: 'cse',
    name: 'Computer Science Engineering',
    shortName: 'CSE',
    description: 'Cutting-edge digital innovation in AI, cybersecurity, and software engineering.',
    icon: <FiCpu />,
    color: 'blue',
    seats: 150,
    courses: ['160 Students'],
  },
  {
    id: 'it',
    name: 'Information Technology',
    shortName: 'IT',
    description: 'Network security, database systems, and enterprise solutions for the digital age.',
    icon: <FiServer />,
    color: 'purple',
    seats: 120,
    courses: ['160 Students'],
  },
  {
    id: 'ec',
    name: 'Electronics Engineering',
    shortName: 'EC',
    description: 'Circuit design, VLSI, embedded systems, and communication technologies.',
    icon: <FiRadio />,
    color: 'green',
    seats: 90,
    courses: ['160 Students'],
  },
  {
    id: 'ee',
    name: 'Electrical Engineering',
    shortName: 'EE',
    description: 'Power systems, electrical machines, and renewable energy technologies.',
    icon: <FiZap />,
    color: 'yellow',
    seats: 100,
    courses: ['160 Students'],
  },
  {
    id: 'me',
    name: 'Mechanical Engineering',
    shortName: 'ME',
    description: 'Design and manufacturing of mechanical systems, thermal engineering, and robotics.',
    icon: <FiTool />,
    color: 'red',
    seats: 120,
    courses: ['160 Students'],
  },
  {
    id: 'ce',
    name: 'Civil Engineering',
    shortName: 'CE',
    description: 'Structural engineering, construction management, and environmental engineering.',
    icon: <FiHome />,
    color: 'blue',
    seats: 90,
    courses: ['160 Students'],
  },
  {
    id: 'pe',
    name: 'Petrochemical Engineering',
    shortName: 'PE',
    description: 'Petroleum refining, polymer technology, and chemical process engineering.',
    icon: <FiDroplet />,
    color: 'pink',
    seats: 60,
    courses: ['160 Students'],
  },
  {
    id: 'ae',
    name: 'Automobile Engineering',
    shortName: 'AE',
    description: 'Vehicle design, automotive electronics, and alternative fuel technologies.',
    icon: <FiTruck />,
    color: 'orange',
    seats: 60,
    courses: ['160 Students'],
  },
  {
    id: 'ds',
    name: 'School of IT - Data Science',
    shortName: 'SoIT-DS',
    description: 'Big data analytics, machine learning, statistical modeling, and data visualization.',
    icon: <FiDatabase />,
    color: 'red',
    seats: 60,
    courses: ['160 Students'],
  },
  {
    id: 'aiml',
    name: 'School of IT - AI & ML',
    shortName: 'SoIT-AIML',
    description: 'Artificial intelligence, deep learning, neural networks, and robotics.',
    icon: <FiBriefcase />,
    color: 'purple',
    seats: 60,
    courses: ['160 Students'],
  },
  {
    id: 'bs',
    name: 'School of IT - Blockchain & Security',
    shortName: 'SoIT-BS',
    description: 'Blockchain technology, cryptography, and cyber defense strategies.',
    icon: <FiServer />,
    color: 'green',
    seats: 60,
    courses: ['160 Students'],
  }
];

// CSS for shiny effect - add to your CSS file
const shinyStyles = `
  @keyframes shine {
    0% {
      background-position: 200% center;
    }
    100% {
      background-position: -200% center;
    }
  }
  
  .shiny-effect {
    position: relative;
    overflow: hidden;
  }
  
  .shiny-effect::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% auto;
    animation: shine 3s linear infinite;
    pointer-events: none;
    z-index: 2;
  }
  
  .shiny-border {
    position: relative;
  }
  
  .shiny-border::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      90deg, 
      rgba(255, 255, 255, 0.1), 
      rgba(255, 255, 255, 0.5) 50%, 
      rgba(255, 255, 255, 0.1)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    background-size: 200% auto;
    animation: shine 4s linear infinite;
    pointer-events: none;
  }
  
  .glow-effect {
    position: relative;
  }
  
  .glow-effect::before {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: inherit;
    background: conic-gradient(
      transparent 270deg,
      rgba(255, 255, 255, 0.2),
      transparent 30deg
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .glow-effect:hover::before {
    opacity: 1;
    animation: rotate 4s linear infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }
  
  .card-hover-shine {
    position: relative;
    overflow: hidden;
  }
  
  .card-hover-shine::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0)
    );
    transform: rotate(30deg);
    transition: transform 0.7s;
    z-index: 1;
    pointer-events: none;
  }
  
  .card-hover-shine:hover::before {
    transform: rotate(30deg) translate(80%, -100%);
  }
  
  .bg-glass {
    background: rgba(30, 30, 46, 0.7);
    backdrop-filter: blur(8px);
  }
`;

const CompactDepartmentsSection = () => {
  const [selectedDept, setSelectedDept] = useState(null);
  const containerRef = useRef(null);
  
  // Department color mapping (safe Tailwind colors)
  const getDeptColor = (id) => {
    const colorMap = {
      'cse': 'blue-500',
      'it': 'purple-500',
      'ec': 'green-500',
      'ee': 'yellow-500',
      'me': 'red-500',
      'ce': 'teal-500',
      'pe': 'pink-500',
      'ae': 'orange-500',
      'ds': 'indigo-500',
      'aiml': 'cyan-500',
      'bs': 'emerald-500'
    };
    return colorMap[id] || 'gray-500';
  };

  const getColorValue = (color) => {
    const colorValues = {
      'blue': 'rgb(59, 130, 246)',
      'purple': 'rgb(168, 85, 247)',
      'green': 'rgb(34, 197, 94)',
      'yellow': 'rgb(234, 179, 8)',
      'red': 'rgb(239, 68, 68)',
      'teal': 'rgb(20, 184, 166)',
      'pink': 'rgb(236, 72, 153)',
      'orange': 'rgb(249, 115, 22)',
      'indigo': 'rgb(99, 102, 241)',
      'cyan': 'rgb(6, 182, 212)',
      'emerald': 'rgb(16, 185, 129)'
    };
    return colorValues[color] || colorValues['blue'];
  };

  const handleCardClick = (dept) => {
    setSelectedDept(selectedDept?.id === dept.id ? null : dept);
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-12 overflow-hidden"
    >
      {/* Insert the CSS for the shiny effects */}
      <style>{shinyStyles}</style>
      
      {/* Simple background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 mb-3 shiny-border">
            Academic Excellence
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Our Academic Departments</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full shiny-effect"></div>
        </div>

        {/* Departments carousel */}
        <div className="mb-8">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide -mx-2">
            <div className="flex space-x-3 px-2 mx-auto">
              {DEPARTMENTS.map((dept) => (
                <motion.div
                  key={dept.id}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCardClick(dept)}
                  className={`flex-shrink-0 w-40 h-40 rounded-xl overflow-hidden card-hover-shine backdrop-blur-sm border border-gray-700/50 cursor-pointer relative glow-effect ${
                    selectedDept?.id === dept.id ? 'shiny-border' : ''
                  }`}
                >
                  {/* Top gradient */}
                  <div 
                    className={`h-0.5 w-full shiny-effect`} 
                    style={{ background: getColorValue(dept.color) }}
                  ></div>
                  
                  <div className="p-4 flex flex-col h-full justify-between relative z-10">
                    {/* Icon */}
                    <div 
                      className={`w-10 h-10 rounded-lg flex items-center justify-center`}
                      style={{ 
                        background: `${getColorValue(dept.color)}20`,
                        color: getColorValue(dept.color)
                      }}
                    >
                      {dept.icon}
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{dept.shortName}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors">{dept.name}</p>
                      
                      {/* Courses badges */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {dept.courses.map((course) => (
                          <span 
                            key={course} 
                            className={`text-[10px] px-1.5 py-0.5 rounded-sm`}
                            style={{ 
                              background: `${getColorValue(dept.color)}20`, 
                              color: `${getColorValue(dept.color)}DD` 
                            }}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Selected department details */}
        <AnimatePresence mode="wait">
          {selectedDept && (
            <motion.div
              key={selectedDept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 mb-8 shiny-border"
              style={{ borderTopColor: getColorValue(selectedDept.color), borderTopWidth: '2px' }}
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                {/* Department info */}
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div 
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3`}
                      style={{ 
                        background: `${getColorValue(selectedDept.color)}20`,
                        color: getColorValue(selectedDept.color)
                      }}
                    >
                      {selectedDept.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedDept.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-xs text-gray-400 flex items-center">
                          <FiAward className="mr-1" size={12} />
                          {selectedDept.courses.join(', ')}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {selectedDept.seats} Seats
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{selectedDept.description}</p>
                </div>
                
                {/* CTA button */}
                <div className="sm:self-end">
                  <motion.button 
                    className="px-4 py-2 text-white text-sm rounded-full flex items-center shiny-effect"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ background: getColorValue(selectedDept.color) }}
                  >
                    <span>Learn More</span>
                    <FiChevronRight className="ml-1" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CompactDepartmentsSection;