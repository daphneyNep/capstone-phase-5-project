import React, { useState } from "react"; 
import Search from "./Search"; // Import your Search component
import BookList from "./BookList"; // Import your BookList component
import AuthorList from "./AuthorList"; // Import your AuthorList component
import UserListContainer from './UserListContainer'; // Import UserListContainer

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
    const [userLists, setUserLists] = useState([]); // Initialize user lists data
    const [users, setUsers] = useState([ // Initialize users data
        { user_id: 1, username: "User1" },
        { user_id: 2, username: "User2" },
        // Add your user data here
    ]);

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

    // Define the function to handle book selection
    const handleSelectBook = (userListId, bookId) => {
        console.log(`Selected book ${bookId} from user list ${userListId}`);
        // Add your logic here to handle the selection
    };

    // Log the user data
    console.log(users); // This will log the users to the console

    return (
        <div>
            {/* Pass down the search functions as props */}
            <Search searchBook={searchBook} searchAuthor={searchAuthor} />
            {/* Render the filtered book and author lists */}
            <BookList books={filteredBooks} />
            <AuthorList authors={filteredAuthors} />
            {/* Include the UserListContainer */}
            <UserListContainer
                userLists={userLists}
                onDeleteUserList={() => {}} // Replace with actual delete function
                onSelectBook={handleSelectBook} // Pass the defined function
                books={filteredBooks} // Pass filtered books
                addComments={() => {}} // Replace with actual add comments function
                addRatings={() => {}} // Replace with actual add ratings function
                users={users} // Pass the users to UserListContainer
            />
        </div>
    );
}

export default ParentComponent;