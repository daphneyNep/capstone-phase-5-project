import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

function UserDetail() {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

  
    useEffect(() => {
        fetch(`http://127.0.0.1:5555/user/${id}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to fetch");
                }
            })
            .then(data => setUser(data))
            .catch(() => {
                setError("Failed to load user data");
                navigate("/not-found"); // Redirect to /not-found on error
            });
    }, [id, navigate]);

    const {username, all_users = [] } = user;

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }

  return (
    <div className="user-detail" user_id={id}>
            <h1>{username}</h1>
            <div className="user-card">
                <figure>
                    <section>
                        <p>Name: {username}</p>
                    </section>
                </figure>
                <section className="details">
                    <h3 style={{ margin: "16px auto" }}>Other Users</h3>
                    <ul className="user">
                        {all_users.map(u => (
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
        </div>
    );
}

export default UserDetail;
