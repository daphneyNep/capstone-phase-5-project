import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion'; // Import motion

const CommentCard = ({ comment, onDeleteComment }) => {
  if (!comment) return null;

  // Define animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { type: 'spring', stiffness: 300 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{ padding: '10px', border: '1px solid #ccc', margin: '10px 0', borderRadius: '5px' }}
    >
      <h3>{comment.title || ""}</h3>
      {comment.image_url && (
        <motion.img 
          src={comment.image_url} 
          alt={comment.title} 
          style={{ width: '100px', height: '150px' }} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }} // Fade-in effect
        />
      )}
      <label htmlFor={`content-${comment.id}`}>Content</label>
      <input
        type="text"
        id={`content-${comment.id}`}
        name={`content-${comment.id}`}
        defaultValue={comment.content}
        readOnly
      />
      <motion.button
        onClick={() => onDeleteComment(comment.id)}
        variants={buttonVariants}
        whileHover="hover"
        style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}
      >
        Delete Comment
      </motion.button>
    </motion.div>
  );
};

// Prop types validation
CommentCard.propTypes = {
  comment: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default CommentCard;