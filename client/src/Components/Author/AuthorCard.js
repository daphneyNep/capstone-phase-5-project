import React from "react";

const AuthorCard = ({ author: { id, author_name, author_genre, bio }, deleteBook }) => { // Destructure 'id' from 'author'
  const handleDelete = () => {
    deleteBook(id); // Use the 'id' here
  };

  return (
    <li>
      <p>{author_name}</p>
      <p>{author_genre}</p>
      <p>{bio}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default AuthorCard;