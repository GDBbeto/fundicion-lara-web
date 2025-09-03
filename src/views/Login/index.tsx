import React from 'react';
import { useAuth } from 'hooks';

const Login = () => {
  const { login } = useAuth();

  return (
    <div>
      <button onClick={login}>Iniciar sesión</button>
    </div>
  );
};

export default Login;
