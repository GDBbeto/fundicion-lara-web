import React from 'react';
import { Paper, Stack, Box, Typography } from '@mui/material';
import { Description } from '@mui/icons-material';

import { colors } from 'commons/colors';

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection = ({ description }: DescriptionSectionProps) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 1.5, sm: 1.5 },
      border: `1px solid ${colors.lightBlue}30`,
      borderRadius: 2,
    }}
  >
    <Stack direction="row" spacing={1} alignItems="flex-start">
      <Description
        sx={{
          fontSize: { xs: 14, sm: 16 },
          color: colors.darkBlue,
          mt: 0.2,
        }}
      />
      <Box flex={1}>
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{
            mb: 0.5,
            color: colors.darkBlue,
            display: 'block',
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
          }}
        >
          Descripción
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.4,
            fontStyle: 'italic',
            fontSize: { xs: '0.8rem', sm: '0.85rem' },
          }}
        >
          {description}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

export default DescriptionSection;
