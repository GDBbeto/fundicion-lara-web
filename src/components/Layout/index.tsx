import React from 'react';
import { Box, Toolbar, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import SideBarMenu from 'components/SideBarMenu';

import GlobalScrollStyles from '../GlobalScrollStyles';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <GlobalScrollStyles />
      {/* Menú lateral + AppBar */}
      <SideBarMenu />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
        }}
      >
        {/* Este Toolbar ocupa el espacio del AppBar */}
        <Toolbar />

        {/* Puedes envolver el contenido si deseas padding lateral responsivo */}
        <Container maxWidth="xl" disableGutters>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
