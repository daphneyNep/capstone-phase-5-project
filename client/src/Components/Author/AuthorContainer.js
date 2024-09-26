import React from 'react';
import AuthorCard from './AuthorCard';

const AuthorContainer = ({ authors, deleteAuthor }) => {
  return (
    <ul className='cards'>
      {authors.map((author) => (
        <AuthorCard key={author.id} author={author} deleteAuthor={deleteAuthor} />
      ))}
    </ul>
  );
};

export default AuthorContainer;