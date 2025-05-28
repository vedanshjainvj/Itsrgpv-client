import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth, useUser, useClerk } from '@clerk/clerk-react';
import { checkUserProfile } from '../services/api/auth';
import AuthModal from '../components/auth/AuthModal';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { isSignedIn, getToken, userId } = useAuth();  
  const [profileStatus, setProfileStatus] = useState(null); // null = not yet checked
  const [userData,setUserData] = useState();
  const { user, isLoaded } = useUser();              
  const { signOut } = useClerk();                    

  const logout = () => {
    console.log("logout called");
    localStorage.removeItem('user'); 
    signOut();                        
  };
  
  const checkProfile = async () => {
    try {
      const userProfile = await checkUserProfile(userId); // no need for itsId
      setUserData(userProfile?.data?.data);
      setProfileStatus(true);
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 404) {
        setProfileStatus(false); // profile doesn't exist
      } else {
        alert(error?.message || "Unknown error");
      }
    }
  };

  useEffect(() => {
    if (userId) {
      checkProfile();
    }
  }, [userId]);

  const value = {
    user,
    isAuthenticated: isSignedIn,
    loading: !isLoaded,
    userId,
    login: isSignedIn,
    profileStatus,
    setProfileStatus,
    logout,
    userData,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const checkUseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
