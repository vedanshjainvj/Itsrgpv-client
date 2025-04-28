import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import useNavStore from '../../store/navStore';

const NavLink = ({ to, children, className, mobileLink = false, ...rest }) => {
  const location = useLocation();
  const closeMenu = useNavStore((state) => state.closeMenu);
  const isActive = location.pathname === to;
  
  const baseStyles = "relative font-medium transition-all duration-300";
  const desktopStyles = "px-2 py-2 hover:text-white";
  const mobileStyles = "block py-3 w-full text-center";
  
  const handleClick = () => {
    if (mobileLink) {
      closeMenu();
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={cn(
        baseStyles,
        mobileLink ? mobileStyles : desktopStyles,
        isActive 
          ? "text-white" 
          : "text-gray-400",
        className
      )}
      {...rest}
    >
      <div className="relative">
        <span className="relative z-10">{children}</span>
        
        {isActive && (
          <motion.span
            className={`absolute ${
              mobileLink 
                ? 'left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-12 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500'
                : 'left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500'
            }`}
            layoutId={mobileLink ? "mobileActiveIndicator" : "desktopActiveIndicator"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </Link>
  );
};

export default NavLink;