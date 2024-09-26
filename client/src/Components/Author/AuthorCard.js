import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthorCard = ({ author, deleteAuthor }) => {
  console.log('deleteAuthor prop:', deleteAuthor); // Debugging line

  return (
    <li className="author-card">
      {author.image_url && (
        <img src={author.image_url} alt={`${author.author_name}'s portrait`} />
      )}
      <h3>
        <Link to={`/authors/${author.id}`}>{author.author_name}</Link>
      </h3>
      <p>{author.author_genre}</p>
      <p>{author.bio}</p>
      <button onClick={() => deleteAuthor(author.id)}>Delete</button>
    </li>
  );
};

AuthorCard.propTypes = {
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author_name: PropTypes.string.isRequired,
    author_genre: PropTypes.string.isRequired,
    bio: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
  deleteAuthor: PropTypes.func.isRequired,
};

export default AuthorCard;