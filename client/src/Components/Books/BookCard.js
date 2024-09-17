import React from "react"

const BookCard = ({ book: { id, title, author, content }, deleteBook }) => {
  const handleDelete = () => {
    deleteBook(id);
  };

  return (
    <li>
      <p>{title}</p>
      <p>{author}</p>
      <p>{content}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default BookCard