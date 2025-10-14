import React from 'react';
import { Paper, Stack, Box, Typography } from '@mui/material';
import { Description } from '@mui/icons-material';

interface DescriptionSectionProps {
  description?: string;
}

const DescriptionSection = ({ description }: DescriptionSectionProps) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      border: '1px solid #e0e0e0',
      borderRadius: 2,
      backgroundColor: description ? '#fafafa' : '#f5f5f5',
    }}
  >
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Description
        sx={{
          fontSize: 20,
          color: description ? 'primary.main' : 'text.disabled',
          mt: 0.3,
        }}
      />
      <Box flex={1}>
        <Typography
          variant="subtitle2"
          fontWeight={600}
          sx={{
            mb: 0.5,
            color: description ? 'primary.main' : 'text.disabled',
          }}
        >
          Notas del pedido
        </Typography>
        <Typography
          variant="body2"
          color={description ? 'text.secondary' : 'text.disabled'}
          sx={{
            lineHeight: 1.6,
            fontStyle: description ? 'normal' : 'italic',
          }}
        >
          {description || 'Sin notas adicionales'}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

export default DescriptionSection;
