import React, { useState } from 'react';
import {
  TextField,
  IconButton,
  InputAdornment,
  TextFieldProps,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { colors } from 'commons/colors';

type CustomPasswordFieldProps = Omit<TextFieldProps, 'type'>;

const CustomPasswordField = React.forwardRef<
  HTMLDivElement,
  CustomPasswordFieldProps
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      {...props}
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={togglePasswordVisibility}
              edge="end"
              size={props.size === 'small' ? 'small' : 'medium'}
              sx={{ color: colors.darkBlue }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});

CustomPasswordField.displayName = 'CustomPasswordField';

export default CustomPasswordField;
