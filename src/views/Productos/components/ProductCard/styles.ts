import { SxProps, Theme } from '@mui/material';

export const cardStyles: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 2,
  boxShadow: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: 6,
  },
};

export const cardMediaStyles: SxProps<Theme> = {
  height: 200,
  width: '100%',
  objectFit: 'contain',
  backgroundColor: '#f5f5f5',
  p: 1,
};

export const productNameStyles: SxProps<Theme> = {
  fontSize: 16,
  fontWeight: 600,
  maxWidth: '80%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};
