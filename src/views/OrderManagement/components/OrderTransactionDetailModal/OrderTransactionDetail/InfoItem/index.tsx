import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { colors } from 'commons/colors';

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  valueColor?: string;
}

const InfoItem = ({ icon, label, value, valueColor }: InfoItemProps) => (
  <Stack direction="row" spacing={1.5} alignItems="flex-start">
    <Box
      sx={{
        color: colors.darkBlue,
        mt: 0.3,
        minWidth: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}
    </Box>
    <Box flex={1}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', mb: 0.3, fontWeight: 500 }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{ color: valueColor || colors.darkText }}
      >
        {value}
      </Typography>
    </Box>
  </Stack>
);

export default InfoItem;
