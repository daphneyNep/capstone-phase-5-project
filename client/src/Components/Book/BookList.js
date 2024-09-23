import React from "react";
import BookCard from "./BookCard";

const BookList = ({ books, deleteBook }) => (
  <ul>
    {books.map(book => (
      <BookCard key={book.id} book={book} deleteBook={deleteBook} /> // Provide 'key' and pass the 'book' prop
    ))}
  </ul>
);

export default BookList;