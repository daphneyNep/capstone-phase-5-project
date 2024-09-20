import React from "react"

const BookCard = ({ book: { id, userName, password }, deleteBook }) => {
  const handleDelete = () => {
    deleteBook(id);
  };

  return (
    <li>
      <p>{userName}</p>
      <p>{password}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default BookCard