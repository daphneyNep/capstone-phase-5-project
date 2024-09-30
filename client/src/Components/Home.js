import React, { useState, useEffect } from "react";
import BookCard from "./Book/BookCard";
import LibraryPage from './LibraryPage';  // Keeping the import because it's used
import About from "./About";

function Home() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    // Function to handle the deletion of a book
    const onDeleteBook = (bookId) => {
        // Assuming the backend is handling the delete request
        fetch(`http://127.0.0.1:5555/books/${bookId}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            // Remove the book from the state
            setBooks(books.filter(book => book.id !== bookId));
        })
        .catch(err => {
            setError(err.message);
            console.error("Delete error:", err);
        });
    };

    // Function to handle adding a new book
    const handleAddBook = (newBookTitle) => {
        const newBook = { id: books.length + 1, title: newBookTitle, author: "Unknown", genre: "Unknown", summary: "", image_url: "" };
        setBooks([...books, newBook]); // Add the new book to the list
    };

    const handleAddComment = (bookId, comment) => {
        // Your logic to add a comment goes here
    };

    useEffect(() => {
        fetch("http://127.0.0.1:5555/books")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
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
                console.error("Fetch error:", err);
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

            {/* Adding the LibraryPage component */}
            <section>
                <LibraryPage />
            </section>

            <section>
                <h2>Books</h2>
                {books.length > 0 ? (
                    books.map(book => (
                        <BookCard 
                            key={book.id} 
                            book={book} 
                            onDeleteBook={onDeleteBook}  // Passing the delete handler
                            addComment={handleAddComment} // Pass the comment handler
                            addBook={handleAddBook}       // Pass the add book handler
                            comments={[]}                 // Adjust according to how you're handling comments
                        />
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </section>
        </div>
    );
}

export default Home;