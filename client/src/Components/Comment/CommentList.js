import React from 'react';
import PropTypes from 'prop-types';
import CommentCard from './CommentCard'; // Assuming you have this component

const CommentList = ({ comments, onDeleteComment }) => {
  return (
    <div>
      {comments.map((comment) => (
        <CommentCard 
          key={comment.id}  // Ensure unique key for each comment
          comment={comment} 
          onDeleteComment={onDeleteComment} 
        />
      ))}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,  // Ensure `id` is available and unique for each comment
      title: PropTypes.string,
      content: PropTypes.string.isRequired,
      image_url: PropTypes.string
    })
  ).isRequired,
  onDeleteComment: PropTypes.func.isRequired
};

export default CommentList;