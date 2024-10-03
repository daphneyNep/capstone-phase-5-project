import React, { useEffect, useState } from "react";
import UserListCard from "./UserListCard";

const ParentComponent = () => {
  const [users, setUsers] = useState([]); // Initialize as an array
  const [userLists, setUserLists] = useState([]); // Initialize as an array
  const [books, setBooks] = useState([]); // Initialize as an array
  const [comments, setComments] = useState([]); // Initialize as an array
  const [ratings, setRatings] = useState([]); // Initialize ratings state

  useEffect(() => {
    // Fetch users
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));

    // Fetch userLists
    fetch("/api/userLists")
      .then((response) => response.json())
      .then((data) => setUserLists(data));

    // Fetch books
    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  // Handle selected book
  const handleSelectedBook = (userListId, bookId) => {
    console.log(`Selected book for user list ${userListId}:`, bookId);
  };

  // Handle delete user list
  const handleDeleteUserList = (userListId) => {
    console.log(`Deleted user list with ID: ${userListId}`);
  };

  // Handle adding comments
  const handleAddComments = (userListId, content) => {
    const newComment = {
      id: comments.length + 1, // Generate a new ID
      userListId,
      content,
    };
    setComments([...comments, newComment]);
  };

  // Handle adding ratings
  const addRatings = (userListId, rating) => {
    const newRating = {
      id: ratings.length + 1,
      userListId,
      rating,
    };
    setRatings([...ratings, newRating]);
  };

  return (
    <div>
      {userLists.map((userList) => (
        <UserListCard
          key={userList.id}
          userLists={userList}
          user={users.find((user) => user.id === userList.userId)} // Pass the correct user
          books={books}
          onSelectedBook={handleSelectedBook}
          onDeleteUserList={handleDeleteUserList}
          addComments={handleAddComments}
          comments={comments}
          addRatings={addRatings}
          ratings={ratings} // Pass ratings to UserListCard
        />
      ))}
    </div>
  );
};

export default ParentComponent;