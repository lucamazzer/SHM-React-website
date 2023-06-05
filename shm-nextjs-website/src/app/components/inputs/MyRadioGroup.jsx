import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

const MyRadioGroup = ({ label, value, onChange, options, title, ...props }) => {
  return (
    <FormControl>
      {title && (
        <FormLabel
          id="relative-unit-form"
          // color="white"
          // sx={{
          //   '& .MuiInputBase-root': {
          //     color: 'white.main',
          //   },
          //   '& .MuiFormLabel-root': {
          //     color: 'white.main',
          //   },
          //   '& .MuiFormLabel-root.Mui-focused': {
          //     color: 'white.main',
          //   },
          // }}>
        >
          {title}
        </FormLabel>
      )}
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={onChange}
        {...props}>
        {options?.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio color="primary" />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default MyRadioGroup;
