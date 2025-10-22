import { useContext } from 'react';
import { UserContext } from '../context';

const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('UserContext debe usarse dentro de un UserProvider');
  }

  return context;
};

export default useUser;
