import React from 'react';
import UserContainer from './UserContainer'; // Make sure this import matches the filename

function UserPage({ users }) {
  return (
    <UserContainer users={users} />
  );
}

export default UserPage;