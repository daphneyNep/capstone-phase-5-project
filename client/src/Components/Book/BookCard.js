import React, { useState } from "react";
import { Link } from 'react-router-dom';

const BookCard = ({ book, deleteBook, addComment, comments = [] }) => {
  const [newComment, setNewComment] = useState('');

  if (!book) return <div>No book data available</div>; // Handle undefined book

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleAddComment = () => {
    if (newComment.trim() === '') return; // Prevent adding empty comments
    addComment(book.id, newComment);
    setNewComment(''); // Clear input field after adding comment
  };

  return (
    <li>
      <div>
        {/* Book Details */}
        <h3>{book.title} by {book.author}</h3>
        <p>{book.genre}</p>
        <p>{book.summary}</p>
        {book.image_url && <img src={book.image_url} alt={book.title} width="150" />} {/* Book image */}
        
        {/* Input field for adding a comment */}
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment"
          id={`comment-input-${book.id}`} // Unique id based on book id
          name={`comment-${book.id}`} // Unique name based on book id
          autoComplete="off" // Optional: Disable autocomplete if needed
        />
        <button onClick={handleAddComment}>Add Comment</button>

        {/* Button to delete the book */}
        <button onClick={() => deleteBook(book.id)}>Delete</button>

        {/* Display comments for this book */}
        <h4>Comments</h4>
        <ul>
          {comments.filter(comment => comment.bookId === book.id).map(comment => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>

        {/* Link to the comments page for this book */}
        <Link to={`/books/${book.id}/comments`}>View Comments</Link>
      </div>
    </li>
  );
};

export default BookCard;