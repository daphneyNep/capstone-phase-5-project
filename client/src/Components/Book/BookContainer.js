import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BookCard from './BookCard';

const BookContainer = ({ books = [], onDeleteBook, addBook, updateBook, addComments, comments = [] }) => {
    const [newBook, setNewBook] = useState({ title: '', author: '' });

    const handleChange = (e) => {
        setNewBook({
            ...newBook,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook(newBook); // Call the passed addBook function to create a new book
        setNewBook({ title: '', author: '' }); // Reset form after submission
    };

    return (
        <section>
            <h1>Books</h1>
            
            {/* Form to add a new book */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleChange}
                    placeholder="Book Title"
                    required
                />
                <input
                    type="text"
                    name="author"
                    value={newBook.author}
                    onChange={handleChange}
                    placeholder="Author"
                    required
                />
                <button type="submit">Add Book</button>
            </form>

            <ul className="cards">
                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onDeleteBook={onDeleteBook}
                        addComments={addComments}
                        updateBook={updateBook}
                        comments={comments.filter(comment => comment.bookId === book.id)}
                    />
                ))}
            </ul>
        </section>
    );
};

// Define PropTypes
BookContainer.propTypes = {
    books: PropTypes.array.isRequired,
    onDeleteBook: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired, // Ensure addBook is a function
    updateBook: PropTypes.func.isRequired, // Ensure updateBook is a function
    comments: PropTypes.array,
    addComments: PropTypes.func.isRequired,
};

export default BookContainer;