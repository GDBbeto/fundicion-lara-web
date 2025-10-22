import React, { JSX, lazy, Suspense } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import PublicRoute from 'router/PublicRoute';
import PrivateRoute from 'router/PrivateRoute';
import Layout from 'components/Layout';

const Login = lazy(() => import('views/Login'));
const Home = lazy(() => import('views/Home'));
const Inventory = lazy(() => import('views/Inventory'));
const AluminumWorksSales = lazy(() => import('views/AluminumWorksSales'));
const PurchaseManagement = lazy(() => import('views/PurchaseManagement'));
const ExpenseManagement = lazy(() => import('views/ExpenseManagement'));
const OrderManagement = lazy(() => import('views/OrderManagement'));
const UsersManagemet = lazy(() => import('views/UsersManagemet'));

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
            <Route index element={withSuspense(Home)} />
            <Route path="/inicio" element={withSuspense(Home)} />
            <Route path="/inventario" element={withSuspense(Inventory)} />
            <Route path="/ventas" element={withSuspense(AluminumWorksSales)} />
            <Route path="/compras" element={withSuspense(PurchaseManagement)} />
            <Route path="/gastos" element={withSuspense(ExpenseManagement)} />
            <Route path="/pedidos" element={withSuspense(OrderManagement)} />
            <Route path="/usuarios" element={withSuspense(UsersManagemet)} />

            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
