import React, { useState } from 'react';
import BookCard from './BookCard'; // Ensure you have BookCard component

// Parent component that renders a list of books
function BookList({ books }) {
    const [comments, setComments] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

    // Function to delete a book
    const deleteBook = (id) => {
        console.log(`Deleting book with id: ${id}`);
        // Logic to delete the book
    };

    // Function to add a comment to a book
    const addComment = (bookId, comment) => {
        console.log(`Adding comment to book ${bookId}: ${comment}`);
        setComments(prevComments => [...prevComments, { bookId, content: comment, id: Date.now() }]);
    };

    // Function to handle search input
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter books based on the search term
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>Book List</h2>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <ul>
                {/* Iterate over the filtered books and render a BookCard for each */}
                {filteredBooks.map((book) => (
                    <BookCard
                        key={book.id} 
                        book={book} // Pass down book data
                        deleteBook={deleteBook} // Pass deleteBook function
                        addComment={addComment} // Pass addComment function
                        comments={comments.filter(comment => comment.bookId === book.id)} // Filter comments by book ID
                    />
                ))}
            </ul>
        </div>
    );
}

export default BookList;