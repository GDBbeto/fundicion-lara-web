import { colors } from 'commons/colors';

export const mainContentStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  justifyItems: 'center',
};

export const contentSectionStyles = {
  flex: 1,
};

export const titleStyles = {
  color: colors.darkText,
  fontWeight: 500,
  mb: 1,
  fontSize: '0.95rem',
  opacity: 0.8,
};

export const loadingContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

export const errorContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

export const errorAmountStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export const errorAmountTextStyles = {
  variant: 'h4',
  fontWeight: 700,
  color: 'error.main',
};

export const errorIconStyles = {
  p: 0.5,
};

export const amountContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

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

export const iconStyles = {
  color: colors.white,
  fontSize: 32,
  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
};
