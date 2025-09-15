import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

import theme from 'theme';

import NotistackProvider from 'providers/NotistackProvider';
import AuthProvider from 'context/auth';

import AppRoutes from 'router/AppRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // No reintenta fallos automáticamente
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <NotistackProvider>
            <AuthProvider>
              <Router>
                <AppRoutes />
              </Router>
            </AuthProvider>
          </NotistackProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
