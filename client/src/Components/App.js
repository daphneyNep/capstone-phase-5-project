import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"; 

import Home from "./Home";
import AuthorForm from "./Author/AuthorForm";
import AuthorContainer from "./Author/AuthorContainer";
import AuthorDetail from "./Author/AuthorDetail";
import BookContainer from "./Book/BookContainer";
import BookForm from "./Book/BookForm"; 
import BookDetail from "./Book/BookDetail";
import UserContainer from "./User/UserContainer";
import UserForm from "./User/UserForm";
import UserDetail from "./User/UserDetail";
import CommentContainer from "./Comment/CommentContainer"; 
import CommentForm from "./Comment/CommentForm";
import CommentDetail from "./Comment/CommentDetail";

import NavBar from "./NavBar";
import Header from "./Header";

function App() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from:", "http://127.0.0.1:5555/book");
        const bookRes = await fetch("http://127.0.0.1:5555/book");
        if (!bookRes.ok) throw new Error("Failed to fetch books");
        const bookData = await bookRes.json();
        setBooks(bookData);

        console.log("Fetching data from:", "http://127.0.0.1:5555/author");
        const authorRes = await fetch("http://127.0.0.1:5555/author");
        if (!authorRes.ok) throw new Error("Failed to fetch authors");
        const authorData = await authorRes.json();
        setAuthors(authorData);

        console.log("Fetching data from:", "http://127.0.0.1:5555/user");
        const userRes = await fetch("http://127.0.0.1:5555/user");
        if (!userRes.ok) throw new Error("Failed to fetch users");
        const userData = await userRes.json();
        setUsers(userData);

        console.log("Fetching data from:", "http://127.0.0.1:5555/comment");
        const commentRes = await fetch("http://127.0.0.1:5555/comment");
        if (!commentRes.ok) throw new Error("Failed to fetch comments");
        const commentData = await commentRes.json();
        setComments(commentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addAuthor = (author) => setAuthors((prev) => [...prev, author]);
  const addBook = (book) => setBooks((prev) => [...prev, book]);
  const addUser = (user) => setUsers((prev) => [...prev, user]);
  const addComment = (comment) => setComments((prev) => [...prev, comment]);

  const onDeleteAuthor = (id) => {
    fetch(`http://127.0.0.1:5555/author/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete author');
        setAuthors(prev => prev.filter(author => author.id !== id));
      })
      .catch(error => console.error('Error:', error));
  };

  const onDeleteBook = (id) => {
    fetch(`http://127.0.0.1:5555/book/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete book');
        setBooks(prev => prev.filter(book => book.id !== id));
      })
      .catch(error => console.error('Error:', error));
  };

  const onDeleteUser = (user_id) => {
    fetch(`http://127.0.0.1:5555/user/${user_id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete user');
        setUsers(prev => prev.filter(user => user.id !== user_id));
      })
      .catch(error => console.error('Error:', error));
  };

  const onDeleteComment = (id) => {
    fetch(`http://127.0.0.1:5555/comment/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete comment');
        setComments(prev => prev.filter(comment => comment.id !== id));
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/author/new" element={<AuthorForm addAuthor={addAuthor} />} />
        <Route path="/authors" element={<AuthorContainer authors={authors} onDeleteAuthor={onDeleteAuthor} />} />
        <Route path="/authors/:id" element={<AuthorDetail />} />
        <Route path="/book/new" element={<BookForm addBook={addBook} />} />
        <Route path="/books" element={<BookContainer books={books} onDeleteBook={onDeleteBook} />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/user/new" element={<UserForm addUser={addUser} />} />
        <Route path="/users" element={<UserContainer users={users} onDeleteUser={onDeleteUser} />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/comment/new" element={<CommentForm addComment={addComment} />} />
        <Route path="/comments" element={<CommentContainer comments={comments} onDeleteComment={onDeleteComment} />} />
        <Route path="/comments/:id" element={<CommentDetail />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;