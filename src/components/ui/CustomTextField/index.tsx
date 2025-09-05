import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const CustomTextField = (props: TextFieldProps) => {
  return (
    <TextField
      fullWidth={props.fullWidth ?? true}
      size={props.size ?? 'small'}
      autoComplete="off"
      {...props}
      slotProps={{
        input: {
          autoComplete: 'off',
        },
      }}
    />
  );
};

export default CustomTextField;
