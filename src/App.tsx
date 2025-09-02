import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import { CssBaseline } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';

import NavigationMenu from 'components/NavigationMenu';

import theme from 'theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App">
          <NavigationMenu />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
