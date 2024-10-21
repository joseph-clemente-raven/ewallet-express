'use client';

// context.js
import React, { createContext, useContext, useState } from 'react';

// Create a context
const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  // Define your global state
  const [user, setUser] = useState(null); // User information
  const [fareFee, setFareFee] = useState(0); // Fare fee
  const [balance, setBalance] = useState(1000)
  
  // Function to update user info
  const updateUser = (userInfo) => {
    setUser(userInfo);
  };

  // Function to reset all global states
  const resetGlobalState = () => {
    setUser(null);
    setFareFee(0);
    setBalance(0)
  };

  return (
    <GlobalContext.Provider value={{
      user,
      balance,
      fareFee,
      setUser,
      setBalance,
      setFareFee,
      updateUser,
      resetGlobalState
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobalContext = () => useContext(GlobalContext);
