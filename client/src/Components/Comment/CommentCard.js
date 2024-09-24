import React from "react"

const CommentCard = ({ comment: { id, content, book_id, user_id }, deleteComment }) => {
  const handleDelete = () => {
    deleteComment(id);
  };

  return (
    <li>
      <p>{content}</p>
      <p>{book_id}</p>
      <p>{user_id}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default CommentCard;
