import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DEPARTMENTS, CLUBS, ACHIEVEMENTS, FESTS, PARTNERS } from '../../utils/constants';

const GlimpsesGrid = () => {
  const gridSections = [
    {
      type: 'department',
      title: 'Computer Science',
      subtitle: 'B.Tech Program',
      image: 'https://itdcindia.com/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-31-at-4.28.36-PM.jpeg',
      color: 'blue',
      link: '/academics/cse'
    },
    {
      type: 'club',
      title: CLUBS[0].name,
      subtitle: CLUBS[0].tagline,
      image: CLUBS[0].coverImage,
      color: 'pink',
      link: '/clubs/ieee'
    },
    {
      type: 'achievement',
      title: ACHIEVEMENTS[0].achievement,
      subtitle: ACHIEVEMENTS[0].student,
      image: ACHIEVEMENTS[0].image,
      color: 'purple',
      link: '/achievements'
    },
    {
      type: 'fest',
      title: FESTS[0].name,
      subtitle: FESTS[0].date,
      image: FESTS[0].image,
      color: 'green',
      link: '/fests/technova'
    },
    {
      type: 'stat',
      title: '45+',
      subtitle: 'Years of Excellence',
      color: 'yellow',
      link: '/about'
    },
    {
      type: 'department',
      title: 'Electronics',
      subtitle: 'Research Labs',
      image: DEPARTMENTS[1].image,
      color: 'indigo',
      link: '/academics/ece'
    },
    {
      type: 'club',
      title: CLUBS[2].name,
      subtitle: CLUBS[2].tagline,
      image: CLUBS[2].coverImage,
      color: 'red',
      link: '/clubs/robotics'
    },
    {
      type: 'achievement',
      title: ACHIEVEMENTS[2].achievement,
      subtitle: ACHIEVEMENTS[2].student,
      image: ACHIEVEMENTS[2].image,
      color: 'teal',
      link: '/achievements'
    },
    {
      type: 'partners',
      title: 'Our Partners',
      subtitle: PARTNERS.length + '+ Industry Connections',
      color: 'amber',
      link: '/partners'
    },
    {
      type: 'fest',
      title: FESTS[1].name,
      subtitle: FESTS[1].date,
      image: FESTS[1].image,
      color: 'pink',
      link: '/fests/rhythms'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Glimpses of UTI</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Explore the diverse facets of our college life, from academic excellence to vibrant campus culture.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {gridSections.map((section, index) => {
            // Determine grid span classes
            const isWide = index === 0 || index === 3 || index === 6;
            const isTall = index === 0 || index === 4 || index === 8;
            const spanClasses = `${isWide ? 'col-span-2' : 'col-span-1'} ${isTall ? 'row-span-2' : 'row-span-1'}`;
            
            return (
              <motion.div
                key={index}
                className={`${spanClasses} relative rounded-2xl overflow-hidden group`}
                variants={item}
              >
                <Link to={section.link} className="absolute inset-0 w-full h-full">
                  {/* Background image or gradient */}
                  {section.image ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
                      <img 
                        src={section.image} 
                        alt={section.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br from-${section.color}-500/80 to-${section.color}-700/80`}></div>
                  )}
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 z-20">
                    {section.type === 'stat' ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <h3 className="text-4xl md:text-6xl font-bold text-white mb-2">{section.title}</h3>
                          <p className="text-white/90">{section.subtitle}</p>
                        </div>
                      </div>
                    ) : section.type === 'partners' ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="flex flex-wrap justify-center gap-2 mb-3">
                            {PARTNERS.slice(0, 4).map((partner, i) => (
                              <div key={i} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-xs text-white">{partner.name.charAt(0)}</span>
                              </div>
                            ))}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">{section.title}</h3>
                          <p className="text-white/90 text-sm">{section.subtitle}</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={`bg-gradient-to-r from-${section.color}-500/20 to-${section.color}-700/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs inline-block mb-2 border border-white/10 w-fit`}>
                          {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-1">{section.title}</h3>
                        <p className="text-white/80 text-xs md:text-sm">{section.subtitle}</p>
                      </>
                    )}
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/campus-life"
            className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-colors inline-flex items-center"
          >
            <span>Explore Campus Life</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GlimpsesGrid;