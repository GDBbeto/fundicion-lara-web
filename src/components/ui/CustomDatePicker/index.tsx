import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { colors } from 'commons/colors';

interface CustomDatePickerProps extends DatePickerProps<any> {
  error?: boolean;
  helperText?: React.ReactNode;
  required?: boolean;
  id: string;
  name?: string;
}

const CustomDatePicker = ({
  error,
  helperText,
  required,
  ...props
}: CustomDatePickerProps) => {
  return (
    <DatePicker
      {...props}
      slotProps={{
        field: {
          readOnly: true,
        },
        textField: () => ({
          id: props.id || props.name,
          fullWidth: true,
          size: 'small',
          error,
          helperText,
          required,
          sx: {
            backgroundColor: colors.white,
          },
        }),
      }}
    />
  );
};

export default CustomDatePicker;
