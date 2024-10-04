import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik} from 'formik';


// Define the BookCard component with default parameters for props
const BookCard = ({ 
    book = { title: "", author: {}, image_url: "" }, 
    onDeleteBook = () => {}, 
    updateBook = () => {}, 
    addComments = () => {}, 
    comments = [] 
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedBook, setUpdatedBook] = useState(book);
    const [newComment, setNewComment] = useState(""); // State to handle new comment input
    const [showComments, setShowComments] = useState(false); // State to track whether comments are visible
    
    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:5555/book/${book.id}`, {
                            method: "PATCH",
                            body: JSON.stringify(updatedBook),
                            headers: { 'Content-Type': 'application/json' }
                        })
        updateBook(updatedBook); // Call the updateBook function
        setIsEditing(false);
    };

    const handleChange = (e) => {
        if (e.target.name==="author"){
            setUpdatedBook({
                ...updatedBook,
                [e.target.name]: {...book.author, name: e.target.value}
            }); 
        }else {
            setUpdatedBook({
                ...updatedBook,
                [e.target.name]: e.target.value,
            });
        }
        
    };
    
    // const formik = useFormik({
    //     initialValues: {
    //         author_id: '',
    //         title: '',
    //         summary: '',
    //         image_url: '',
    //         comment: ''
    //     },
    //     validationSchema: schema,
    //     onSubmit: (values) => {
    //         if (isEdit) {
    //             fetch(`http://127.0.0.1:5555/book/${id}`, {
    //                 method: "PATCH",
    //                 body: JSON.stringify(values),
    //                 headers: { 'Content-Type': 'application/json' }
    //             })
    //             .then(res => {
    //                 if (!res.ok) throw new Error("Failed to update book");
    //                 return res.json();
    //             })
    //             .then(data => {
    //                 console.log("Book updated:", data);
    //                 navigate(`/book/${id}`);
    //             })
    //             .catch(err => console.error("Error updating book:", err));
    //         } else {
    //             handleAddBook(values); // Call the function to add the book
    //         }
    //     }
    // });

    const handleCommentChange = (e) => {
        setNewComment(e.target.value); // Update newComment state
    };

    
    const handleAddComment = (e) => {
        e.preventDefault();
        console.log('form has been submitted')
        if (newComment.trim()) {
            console.log('if statement is working')
            addComments({ image_url: book.image_url, bookId: book.id, content: newComment }); // Call the addComments function with the new comment
            setNewComment(""); // Reset the input field after adding the comment
        }
    };

    const toggleComments = () => {
        setShowComments(!showComments); // Toggle the visibility of the comments
    };

    // console.log(book.image_url)

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
                        {comments.length > 0 ? (
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
        author: PropTypes.object.isRequired,
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
    ), // Comments must be an array of objects
};

export default BookCard;