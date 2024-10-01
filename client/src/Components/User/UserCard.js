import React from "react";

const UserCard = ({ users, onDeleteUser, onEdit, username, password }) => {
  if (!users) {
    return null; // or return a loading state/message
  }

  return (
    <div className="user-card">
      <h3>{users}</h3>
      <p>{username}</p>
      <p>{password}</p>
      <button onClick={() => onEdit(users)}>Edit</button>
      <button onClick={() => onDeleteUser(users.id)}>Delete</button>
    </div>
  );
};

export default UserCard;