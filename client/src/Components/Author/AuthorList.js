import React from "react";
import AuthorCard from "./AuthorCard";

const AuthorList = ({ authors, deleteAuthor }) => {
  return (
    <ul>
      {authors.map((author) => (
        <AuthorCard 
          key={author.id} 
          author={author} 
          deleteAuthor={deleteAuthor} // Make sure this function is passed
        />
      ))}
    </ul>
  );
};

export default AuthorList;