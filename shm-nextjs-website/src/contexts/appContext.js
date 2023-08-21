'use client';
import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [measureInProgress, setMeasureInProgress] = useState(false);

  const [loadingMessage, setLoadingMessage] = React.useState(
    'Medición en progreso...',
  );
  const [cancelMeasureMode, setCancelMeasureMode] = React.useState(
   true,
  );
  const [currentTimeOutId, setCurrentTimeOutId] = React.useState(null);
  const [currentDownloadIntervalId, setCurrentDownloadIntervalId] = React.useState(null);

  const [showClock, setShowClock] = React.useState(null);

  const cleanMeasureState = () => {
    setMeasureInProgress(false);
    setLoadingMessage('Medición en progreso...');
    setShowClock(null);
  };

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
        cleanMeasureState,
        cancelMeasureMode,
        setCancelMeasureMode,
        currentDownloadIntervalId,
        setCurrentDownloadIntervalId,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
