import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter
import { CssBaseline } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';

import theme from 'theme';

import AuthProvider from 'context/auth';

import AppRoutes from 'router/AppRoutes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
