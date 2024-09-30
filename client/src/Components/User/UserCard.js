import React from "react";

const UserCard = ({ user: { id, userName, password }, onDeleteUser }) => {
  console.log('onDeleteUser type:', typeof onDeleteUser); // Check the type

  const handleDelete = () => {
    if (typeof onDeleteUser === 'function') {
      onDeleteUser(id);
    } else {
      console.error('onDeleteUser is not a function');
    }
  };

  return (
    <li>
      <p>{userName}</p>
      <p>{password}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default UserCard;