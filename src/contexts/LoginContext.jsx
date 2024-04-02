import React, { createContext, useState, useContext } from 'react';

// Create a context for the login state
export const LoginContext = createContext();

// Create a provider component to wrap your application with
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};