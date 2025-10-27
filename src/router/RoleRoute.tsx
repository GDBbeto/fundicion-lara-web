import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks';

interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleRoute = ({ children, allowedRoles }: RoleRouteProps) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/inicio" replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;
