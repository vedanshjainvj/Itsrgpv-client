import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import SignupStep1 from './SignupStep1';
import SignupStep2 from './SignupStep2';
import SignupStep3 from './SignupStep3';
import SignupStep4 from './SignupStep4';
import LoginForm from './LoginForm';
import { useAuth } from '../../context/AuthContext';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [signupStep, setSignupStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    lastName: '',
    branch: '',
    year: '',
    semester: '',
    gender: '',
    dob: '',
    contact: '',
    socialLinks: {
      instagram: '',
      linkedin: '',
      github: '',
      twitter: ''
    },
    skills: [],
    profilePic: null
  });
  
  const { login } = useAuth();

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'signup') {
      setSignupStep(1);
    }
  };

  const handleNextStep = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setSignupStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setSignupStep(prev => prev - 1);
  };

  const handleSignupComplete = (finalData) => {
    const completeData = { ...formData, ...finalData };
    // In a real app, we would send this data to the backend
    console.log('Signup complete with data:', completeData);
    
    // Simulate successful registration
    login({
      id: Math.random().toString(36).substr(2, 9),
      firstName: completeData.firstName,
      lastName: completeData.lastName,
      email: completeData.email,
      profilePic: completeData.profilePic || '/default-avatar.png',
      skills: completeData.skills,
      branch: completeData.branch,
      year: completeData.year
    });
    
    // Close the modal after successful signup
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleLogin = (credentials) => {
    // In a real app, we would validate credentials with the backend
    console.log('Login attempt with:', credentials);
    
    // Simulate successful login
    login({
      id: Math.random().toString(36).substr(2, 9),
      firstName: 'Sample',
      lastName: 'User',
      email: credentials.email,
      profilePic: '/default-avatar.png',
      skills: ['JavaScript', 'React'],
      branch: 'Computer Science',
      year: '3rd Year'
    });
    
    // Close the modal after successful login
    onClose();
  };

  const renderStepContent = () => {
    switch (signupStep) {
      case 1:
        return <SignupStep1 onNext={handleNextStep} data={formData} />;
      case 2:
        return <SignupStep2 onNext={handleNextStep} onBack={handlePrevStep} />;
      case 3:
        return <SignupStep3 onNext={handleNextStep} onBack={handlePrevStep} data={formData} />;
      case 4:
        return <SignupStep4 onBack={handlePrevStep} />;
      default:
        return null;
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          >
            <motion.div 
              className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl w-full max-w-md overflow-hidden shadow-xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close button */}
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <FiX size={20} />
                </button>
                
                {/* Tabs for switching between login and signup */}
                <div className="flex border-b border-gray-800">
                  <button
                    className={`flex-1 py-4 text-center font-medium transition-colors ${
                      mode === 'login' 
                        ? 'text-white border-b-2 border-purple-500' 
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => handleModeChange('login')}
                  >
                    Login
                  </button>
                  <button
                    className={`flex-1 py-4 text-center font-medium transition-colors ${
                      mode === 'signup' 
                        ? 'text-white border-b-2 border-purple-500' 
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => handleModeChange('signup')}
                  >
                    Sign Up
                  </button>
                </div>
                
                {/* Modal content */}
                <div className="p-6">
                  {mode === 'login' ? (
                    <LoginForm onLogin={handleLogin} />
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Create Account</h2>
                        <div className="flex items-center">
                          {[1, 2, 3, 4].map((step) => (
                            <div
                              key={step}
                              className={`w-2.5 h-2.5 rounded-full mx-1 ${
                                step === signupStep
                                  ? 'bg-purple-500'
                                  : step < signupStep
                                  ? 'bg-green-500'
                                  : 'bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {renderStepContent()}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;