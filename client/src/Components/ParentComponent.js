import React, { useState } from "react";
import Search from "./Search"; // Import your Search component
import BookList from "./BookList"; // Import your BookList component
import AuthorList from "./AuthorList"; // Import your AuthorList component

function ParentComponent() {
    const [books, setBooks] = useState([
        { id: 1, title: "Book 1", author: "Author 1" },
        { id: 2, title: "Book 2", author: "Author 2" },
        // Add your book data here
    ]);

    const [authors, setAuthors] = useState([
        { id: 1, name: "Author 1" },
        { id: 2, name: "Author 2" },
        // Add your author data here
    ]);

    const [filteredBooks, setFilteredBooks] = useState(books);
    const [filteredAuthors, setFilteredAuthors] = useState(authors);

    // Function to filter books based on the search input
    const searchBook = (searchTerm) => {
        const filtered = books.filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    // Function to filter authors based on the search input
    const searchAuthor = (searchTerm) => {
        const filtered = authors.filter((author) =>
            author.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAuthors(filtered);
    };

    

    return (
        <div>
            {/* Pass down the search functions as props */}
            <Search searchBook={searchBook} searchAuthor={searchAuthor} />
            {/* Render the filtered book and author lists */}
            <BookList books={filteredBooks} />
            <AuthorList authors={filteredAuthors} />
        </div>
    );
}

export default ParentComponent;