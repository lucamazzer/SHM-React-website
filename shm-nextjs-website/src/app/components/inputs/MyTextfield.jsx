import React from 'react';
import { TextField } from '@mui/material';

const MyTextfield = ({
  label,
  value,
  onChange,
  type,
  id,
  required,
  ...props
}) => {
  return (
    <TextField
      type={type}
      id={id}
      label={label}
      variant="outlined"
      required={required}
      color="primary"
      //   color="white"
      //   sx={{
      //     '& .MuiInputBase-root': {
      //       color: 'white.main',
      //     },
      //     '& .MuiFormLabel-root': {
      //       color: 'white.main',
      //     },
      //     '& .MuiFormLabel-root.Mui-focused': {
      //       color: 'white.main',
      //     },
      //   }}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default MyTextfield;
