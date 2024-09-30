import { useParams, Link, useNavigate } from "react-router-dom"; // Ensure you import useNavigate and useParams
import { useEffect, useState } from "react";
import React from "react";

function BookDetail() {
    const [book, setBook] = useState({});
    const [comment, setComment] = useState(""); // State for the new comment
    const [comments, setComments] = useState([]); // State for the list of comments
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate
    const { id } = useParams(); // Use 'id' from useParams

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/book/${id}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to fetch");
                }
            })
            .then(data => setBook(data))
            .catch(() => {
                setError("Failed to load book data");
                navigate("/not-found"); // Redirect to /not-found on error
            });
    }, [id, navigate]);

    const { author_id, title, summary, image_url, all_books = [] } = book;

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment(""); // Clear the input field after submitting
        }
    };

    if (error) {
        return <div>Error: {error}</div>; // Display error message
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
                        <li key={index}>{com}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default BookDetail;
