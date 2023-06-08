import React from 'react';
import { CircularProgress, ThemeProvider } from '@mui/material';

import theme from '../../styles/mui-theme';

const Loader = loading => {
  const loadingStyles = Object.assign(
    {},
    { height: '100px', width: '100px' },
    loading ? { display: 'none' } : {},
  );
  return (
    <ThemeProvider theme={theme}>
      <div
        className="flex flex-1 items-center justify-center"
        style={loadingStyles}>
        <CircularProgress size={64} color="white" />
      </div>
    </ThemeProvider>
  );
};

export default Loader;
