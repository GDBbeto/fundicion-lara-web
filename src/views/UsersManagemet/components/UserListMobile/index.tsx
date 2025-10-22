import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { Edit, Delete, PersonOff } from '@mui/icons-material';

import { useUser } from 'views/UsersManagemet/hooks';
import type { User } from 'types/api';
import { CustomPagination, CardLayout } from 'components/shared';
import type { ActionItem } from 'components/shared/ActionMenu';
import { colors } from 'commons/colors';

import UserCard from './UserCard';
import UserCardSkeleton from './UserCardSkeleton';

interface UserListMobileProps {
  handleOpenEditModal: (user: User) => void;
  handleOpenDeleteModal: (user: User) => void;
}

const UserListMobile = ({
  handleOpenEditModal,
  handleOpenDeleteModal,
}: UserListMobileProps) => {
  const {
    users,
    isLoading,
    pagination,
    handlePageChange,
    handleRowsPerPageChange,
  } = useUser();

  const handleEditUser = useCallback(
    (user: User) => {
      handleOpenEditModal(user);
    },
    [handleOpenEditModal],
  );

  const handleDeleteUser = useCallback(
    (user: User) => {
      handleOpenDeleteModal(user);
    },
    [handleOpenDeleteModal],
  );

  const getUserActions = useCallback(
    (user: User): ActionItem[] => [
      {
        id: 'edit',
        label: 'Editar',
        icon: <Edit fontSize="small" />,
        onClick: () => handleEditUser(user),
        color: colors.darkBlue,
      },
      {
        id: 'delete',
        label: 'Eliminar',
        icon: <Delete fontSize="small" />,
        onClick: () => handleDeleteUser(user),
        color: colors.red,
      },
    ],
    [handleEditUser, handleDeleteUser],
  );

  if (isLoading) {
    return <UserCardSkeleton />;
  }

  if (!users.length) {
    return (
      <CardLayout
        gradient={true}
        topBorder={false}
        hoverEffect={false}
        sx={{ py: 8 }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <PersonOff
            sx={{ fontSize: 48, color: colors.blueGreyLight, mb: 2 }}
          />
          <Typography
            variant="h6"
            color="text.secondary"
            fontWeight={500}
            mb={1}
          >
            No hay usuarios
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No se encontraron usuarios que coincidan con tu búsqueda.
          </Typography>
        </Box>
      </CardLayout>
    );
  }

  return (
    <>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {users.map((user, index) => (
          <UserCard
            key={user.userId}
            user={user}
            index={index}
            actions={getUserActions(user)}
          />
        ))}
      </Box>

      <CustomPagination
        pagination={pagination}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};

export default UserListMobile;
