import React from 'react';
import BookContainer from './BookContainer'; // Ensure this matches the actual file name

function BookPage({ books }) {
  return (
    <div>
      {books && books.length > 0 ? (
        <BookContainer books={books} />
      ) : (
        <p>No books available</p> // Render fallback if books are not present
      )}
    </div>
  );
}

export default BookPage;