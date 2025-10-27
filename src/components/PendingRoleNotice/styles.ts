import { SxProps, Theme } from '@mui/material';
import { colors } from 'commons/colors';

export const containerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: { xs: 2, sm: 3 },
  backgroundColor: colors.lightGrayBg,
};

export const cardStyles: SxProps<Theme> = {
  width: '100%',
  maxWidth: { xs: '100%', sm: 500 },
  textAlign: 'center',
  backgroundColor: colors.white,
  borderRadius: 3,
  padding: { xs: 3, sm: 5 },
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${colors.darkBlue}, ${colors.lightBlue})`,
  },
};

export const iconStyles: SxProps<Theme> = {
  fontSize: { xs: 60, sm: 80 },
  color: 'warning.main',
  marginBottom: 2,
  animation: 'pulse 2s ease-in-out infinite',
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 0.7,
      transform: 'scale(1.05)',
    },
  },
};

export const titleStyles: SxProps<Theme> = {
  fontWeight: 700,
  marginBottom: 1.5,
  color: colors.darkText,
  fontSize: { xs: '1.5rem', sm: '1.75rem' },
};

export const descriptionStyles: SxProps<Theme> = {
  color: 'text.secondary',
  marginBottom: 3,
  lineHeight: 1.7,
  fontSize: { xs: '0.9rem', sm: '1rem' },
};

export const stackStyles: SxProps<Theme> = {
  spacing: 2,
  alignItems: 'center',
  marginTop: 3,
};

export const buttonStyles: SxProps<Theme> = {
  width: { xs: '100%', sm: 'auto' },
  minWidth: { xs: 'auto', sm: 200 },
  paddingX: 4,
  paddingY: 1.5,
  borderRadius: 2,
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: 4,
  },
  transition: 'all 0.3s ease',
};

export const captionStyles: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.85rem',
  fontStyle: 'italic',
  marginTop: 2,
};

export const infoBoxStyles: SxProps<Theme> = {
  marginTop: 3,
  padding: 2,
  backgroundColor: colors.lightSurface,
  borderRadius: 2,
  border: `1px solid ${colors.blueGreyLight}`,
};

export const infoTitleStyles: SxProps<Theme> = {
  fontWeight: 600,
  marginBottom: 1,
  color: colors.darkBlue,
  fontSize: '0.95rem',
};

export const infoTextStyles: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.85rem',
  lineHeight: 1.6,
};
