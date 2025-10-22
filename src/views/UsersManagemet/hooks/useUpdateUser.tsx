import { useMutation } from '@tanstack/react-query';
import { updateUser } from 'services/userService';
import type { ApiResponse, CommonError, User } from 'types/api';

const useUpdateUser = () => {
  return useMutation<ApiResponse<User>, CommonError, User>({
    mutationFn: (user) => updateUser(user.userId, user),
  });
};

export default useUpdateUser;
