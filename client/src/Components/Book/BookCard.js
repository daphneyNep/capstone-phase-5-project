import React from "react";

const BookCard = ({ book: { id, author_id, title, genre, summary, image_url }, deleteBook }) => { // Destructure 'id' from 'book'
  const handleDelete = () => {
    deleteBook(id); // Use the 'id' here
  };
  return (
    <li>
      <p>{author_id}</p>
      <p>{title}</p>
      <p>{genre}</p>
      <p>{summary}</p>
      {image_url && <img src={image_url} alt={title} width="150" />} {/* Conditionally render the image if it exists */}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default BookCard;