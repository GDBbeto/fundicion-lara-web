import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { colors } from 'commons/colors';

interface CustomDatePickerProps extends DatePickerProps<any> {
  error?: boolean;
  helperText?: React.ReactNode;
}

const CustomDatePicker = ({
  error,
  helperText,
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
          fullWidth: true,
          size: 'small',
          error,
          helperText,
          sx: {
            backgroundColor: colors.white,
          },
        }),
      }}
    />
  );
};

export default CustomDatePicker;
