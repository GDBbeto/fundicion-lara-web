import { useMemo } from 'react';
import { useAuth } from 'hooks';
import { Role } from 'types/api';

const usePermissions = () => {
  const { user } = useAuth();

  const isRolePending: boolean = useMemo(
    () => (user ? user.role === Role.PENDING : false),
    [user],
  );

  const isAdmin: boolean = useMemo(
    () => (user ? user.role === Role.ADMIN : false),
    [user],
  );

  const isReadOnly: boolean = useMemo(
    () => (user ? user.role === Role.VIEWER : false),
    [user],
  );

  return {
    isRolePending,
    isAdmin,
    isReadOnly,
  };
};

export default usePermissions;
