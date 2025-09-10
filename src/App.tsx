import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
        <NotistackProvider>
          <AuthProvider>
            <Router>
              <AppRoutes />
            </Router>
          </AuthProvider>
        </NotistackProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
