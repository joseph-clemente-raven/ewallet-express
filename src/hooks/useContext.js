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
  const [balance, setBalance] = useState(0)
  const [transaction, setTransaction] = useState([])
  const [currentAccount, setCurrentAccount] = useState(null)
  const [account, setAccount] = useState([
    {
      id: '12323124121241',
      fullname: "Pedro Cruz",
      balance: 1000
    },
    {
      id: '123231243123asdaw312',
      fullname: "Juan Dela Cruz",
      balance: 500
    }
  ])

  // {
    // accountid
    // startingpoint
    // endpoint
    // totalamount
    // status
  // }
  
  // Function to update user info
  const updateUser = (userInfo) => {
    setUser(userInfo);
  };

  // Function to reset all global states
  const resetGlobalState = () => {
    setUser(null);
    setFareFee(0);
    setBalance(0);
    setTransaction([]);
    setCurrentAccount(null);
  };

  return (
    <GlobalContext.Provider value={{
      user,
      account,
      currentAccount,
      balance,
      fareFee,
      transaction,
      setUser,
      setAccount,
      setCurrentAccount,
      setBalance,
      setFareFee,
      setTransaction,
      updateUser,
      resetGlobalState
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobalContext = () => useContext(GlobalContext);
