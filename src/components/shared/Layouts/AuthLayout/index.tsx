import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import { Outlet } from 'react-router-dom';

import { useDevice } from 'hooks';

import { SYSTEM_DESCRIPTION, SYSTEM_NAME } from 'commons/global';

import * as styles from './styles';

interface AuthLayoutProps {
  showImage?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ showImage = true }) => {
  const { isSmallScreenV2: isMobile } = useDevice();

  return (
    <Box sx={styles.rootContainerStyles(isMobile)}>
      {/* Mobile Header - Solo en mobile */}
      {isMobile && (
        <Box sx={styles.mobileHeaderStyles}>
          {/* Elementos decorativos */}
          <Box sx={styles.decorativeCircleTopStyles} />
          <Box sx={styles.decorativeCircleBottomStyles} />

          {/* Logo */}
          <Box sx={styles.mobileLogoContainerStyles}>
            <Box sx={styles.mobileLogoTextStyles}>F</Box>
          </Box>

          {/* Nombre del sistema */}
          <Typography
            variant="h5"
            fontWeight={700}
            gutterBottom
            sx={styles.systemNameTypographyStyles}
          >
            {SYSTEM_NAME}
          </Typography>

          {/* Descripción */}
          <Typography
            variant="body2"
            sx={styles.systemDescriptionTypographyStyles}
          >
            {SYSTEM_DESCRIPTION}
          </Typography>
        </Box>
      )}

      {/* Content Area */}
      <Box sx={styles.contentAreaStyles}>
        {/* Form Column */}
        <Box sx={styles.formColumnStyles(isMobile)}>
          <Container maxWidth="sm" sx={styles.containerStyles(isMobile)}>
            <Outlet />
          </Container>
        </Box>

        {/* Image Column - Only on desktop */}
        {showImage && !isMobile && (
          <Box sx={styles.imageColumnStyles}>
            {/* Decorative elements */}
            <Box sx={styles.desktopDecorativeCircleTopStyles} />
            <Box sx={styles.desktopDecorativeCircleBottomStyles} />

            {/* Logo and branding */}
            <Box sx={styles.desktopBrandingContainerStyles}>
              <Box sx={styles.desktopLogoContainerStyles}>
                <Box sx={styles.desktopLogoTextStyles}>F</Box>
              </Box>
              <Box sx={styles.desktopSystemNameStyles}>{SYSTEM_NAME}</Box>
              <Box sx={styles.desktopSystemDescriptionStyles}>
                {SYSTEM_DESCRIPTION}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AuthLayout;
