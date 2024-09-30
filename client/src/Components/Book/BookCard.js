import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { Link } from 'react-router-dom';

const BookCard = ({ book, onAddToUserList, onDeleteBook, comments = [], addComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    addComment(book.id, newComment);
    setNewComment('');
  };

  return (
    <li className="book-card">
      <h2>{book.title} by {book.author}</h2>
      <p>{book.genre}</p>
      <p>{book.summary}</p>
      {book.image_url && <img src={book.image_url} alt={book.title} width="150" />}
      
      <button onClick={() => onAddToUserList(book.id)}>Add to My List</button>

      <input
        type="text"
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Write a comment"
      />
      <button onClick={handleAddComment}>Add Comment</button>

      <button onClick={() => onDeleteBook(book.id)}>Delete Book</button>

      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </li>
  );
};

export default BookCard;