import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const variants = {
  pink: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white',
  blue: 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white',
  purple: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white',
  outline: 'bg-transparent border border-white/20 text-white hover:border-white/40',
  black: 'bg-black border border-white/10 text-white hover:bg-white/5',
  white: 'bg-white text-black hover:bg-gray-100',
  ghost: 'bg-transparent text-white hover:bg-white/5',
};

const sizes = {
  xs: 'py-1 px-2 text-xs',
  sm: 'py-1.5 px-4 text-sm',
  md: 'py-2.5 px-6 text-base',
  lg: 'py-3 px-8 text-lg',
};

const Button = ({
  variant = 'pink',
  size = 'md',
  rounded = false,
  fullWidth = false,
  children,
  className,
  disabled = false,
  ...rest
}) => {
  return (
    <motion.button
      className={cn(
        'relative font-medium shadow-lg transition-all duration-300',
        variants[variant],
        sizes[size],
        rounded ? 'rounded-full' : 'rounded-xl',
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-60 cursor-not-allowed' : '',
        className
      )}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={!disabled ? { 
        y: -4,
        transition: { duration: 0.2 }
      } : {}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      disabled={disabled}
      {...rest}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
      
      {!disabled && variant.includes('gradient') && (
        <span className="absolute inset-0 h-full w-full rounded-inherit bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      )}
    </motion.button>
  );
};

export default Button;