import React, { useState } from "react";
import { Link } from 'react-router-dom';

const BookCard = ({ book, deleteBook, addComment, comments = [] }) => {
  const [comment, setComment] = useState('');

  if (!book) return <div>No book data available</div>; // Handle undefined book

  const handleDelete = () => {
    deleteBook(book.id);
  };

  const handleAddComment = () => {
    if (comment.trim() === '') return; // Prevent adding empty comments
    addComment(book.id, comment);
    setComment('');
  };

  return (
    <li>
      <p>{book.author_id}</p>
      <p>{book.title}</p>
      <p>{book.genre}</p>
      <p>{book.summary}</p>
      {book.image_url && <img src={book.image_url} alt={book.title} width="150" />}
      
      {/* Input field for adding a comment */}
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Add Comment</button>

      <button onClick={handleDelete}>Delete</button>

      {/* Display comments for this book */}
      <h3>Comments:</h3>
      <ul>
        {comments.filter(c => c.bookId === book.id).map(c => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>

      {/* Link to the comments page for this book */}
      <Link to={`/books/${book.id}/comments`}>View Comments</Link>
    </li>
  );
};

export default BookCard;