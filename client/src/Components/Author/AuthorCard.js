import React from "react";

const AuthorCard = ({ author: { id, author_name, author_genre, bio }, deleteAuthor }) => { // Destructure 'id' from 'author'
  const handleDelete = () => {
    deleteAuthor(id); // Use the 'id' here
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