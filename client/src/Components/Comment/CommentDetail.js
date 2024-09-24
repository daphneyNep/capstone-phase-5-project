import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

function CommentDetail() {
    const { commentId, bookId } = useParams();  // Destructure params to get commentId and bookId
    const [comment, setComment] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCommentContent, setNewCommentContent] = useState('');

    useEffect(() => {
        // Fetch comment details based on ID from URL parameters
        fetch(`/comments/${commentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setComment(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, [commentId]);  // Use commentId from useParams

    const handleCreateComment = () => {
        fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: newCommentContent,
                book_id: bookId, // Use bookId from useParams
                user_id: 1 // Replace with the actual user ID
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create comment');
            }
            return response.json();
        })
        .then(data => {
            setComment(prev => ({
                ...prev,
                comments: [...(prev.comments || []), data] // Update comments array
            }));
            setNewCommentContent('');
        })
        .catch(error => {
            setError(error.message);
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!comment) {
        return <p>No comment found.</p>;
    }

    const { id, content, author_id, book_id, user_id, created_at, updated_at } = comment;

    return (
        <div className="comment-detail" id={id}>
            <p>{content}</p>
            <div className="comment-card">
                <figure className="image_url">
                    <img src="default-image.jpg" alt="Comment" /> {/* Fallback image */}
                    <section>
                        <p>Author: {author_id}</p>
                        <p>User: {user_id}</p>
                        <p>Book: {book_id}</p>
                        <p>Created: {created_at}</p>
                        <p>Updated: {updated_at}</p>
                    </section>
                </figure>
                <section className="details">
                    <h3>Comments:</h3>
                    <ul className="books">
                        {/* Assuming comment.comments is an array of comments */}
                        {comment.comments && comment.comments.map((c) => (
                            <li key={c.id}>
                                <img
                                    width="100px"
                                    src="default-image.jpg" // Fallback image
                                    alt="Book"
                                />
                                <div className="book-user">
                                    <Link to={`/comment/${c.author_id}`}>
                                        <p className="author-name">{c.author_name}</p>
                                    </Link>
                                    <p>{c.content}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="add-comment">
                    <textarea
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                        placeholder="Add a new comment..."
                    />
                    <button onClick={handleCreateComment}>Add Comment</button>
                </section>
            </div>
        </div>
    );
}

export default CommentDetail;