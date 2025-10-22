import React from 'react';
import UserProvider from './context';
import UserToolbar from './components/UserToolbar';
import UserList from './components/UserList';

const UsersManagemet = () => {
  return (
    <UserProvider>
      <UserToolbar />
      <UserList />
    </UserProvider>
  );
};

export default UsersManagemet;
