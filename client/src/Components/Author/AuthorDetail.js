import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

function AuthorDetail() {
    const [author, setAuthor] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/author/${id}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to fetch");
                }
            })
            .then(data => setAuthor(data))
            .catch(() => {
                setError("Failed to load author data");
                navigate("/not-found"); // Redirect to /not-found on error
            });
    }, [id, navigate]);

    const { name, genre, image_url, bio, all_authors = [] } = author;

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }

    return (
        <div className="author-detail" author_id={id}>
            <h1>{name}</h1>
            <h2>{genre}</h2>
            <p>{bio}</p>
            <div className="author-card">
                <figure className="image_url">
                    <img src={image_url} alt={name} />
                    <section>
                        <p>Name: {name}</p>
                        <p>Genre: {genre}</p>
                        <pre>{bio}</pre>
                    </section>
                </figure>
                <section className="details">
                    <h3 style={{ margin: "16px auto" }}>Other Authors</h3>
                    <ul className="author">
                        {all_authors.map(a => (
                            <li key={a.id}>
                                <img width={"100px"} src={a.image_url} alt={a.name} />
                                <div className="a-user">
                                    <Link to={`/authors/${a.id}`}>
                                        <p style={{ fontStyle: "italic" }}>{a.name}</p>
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

export default AuthorDetail;