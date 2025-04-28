import React from 'react';
import { motion } from 'framer-motion';
import { COLLEGE_INFO } from '../../utils/constants';

const Footer = () => {
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Academics", url: "/academics" },
        { name: "Campus Life", url: "/campus-life" },
        { name: "Events", url: "/events" },
        { name: "Admissions", url: "/admissions" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Library", url: "/library" },
        { name: "Past Papers", url: "/resources/papers" },
        { name: "Student Portal", url: "/portal" },
        { name: "Downloads", url: "/downloads" },
      ]
    },
    {
      title: "Connect",
      links: [
        { name: "Contact Us", url: "/contact" },
        { name: "Support", url: "/support" },
        { name: "Careers", url: "/careers" },
        { name: "Events", url: "/events" },
      ]
    }
  ];

  return (
    <footer className="relative bg-black overflow-hidden pt-12 pb-8">
      <div className="absolute w-full h-full inset-0">
        <div className="absolute w-[800px] h-[800px] -bottom-[400px] -right-[400px] rounded-full bg-pink-500/5 blur-[120px]"></div>
        <div className="absolute w-[600px] h-[600px] -top-[300px] -left-[300px] rounded-full bg-blue-500/5 blur-[100px]"></div>
      </div>
      
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8 lg:gap-16">
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-black rounded-lg px-4 py-2">
                    <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                      {COLLEGE_INFO.shortName}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering students to reach their full potential through innovative education,
                cutting-edge research, and a vibrant campus community.
              </p>
              
              <div className="flex items-center space-x-4">
                {Object.entries(COLLEGE_INFO.socialLinks).map(([platform, url]) => (
                  <a 
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 relative group rounded-full flex items-center justify-center"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-300"></div>
                    <div className="w-full h-full rounded-full flex items-center justify-center bg-white/5 border border-white/10 relative z-10 group-hover:border-transparent transition-colors duration-300">
                      <span className="text-white">{platform.charAt(0).toUpperCase()}</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-bold mb-6 text-lg">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.url}
                        className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-0 h-[1px] bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-4 transition-all duration-300"></span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} {COLLEGE_INFO.name}. All rights reserved.
            </p>
            
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <span className="text-gray-500 text-xs">
                {COLLEGE_INFO.address}
              </span>
              <span className="hidden md:block h-1 w-1 rounded-full bg-gray-700"></span>
              <a href={`mailto:${COLLEGE_INFO.email}`} className="text-gray-500 hover:text-white text-xs transition-colors duration-300">
                {COLLEGE_INFO.email}
              </a>
              <span className="hidden md:block h-1 w-1 rounded-full bg-gray-700"></span>
              <span className="text-gray-500 text-xs">
                {COLLEGE_INFO.phone}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;