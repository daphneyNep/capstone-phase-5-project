import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

function BookDetail() {
    const [book, setBook] = useState({});
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5555/book/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();
                setBook(data);
                // Assuming your API provides comments related to the book
                setComments(data.comments || []); // Adjust based on your data structure
            } catch (err) {
                setError("Failed to load book data");
                navigate("/not-found");
            }
        };
        
        fetchBook();
    }, [id, navigate]);

    const { author_id, title, summary, image_url, all_books = [] } = book;

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (comment.trim()) {
            const newComment = { content: comment, bookId: id }; // Adjust the object structure based on your API's requirements

            try {
                const response = await fetch(`http://127.0.0.1:5555/book/${id}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newComment),
                });

                if (!response.ok) {
                    throw new Error("Failed to submit comment");
                }

                const addedComment = await response.json();
                setComments((prevComments) => [...prevComments, addedComment]);
                setComment("");
            } catch (err) {
                setError("Failed to submit comment");
            }
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="book-detail" author_id={id}>
            <h1>{title}</h1>
            <p>{summary}</p>
            <div className="book-card">
                <figure className="image_url">
                    <img src={image_url} alt={author_id} />
                    <section>
                        <p>Title: {title}</p>
                        <pre>{summary}</pre>
                    </section>
                </figure>
                <section className="details">
                    <h3 style={{ margin: "16px auto" }}>Other Books</h3>
                    <ul className="book">
                        {all_books.map(b => (
                            <li key={b.id}>
                                <img width={"100px"} src={b.image_url} alt={b.name} />
                                <div className="a-user">
                                    <Link to={`/books/${b.id}`}>
                                        <p style={{ fontStyle: "italic" }}>{b.name}</p>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
            <section className="comments">
                <h2>Submit your comment!</h2>
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Add a comment"
                        rows="4"
                        style={{ width: "100%" }}
                    />
                    <button type="submit">Submit</button>
                </form>
                <ul>
                    {comments.map((com, index) => (
                        <li key={index}>{com.content || com}</li> // Adjust based on your comment structure
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default BookDetail;