import { Routes, Route } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

import Home from "./Home";
import AuthorForm from "./Author/AuthorForm";
import AuthorContainer from "./Author/AuthorContainer";
import AuthorDetail from "./Author/AuthorDetail";
import CommentPage from "./Comment/CommentPage";
import BookContainer from "./Book/BookContainer";
import BookForm from "./Book/BookForm";
import BookDetail from "./Book/BookDetail";
import BookPage from "./Book/BookPage"; 
import UserListContainer from "./UserList/UserListContainer";
import UserListForm from "./UserList/UserListForm";
import UserListDetail from "./UserList/UserListDetail";
import UserForm from "./User/UserForm";
import UserDetail from "./User/UserDetail";
import UserCard from "./User/UserCard";
import UserList from "./UserList/UserLists";
import UserListComments from './UserList/UserListComments';
import UserContainer from "./User/UserContainer"
import CommentContainer from "./Comment/CommentContainer";
import CommentForm from "./Comment/CommentForm";
import CommentDetail from "./Comment/CommentDetail";
import LibraryPage from './LibraryPage';

import NavBar from "./NavBar";
import Header from "./Header";
import NotFound from "./NotFound"; 


// Move ErrorBoundary class to the top level
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratings, setRatings] = useState([]);
  const [onSelectedBooks, setOnSelectedBooks] = useState([]);
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {

        const bookRes = await fetch("http://127.0.0.1:5555/books");
        if (!bookRes.ok) throw new Error(`Failed to fetch books: ${bookRes.statusText}`);
        const bookData = await bookRes.json();
        setBooks(bookData);
      
        const authorRes = await fetch("http://127.0.0.1:5555/author");
        if (!authorRes.ok) throw new Error(`Failed to fetch authors: ${authorRes.statusText}`);
        const authorData = await authorRes.json();
        setAuthors(authorData);
      
        const userRes = await fetch("http://127.0.0.1:5555/user");
        if (!userRes.ok) throw new Error(`Failed to fetch users: ${userRes.statusText}`);
        const userData = await userRes.json(); // Correctly fetch user data
        setUsers(userData);
        
      

        const userListRes = await fetch("http://127.0.0.1:5555/userlist");
        if (!userListRes.ok) throw new Error(`Failed to fetch userLists: ${userListRes.statusText}`);
        const userListData = await userListRes.json();
        setUserLists(userListData);
      
        const commentRes = await fetch("http://127.0.0.1:5555/comments");
        if (!commentRes.ok) throw new Error(`Failed to fetch comments: ${commentRes.statusText}`);
        const commentData = await commentRes.json();
        console.log('Fetched comments:', commentData);
        setComments(commentData);

        

      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
  
    fetchData();
  }, []);

  const addAuthor = (author) => setAuthors((prev) => [...prev, author]);
  const addBook = (book) => setBooks((prev) => [...prev, book]);
  const addUser = (user) => setUsers((prev) => [...prev, user]);
  const addUserList = (userList) => setUserLists((prev) => [...prev, userList]);
  const addComments = (comment) => setComments((prev) => [...prev, comment]);
  const addRatings = (rating) => setRatings((prev) => [...prev, rating]);
  // const onSelectedBooks = (book) => setOnSelectedBooks((prev) => [...prev, book]);
  

  const onDeleteAuthor = (id) => {
    console.log(`onDeleting author with id: ${id}`);
    fetch(`http://127.0.0.1:5555/author/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete author');
        setAuthors((prevAuthors) => prevAuthors.filter(author => author.id !== id));
      })
      .catch(error => console.error('Error:', error));
  };

  const onDeleteBook = (id) => {
    console.log(`onDelete book with id: ${id}`);
    fetch(`http://127.0.0.1:5555/books/${id}`, { method: 'DELETE' }) // Fix the URL here
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete book');
        setBooks(prev => prev.filter(book => book.id !== id));
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDeleteUser = (id) => {
    console.log(`Attempting to delete user with ID: ${id}`);
    fetch(`http://127.0.0.1:5555/user/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to delete user`);
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((error) => console.error('Error while deleting user:', error));
  };

  const onDeleteUserList = (id) => {
    console.log(`onDeleting userList with id: ${id}`);
    fetch(`http://127.0.0.1:5555/userList/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete userList');
        setUserLists((prevUserLists) => prevUserLists.filter(userList => userList.id !== id));
      })
      .catch(error => console.error('Error:', error));
  };
  

  const onDeleteComment = (id) => {
    console.log(`Attempting to delete comment with ID: ${id}`);
    fetch(`http://127.0.0.1:5555/comment/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Error: ${response.status} - ${text}`);
          });
        }
        setComments(prev => prev.filter(comment => comment.id !== id));
      })
      .catch(error => {
        console.error('Error while deleting comment:', error);
        alert('Failed to delete comment. Please try again later.');
      });
  };

  const handleSelectedBooks = (bookId) => {
    const selectedBook = books.find(book => book.id === bookId);
    if (selectedBook) {
      setOnSelectedBooks((prev) => [...prev, selectedBook]);
    }
    console.log("Selected book ID:", bookId);
  };
  

  // Filter the books and authors based on the searchTerm
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredComments = comments.filter(comment =>
    String(comment?.id).toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredUserLists = userLists.filter(userlist =>
    String(userlist.user_id).toLowerCase().includes(searchTerm.toLowerCase())
  );
  const updateBook = (id, updatedBook) => {
    setBooks(books.map(book => (book.id === id ? updatedBook : book)));
  };

const handleEdit = (id, updatedAuthor) => {
  setAuthors((prevAuthors) => 
    prevAuthors.map(author => (author.id === id ? updatedAuthor : author))
  );
};

const handleLogin = (e) => {
  e.preventDefault();
  // Implement login logic here
  console.log("Logging in with", username, password);
  // Clear inputs after login attempt (if desired)
  setUsername('');
  setPassword('');

};


const handleEditUser = (id, updatedUser) => {
  setUsers(users.map(user => (user.id === id ? updatedUser : user)));
};



  

  return (
    <ErrorBoundary>
        <div className="App">
          <Header />
          <NavBar />
          <h2>Selected Books</h2>
          {onSelectedBooks.map((book) => (
            <div key={book.id}>{book.title}</div>
          ))}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Add the Login Form Here */}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/author/new" element={<AuthorForm addAuthor={addAuthor} />} />
          <Route path="/author/:id" element={<AuthorDetail />} />
          <Route path="/authors" element={<AuthorContainer authors={filteredAuthors} onDeleteAuthor={onDeleteAuthor} onEdit={handleEdit}/>} />
          <Route path="/books" element={<BookContainer books={filteredBooks} onDeleteBook={onDeleteBook} addComments={addComments} comments={comments} addBook={addBook} updateBook={updateBook} onSelectedBook={handleSelectedBooks}/>} />
          <Route path="/book/new" element={<BookForm addBook={addBook} />} />
          <Route path="/book/:id" element={<BookDetail books={books}/> } />
          <Route path="/books/:bookid" element={<BookPage />} />
          <Route path="/books/:bookid/comments" element={<CommentPage comments={comments} />} />
          <Route path="/user/new" element={<UserForm addUser={addUser} />} />
          <Route path="/users" element={<UserContainer users={filteredUsers} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} user={users} />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/users" element={<UserCard key={users.id} susername={username} password={password} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} users={users} />}/>
          <Route path="/userList/new" element={<UserListForm addUserList={addUserList} />} />
          <Route path="/userLists" element={<UserListContainer userLists={filteredUserLists} onDeleteUserList={onDeleteUserList} addComments={addComments} comments={comments} addRatings={addRatings} ratings={ratings} onSelectedBook={handleSelectedBooks} books={books} users={users} />} />
          <Route path="/userList/:id" element={<UserListDetail />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/userLists/:userListId/comments" element={<CommentPage />} />
          <Route path="/userLists/:id/comments" element={<UserListComments />} />
          <Route path="/comment/new" element={<CommentForm addComments={addComments} />} />
          <Route path="/comments" element={<CommentContainer comments={filteredComments} onDeleteComment={onDeleteComment} />} />
          <Route path="/comment/:id" element={<CommentDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/library" element={<LibraryPage onDeleteBook={onDeleteBook} users={users}/>} />
        </Routes>
        </div>
    </ErrorBoundary>
  );
}

export default App;
