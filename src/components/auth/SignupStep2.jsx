import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

const SignupStep2 = ({ onNext, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);
  
  useEffect(() => {
    // Focus the first input field when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    
    // Start countdown
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdown]);
  
  // Handle input change
  const handleChange = (index, value) => {
    // Allow only numbers
    if (value && !/^[0-9]$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Clear any existing error
    if (error) setError('');
    
    // Move focus to next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  // Handle key down event
  const handleKeyDown = (index, e) => {
    // Move focus to previous input on backspace when current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted data contains only numbers and has correct length
    if (/^[0-9]{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };
  
  // Resend OTP
  const handleResendOtp = () => {
    if (countdown === 0) {
      setIsResending(true);
      
      // Simulate OTP resend
      setTimeout(() => {
        setIsResending(false);
        setCountdown(30);
        // Generate a random 6-digit OTP for demonstration
        const randomOtp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10).toString());
        console.log('New OTP generated:', randomOtp.join(''));
      }, 1500);
    }
  };
  
  // Verify OTP
  const handleVerify = () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length !== 6) {
      setError('Please enter a complete 6-digit OTP');
      return;
    }
    
    // For demo purposes, let's consider any complete 6-digit OTP as valid
    // In a real application, you would verify this with your backend
    if (enteredOtp.length === 6) {
      onNext({ otpVerified: true });
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiMail className="text-purple-400" size={28} />
        </div>
        <h3 className="text-white text-lg font-medium">Verify Your Email</h3>
        <p className="text-gray-400 text-sm mt-1">
          We've sent a 6-digit OTP to your email
        </p>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-center space-x-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : null}
              className="w-10 h-12 bg-gray-800 border border-gray-700 rounded-lg text-center text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          ))}
        </div>
        
        {error && (
          <p className="text-red-500 text-xs text-center">{error}</p>
        )}
      </div>
      
      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={countdown > 0 || isResending}
          className={`text-sm flex items-center ${
            countdown > 0 || isResending ? 'text-gray-500' : 'text-purple-400 hover:text-purple-300'
          }`}
        >
          {isResending ? (
            <>
              <FiRefreshCw className="mr-1 animate-spin" />
              Resending...
            </>
          ) : (
            <>
              <FiRefreshCw className="mr-1" />
              Resend OTP {countdown > 0 && `(${countdown}s)`}
            </>
          )}
        </button>
      </div>
      
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2 px-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-900 flex items-center justify-center"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </button>
        
        <button
          type="button"
          onClick={handleVerify}
          className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900"
        >
          Verify & Continue
        </button>
      </div>
    </motion.div>
  );
};

export default SignupStep2;