import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navigation/Navbar";
import MemberForm from "../Pages/MemberForm";
import MemberList from "../Pages/MemberList";
import BookForm from "../Pages/BookForm";
import BookList from "../Pages/BookList";
import Headers from "../Pages/Headers";
import Search from "../Pages/Search";
import MemberPage from "../Pages/MemberPage";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';




function App() {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [term, setTerm] = useState("");

  function addMember(member) {
    setMembers([...members, member]);
  }

  function addBook(book) {
    setBooks([...books, book]);
  }

  useEffect(() => {
    fetch("http://localhost:5555/members")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setMembers(data))
      .catch(error => console.error('Error fetching members:', error));
  }, []);

 
  const deleteMember = (memberId) => {
    fetch(`http://localhost:5555/books/${memberId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Remove the book from the state
        setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
    })
    .catch(error => console.error('Error deleting member:', error));
};
  
  useEffect(() => {
    fetch("http://localhost:5555/books")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  function deleteBook(id) {
    fetch(`http://localhost:5555/books/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`Server responded with ${response.status}: ${errorData.message}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Book deleted successfully:', data);
        // Handle successful delete, e.g., refresh the list of books
      })
      .catch(error => console.error('Error deleting book:', error));
  }


  const viewedMembers = members.filter(member =>
    member.membername && member.membername.toLowerCase().includes(term.toLowerCase())
  );

  const viewedBooks = Array.isArray(books) ? books.filter(book =>
    book.title && book.title.toLowerCase().includes(term.toLowerCase())
  ) : [];




  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Headers />} />
        <Route path="/search" element={<Search books={viewedBooks} />} />
        <Route path="/Member-New" element={<MemberForm addMember={addMember} members={viewedMembers} setTerm={setTerm} term={term} />} />
        <Route path="/Members" element={<MemberList members={members} deleteMember={deleteMember}/>} />
        <Route path="/Book-New" element={<BookForm addBook={addBook} books={viewedBooks} setTerm={setTerm} term={term} />} />
        <Route path="/Books" element={<BookList books={books} deleteBook={deleteBook} />} />
      </Routes>
    </Router>
  );
}

export default App;