import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { colors } from 'commons/colors';

interface CustomDatePickerProps extends DatePickerProps<any> {
  error?: boolean;
  helperText?: React.ReactNode;
  allowManualInput?: boolean;
}

const CustomDatePicker = ({
  error,
  helperText,
  allowManualInput = false,
  ...props
}: CustomDatePickerProps) => {
  return (
    <DatePicker
      {...props}
      slotProps={{
        textField: () => ({
          fullWidth: true,
          size: 'small',
          error,
          helperText,
          sx: {
            backgroundColor: colors.white,
          },
          inputProps: {
            readOnly: !allowManualInput, // ❗ Esto evita edición manual
          },
        }),
      }}
    />
  );
};

export default CustomDatePicker;
