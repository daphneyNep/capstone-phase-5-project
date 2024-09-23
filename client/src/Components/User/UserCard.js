import React from "react"

const UserCard = ({ user: { id, userName, password }, deleteUser }) => {
  const handleDelete = () => {
    deleteUser(id);
  };

  return (
    <li>
      <p>{userName}</p>
      <p>{password}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default UserCard