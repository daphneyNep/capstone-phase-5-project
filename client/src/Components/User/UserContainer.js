import React from "react";
import UserCard from "./UserCard"; // Adjust the import based on your file structure

const UserContainer = ({ users, handleDeleteUser, handleEditUser }) => {
  return (
    <div>
      {users.map((user) => (
        <UserCard 
          key={user.id}  // Ensure a unique key prop for each UserCard
          user={user} 
          handleDeleteUser={handleDeleteUser} 
          handleEditUser={handleEditUser} 
        />
      ))}
    </div>
  );
};

export default UserContainer;