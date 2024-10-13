import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion'; // Import motion from Framer Motion

const BookCard = ({ 
    book = { title: "", author: {}, image_url: "" }, 
    onDeleteBook = () => {}, 
    updateBook = () => {}, 
    addComments = () => {}, 
    comments = [] 
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedBook, setUpdatedBook] = useState(book);
    const [newComment, setNewComment] = useState("");
    const [showComments, setShowComments] = useState(false);

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 }, // Starting state
        visible: { opacity: 1, y: 0 }, // Visible state
        hover: { scale: 1.05 }, // Hover effect
    };

    const commentVariants = {
        hidden: { opacity: 0, height: 0 }, // Hidden comments
        visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } }, // Visible comments
    };

    const handleEdit = () => setIsEditing(!isEditing);

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:5555/book/${book.id}`, {
            method: "PATCH",
            body: JSON.stringify(updatedBook),
            headers: { 'Content-Type': 'application/json' },
        });
        updateBook(updatedBook);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        if (e.target.name === "author") {
            setUpdatedBook({
                ...updatedBook,
                [e.target.name]: { ...book.author, name: e.target.value },
            });
        } else {
            setUpdatedBook({
                ...updatedBook,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleCommentChange = (e) => setNewComment(e.target.value);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            addComments({ image_url: book.image_url, bookId: book.id, content: newComment });
            setNewComment(""); // Reset input
        }
    };

    const toggleComments = () => setShowComments(!showComments);

    return (
        <motion.li 
            className="card" 
            initial="hidden" 
            animate="visible" 
            whileHover="hover" 
            variants={cardVariants}
        >
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
                        value={updatedBook.author.name}
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
                    <p>Author: {book.author.name}</p>
                    {book.image_url && (
                        <motion.img 
                            src={book.image_url} 
                            alt={book.title} 
                            style={{ width: '100px', height: '150px' }} 
                            whileHover={{ scale: 1.1 }} // Image hover effect
                        />
                    )}
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={() => onDeleteBook(book.id)}>Delete</button>
                </>
            )}

            <button onClick={toggleComments}>
                {showComments ? 'Hide Comments' : 'View Comments'}
            </button>

            <motion.div
                initial="hidden"
                animate={showComments ? "visible" : "hidden"}
                variants={commentVariants}
            >
                {showComments && (
                    <>
                        <h3>Comments</h3>
                        <ul>
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    comment.id && comment.content ? (
                                        <li key={comment.id}>{comment.content}</li>
                                    ) : null
                                ))
                            ) : (
                                <p>No comments available</p>
                            )}
                        </ul>
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
            </motion.div>
        </motion.li>
    );
};

// Define PropTypes
BookCard.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.object.isRequired,
        image_url: PropTypes.string, // image_url is optional
    }).isRequired,
    onDeleteBook: PropTypes.func.isRequired,
    updateBook: PropTypes.func.isRequired,
    addComments: PropTypes.func.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            content: PropTypes.string.isRequired,
        })
    ), // Comments must be an array of objects
};

export default BookCard;