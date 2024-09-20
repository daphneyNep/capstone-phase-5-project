import React from 'react';
import BookContainer from './BookContainer'; // Make sure this import matches the filename

function BookPage({ books }) {
  return (
    <BookContainer books={books} />
  );
}

export default BookPage;