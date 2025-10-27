import React from 'react';
import { Box, Toolbar, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import SideBarMenu from 'components/SideBarMenu';

import { usePermissions } from 'hooks';

import PendingRoleNotice from 'components/PendingRoleNotice';

import GlobalScrollStyles from '../GlobalScrollStyles';

const Layout = () => {
  const { isRolePending } = usePermissions();
  if (isRolePending) {
    return <PendingRoleNotice />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <GlobalScrollStyles />
      {/* Menu lateral + AppBar */}
      <SideBarMenu />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: {
            xs: '100%', // Movil: drawer temporal, contenido 100%
            sm: 'calc(100% - 56px)', // sm: drawer cerrado (56px)
          },
          transition: 'width 0.3s ease',
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        {/* Este Toolbar ocupa el espacio del AppBar */}
        <Toolbar />

        {/* Container responsivo que se adapta al espacio disponible */}
        <Container disableGutters maxWidth={false}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
