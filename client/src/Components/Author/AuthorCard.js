import React from "react"

const AuthorCard = ({ author: { author_name, author_genre, bio }, deleteBook }) => {
  const handleDelete = () => {
    deleteBook(id);
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

export default AuthorCard