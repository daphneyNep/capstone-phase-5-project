import React from 'react';
import PropTypes from 'prop-types';

const CommentCard = ({ comment, onDeleteComment }) => {
  if (!comment) return null;

  return (
    <div>
      <h3>{comment.title || ""}</h3>
      {/* <img src={comment.image_url || "/default-image.jpg"} alt="Comment" /> */}
      {comment.image_url && <img src={comment.image_url} alt={comment.title} style={{ width: '100px', height: '150px' }} />}

      {/* Use defaultValue for a non-editable field */}
      <label htmlFor={`content-${comment.id}`}>Content</label>
      <input
        type="text"
        id={`content-${comment.id}`}
        name={`content-${comment.id}`}
        defaultValue={comment.content}
      />

      <button onClick={() => onDeleteComment(comment.id)}>Delete Comment</button>
    </div>
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