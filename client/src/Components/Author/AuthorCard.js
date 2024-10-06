import React from "react";
import PropTypes from "prop-types";
// import { motion } from "framer-motion"
// import * as motion from "framer-motion/client"

const AuthorCard = ({ authors = [], onDeleteAuthor, onEdit }) => {
  return (
    <div className="author-card">
      {authors.map((author) => (
        <div key={author.id} className="author">
          {author.image_url && <img src={author.image_url} alt={author.title} style={{ width: '100px', height: '150px' }} />}
          <h3>{author.name}</h3>
          <button onClick={() => onEdit(author)}>Edit</button>
          <button onClick={() => onDeleteAuthor(author.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

AuthorCard.propTypes = {
  authors: PropTypes.array.isRequired,
  onDeleteAuthor: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default AuthorCard;