import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const MySelect = ({ options, title, optionsLabel, value, onChange }) => {
  return (
    <FormControl sx={{ m: 1 }} className="">
      {!!title && <InputLabel id="select-title">{title}</InputLabel>}
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label={title}
        onChange={onChange}>
        {options.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MySelect;
