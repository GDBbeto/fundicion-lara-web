import React from 'react';
import { TextFieldProps, MenuItem } from '@mui/material';
import Option from 'types/option';
import CustomTextField from '../CustomTextField';

interface CustomSelectFieldProps
  extends Omit<TextFieldProps, 'select' | 'children'> {
  options: Option[];
}

const CustomSelectField = ({ options, ...rest }: CustomSelectFieldProps) => {
  return (
    <CustomTextField fullWidth select {...rest}>
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </CustomTextField>
  );
};

export default CustomSelectField;
