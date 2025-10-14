import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

interface InfoItemProps {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  valueColor?: string;
}

const InfoItem = ({ icon, label, value, valueColor }: InfoItemProps) => (
  <Stack direction="row" spacing={1} alignItems="center">
    {icon && (
      <Box
        sx={{
          color: 'text.secondary',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
    )}
    <Typography
      variant="body2"
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 0.5,
        flexWrap: 'wrap',
      }}
    >
      <Box component="span" sx={{ color: 'text.secondary', fontWeight: 500 }}>
        {label}:
      </Box>
      <Box
        component="span"
        sx={{ color: valueColor || 'text.primary', fontWeight: 600 }}
      >
        {value}
      </Box>
    </Typography>
  </Stack>
);

export default InfoItem;
