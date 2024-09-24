import React from 'react';
import PropTypes from 'prop-types';

const CommentCard = ({ comment, onDeleteComment }) => {
  if (!comment) return null;

  return (
    <div>
      <h3>{comment.title || "Untitled Comment"}</h3> {/* Fallback title */}
      <img src={comment.image_url || "default-image.jpg"} alt="Comment" />
      <p>{comment.content}</p>
      <button onClick={() => onDeleteComment(comment.id)}>Delete Comment</button>
    </div>
  );
};

// Prop types validation
CommentCard.propTypes = {
  comment: PropTypes.shape({
    title: PropTypes.string, // Title is now optional
    content: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default CommentCard;
