import React from 'react';
import { Button } from '@mui/material';

const MyButton = ({ children, onClick, ...props }) => {
  return (
    <Button
      className="!text-blue-500 !mt-5 !bg-white"
      onClick={onClick}
      variant="contained"
      {...props}>
      {children}
    </Button>
  );
};

export default MyButton;
