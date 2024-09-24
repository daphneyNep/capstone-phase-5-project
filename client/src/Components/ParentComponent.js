import React, { useState } from 'react';
import BookCard from './BookCard';

const ParentComponent = () => {
  const [comments, setComments] = useState([
    { id: 1, bookId: 1, content: "Great book!" },
    { id: 2, bookId: 1, content: "Very informative." },
    // More comments...
  ]);

  const [books] = useState([
    {
      id: 1,
      author_id: 101,
      title: 'Book Title',
      genre: 'Fiction',
      summary: 'Book Summary',
      image_url: 'https://example.com/book-image.jpg'
    },
    // More books...
  ]);

  const addComment = (bookId, content) => {
    const newComment = {
      id: comments.length + 1, // Simple ID generation
      bookId,
      content
    };
    setComments([...comments, newComment]); // Update the comments state
  };

  const deleteBook = (bookId) => {
    console.log(`Deleting book with ID: ${bookId}`);
    // Implement the logic to delete the book (e.g., filtering the books array)
  };

  return (
    <ul>
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          deleteBook={deleteBook}
          addComment={addComment}
          comments={comments}
        />
      ))}
    </ul>
  );
};

export default ParentComponent;