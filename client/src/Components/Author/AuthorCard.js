import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion"; // Import motion from Framer Motion

const AuthorCard = ({ authors = [], onDeleteAuthor, onEdit }) => {
  // Define animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 }, // Initial state
    visible: { opacity: 1, y: 0 }, // Visible state
    hover: { scale: 1.05 }, // Slightly enlarge on hover
    exit: { opacity: 0, y: -20 }, // Exit animation
  };

  return (
    <div className="author-card">
      {authors.map((author) => (
        // Wrap each author in a motion.div to animate
        <motion.div
          key={author.id}
          className="author"
          initial="hidden"
          animate="visible"
          whileHover="hover"
          exit="exit"
          variants={cardVariants}
          layout // Optional: smooth layout animations when items are reordered
        >
          {author.image_url && (
            <motion.img
              src={author.image_url}
              alt={author.name}
              style={{ width: '100px', height: '150px' }}
              whileHover={{ scale: 1.1 }} // Image hover effect
            />
          )}
          <h3>{author.name}</h3>
          <button onClick={() => onEdit(author)}>Edit</button>
          <button onClick={() => onDeleteAuthor(author.id)}>Delete</button>
        </motion.div>
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