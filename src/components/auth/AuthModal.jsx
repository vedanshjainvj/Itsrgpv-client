import React, { useState ,useEffect} from 'react';
import { useUser } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import SignupStep1 from './SignupStep1';
import SignupStep2 from './SignupStep2';
import SignupStep3 from './SignupStep3';
import SignupStep4 from './SignupStep4';
// import LoginForm from './LoginForm';
import { checkUseAuth } from '../../context/AuthContext';
import { createNewStudentAccount } from '../../services/api/auth';

const AuthModal = ({ isOpen, onClose,onComplete }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [signupStep, setSignupStep] = useState(1);
  const [formData, setFormData] = useState({
    userId:'',
    enrollmentNumber:'',
    firstName: '',
    email: '',
    lastName: '',
    branch: '',
    year: '',
    semester: '',
    gender: '',
    dob: '',
    contactNumber: '',
    socialLinks: {
      instagram: '',
      linkedin: '',
      github: '',
      twitter: ''
    },
    skills: [],
    profilePic: null,
    aboutUs: ""
  });

  const { setProfileStatus,userId} = checkUseAuth();

  const handleNextStep = async(data) => {
  const updated = { 
    ...formData,   
    ...data,     
    userId: userId 
  };
  setFormData(updated); 
  console.log(updated);
  try {
    const response = await createNewStudentAccount(updated);
    console.log(response);
    onComplete();
  } catch (error) {
    console.log(error);
    alert(error);
  }
  };

  const handlePrevStep = () => {
    setSignupStep(prev => prev - 1);
  };


useEffect(() => {
  console.log(user?.lastName)
  if (isLoaded && isSignedIn && user) {
    setFormData((prev) => ({
      ...prev,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.primaryEmailAddress?.emailAddress || '',
      contactNumber: user.primaryPhoneNumber?.phoneNumber || '',
      profilePic: user.imageUrl || null
    }));
  }
}, [isLoaded, isSignedIn, user]);


  const renderStepContent = () => {
    switch (signupStep) {
      case 1:
        return <SignupStep3 initialData={formData} onNext={handleNextStep}  data={formData} />;
      case 2:
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
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <FiX size={20} />
                </button>
                <div className="p-6">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Create Account</h2>
                        <div className="flex items-center">
                          {[1, 2].map((step) => (
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