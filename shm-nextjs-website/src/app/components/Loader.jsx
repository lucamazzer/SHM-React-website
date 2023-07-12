import React from 'react';
import { CircularProgress } from '@mui/material';

const Loader = ({ loading, color = 'white', size = 64 }) => {
  const loadingStyles = Object.assign(
    {},
    { height: '100px', width: '100px' },
    loading ? {} : { display: 'none' },
  );
  return (
    <div
      className="flex flex-1 items-center justify-center"
      style={loadingStyles}>
      <CircularProgress size={size} color={color} />
    </div>
  );
};

export default Loader;
