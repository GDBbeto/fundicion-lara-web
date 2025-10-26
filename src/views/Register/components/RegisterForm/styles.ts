import { SxProps, Theme } from '@mui/material';
import { colors } from 'commons/colors';

export const logoStyles: SxProps<Theme> = {
  width: 60,
  height: 60,
  borderRadius: 2,
  background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  boxShadow: '0 4px 16px rgba(27, 38, 59, 0.2)',
};

export const logoIconStyles: SxProps<Theme> = {
  fontSize: '1.8rem',
  color: colors.white,
};

export const textFieldStyles: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
  },
};

export const registerButtonStyles: SxProps<Theme> = {
  background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.darkerBlue} 100%)`,
  borderRadius: 2,
  py: 1.5,
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 16px rgba(27, 38, 59, 0.3)',
  '&:hover': {
    background: `linear-gradient(135deg, ${colors.darkerBlue} 0%, ${colors.darkBlue200} 100%)`,
    boxShadow: '0 6px 20px rgba(27, 38, 59, 0.4)',
  },
  '&:disabled': {
    background: colors.blueGreyLight,
  },
};

export const loginLinkStyles: SxProps<Theme> = {
  color: colors.darkBlue,
  textDecoration: 'none',
  fontWeight: 600,
  '&:hover': {
    textDecoration: 'underline',
  },
};

export const footerContainerStyles: SxProps<Theme> = {
  textAlign: 'center',
  pt: 2,
};
