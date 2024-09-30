import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthorCard = ({ author, onDeleteAuthor }) => {
  return (
    <div className="author-card">
      {author.image_url && (
        <img src={author.image_url} alt={`${author.author_name || 'Unknown Author'}'s portrait`} />
      )}
      <h3>
        <Link to={`/authors/${author.id}`}>{author.author_name || 'Unknown Author'}</Link>
      </h3>
      <p>{author.author_genre || 'Unknown Genre'}</p>
      <p>{author.bio || 'No bio available.'}</p>
      <button onClick={() => onDeleteAuthor(author.id)}>Delete</button>
    </div>
  );
};

AuthorCard.propTypes = {
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author_name: PropTypes.string.isRequired,
    author_genre: PropTypes.string,
    bio: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
  onDeleteAuthor: PropTypes.func.isRequired,
};

export default AuthorCard;