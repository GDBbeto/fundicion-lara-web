import { useTheme, useMediaQuery } from '@mui/material';

/**
 * Custom hook that provides responsive device info.
 */
const useDevice = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    isMobile,
  };
};

export default useDevice;
