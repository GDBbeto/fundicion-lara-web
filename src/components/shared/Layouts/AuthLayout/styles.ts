import { colors } from 'commons/colors';

export const rootContainerStyles = (isMobile: boolean) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: isMobile ? colors.white : 'none',
});

export const mobileHeaderStyles = {
  background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.darkerBlue} 100%)`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
  py: 4,
  px: 3,
  color: colors.white,
};

export const decorativeCircleTopStyles = {
  position: 'absolute',
  top: -30,
  right: -30,
  width: 120,
  height: 120,
  borderRadius: '50%',
  background: `${colors.lightBlue}15`,
};

export const decorativeCircleBottomStyles = {
  position: 'absolute',
  bottom: -40,
  left: -40,
  width: 150,
  height: 150,
  borderRadius: '50%',
  background: `${colors.lightBlue}10`,
};

export const mobileLogoContainerStyles = {
  width: 70,
  height: 70,
  borderRadius: 2,
  background: `linear-gradient(135deg, ${colors.lightBlue} 0%, ${colors.white} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 2,
  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  zIndex: 1,
};

export const mobileLogoTextStyles = {
  fontSize: '2.2rem',
  fontWeight: 700,
  color: colors.darkBlue,
};

export const mobileLogoImageStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  padding: '8px',
};

export const systemNameTypographyStyles = {
  mb: 0.5,
  zIndex: 1,
  letterSpacing: '0.5px',
};

export const systemDescriptionTypographyStyles = {
  opacity: 0.95,
  fontSize: '0.875rem',
  zIndex: 1,
  maxWidth: '80%',
};

export const contentAreaStyles = {
  flex: 1,
  display: 'flex',
};

export const formColumnStyles = (isMobile: boolean) => ({
  flex: isMobile ? 1 : 0.5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: isMobile ? 0 : { xs: 2, sm: 3 },
  background: isMobile
    ? colors.white
    : `linear-gradient(135deg, ${colors.white} 0%, ${colors.lightGrayBg} 100%)`,
});

export const containerStyles = (isMobile: boolean) => ({
  ...(isMobile && {
    maxWidth: '100%',
    padding: 0,
    margin: 0,
    width: '100%',
  }),
});

export const imageColumnStyles = {
  flex: 0.5,
  background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.darkerBlue} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
};

export const desktopDecorativeCircleTopStyles = {
  position: 'absolute',
  top: -50,
  right: -50,
  width: 200,
  height: 200,
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${colors.lightBlue}20, transparent)`,
};

export const desktopDecorativeCircleBottomStyles = {
  position: 'absolute',
  bottom: -100,
  left: -100,
  width: 300,
  height: 300,
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${colors.lightBlue}10, transparent)`,
};

export const desktopBrandingContainerStyles = {
  textAlign: 'center',
  color: colors.white,
  zIndex: 1,
};

export const desktopLogoContainerStyles = {
  width: 120,
  height: 120,
  borderRadius: 3,
  background: `linear-gradient(135deg, ${colors.lightBlue} 0%, ${colors.white} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 2rem',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
};

export const desktopLogoTextStyles = {
  fontSize: '3rem',
  fontWeight: 700,
  color: colors.darkBlue,
};

export const desktopLogoImageStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  padding: '12px',
};

export const desktopSystemNameStyles = {
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: 1,
};

export const desktopSystemDescriptionStyles = {
  fontSize: '1.1rem',
  opacity: 0.9,
  maxWidth: 300,
  margin: '0 auto',
};
