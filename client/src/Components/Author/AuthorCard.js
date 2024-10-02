import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion"

const AuthorCard = ({ authors = [], onDeleteAuthor, onEdit }) => {
  return (
    <div className="author-card">
      {authors.map((author) => (
        <div key={author.id} className="author">
          {/* Display the author's image */}
          {author.image_url && (
            <img src={author.image_url} alt={author.name} className="author-image" style={{
              width: "100px",
              height: "auto",
              borderRadius: "50%",
              marginBottom: "10px"
            }}
          />
          )}
          <motion.div animate={{ x: 100 }} />
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