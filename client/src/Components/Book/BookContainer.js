import React from 'react';
import PropTypes from 'prop-types';
import BookCard from './BookCard';

const BookContainer = ({ books = [], onDeleteBook, addComment, comments = [] }) => {
    return (
        <section>
            <h1>Books</h1>
            <ul className='cards'>
                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onDeleteBook={onDeleteBook} // Pass onDeleteBook function
                        addComment={addComment} // Pass addComment function
                        comments={comments.filter(comment => comment.bookId === book.id)} // Filter comments for the current book
                    />
                ))}
            </ul>
        </section>
    );
};

// Define PropTypes
BookContainer.propTypes = {
    books: PropTypes.array.isRequired, // Ensure books is required
    onDeleteBook: PropTypes.func.isRequired, // Ensure onDeleteBook is a function
    comments: PropTypes.array, // Ensure comments is an array
    addComment: PropTypes.func.isRequired // Ensure addComment is a function
};

export default BookContainer;