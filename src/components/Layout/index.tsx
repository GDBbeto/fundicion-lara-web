import React from 'react';
import { Box, Grid } from '@mui/material';

import { Outlet } from 'react-router-dom';

import SideBarMenu from 'components/SideBarMenu';
import { DrawerHeader } from 'components/SideBarMenu/styles';

const Layout = () => {
  return (
    <Grid container>
      <SideBarMenu />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Grid>
  );
};

export default Layout;
