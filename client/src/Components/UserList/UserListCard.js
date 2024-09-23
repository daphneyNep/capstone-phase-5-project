import React from "react"

const UserListCard = ({ userList: { book_id, rating, user_id }, deleteUserList }) => {
  const handleDelete = () => {
    deleteUserList(id);
  };

  return (
    <li>
      <p>{book_id}</p>
      <p>{user_id}</p>
      <p>{rating}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default UserListCard;