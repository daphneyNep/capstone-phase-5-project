import React from 'react';
import AuthorContainer from './AuthorContainer'; // Ensure this import matches the filename

function AuthorPage({ authors }) {
  return (
    <div>
      {authors && authors.length > 0 ? (
        <AuthorContainer authors={authors} /> // Pass authors as an array
      ) : (
        <p>No authors available.</p> // Fallback message if there are no authors
      )}
    </div>
  );
}

export default AuthorPage;