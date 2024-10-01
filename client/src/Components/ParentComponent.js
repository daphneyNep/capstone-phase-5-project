import React, { useEffect, useState } from "react";
import UserListCard from "./UserListCard";

const ParentComponent = () => {
  const [users, setUsers] = useState({});
  const [userLists, setUserLists] = useState({});
  const [books, setBooks] = useState({});

  useEffect(() => {
    // Example: Fetch user data from an API endpoint
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
    
    // Fetch userList and books if needed
    fetch("/api/userLists")
      .then((response) => response.json())
      .then((data) => setUserLists(data));

    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const handleSelectedBook = (userListId, bookId) => {
    console.log(`Selected book for user list ${userListId}:`, bookId);
  };

  const handleDeleteUserList = (userListId) => {
    console.log(`Deleted user list with ID: ${userListId}`);
  };

  // const addComments = (userListId, comment) => {
  //   console.log(`Added comment to user list ${userListId}:`, comment);
  // };

  const addRatings = (userListId, rating) => {
    console.log(`Added rating to user list ${userListId}:`, rating);
  };

  const [comments, setComments] = useState([]);

    const addComments = ({ bookId, content }) => {
        // Create a new comment object
        const newComment = {
            id: comments.length + 1, // Generate a new ID (this can be improved)
            content,
        };

        // Update the comments state to include the new comment
        setComments(prevComments => [...prevComments, newComment]);
    };


  return (
    <div>
      {userLists.map((userLists) => (
        <UserListCard
          key={list.id}
          userLists={userLists}
          users={users.find(user => user.id === list.userId)} // pass the correct user
          books={books}
          onSelectedBook={handleSelectedBook}
          onDeleteUserList={handleDeleteUserList}
          addComment={addComments}
          addRatings={addRatings}
        />
      ))}
    </div>
  );
};

export default ParentComponent;