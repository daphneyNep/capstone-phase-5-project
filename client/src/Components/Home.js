import { useState, useEffect } from "react";
import BookCard from "./Book/BookCard";
import About from "./About";
import React from "react";

function Home() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/book")
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to fetch books");
                }
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setBooks(data);
                } else {
                    throw new Error("Unexpected data format");
                }
            })
            .catch(err => {
                setError(err.message);
                console.error(err);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <section>
                <About />
            </section>

            <section>
                <h2>Books</h2>
                {books.length > 0 ? (
                    books.map(book => (
                        <BookCard key={book.id} book={book} />  // Assuming each book has a unique id
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </section>
        </div>
    );
}

export default Home;