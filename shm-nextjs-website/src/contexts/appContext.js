'use client';
import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [measureInProgress, setMeasureInProgress] = useState(false);

  const [loadingMessage, setLoadingMessage] = React.useState(
    'Medición en progreso...',
  );
  const [currentTimeOutId, setCurrentTimeOutId] = React.useState(null);

  const [showClock, setShowClock] = React.useState(null);

  return (
    <AppContext.Provider
      value={{
        measureInProgress,
        setMeasureInProgress,
        loadingMessage,
        setLoadingMessage,
        currentTimeOutId,
        setCurrentTimeOutId,
        showClock,
        setShowClock,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
