import React from 'react';
import { useAuth } from 'hooks';

const Login = () => {
  const { login } = useAuth();

  return (
    <div>
      <button onClick={login}>Iniciar 0.0</button>
    </div>
  );
};

export default Login;
