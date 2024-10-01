import React from "react";
import AuthorCard from "./AuthorCard";

const AuthorContainer = ({ authors, onDeleteAuthor, onEdit, image_url }) => {
  return (
    <div>
      {authors && authors.length > 0 ? (
        <AuthorCard authors={authors} onDeleteAuthor={onDeleteAuthor} onEdit={onEdit} image_url={image_url} />
      ) : (
        <p>No authors available.</p>
      )}
    </div>
  );
};

export default AuthorContainer;