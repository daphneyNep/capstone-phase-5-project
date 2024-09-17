import React from "react";
import BookCard from "../Components/Books/BookCard"

const BookList = ({ books, deleteBook }) => {
    if (!Array.isArray(books)) {
        return <div>Error: books data is not an array</div>;
    }

    return (
        <div>
            {books.map(book => (
                <div key={book.id}>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <button onClick={() => deleteBook(book.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};
  
  export default BookList;