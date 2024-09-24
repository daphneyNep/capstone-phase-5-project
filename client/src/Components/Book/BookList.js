import React, { useState } from 'react';
import BookCard from './BookCard';

const BookList = () => {
  const [comments, setComments] = useState([]);

  const deleteBook = (id) => {
    console.log(`Deleting book with id: ${id}`);
    // Logic to delete the book
  };

  const addComment = (bookId, comment) => {
    console.log(`Adding comment to book ${bookId}: ${comment}`);
    setComments(prevComments => [...prevComments, { bookId, content: comment, id: Date.now() }]);
  };

  const book = { id: 1, title: 'Sample Book', author_id: 1, genre: 'Fiction', summary: 'A sample summary', image_url: 'sample.jpg' };

  return (
    <ul>
      <BookCard
        book={book}
        deleteBook={deleteBook}
        addComment={addComment} // Pass the function here
        comments={comments}
      />
    </ul>
  );
};

export default BookList;