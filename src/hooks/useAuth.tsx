import { useContext } from 'react';
import { AuthContext } from 'context/auth/context';
import { AuthContextType } from 'context/auth/types';

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
