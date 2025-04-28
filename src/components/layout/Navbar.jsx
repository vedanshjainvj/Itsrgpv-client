import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import NavLink from '../ui/NavLink';
import useNavStore from '../../store/navStore';
import { NAV_LINKS, COLLEGE_INFO } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import ProfileDropdown from '../auth/ProfileDropdown';
import AuthModal from '../auth/AuthModal';

const Navbar = () => {
  const { isMenuOpen, toggleMenu, closeMenu, setActiveRoute } = useNavStore();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  useEffect(() => {
    setActiveRoute(location.pathname);
    closeMenu();
  }, [location.pathname, closeMenu, setActiveRoute]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { 
          duration: 0.4,
          ease: [0.32, 0.72, 0, 1] 
        },
        opacity: { 
          duration: 0.3 
        },
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      height: "100vh",
      opacity: 1,
      transition: {
        height: { 
          duration: 0.4,
          ease: [0.32, 0.72, 0, 1] 
        },
        opacity: { 
          duration: 0.4 
        },
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariants = {
    closed: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2 } 
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };

  const menuBackgroundVariants = {
    closed: { 
      scale: 0.95,
      opacity: 0,
    },
    open: { 
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const openAuthModal = (mode) => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    closeMenu();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <motion.nav 
          className={`w-full ${
            scrolled 
              ? "py-2 bg-black/80 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]" 
              : "py-4 bg-transparent"
          } transition-all duration-500`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link to="/" className="flex items-center" onClick={closeMenu}>
                  <div className="relative z-10 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-60 group-hover:opacity-80 transition duration-500"></div>
                    <div className="relative bg-black rounded-lg px-4 py-2 flex items-center justify-center">
                      <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                        {COLLEGE_INFO.shortName}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-8">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                  >
                    <NavLink to={link.path}>
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Desktop Auth/Profile Section */}
              <motion.div 
                className="hidden lg:flex items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {isAuthenticated ? (
                  <ProfileDropdown user={user} />
                ) : (
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      rounded
                      onClick={() => openAuthModal('login')}
                    >
                      Login
                    </Button>
                    <Button 
                      variant="pink" 
                      size="sm" 
                      rounded
                      onClick={() => openAuthModal('signup')}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </motion.div>

              {/* Mobile Menu Section */}
              <div className="flex items-center space-x-3 lg:hidden">
                {/* Always show profile dropdown if authenticated */}
                {isAuthenticated && (
                  <ProfileDropdown user={user} isMobile={true} />
                )}
                
                {/* Always show hamburger menu button */}
                <motion.button
                  className="relative z-50 text-white w-10 h-10 focus:outline-none"
                  onClick={toggleMenu}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="absolute w-6 transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span
                      className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                        isMenuOpen ? "rotate-45" : "-translate-y-2"
                      }`}
                    ></span>
                    <span
                      className={`absolute h-0.5 bg-current transform transition-all duration-300 ${
                        isMenuOpen ? "opacity-0 translate-x-3" : "w-6"
                      }`}
                    ></span>
                    <span
                      className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                        isMenuOpen ? "-rotate-45" : "translate-y-2"
                      }`}
                    ></span>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <div className="fixed inset-0 top-0 z-40 lg:hidden overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-black/90 backdrop-blur-lg"
                  variants={menuBackgroundVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                />
                
                <motion.div
                  className="absolute inset-0 top-16 flex flex-col overflow-hidden"
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <div className="flex-1 overflow-hidden flex flex-col items-center justify-center px-6 py-8">
                    <div className="w-full max-w-md space-y-6">
                      {NAV_LINKS.map((link) => (
                        <motion.div key={link.path} variants={menuItemVariants}>
                          <NavLink 
                            to={link.path} 
                            mobileLink
                            className="text-2xl font-medium py-3 text-center w-full block"
                          >
                            {link.label}
                          </NavLink>
                        </motion.div>
                      ))}
                      
                      {/* Only show login/signup buttons if not authenticated */}
                      {!isAuthenticated && (
                        <motion.div
                          variants={menuItemVariants}
                          className="pt-8 space-y-3"
                        >
                          <Button 
                            variant="outline" 
                            size="md" 
                            fullWidth
                            rounded
                            onClick={() => openAuthModal('login')}
                          >
                            Login
                          </Button>
                          <Button 
                            variant="pink" 
                            size="md" 
                            fullWidth
                            rounded
                            onClick={() => openAuthModal('signup')}
                          >
                            Sign Up
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  <motion.div
                    className="pb-10 px-6 flex justify-center"
                    variants={menuItemVariants}
                  >
                    <div className="flex space-x-6">
                      {Object.entries(COLLEGE_INFO.socialLinks).map(([platform, url]) => (
                        <a 
                          key={platform} 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center
                          hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                        >
                          <span className="text-white">{platform.charAt(0).toUpperCase()}</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
};

export default Navbar;