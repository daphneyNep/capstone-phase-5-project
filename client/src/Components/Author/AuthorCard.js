import React from "react";

const AuthorCard = ({ author: { id, author_name, author_genre, bio, image_url }, deleteAuthor = () => {} }) => {
  // This will prevent the error, but you should still implement proper logic in the parent.
  const handleDelete = () => {
    if (deleteAuthor) {
      deleteAuthor(id);
    }
  };

  return (
    <li>
      {image_url && <img src={image_url} alt={`${author_name}'s portrait`} />}
      <p>{author_name}</p>
      <p>{author_genre}</p>
      <p>{bio}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default AuthorCard;