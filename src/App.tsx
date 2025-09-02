import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import { CssBaseline } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';

import SideBarMenu from 'components/SideBarMenu';

import theme from 'theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App">
          <SideBarMenu />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
