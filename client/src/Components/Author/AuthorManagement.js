import React, { useState } from "react";
import AuthorList from "./AuthorList";

const AuthorManagement = () => {
  const [authors, setAuthors] = useState([
    { id: 1, author_name: "Author One", author_genre: "Fiction", bio: "Bio One", image_url: "image1.jpg" },
    { id: 2, author_name: "Author Two", author_genre: "Non-Fiction", bio: "Bio Two", image_url: "image2.jpg" },
    // ... other authors
  ]);

  const deleteAuthor = (id) => {
    setAuthors((prevAuthors) => prevAuthors.filter(author => author.id !== id));
  };

  return (
    <div>
      <h1>Authors</h1>
      <AuthorList authors={authors} deleteAuthor={deleteAuthor} />
    </div>
  );
};

export default AuthorManagement;