import React from "react";
import BookList from "../Components/Books/BookCard"

const BookList = ({ books, deleteBook }) => {
    if (!Array.isArray(books)) {
        return <div>Error: books data is not an array</div>;
    }

    return (
        <div>
            {books.map(book => (
                <div key={book_id}>
                    <h3>{book_title}</h3>
                    <p>{book_author}</p>
                    <button onClick={() => deleteBook(book_id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};
  
  export default BookList;