import React, { JSX, lazy, Suspense } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import PublicRoute from 'router/PublicRoute';
import PrivateRoute from 'router/PrivateRoute';
import Layout from 'components/Layout';

const Login = lazy(() => import('views/Login'));
const Home = lazy(() => import('views/Home'));
const Productos = lazy(() => import('views/Productos'));
const AluminumWorksSales = lazy(() => import('views/AluminumWorksSales'));

const withSuspense = (
  Component: React.LazyExoticComponent<() => JSX.Element>,
) => (
  <Suspense
    fallback={
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    }
  >
    <Component />
  </Suspense>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        {/* Rutas públicas (no autenticado) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Rutas privadas (autenticado) */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={withSuspense(Home)} />
            <Route path="/inicio" element={withSuspense(Home)} />
            <Route path="/productos" element={withSuspense(Productos)} />
            <Route path="/ventas" element={withSuspense(AluminumWorksSales)} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
