import React from 'react';
import AuthorContainer from './AuthorContainer'; // Make sure this import matches the filename

function AuthorPage({ authors }) {
  return (
    <AuthorContainer author={authors} />
  );
}

export default AuthorPage;