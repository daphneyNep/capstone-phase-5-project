import React from 'react';
import UserContainer from './UserContainer'; // Ensure this matches the actual file name

function UserPage({ users }) {
  return (
    <div>
      {users && users.length > 0 ? (
        <UserContainer users={users} />  // Fixed capitalization
      ) : (
        <p>No users available</p>  // Render fallback if users are not present
      )}
    </div>
  );
}

export default UserPage;