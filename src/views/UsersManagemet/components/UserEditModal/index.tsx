import React from 'react';

import { Button } from '@mui/material';

import CustomModal from 'components/shared/CustomModal';

import type { User, Role } from 'types/api';

import UserEditForm from './UserEditForm';

interface UserEditModalProps {
  open: boolean;
  user: User;
  handleClose: () => void;
  onSubmit: (userId: number, role: Role) => void;
}

const UserEditModal = ({
  open,
  user,
  handleClose,
  onSubmit,
}: UserEditModalProps) => {
  const formId = 'userEditForm';

  return (
    <CustomModal
      open={open}
      title="Editar Usuario"
      handleClose={handleClose}
      maxWidth="sm"
      actions={() => (
        <>
          <Button id="cancelButton" variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            id="saveButton"
            variant="contained"
            type="submit"
            form={formId}
          >
            Guardar
          </Button>
        </>
      )}
    >
      <UserEditForm user={user} onSubmit={onSubmit} id={formId} />
    </CustomModal>
  );
};

export default UserEditModal;
