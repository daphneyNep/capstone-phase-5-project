import React, { useState, useEffect } from 'react';
import BookContainer from './BookContainer';
import Search from './Search';
import BookForm from './BookForm'; // Import the BookForm component

// Parent component that renders a list of books
const BookList = () => {
    const [books, setBooks] = useState([]); // State to hold the list of books
    const [comments, setComments] = useState([]); // State to hold comments
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5555/books');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks(); // Fetch books on component mount
    }, []);

    // Function to add a new book
    console.log(newBook)
    const addBook = (newBook) => {
        setBooks([...books, newBook]); // Add new book to the list
    };

    // Function to delete a book
    const onDeleteBook = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:5555/books/${bookId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete book');
            }

            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
            console.log(`Deleted book with id: ${bookId}`);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    // Function to add a comment to a book
    const addComments = (bookId, comment, image_url) => {
        console.log(`Adding comment to book ${bookId}: ${comment} ${image_url}`);
        setComments((prevComments) => [...prevComments, { bookId, image_url, content: comment, id: Date.now() }]);
    };

    // Filter books based on the search term
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div>
            <h1>Book List</h1>
            
            {/* Book Form */}
            <BookForm addBook={addBook} /> {/* Pass addBook function to BookForm */}
                
            {/* Search input */}
            <Search onSearch={setSearchTerm} />

            {/* BookContainer to display books */}
            <BookContainer 
                books={filteredBooks} 
                onDeleteBook={onDeleteBook} 
                addComments={addComments}
                comments={comments}
            />
        </div>
    );
};

export default BookList;