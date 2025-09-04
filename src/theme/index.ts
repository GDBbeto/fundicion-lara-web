import { createTheme } from '@mui/material';
import { colors } from 'commons/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Color primario
      light: '#5c6bc0', // Tono claro
      dark: '#2c387e', // Tono oscuro
      contrastText: colors.white, // Color de texto para el color primario
    },
    background: {
      default: '#FAFAFA',
      paper: colors.white,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.white,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          transition: 'all 0.25s ease-in-out',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1600,
    },
  },
});

export default theme;
