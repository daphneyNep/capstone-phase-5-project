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


import NavBar from "./NavBar";
import Header from "./Header";

function App() {

  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    fetch("http://127.0.0.1:5555/book")
      .then((res) => res.ok ? res.json() : Promise.reject("Failed to fetch books"))
      .then((data) => setBooks(data))
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:5555/author")
      .then((res) => res.ok ? res.json() : Promise.reject("Failed to fetch authors"))
      .then((data) => setAuthors(data))
      .catch((error) => console.error(error));
    
      fetch("http://127.0.0.1:5555/user")
      .then((res) => res.ok ? res.json() : Promise.reject("Failed to fetch users"))
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  const addAuthor = (author) => setAuthors((prev) => [...prev, author]);
  const addBook = (book) => setBooks((prev) => [...prev, book]);
  const addUser = (user) => setUsers((prev) => [...prev, user])

  const onDeleteAuthor = (id) => {
    fetch(`http://127.0.0.1:5555/author/${author_id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Failed to delete author');
            });
        }

    })
    .then(data => {
        if (data.message === 'Author deleted successfully') {
            setAuthors(prevAuthors => prevAuthors.filter(author_id => author_id !==author_id));
        } else {
            console.error('Failed to delete author:', data.error);
        }

    })
    .catch(error => console.error('Error:', error));
};

const onDeleteBook = (id) => {
    fetch(`http://127.0.0.1:5555/book/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Failed to delete book');
            });
        }

    })
    .then(data => {
        if (data.message === 'Book deleted successfully') {
            setBooks(prevBooks => prevBooks.filter(id=> id !==id));
        } else {
            console.error('Failed to delete id', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
};

const onDeleteUser = (user_id) => {
    fetch(`http://127.0.0.1:5555/user/${user_id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Failed to delete user');
            });
        }
        
    })
    .then(data => {
        if (data.message === 'User deleted successfully') {
            setUsers(prevUsers => prevUsers.filter(user_id=> user_id !==user_id));
        } else {
            console.error('Failed to delete user_id', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
};

  return (
    <div className="App light">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/author/new" element={<AuthorForm addAuthor={addAuthor} />} />
        <Route path="/authors" element={<AuthorContainer authors={authors} onDeleteAuthor={onDeleteAuthor} />} />
        <Route path="/authors/:id" element={<AuthorDetail />} />
        <Route path="/book/new" element={<BookForm addBook={addBook}/>} />
        <Route path="/books" element={<BookContainer books={books} onDeleteBook={onDeleteBook}/>} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/user/new" element={<UserForm addUser={addUser}/>} />
        <Route path="/users" element={<UserContainer users={users} onDeleteUser={onDeleteUser}/>} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;