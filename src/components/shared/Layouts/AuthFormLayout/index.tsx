import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { useDevice } from 'hooks';

import { colors } from 'commons/colors';

interface AuthFormLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  logo?: React.ReactNode;
}

const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({
  children,
  title,
  subtitle,
  logo,
}) => {
  const { isSmallScreenV2: isMobile } = useDevice();

  if (isMobile) {
    return (
      <Box
        sx={{
          padding: 0,
          width: '100%',
          paddingBottom: '80px', // Espacio para que el último campo sea visible
        }}
      >
        {/* Sección del título del formulario */}
        <Box sx={{ px: 3, pt: 3, pb: 1, textAlign: 'center' }}>
          <Typography
            variant="h6"
            fontWeight={700}
            color={colors.darkBlue}
            gutterBottom
            sx={{ fontSize: '1.5rem' }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.875rem', mb: 2 }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Contenido del formulario */}
        <Box sx={{ px: 3, pb: 3 }}>{children}</Box>
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        padding: { xs: 3, sm: 4 },
        borderRadius: 3,
        background: colors.white,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: `1px solid ${colors.lightSurface}`,
        maxWidth: 480,
        width: '100%',
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        {logo && <Box sx={{ mb: 2 }}>{logo}</Box>}
        <Typography
          variant="h4"
          fontWeight={700}
          color={colors.darkBlue}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: '1rem' }}
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Form Content */}
      <Box>{children}</Box>
    </Paper>
  );
};

export default AuthFormLayout;
