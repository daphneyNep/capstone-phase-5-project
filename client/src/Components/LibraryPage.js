import React, { useEffect, useState } from 'react';
import BookCard from './Book/BookCard';
import UserLists from './UserList/UserLists';

const LibraryPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userList, setUserList] = useState([]);
  const [userError, setUserError] = useState(null);

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

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await fetch('http://localhost:5555/userlist');
        if (!response.ok) {
          throw new Error('Failed to fetch user list');
        }
        const data = await response.json();
        setUserList(data);
      } catch (err) {
        setUserError(err.message);
      }
    };

    fetchUserList();
  }, []);

  const onDeleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:5555/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the book');
      }
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddBook = (newBookTitle) => {
    const newBook = { 
      id: books.length + 1, 
      title: newBookTitle, 
      author: "", 
      genre: "", 
      summary: "", 
      image_url: "" 
    };
    setBooks([...books, newBook]);
  };

  const updateBook = async (updatedBook) => {
    try {
      const response = await fetch(`http://localhost:5555/books/${updatedBook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });

      if (!response.ok) {
        throw new Error('Failed to update the book');
      }

      const updatedBookData = await response.json();

      // Update the book in the local state
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === updatedBookData.id ? updatedBookData : book
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // New function to handle adding comments
  const handleAddComments = async (bookId, comment) => {
    try {
      const response = await fetch(`http://localhost:5555/books/${bookId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }), // Assuming your API expects { comment: "Your comment here" }
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const newComment = await response.json();

      // Update the comments in the state
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, comments: [...(book.comments || []), newComment] } : book
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;
  if (userError) return <div>Error fetching user list: {userError}</div>;

  return (
    <div>
      <h1>Library</h1>
      
      {/* Display books */}
      <div className="book-list">
        {books.map((book) => (
          <BookCard 
            key={book.id} 
            book={book} 
            onDeleteBook={onDeleteBook} 
            updateBook={updateBook}  // Pass the function here
            addBook={handleAddBook}
            addComments={handleAddComments} // Pass the new function here
            comments={book.comments || []} 
          />
        ))}
      </div>

      {/* Display the full user list */}
      <h2>Users</h2>
      <UserLists users={userList} />
    </div>
  );
};

export default LibraryPage;