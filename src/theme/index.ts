import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Color primario
      light: '#5c6bc0', // Tono claro
      dark: '#2c387e', // Tono oscuro
      contrastText: '#fff', // Color de texto para el color primario
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
