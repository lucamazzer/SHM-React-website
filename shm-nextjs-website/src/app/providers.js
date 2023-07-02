'use client';

import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { AppContextProvider } from '@/contexts/appContext';

import theme from '../styles/mui-theme';

export function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <AppContextProvider>{children}</AppContextProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
