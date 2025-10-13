import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  onChange,
  min = 0,
  max,
}) => {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrease = () => {
    if (max === undefined || value < max) onChange(value + 1);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: '4px',
        backgroundColor: '#fff',
        padding: '4px 8px',
        minHeight: '40px',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:hover': {
          borderColor: 'rgba(0, 0, 0, 0.87)',
        },
        '&:focus-within': {
          borderColor: 'primary.main',
          borderWidth: '2px',
          padding: '3px 7px',
        },
      }}
    >
      <IconButton size="small" onClick={handleDecrease} disabled={value <= min}>
        <Remove />
      </IconButton>
      <NumericFormat
        value={value}
        onValueChange={({ floatValue }) => {
          const newValue = floatValue ?? 0;
          if (newValue >= min) {
            if (max === undefined || newValue <= max) {
              onChange(newValue);
            }
          }
        }}
        customInput={TextField}
        variant="standard"
        inputMode="numeric"
        allowNegative={false}
        decimalScale={0}
        thousandSeparator={true}
        inputProps={{
          style: {
            textAlign: 'center',
            width: 'auto',
            transition: 'width 0.2s ease',
          },
        }}
      />
      <IconButton
        size="small"
        onClick={handleIncrease}
        disabled={max !== undefined && value >= max}
      >
        <Add color="primary" />
      </IconButton>
    </Box>
  );
};

export default QuantityInput;
