import { useMutation } from '@tanstack/react-query';
import { deleteUser } from 'services/userService';

const useDeleteUser = () => {
  return useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
  });
};

export default useDeleteUser;
