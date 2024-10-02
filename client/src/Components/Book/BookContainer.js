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
        addBook(newBook); // Ensure addBook adds an id
        setNewBook({ title: '', author: '' });
    };

    console.log(books); // Debugging line

    return (
        <section>
            <h1>Books</h1>
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
                {books.map((book) => {
                    console.log(book); // Debugging line
                    if (!book.id) {
                        console.warn('Book without an id:', book);
                        return null; // Skip rendering this book if id is undefined
                    }
                    return (
                        <BookCard
                            key={book.id}
                            book={book}
                            onDeleteBook={onDeleteBook}
                            addComments={addComments}
                            updateBook={updateBook}
                            comments={comments.filter(comment => comment.bookId === book.id)}
                        />
                    );
                })}
            </ul>
        </section>
    );
};

BookContainer.propTypes = {
    books: PropTypes.array.isRequired,
    onDeleteBook: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired,
    updateBook: PropTypes.func.isRequired,
    comments: PropTypes.array,
    addComments: PropTypes.func.isRequired,
};

export default BookContainer;