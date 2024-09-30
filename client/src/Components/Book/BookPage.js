import React, { useState } from 'react';
import BookForm from './BookForm';
import BookContainer from './BookContainer';

function BookPage() {
    const [books, setBooks] = useState([]);  // Manage books in the parent component

    // Function to add a new book to the list
    const addBook = (newBook) => {
        setBooks([...books, newBook]);
    };

    // Function to delete a book
    const deleteBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    return (
        <div>
            {/* Pass addBook to BookForm */}
            <BookForm addBook={addBook} />

            {/* Pass the list of books and deleteBook to BookContainer */}
            <BookContainer books={books} onDeleteBook={deleteBook} />
        </div>
    );
}

export default BookPage;