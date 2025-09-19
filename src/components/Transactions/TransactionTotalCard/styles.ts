import { colors } from 'commons/colors';

// Fade animation styles
export const fadeStyles = {
  in: true,
  timeout: 800,
};

// Main card styles
export const cardStyles = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 4,
  mb: 3,
  background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.veryLightGray} 100%)`,
  border: `1px solid ${colors.lightSurface}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)`,
  },
};

// Card content styles
export const cardContentStyles = {
  p: 3,
};

// Main content layout
export const mainContentStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  justifyItems: 'center',
};

// Content section styles
export const contentSectionStyles = {
  flex: 1,
};

// Title styles
export const titleStyles = {
  color: colors.darkText,
  fontWeight: 500,
  mb: 1,
  fontSize: '0.95rem',
  opacity: 0.8,
};

// Loading container styles
export const loadingContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

// Error container styles
export const errorContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

// Error amount layout
export const errorAmountStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

// Error amount text styles
export const errorAmountTextStyles = {
  variant: 'h4',
  fontWeight: 700,
  color: 'error.main',
};

// Error icon styles
export const errorIconStyles = {
  p: 0.5,
};

// Amount container styles
export const amountContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

// Amount text styles with gradient
export const amountTextStyles = {
  variant: 'h4',
  fontWeight: 700,
  color: colors.darkBlue,
  background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

// Icon container styles
export const iconContainerStyles = {
  position: 'relative',
  ml: 3,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${colors.darkBlue}20 0%, ${colors.lightBlue}20 100%)`,
    zIndex: 0,
  },
};

// Icon wrapper styles
export const iconWrapperStyles = {
  position: 'relative',
  zIndex: 1,
  background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)`,
  borderRadius: '50%',
  p: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 8px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)`,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05) rotate(5deg)',
  },
};

// Icon styles
export const iconStyles = {
  color: colors.white,
  fontSize: 32,
  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
};
