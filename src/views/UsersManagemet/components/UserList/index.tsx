import React, { useMemo, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import {
  CustomSpinner,
  CustomTable,
  DeleteConfirmationModal,
} from 'components/shared';

import { useDevice, useErrorHandler, useSnackbar } from 'hooks';

import type { User, Role } from 'types/api';
import type { Column } from 'types/column';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'commons/messages';

import { useUser, useDeleteUser, useUpdateUser } from '../../hooks';
import UserEditModal from '../UserEditModal';
import UserListMobile from '../UserListMobile';
import { columns as baseColumns } from './Columns';

const UserList = () => {
  const {
    users,
    isLoading,
    pagination,
    order,
    orderBy,
    handleRefresh,
    handlePageChange,
    handleRowsPerPageChange,
    handleSort,
  } = useUser();

  const { isSmallScreen } = useDevice();
  const { showSnackbar } = useSnackbar();
  const { showError } = useErrorHandler();
  const { mutate: deleteUser, isPending: isPendingDelete } = useDeleteUser();
  const { mutate: updateUser, isPending: isPendingUpdate } = useUpdateUser();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const isPending = isPendingDelete || isPendingUpdate;

  const handleOpenEditModal = (user: User) => {
    setShowEditModal(true);
    setSelectedUser(user);
  };

  const handleOpenDeleteModal = (user: User) => {
    setShowDeleteModal(true);
    setSelectedUser(user);
  };

  const columns = useMemo<Column<User>[]>(() => {
    return [
      ...baseColumns,
      {
        label: 'Acciones',
        apiField: 'userId',
        align: 'center',
        render: (row: User) => (
          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
            <IconButton
              size="small"
              onClick={() => handleOpenEditModal(row)}
              color="primary"
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleOpenDeleteModal(row)}
              color="error"
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ),
      } as Column<User>,
    ];
  }, []);

  const processSuccess = (message: string) => {
    handleRefresh();
    showSnackbar(message, 'success');
  };

  const handleDelete = () => {
    if (!selectedUser?.userId) return;

    deleteUser(selectedUser.userId, {
      onSuccess: () => {
        processSuccess(SUCCESS_MESSAGES.DELETED);
        setShowDeleteModal(false);
        setSelectedUser(null);
      },
      onError: (error) => showError(error, ERROR_MESSAGES.DELETE),
    });
  };

  const handleSubmit = (userId: number, role: Role) => {
    const user = users.find((u) => u.userId === userId);
    if (!user) return;

    user.role = role;

    updateUser(user, {
      onSuccess: () => {
        processSuccess(SUCCESS_MESSAGES.UPDATED);
        setShowEditModal(false);
        setSelectedUser(null);
      },
      onError: (error) => showError(error, ERROR_MESSAGES.UPDATE),
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      {isSmallScreen ? (
        <UserListMobile
          handleOpenEditModal={handleOpenEditModal}
          handleOpenDeleteModal={handleOpenDeleteModal}
        />
      ) : (
        <CustomTable<User>
          columns={columns}
          rows={users}
          isLoading={isLoading}
          onRefresh={handleRefresh}
          pagination={pagination}
          maxHeight="70vh"
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowKey="userId"
          order={order || undefined}
          orderBy={orderBy || undefined}
          onSort={handleSort}
        />
      )}

      {showEditModal && selectedUser ? (
        <UserEditModal
          open={showEditModal}
          user={selectedUser}
          handleClose={() => setShowEditModal(false)}
          onSubmit={handleSubmit}
        />
      ) : null}

      {showDeleteModal && selectedUser ? (
        <DeleteConfirmationModal
          open={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title="Eliminar usuario"
          confirmMessage={`¿Estás seguro de que deseas eliminar al usuario ${selectedUser.name} ${selectedUser.lastName}?`}
        />
      ) : null}

      {isPending ? <CustomSpinner open /> : null}
    </Box>
  );
};

export default UserList;
