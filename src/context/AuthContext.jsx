import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth, useUser } from "@clerk/clerk-react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(true);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const checkUseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('checkUseAuth must be used within an AuthProvider');
  }
  return context;
};

// import React, { createContext, useContext } from 'react';
// import { useAuth, useUser } from '@clerk/clerk-react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const { isSignedIn, getToken, userId } = useAuth();
//   const { user, isLoaded } = useUser();
//   const logout = () => {
//     // setUser(null);
//     console.log("logout call")
//     localStorage.removeItem('user');
//   };
//   const value = {
//     user,
//     isAuthenticated: isSignedIn,
//     loading: !isLoaded,
//     userId,
//     login:isSignedIn,
//     logout,
//     getToken, // useful for backend API calls
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const checkUseAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuthContext must be used within an AuthProvider');
//   }
//   return context;
// };
