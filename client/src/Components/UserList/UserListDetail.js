import { useParams, Link, useNavigate } from "react-router-dom"; // Ensure you import useNavigate and useParams
import { useEffect, useState } from "react";
import React from "react";

function UserListDetail() {
    const [userList, setUserList] = useState({}); 
    const [comment, setComment] = useState(""); 
    const [comments, setComments] = useState([]); 
    const [rate, setRate] = useState("");
    const [ratings, setRatings] = useState([]); 
    const [error, setError] = useState(null); // Keep the error state
    const navigate = useNavigate(); 

    const { id } = useParams();

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:5555/userList/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await res.json();
                setUserList(data);
            } catch (err) {
                console.error("Failed to load userList data:", err);
                setError("Failed to load userList data");
                navigate("/not-found");
            }
        };

        fetchUserList();
    }, [id, navigate]);

    const { user_id, book_id, all_userLists = [] } = userList;

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment("");
        }
    };

    const handleRateChange = (e) => {
        setRate(e.target.value);
    };

    const handleRateSubmit = (e) => {
        e.preventDefault();
        if (rate.trim()) {
            setRatings([...ratings, rate]);
            setRate("");
        }
    };

    return (
        <div className="user-detail" id={id}>
            {/* Display error if there is one */}
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Add this line to display the error */}

            <p>User ID: {user_id}</p>
            <p>Book ID: {book_id}</p>

            <div className="user-card">
                <figure>
                    <section>
                        <p>Book ID: {book_id}</p>
                        <p>User ID: {user_id}</p>
                    </section>
                </figure>
                <section className="details">
                    <h3 style={{ margin: "16px auto" }}>User Lists</h3>
                    <ul className="userList">
                        {all_userLists.map((u) => (
                            <li key={u.id}>
                                <div className="u-user">
                                    <Link to={`/users/${u.id}`}>
                                        <p style={{ fontStyle: "italic" }}>{u.name}</p>
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

            <section className="rates">
                <h2>Submit your rating!</h2>
                <form onSubmit={handleRateSubmit}>
                    <textarea
                        value={rate}
                        onChange={handleRateChange}
                        placeholder="Add a rating"
                        rows="4"
                        style={{ width: "100%" }}
                    />
                    <button type="submit">Submit</button>
                </form>
                <ul>
                    {ratings.map((rate, index) => (
                        <li key={index}>{rate}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default UserListDetail;