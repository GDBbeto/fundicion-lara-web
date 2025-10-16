import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Description } from '@mui/icons-material';

import { colors } from 'commons/colors';

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection = ({ description }: DescriptionSectionProps) => (
  <Box
    sx={{
      bgcolor: colors.veryLightGray,
      borderLeft: `3px solid ${colors.darkBlue}`,
      p: 1.5,
      borderRadius: 1,
    }}
  >
    <Stack direction="row" spacing={1} alignItems="flex-start">
      <Description fontSize="small" sx={{ color: colors.darkBlue, mt: 0.2 }} />
      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={600}
          sx={{ display: 'block', fontSize: '0.7rem', mb: 0.5 }}
        >
          Notas del pedido
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '0.75rem',
            lineHeight: 1.4,
            fontStyle: 'italic',
          }}
        >
          {description}
        </Typography>
      </Box>
    </Stack>
  </Box>
);

export default DescriptionSection;
