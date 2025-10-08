import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { colors } from 'commons/colors';

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <Box
      sx={{
        color: colors.darkBlue,
        minWidth: 16,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {icon}
    </Box>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ fontSize: '0.75rem', minWidth: 'fit-content' }}
    >
      {label}:
    </Typography>
    <Typography
      variant="body2"
      fontWeight={500}
      sx={{
        color: colors.darkText,
        fontSize: '0.75rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {value}
    </Typography>
  </Stack>
);

export default InfoRow;
