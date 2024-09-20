import React, { useState } from "react";

const Search = ({ books }) => {
    const [query, setQuery] = useState("");
    
    // Function to handle the search input change
    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    // Function to filter books based on the search query
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a book..."
                value={query}
                onChange={handleChange}
            />
            <ul>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <li key={book.id}>{book.title} by {book.author}</li>
                    ))
                ) : (
                    <li>No books found</li>
                )}
            </ul>
        </div>
    );
};

const filteredAuthors = authors.filter(author =>
    book.title.toLowerCase().includes(query.toLowerCase())
);

return (
    <div>
        <input
            type="text"
            placeholder="Search for a author..."
            value={query}
            onChange={handleChange}
        />
        <ul>
            {filteredAuthors.length > 0 ? (
                filteredAuthors.map(author => (
                    <li key={author}>{author_name} by {author_author}</li>
                ))
            ) : (
                <li>No authors found</li>
            )}
        </ul>
    </div>
);

export default Search;