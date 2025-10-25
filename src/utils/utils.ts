import type { User } from 'types/api';

export const getInitials = (user: User) => {
  const firstInitial = user.name.charAt(0).toUpperCase();
  const lastInitial = user.lastName.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};
