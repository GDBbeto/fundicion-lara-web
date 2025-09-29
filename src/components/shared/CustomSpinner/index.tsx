import React from 'react';
import { Backdrop, CircularProgress, Fade } from '@mui/material';
import { BACKGROUND_COLOR } from 'commons/colors';

interface CustomSpinnerProps {
  open: boolean;
}

const CustomSpinner: React.FC<CustomSpinnerProps> = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.modal + 1,
        backgroundColor: BACKGROUND_COLOR,
      }}
    >
      <Fade in={open} timeout={300}>
        <CircularProgress
          size={60}
          thickness={4.5}
          color="primary"
          sx={{
            animationDuration: '1s',
          }}
        />
      </Fade>
    </Backdrop>
  );
};

export default CustomSpinner;
