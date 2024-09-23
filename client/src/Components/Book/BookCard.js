import React from "react";

const BookCard = ({ book: { id, book_title, book_genre, bio, image_url }, deleteBook }) => { // Destructure 'id' from 'book'
  const handleDelete = () => {
    deleteBook(id); // Use the 'id' here
  };
  return (
    <li>
      <p>{book_title}</p>
      <p>{book_genre}</p>
      <p>{bio}</p>
      {image_url && <img src={image_url} alt={book_title} width="150" />} {/* Conditionally render the image if it exists */}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default BookCard;