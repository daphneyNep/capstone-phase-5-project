import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BookCard = ({ book, onDeleteBook, updateBook, addComments, comments }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedBook, setUpdatedBook] = useState(book);
    const [newComment, setNewComment] = useState(""); // State to handle new comment input
    const [showComments, setShowComments] = useState(false); // State to track whether comments are visible

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateBook(updatedBook); // Call the updateBook function
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setUpdatedBook({
            ...updatedBook,
            [e.target.name]: e.target.value,
        });
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value); // Update newComment state
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            addComments({ bookId: book.id, content: newComment }); // Call the addComments function with the new comment
            setNewComment(""); // Reset the input field after adding the comment
        }
    };

    const toggleComments = () => {
        setShowComments(!showComments); // Toggle the visibility of the comments
    };

    return (
        <li className="card">
            {isEditing ? (
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        name="title"
                        value={updatedBook.title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="author"
                        value={updatedBook.author}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="image_url"
                        value={updatedBook.image_url}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                    <button type="submit">Save</button>
                </form>
            ) : (
                <>
                    <h2>{book.title}</h2>
                    <p>Author: {book.author}</p>
                    {book.image_url && <img src={book.image_url} alt={book.title} style={{ width: '100px', height: '150px' }} />}
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={() => onDeleteBook(book.id)}>Delete</button>
                </>
            )}

            {/* View/Hide Comments link */}
            <button onClick={toggleComments}>
                {showComments ? 'Hide Comments' : 'View Comments'}
            </button>

            {/* Conditionally render the comments section */}
            {showComments && (
                <>
                    <h3>Comments</h3>
                    <ul>
                        {comments && comments.length > 0 ? (
                            comments.map(comment => (
                                comment.id && comment.content ? (
                                    <li key={comment.id}>{comment.content}</li>
                                ) : null // Only render comments that have valid id and content
                            ))
                        ) : (
                            <p>No comments available</p>
                        )}
                    </ul>

                    {/* Form to add a new comment */}
                    <form onSubmit={handleAddComment}>
                        <input
                            type="text"
                            name="newComment"
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment"
                            required
                        />
                        <button type="submit">Add Comment</button>
                    </form>
                </>
            )}
        </li>
    );
};

// Define PropTypes
BookCard.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        image_url: PropTypes.string, // image_url is optional
    }).isRequired,
    onDeleteBook: PropTypes.func.isRequired,
    updateBook: PropTypes.func.isRequired,
    addComments: PropTypes.func.isRequired, // Function to add comments
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number, // Make id optional
            content: PropTypes.string.isRequired,
        })
    ).isRequired, // Comments must be an array of objects
};

export default BookCard;