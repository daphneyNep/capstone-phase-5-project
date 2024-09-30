import React, { useEffect, useState } from 'react';
import BookCard from './Book/BookCard';

const LibraryPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5555/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Define the onDeleteBook function
  const onDeleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:5555/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the book');
      }
      // Update the books state by filtering out the deleted book
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Add this function to handle adding a book
  const handleAddBook = (newBookTitle) => {
    const newBook = { id: books.length + 1, title: newBookTitle, author: "Unknown", genre: "Unknown", summary: "", image_url: "" };
    setBooks([...books, newBook]); // Add the new book to the list
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Library</h1>
      <div className="book-list">
        {books.map((book) => (
          <BookCard 
            key={book.id} 
            book={book} 
            onDeleteBook={onDeleteBook} 
            addBook={handleAddBook} // Pass the addBook function
          />
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;