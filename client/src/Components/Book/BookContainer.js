import React, { useState } from 'react'; 
import PropTypes from 'prop-types';
import BookCard from './BookCard';

const BookContainer = ({ books = [], onDeleteBook, addBook, updateBook, addComments, comments = [] }) => {
    const [newBook, setNewBook] = useState({ title: '', author: '', image_url: '' });
    const [newComment, setNewComment] = useState({ user_id: '', book_id: '' });

    // Handle input change for adding a new book
    const handleAddBook = (e) => {
        setNewBook({
            ...newBook,
            [e.target.name]: e.target.value,
        });
    };

    // Handle input change for adding a new comment
    const handleAddComment = (e) => {
        setNewComment({
            ...newComment,
            [e.target.name]: e.target.value,
        });
    };

    // Submit handler for adding a new book
    const handleAddBookSubmit = (e) => {
        e.preventDefault();
        addBook(newBook); // Ensure addBook adds an id
        setNewBook({ title: '', author: '' }); // Clear input fields
    };

    // Submit handler for adding a new comment
    const handleAddCommentSubmit = (e) => {
        e.preventDefault();
        addComments(newComment);
        setNewComment({ user_id: '', book_id: '' }); // Clear input fields
    };

    return (
        <section>
            {/* <h1>Add a New Book</h1>
            <form onSubmit={handleAddBookSubmit}>
                <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleAddBook}
                    placeholder="Book Title"
                    required
                />
                <input
                    type="text"
                    name="author"
                    value={newBook.author}
                    onChange={handleAddBook}
                    placeholder="Author"
                    required
                />
                <button type="submit">Add Book</button>
            </form>

            <h1>Add a New Comment</h1>
            <form onSubmit={handleAddCommentSubmit}>
                <input
                    type="number"
                    name="user_id"
                    value={newComment.user_id}
                    onChange={handleAddComment}
                    placeholder="User ID"
                    required
                />
                <input
                    type="number"
                    name="book_id"
                    value={newComment.book_id}
                    onChange={handleAddComment}
                    placeholder="Book ID"
                    required
                />
                <button type="submit">Add Comment</button>
            </form> */}

            <h2>Book List</h2>
            <ul className="cards">
                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onDeleteBook={onDeleteBook}
                        addComments={addComments}
                        updateBook={updateBook}
                        comments={comments.filter(comment => comment.book_id === book.id)} // Ensure comments are filtered by book_id
                    />
                ))}
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