'use client';
import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [measureInProgress, setMeasureInProgress] = useState(false);

  return (
    <AppContext.Provider value={{ measureInProgress, setMeasureInProgress }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
