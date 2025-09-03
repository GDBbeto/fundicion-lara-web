import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PublicRoute from 'router/PublicRoute';
import PrivateRoute from 'router/PrivateRoute';

const Layout = lazy(() => import('components/Layout'));
const Login = lazy(() => import('views/Login'));
const Home = lazy(() => import('views/Home'));
const Productos = lazy(() => import('views/Productos'));

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
            <Route path="/" element={<Home />} />
            <Route path="/inicio" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
